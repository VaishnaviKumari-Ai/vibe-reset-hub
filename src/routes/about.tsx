import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VibeReset — why intentional breaks matter" },
      {
        name: "description",
        content: "VibeReset exists because people study and work for hours without giving their brains a real break.",
      },
      { property: "og:title", content: "About VibeReset" },
      { property: "og:description", content: "Our mission, philosophy, and why small breaks matter." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell title="About VibeReset ⚡" subtitle="Small breaks, taken on purpose.">
      <div className="grid gap-4 md:grid-cols-2">
        <section className="glass rounded-3xl p-7">
          <h2 className="text-2xl font-bold">Why VibeReset exists</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Most of us study or work for hours and then "rest" by scrolling — which leaves the brain
            just as tired. VibeReset gives you something better to do with five spare minutes:
            breathe, play, doodle, dump your thoughts, or simply sit with a timer.
          </p>
        </section>

        <section className="glass rounded-3xl p-7">
          <h2 className="text-2xl font-bold">Our mission</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Make the healthy break the easy break. Open the app, say how you feel, and get something
            small and doable in return — no sign-up wall, no guilt, no streak shaming.
          </p>
        </section>

        <section className="glass rounded-3xl p-7">
          <h2 className="text-2xl font-bold">How it works</h2>
          <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>1. Check in with your current mood.</li>
            <li>2. Get 3–4 activities matched to that mood.</li>
            <li>3. Do one. It takes 1–5 minutes.</li>
            <li>4. Your breaks quietly add up on the Progress page.</li>
          </ol>
        </section>

        <section className="glass rounded-3xl p-7">
          <h2 className="text-2xl font-bold">Our philosophy</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Healthy breaks &gt; endless scrolling. Rest is not laziness, and progress here is not a
            score to chase. If you close the app feeling slightly lighter, it worked.
          </p>
        </section>
      </div>

      <section className="glass mt-6 rounded-3xl p-7">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Ideas, bugs, or an activity you wish existed? Write to{" "}
          <span className="font-semibold text-foreground">hello@vibereset.app</span> — this is a
          placeholder address, so swap it for your real one.
        </p>
        <Link
          to="/mood"
          className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
        >
          Take a break instead
        </Link>
      </section>

      <p className="mt-8 text-center text-xs text-muted-foreground">
        VibeReset is a wellness and relaxation tool. It is not medical advice and does not replace
        professional mental-health care. If you're struggling, please talk to someone qualified.
      </p>
    </PageShell>
  );
}
