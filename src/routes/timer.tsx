import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useVibeStore } from "@/stores/useVibeStore";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/timer")({
  head: () => ({
    meta: [
      { title: "Relaxation timer — VibeReset" },
      { name: "description", content: "A calm, customisable break timer: 1, 2, 5, 10 minutes or your own." },
      { property: "og:title", content: "Relaxation timer — VibeReset" },
      { property: "og:description", content: "Set a timer, do nothing, feel better." },
    ],
  }),
  component: TimerPage,
});

function TimerPage() {
  const completeActivity = useVibeStore((s) => s.completeActivity);
  const [total, setTotal] = useState(0); // seconds for the current session
  const [left, setLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [custom, setCustom] = useState("3");

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          setDone(true);
          completeActivity("relax-timer", Math.max(1, Math.round(total / 60)));
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, total, completeActivity]);

  function start(minutes: number) {
    if (!Number.isFinite(minutes) || minutes <= 0) return;
    const seconds = Math.round(minutes * 60);
    setTotal(seconds);
    setLeft(seconds);
    setDone(false);
    setRunning(true);
  }

  const progress = total > 0 ? ((total - left) / total) * 100 : 0;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <PageShell title="Relaxation timer ⏳" subtitle="Pick a length. Then genuinely do nothing.">
      <div className="flex flex-col items-center">
        <div className="glass relative flex h-64 w-64 items-center justify-center rounded-full">
          <div
            className="absolute inset-0 rounded-full transition-all duration-500"
            style={{
              background: `conic-gradient(var(--neon) ${progress}%, transparent ${progress}%)`,
              opacity: 0.35,
            }}
          />
          <div className="relative text-center">
            <p className="text-5xl font-bold text-gradient">
              {mm}:{ss}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {running ? "Breathe easy…" : done ? "All done" : "Not started"}
            </p>
          </div>
        </div>

        {done && (
          <div className="glass mt-8 max-w-md rounded-3xl p-6 text-center">
            <p className="text-lg font-semibold">Break complete! Go easy on yourself. 💚</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link to="/activities" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Another activity
              </Link>
              <Link to="/progress" className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary">
                See my progress
              </Link>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[1, 2, 5, 10].map((m) => (
            <button
              key={m}
              onClick={() => start(m)}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              {m} min
            </button>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-2">
          <label htmlFor="custom" className="text-sm text-muted-foreground">
            Custom
          </label>
          <input
            id="custom"
            type="number"
            min={1}
            max={60}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-20 rounded-full border border-input bg-background/60 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            onClick={() => start(Number(custom))}
            className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-secondary"
          >
            Start
          </button>
          {running && (
            <button
              onClick={() => setRunning(false)}
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:bg-secondary"
            >
              Pause
            </button>
          )}
        </div>
      </div>
    </PageShell>
  );
}
