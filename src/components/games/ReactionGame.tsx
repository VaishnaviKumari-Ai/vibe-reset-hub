import { useEffect, useRef, useState } from "react";

type Status = "idle" | "waiting" | "go" | "result" | "tooSoon";

/** Click as soon as the panel turns green. Measures reaction time in ms. */
export function ReactionGame({ onFinish }: { onFinish: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [time, setTime] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const startedAt = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Always clear pending timeouts when leaving the page.
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);

  function start() {
    setStatus("waiting");
    timeout.current = setTimeout(
      () => {
        startedAt.current = Date.now();
        setStatus("go");
      },
      1200 + Math.random() * 2500,
    );
  }

  function click() {
    if (status === "idle" || status === "result" || status === "tooSoon") return start();
    if (status === "waiting") {
      if (timeout.current) clearTimeout(timeout.current);
      setStatus("tooSoon");
      return;
    }
    const ms = Date.now() - startedAt.current;
    setTime(ms);
    setBest((b) => (b === null || ms < b ? ms : b));
    setStatus("result");
    onFinish();
  }

  const text =
    status === "idle"
      ? "Click to start"
      : status === "waiting"
        ? "Wait for green…"
        : status === "go"
          ? "CLICK!"
          : status === "tooSoon"
            ? "Too soon! Click to retry"
            : `${time} ms — click to go again`;

  return (
    <div>
      <button
        onClick={click}
        className={`flex h-64 w-full items-center justify-center rounded-3xl text-2xl font-bold transition-colors ${
          status === "go" ? "bg-primary text-primary-foreground" : "bg-card/60 border border-border"
        }`}
      >
        {text}
      </button>
      {best !== null && <p className="mt-4 text-center text-sm text-muted-foreground">Best: {best} ms</p>}
    </div>
  );
}
