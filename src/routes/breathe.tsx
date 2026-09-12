import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useVibeStore } from "@/stores/useVibeStore";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/breathe")({
  head: () => ({
    meta: [
      { title: "Breathing exercise — VibeReset" },
      { name: "description", content: "Follow the circle: breathe in, hold, breathe out. 1, 2 or 5 minutes." },
      { property: "og:title", content: "Breathing exercise — VibeReset" },
      { property: "og:description", content: "A guided breathing circle for a mini brain reboot." },
    ],
  }),
  component: BreathePage,
});

type Phase = { label: string; seconds: number; scale: string };

// One full breath cycle = 4s in, 4s hold, 6s out.
const PHASES: Phase[] = [
  { label: "Breathe in", seconds: 4, scale: "scale-100" },
  { label: "Hold", seconds: 4, scale: "scale-100" },
  { label: "Breathe out", seconds: 6, scale: "scale-50" },
];

function BreathePage() {
  const completeActivity = useVibeStore((s) => s.completeActivity);
  const [minutes, setMinutes] = useState(2);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseLeft, setPhaseLeft] = useState(PHASES[0]!.seconds);
  // A ref keeps the chosen length available inside the interval callback.
  const chosenMinutes = useRef(minutes);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => {
      // 1) Count down the whole session.
      setSecondsLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          setDone(true);
          completeActivity("breathing", chosenMinutes.current);
          return 0;
        }
        return s - 1;
      });

      // 2) Count down the current phase, moving to the next when it hits zero.
      setPhaseLeft((p) => {
        if (p > 1) return p - 1;
        let nextIndex = 0;
        setPhaseIndex((i) => {
          nextIndex = (i + 1) % PHASES.length;
          return nextIndex;
        });
        return PHASES[nextIndex]!.seconds;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running, completeActivity]);

  function start(mins: number) {
    chosenMinutes.current = mins;
    setMinutes(mins);
    setSecondsLeft(mins * 60);
    setPhaseIndex(0);
    setPhaseLeft(PHASES[0]!.seconds);
    setDone(false);
    setRunning(true);
  }

  const phase = PHASES[phaseIndex] ?? PHASES[0]!;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <PageShell title="Breathe 🫁" subtitle="Follow the circle. That's the whole thing.">
      <div className="flex flex-col items-center">
        <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
          <div
            className={`absolute inset-0 rounded-full bg-neon/20 blur-2xl transition-transform ease-in-out ${
              running ? phase.scale : "scale-75"
            }`}
            style={{ transitionDuration: `${phase.seconds}s` }}
          />
          <div
            className={`absolute inset-4 rounded-full border-2 border-neon/60 bg-card/40 backdrop-blur transition-transform ease-in-out ${
              running ? phase.scale : "scale-75"
            }`}
            style={{ transitionDuration: `${phase.seconds}s` }}
          />
          <div className="relative text-center">
            <p className="font-display text-2xl font-bold">{running ? phase.label : "Ready?"}</p>
            <p className="mt-1 text-4xl font-bold text-gradient">
              {mm}:{ss}
            </p>
            {running && <p className="mt-1 text-xs text-muted-foreground">{phaseLeft}s</p>}
          </div>
        </div>

        {done && (
          <div className="glass mt-8 max-w-md rounded-3xl p-6 text-center">
            <p className="text-lg font-semibold">Nice. Your brain just got a mini reboot. 🔄🧠</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {minutes} minute{minutes > 1 ? "s" : ""} logged to your progress.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Link
                to="/activities"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Another activity
              </Link>
              <Link
                to="/progress"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                See my progress
              </Link>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[1, 2, 5].map((m) => (
            <button
              key={m}
              onClick={() => start(m)}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:glow"
            >
              {m} minute{m > 1 ? "s" : ""}
            </button>
          ))}
          {running && (
            <button
              onClick={() => setRunning(false)}
              className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-secondary"
            >
              Stop
            </button>
          )}
        </div>
      </div>
    </PageShell>
  );
}
