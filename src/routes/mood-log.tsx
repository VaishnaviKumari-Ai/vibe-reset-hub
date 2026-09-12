import { createFileRoute, Link } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { MOODS, getActivity } from "@/lib/vibe-data";
import { useVibeStore } from "@/stores/useVibeStore";
import { useHydrated } from "@/hooks/useHydrated";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/mood-log")({
  head: () => ({
    meta: [
      { title: "Mood journal — VibeReset" },
      { name: "description", content: "A gentle timeline of how you've been feeling and what helped." },
      { property: "og:title", content: "Mood journal — VibeReset" },
      { property: "og:description", content: "Your mood timeline, no guilt attached." },
    ],
  }),
  component: MoodLogPage,
});

/** Turns a date into "Today", "Yesterday" or a readable date. */
function dayLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function MoodLogPage() {
  const hydrated = useHydrated();
  const entries = useVibeStore((s) => s.moodEntries);
  const deleteMoodEntry = useVibeStore((s) => s.deleteMoodEntry);

  // Group entries by day so the timeline reads nicely.
  const groups = entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    const key = dayLabel(entry.createdAt);
    acc[key] = acc[key] ? [...acc[key], entry] : [entry];
    return acc;
  }, {});

  return (
    <PageShell title="Mood journal 🪞" subtitle="Just a record. No scores, no streak pressure.">
      {!hydrated ? (
        <p className="text-sm text-muted-foreground">Loading your timeline…</p>
      ) : entries.length === 0 ? (
        <div className="glass rounded-3xl p-10 text-center">
          <p className="text-muted-foreground">No moods logged yet.</p>
          <Link
            to="/mood"
            className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Check in now
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groups).map(([day, list]) => (
            <section key={day}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{day}</h2>
              <ul className="mt-4 space-y-3 border-l border-border pl-5">
                {list.map((entry) => {
                  const mood = MOODS.find((m) => m.id === entry.moodId);
                  const activity = entry.activityId ? getActivity(entry.activityId) : undefined;
                  return (
                    <li key={entry.id} className="glass relative rounded-3xl p-5">
                      <span className="absolute -left-[1.72rem] top-7 h-3 w-3 rounded-full bg-neon" />
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-lg font-semibold">
                            {mood?.emoji} {mood?.label ?? "Mood"}
                          </p>
                          {entry.note && (
                            <p className="mt-1 text-sm italic text-muted-foreground">"{entry.note}"</p>
                          )}
                          {activity && (
                            <p className="mt-3 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                              {activity.emoji} {activity.title} — {entry.activityMinutes ?? activity.minutes} min
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <time className="text-xs text-muted-foreground">
                            {new Date(entry.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </time>
                          <button
                            aria-label="Delete mood entry"
                            onClick={() => deleteMoodEntry(entry.id)}
                            className="rounded-full border border-border p-2 text-destructive hover:bg-secondary"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </PageShell>
  );
}
