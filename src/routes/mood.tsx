import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MOODS, getActivity } from "@/lib/vibe-data";
import { useVibeStore } from "@/stores/useVibeStore";
import { ActivityCard } from "@/components/ActivityCard";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/mood")({
  head: () => ({
    meta: [
      { title: "Mood check-in — VibeReset" },
      { name: "description", content: "Pick your current vibe and get 4 breaks that fit it." },
      { property: "og:title", content: "Mood check-in — VibeReset" },
      { property: "og:description", content: "What's your current vibe? Get matching breaks." },
    ],
  }),
  component: MoodPage,
});

function MoodPage() {
  const selectedMoodId = useVibeStore((s) => s.selectedMoodId);
  const selectMood = useVibeStore((s) => s.selectMood);
  const addMoodEntry = useVibeStore((s) => s.addMoodEntry);
  const [note, setNote] = useState("");

  const mood = MOODS.find((m) => m.id === selectedMoodId);

  function saveEntry() {
    if (!mood) return;
    addMoodEntry({ moodId: mood.id, note: note.trim() });
    setNote("");
    toast.success("Logged. No judgement here. 💚");
  }

  return (
    <PageShell title="What's your current vibe?" subtitle="No wrong answers. Pick what fits right now.">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {MOODS.map((m) => {
          const active = m.id === selectedMoodId;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => selectMood(m.id)}
              aria-pressed={active}
              className={`glass rounded-3xl p-5 text-center transition-all duration-200 hover:-translate-y-1 ${
                active ? "ring-2 ring-neon glow" : ""
              }`}
            >
              <div className="text-4xl transition-transform duration-200 group-hover:scale-110">
                {m.emoji}
              </div>
              <div className="mt-2 text-sm font-semibold">{m.label}</div>
            </button>
          );
        })}
      </div>

      {mood ? (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">
            {mood.emoji} Feeling {mood.label.toLowerCase()}? Try these.
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mood.suggestions.map((id) => {
              const activity = getActivity(id);
              return activity ? <ActivityCard key={id} activity={activity} /> : null;
            })}
          </div>

          <div className="glass mt-8 rounded-3xl p-6">
            <label htmlFor="mood-note" className="text-sm font-semibold">
              Want to add a note? (optional)
            </label>
            <textarea
              id="mood-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={200}
              rows={3}
              placeholder="e.g. Couldn't understand my assignment."
              className="mt-3 w-full resize-none rounded-2xl border border-input bg-background/60 p-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">{note.length}/200</span>
              <div className="flex gap-2">
                <button
                  onClick={saveEntry}
                  className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Log this mood
                </button>
                <Link
                  to="/mood-log"
                  className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold transition-colors hover:bg-secondary"
                >
                  See my mood journal
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <p className="mt-10 text-center text-muted-foreground">
          Pick a vibe above and we'll suggest a few tiny breaks. ✨
        </p>
      )}
    </PageShell>
  );
}
