import { useState } from "react";

const CHOICES = ["✊", "✋", "✌️"] as const;
type Choice = (typeof CHOICES)[number];

/** Beats map: key beats value. */
const BEATS: Record<Choice, Choice> = { "✊": "✌️", "✋": "✊", "✌️": "✋" };

export function RockPaperScissors({ onPlay }: { onPlay: () => void }) {
  const [you, setYou] = useState<Choice | null>(null);
  const [cpu, setCpu] = useState<Choice | null>(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  function play(choice: Choice) {
    const bot = CHOICES[Math.floor(Math.random() * CHOICES.length)]!;
    setYou(choice);
    setCpu(bot);
    setScore((s) =>
      choice === bot
        ? { ...s, draw: s.draw + 1 }
        : BEATS[choice] === bot
          ? { ...s, win: s.win + 1 }
          : { ...s, lose: s.lose + 1 },
    );
    onPlay();
  }

  const result = !you || !cpu ? "" : you === cpu ? "Draw 🤝" : BEATS[you] === cpu ? "You win! 🎉" : "Computer wins 🤖";

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-8 text-6xl">
        <span>{you ?? "❔"}</span>
        <span className="text-base text-muted-foreground">vs</span>
        <span>{cpu ?? "❔"}</span>
      </div>
      <p className="mt-4 text-lg font-semibold">{result || "Pick your move"}</p>

      <div className="mt-6 flex justify-center gap-3">
        {CHOICES.map((c) => (
          <button
            key={c}
            onClick={() => play(c)}
            aria-label={`Play ${c}`}
            className="rounded-2xl border border-border bg-card/60 px-6 py-4 text-3xl transition-transform hover:-translate-y-1"
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted-foreground">
        Wins {score.win} · Losses {score.lose} · Draws {score.draw}
      </p>
    </div>
  );
}
