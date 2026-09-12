import { useEffect, useState } from "react";

/** How many taps in 10 seconds? Pure silly energy release. */
export function TapChallenge({ onFinish }: { onFinish: () => void }) {
  const [taps, setTaps] = useState(0);
  const [left, setLeft] = useState(10);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          setRunning(false);
          setBest((b) => Math.max(b, taps));
          onFinish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, taps, onFinish]);

  function start() {
    setTaps(0);
    setLeft(10);
    setRunning(true);
  }

  return (
    <div className="text-center">
      <p className="text-sm text-muted-foreground">Time left: {left}s</p>
      <p className="mt-2 text-6xl font-bold text-gradient">{taps}</p>

      <button
        onClick={() => (running ? setTaps((t) => t + 1) : start())}
        className="mt-6 h-40 w-40 rounded-full bg-primary text-lg font-bold text-primary-foreground transition-transform active:scale-95 hover:glow"
      >
        {running ? "TAP!" : "Start"}
      </button>

      {best > 0 && <p className="mt-5 text-sm text-muted-foreground">Best: {best} taps</p>}
    </div>
  );
}
