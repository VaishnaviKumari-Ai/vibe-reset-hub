import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { getActivity, MOODS } from "@/lib/vibe-data";
import { useVibeStore } from "@/stores/useVibeStore";
import { useHydrated } from "@/hooks/useHydrated";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress & insights — VibeReset" },
      { name: "description", content: "See the breaks you've taken this week — gently, without productivity guilt." },
      { property: "og:title", content: "Progress & insights — VibeReset" },
      { property: "og:description", content: "Healthy breaks beat endless scrolling." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const hydrated = useHydrated();
  const sessions = useVibeStore((s) => s.sessions);
  const moodEntries = useVibeStore((s) => s.moodEntries);

  // --- Simple stats, all computed from the saved sessions ---
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 6);
  weekStart.setHours(0, 0, 0, 0);

  const weekSessions = sessions.filter((s) => new Date(s.createdAt) >= weekStart);
  const weekMinutes = weekSessions.reduce((sum, s) => sum + s.minutes, 0);
  const totalMinutes = sessions.reduce((sum, s) => sum + s.minutes, 0);

  // Favourite activity = the one done most often.
  const counts: Record<string, number> = {};
  sessions.forEach((s) => {
    counts[s.activityId] = (counts[s.activityId] ?? 0) + 1;
  });
  const favouriteId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const favourite = favouriteId ? getActivity(favouriteId) : undefined;

  // Streak = consecutive days (ending today) with at least one session.
  const days = new Set(sessions.map((s) => new Date(s.createdAt).toDateString()));
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  // Chart: last 7 days of minutes.
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const minutes = sessions
      .filter((s) => new Date(s.createdAt).toDateString() === d.toDateString())
      .reduce((sum, s) => sum + s.minutes, 0);
    return { day: d.toLocaleDateString(undefined, { weekday: "short" }), minutes };
  });

  if (!hydrated) {
    return (
      <PageShell title="Your breaks 📈">
        <p className="text-sm text-muted-foreground">Loading your stats…</p>
      </PageShell>
    );
  }

  if (sessions.length === 0) {
    return (
      <PageShell title="Your breaks 📈" subtitle="Nothing logged yet — and that's completely fine.">
        <div className="glass rounded-3xl p-10 text-center">
          <p className="text-muted-foreground">Finish one activity and it'll show up here.</p>
          <Link
            to="/activities"
            className="mt-5 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Find a break
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Your breaks 📈"
      subtitle={`You've taken ${weekMinutes} minutes of intentional breaks this week. ⚡`}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Activities completed" value={String(sessions.length)} emoji="✅" />
        <StatCard label="Total break time" value={`${totalMinutes} min`} emoji="⏳" />
        <StatCard label="Current streak" value={`${streak} day${streak === 1 ? "" : "s"}`} emoji="🔥" />
        <StatCard
          label="Favourite activity"
          value={favourite ? `${favourite.emoji} ${favourite.title}` : "—"}
          emoji="💚"
        />
      </div>

      <section className="glass mt-6 rounded-3xl p-6">
        <h2 className="text-xl font-bold">This week</h2>
        <div className="mt-4 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--muted-foreground)" tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: "var(--secondary)" }}
                contentStyle={{
                  background: "var(--popover)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--popover-foreground)",
                }}
              />
              <Bar dataKey="minutes" fill="var(--neon)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="glass mt-6 rounded-3xl p-6">
        <h2 className="text-xl font-bold">Recent moods</h2>
        {moodEntries.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No mood check-ins yet.{" "}
            <Link to="/mood" className="font-semibold text-neon">
              Try one
            </Link>
            .
          </p>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-2">
            {moodEntries.slice(0, 12).map((e) => {
              const mood = MOODS.find((m) => m.id === e.moodId);
              return (
                <li key={e.id} className="rounded-full bg-secondary px-4 py-2 text-sm">
                  {mood?.emoji} {mood?.label}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        This isn't a productivity scoreboard. Healthy breaks &gt; endless scrolling. 💚
      </p>
    </PageShell>
  );
}

function StatCard({ label, value, emoji }: { label: string; value: string; emoji: string }) {
  return (
    <div className="glass rounded-3xl p-5">
      <div className="text-2xl">{emoji}</div>
      <p className="mt-2 text-xl font-bold">{value}</p>
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
