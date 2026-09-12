/**
 * Global client state for VibeReset (Zustand).
 *
 * We only keep things here that many pages need:
 * - the mood you picked
 * - your mood journal entries
 * - your brain-dump entries
 * - completed activity sessions (used by the Progress page)
 *
 * Everything is saved in the browser with Zustand's `persist` middleware,
 * so the app works even without an account.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MoodEntry = {
  id: string;
  moodId: string;
  note: string;
  createdAt: string; // ISO date string
  activityId?: string;
  activityMinutes?: number;
};

export type JournalEntry = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ActivitySession = {
  id: string;
  activityId: string;
  minutes: number;
  createdAt: string;
};

type VibeState = {
  selectedMoodId: string | null;
  moodEntries: MoodEntry[];
  journalEntries: JournalEntry[];
  sessions: ActivitySession[];

  selectMood: (moodId: string) => void;
  addMoodEntry: (entry: Omit<MoodEntry, "id" | "createdAt">) => void;
  deleteMoodEntry: (id: string) => void;

  addJournalEntry: (content: string) => void;
  updateJournalEntry: (id: string, content: string) => void;
  deleteJournalEntry: (id: string) => void;

  completeActivity: (activityId: string, minutes: number) => void;
  reset: () => void;
};

// Small helper so we don't repeat random id logic everywhere.
const newId = () => Math.random().toString(36).slice(2, 10);

export const useVibeStore = create<VibeState>()(
  persist(
    (set) => ({
      selectedMoodId: null,
      moodEntries: [],
      journalEntries: [],
      sessions: [],

      selectMood: (moodId) => set({ selectedMoodId: moodId }),

      addMoodEntry: (entry) =>
        set((state) => ({
          moodEntries: [
            { ...entry, id: newId(), createdAt: new Date().toISOString() },
            ...state.moodEntries,
          ],
        })),

      deleteMoodEntry: (id) =>
        set((state) => ({ moodEntries: state.moodEntries.filter((m) => m.id !== id) })),

      addJournalEntry: (content) =>
        set((state) => {
          const now = new Date().toISOString();
          return {
            journalEntries: [
              { id: newId(), content, createdAt: now, updatedAt: now },
              ...state.journalEntries,
            ],
          };
        }),

      updateJournalEntry: (id, content) =>
        set((state) => ({
          journalEntries: state.journalEntries.map((e) =>
            e.id === id ? { ...e, content, updatedAt: new Date().toISOString() } : e,
          ),
        })),

      deleteJournalEntry: (id) =>
        set((state) => ({ journalEntries: state.journalEntries.filter((e) => e.id !== id) })),

      completeActivity: (activityId, minutes) =>
        set((state) => ({
          sessions: [
            { id: newId(), activityId, minutes, createdAt: new Date().toISOString() },
            ...state.sessions,
          ],
        })),

      reset: () => set({ selectedMoodId: null, moodEntries: [], journalEntries: [], sessions: [] }),
    }),
    { name: "vibereset-store" },
  ),
);
