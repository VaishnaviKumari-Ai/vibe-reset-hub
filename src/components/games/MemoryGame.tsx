import { useState } from "react";

const EMOJIS = ["🍉", "🌈", "🎧", "🪩", "🚀", "🐸"];

type Card = { id: number; emoji: string; flipped: boolean; matched: boolean };

function buildDeck(): Card[] {
  return [...EMOJIS, ...EMOJIS]
    .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }))
    .sort(() => Math.random() - 0.5);
}

/** Classic match-the-pairs game. Nothing to lose, no timer pressure. */
export function MemoryGame({ onWin }: { onWin: () => void }) {
  const [deck, setDeck] = useState<Card[]>(buildDeck);
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const won = deck.length > 0 && deck.every((c) => c.matched);

  function flip(index: number) {
    const card = deck[index];
    if (!card || card.matched || picked.includes(index) || picked.length === 2) return;

    const next = [...picked, index];
    setDeck((d) => d.map((c, i) => (i === index ? { ...c, flipped: true } : c)));
    setPicked(next);

    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next as [number, number];
      const match = deck[a]?.emoji === deck[b]?.emoji;

      setTimeout(() => {
        setDeck((d) => {
          const updated = d.map((c, i) =>
            i === a || i === b ? { ...c, matched: match, flipped: match } : c,
          );
          if (match && updated.every((c) => c.matched)) onWin();
          return updated;
        });
        setPicked([]);
      }, 650);
    }
  }

  function restart() {
    setDeck(buildDeck());
    setPicked([]);
    setMoves(0);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Moves: {moves}</p>
        <button onClick={restart} className="rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary">
          Shuffle
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {deck.map((card, i) => (
          <button
            key={card.id}
            onClick={() => flip(i)}
            aria-label={card.flipped || card.matched ? card.emoji : "Hidden card"}
            className={`flex aspect-square items-center justify-center rounded-2xl text-3xl transition-transform hover:-translate-y-0.5 ${
              card.flipped || card.matched ? "bg-secondary" : "bg-card/60 border border-border"
            }`}
          >
            {card.flipped || card.matched ? card.emoji : "❔"}
          </button>
        ))}
      </div>

      {won && <p className="mt-5 text-center text-lg font-semibold">All matched in {moves} moves! 🎉</p>}
    </div>
  );
}
