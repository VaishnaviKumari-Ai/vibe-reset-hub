import { createFileRoute, Link } from "@tanstack/react-router";
import { ACTIVITIES, CATEGORIES } from "@/lib/vibe-data";
import { ActivityCard } from "@/components/ActivityCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VibeReset ⚡ Your brain called. It needs a break." },
      {
        name: "description",
        content:
          "VibeReset gives you short, playful breaks — breathing, mini games, doodles and calm sounds — instead of endless scrolling.",
      },
      { property: "og:title", content: "VibeReset ⚡ Your brain called. It needs a break." },
      {
        property: "og:description",
        content: "Reset your mind, recharge your energy, and get back to what matters.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { emoji: "⏱️", title: "Two minutes is enough", text: "Every activity is short on purpose. No streak guilt." },
  { emoji: "🎯", title: "Matched to your mood", text: "Tell us the vibe, we pick the break." },
  { emoji: "🔕", title: "No doomscrolling", text: "Do something, then go back to your life." },
];

const STEPS = [
  { n: "01", title: "Check your vibe", text: "Pick the emoji that matches your head right now." },
  { n: "02", title: "Get a break", text: "We suggest 3–4 tiny activities that actually fit." },
  { n: "03", title: "Come back better", text: "Log it, see your breaks add up, carry on." },
];

const BENEFITS = [
  "Less screen burnout",
  "Easier focus after breaks",
  "A calmer nervous system",
  "Something fun that isn't a feed",
];

function Landing() {
  const popular = ["breathing", "memory", "brain-dump", "doodle"]
    .map((id) => ACTIVITIES.find((a) => a.id === id)!)
    .filter(Boolean);

  return (
    <main className="pb-28 md:pb-0">
      {/* Hero */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-4 pt-16 text-center md:pt-24">
        <span className="glass rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Take a break. Reset your mind. Come back better.
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          Your brain called.
          <br />
          It needs a break. <span className="text-gradient">🧠✨</span>
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          Reset your mind, recharge your energy, and get back to what matters.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/mood"
            className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:glow"
          >
            Reset My Mind
          </Link>
          <Link
            to="/activities"
            className="rounded-full border border-border bg-card/60 px-8 py-4 text-base font-semibold backdrop-blur transition-transform hover:-translate-y-0.5"
          >
            Explore Activities
          </Link>
        </div>
        <p className="mt-6 max-w-lg text-sm text-muted-foreground">
          Studying, deadlines, code that won't compile, six hours of screens — VibeReset is a small
          door out of that, for two minutes at a time.
        </p>
      </section>

      {/* Feature cards */}
      <section className="mx-auto mt-20 grid max-w-5xl gap-4 px-4 sm:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="glass rounded-3xl p-6 transition-transform hover:-translate-y-1">
            <div className="text-3xl">{f.emoji}</div>
            <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="mx-auto mt-24 max-w-5xl px-4">
        <h2 className="text-center text-3xl font-bold">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="glass rounded-3xl p-6">
              <span className="font-display text-4xl font-bold text-gradient">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular activities */}
      <section className="mx-auto mt-24 max-w-5xl px-4">
        <h2 className="text-3xl font-bold">Popular right now</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/activities"
              className="rounded-full border border-border bg-card/50 px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
            >
              {c.emoji} {c.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto mt-24 max-w-5xl px-4">
        <div className="glass rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold">Why bother with breaks?</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-muted-foreground">
                <span className="h-2 w-2 shrink-0 rounded-full bg-neon" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto mt-24 max-w-3xl px-4 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Two minutes. That's the whole ask.</h2>
        <Link
          to="/mood"
          className="mt-8 inline-block rounded-full bg-primary px-10 py-4 text-base font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 hover:glow"
        >
          Start my reset
        </Link>
      </section>

      <footer className="mt-24 border-t border-border/60 px-4 py-10 text-center text-sm text-muted-foreground">
        <p className="font-display text-lg font-bold text-foreground">VibeReset ⚡</p>
        <p className="mt-2">Take a break. Reset your mind. Come back better.</p>
        <p className="mx-auto mt-4 max-w-xl text-xs">
          VibeReset is a wellness and relaxation tool. It is not medical advice and not a
          replacement for professional mental-health care.
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <Link to="/about" className="hover:text-foreground">
            About
          </Link>
          <Link to="/activities" className="hover:text-foreground">
            Activities
          </Link>
          <Link to="/progress" className="hover:text-foreground">
            Progress
          </Link>
        </div>
      </footer>
    </main>
  );
}
