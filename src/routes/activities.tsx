import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ACTIVITIES, CATEGORIES, type CategoryId } from "@/lib/vibe-data";
import { ActivityCard } from "@/components/ActivityCard";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activity dashboard — VibeReset" },
      {
        name: "description",
        content: "Calm, Play, Create, Vibe, Reset and Energy breaks — all under five minutes.",
      },
      { property: "og:title", content: "Activity dashboard — VibeReset" },
      { property: "og:description", content: "Pick a category and take a tiny break." },
    ],
  }),
  component: ActivitiesPage,
});

function ActivitiesPage() {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const visible = filter === "all" ? ACTIVITIES : ACTIVITIES.filter((a) => a.category === filter);

  return (
    <PageShell title="Pick your break ✨" subtitle="Six categories. Nothing takes longer than five minutes.">
      <div className="flex flex-wrap gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")} label="✨ All" />
        {CATEGORIES.map((c) => (
          <FilterChip
            key={c.id}
            active={filter === c.id}
            onClick={() => setFilter(c.id)}
            label={`${c.emoji} ${c.label}`}
          />
        ))}
      </div>

      {filter === "all" ? (
        <div className="mt-10 space-y-12">
          {CATEGORIES.map((c) => (
            <section key={c.id}>
              <h2 className="text-2xl font-bold">
                {c.emoji} {c.label}
              </h2>
              <p className="text-sm text-muted-foreground">{c.blurb}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {ACTIVITIES.filter((a) => a.category === c.id).map((a) => (
                  <ActivityCard key={a.id} activity={a} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((a) => (
            <ActivityCard key={a.id} activity={a} />
          ))}
        </div>
      )}
    </PageShell>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "bg-primary text-primary-foreground" : "border border-border bg-card/50 text-muted-foreground hover:bg-secondary"
      }`}
    >
      {label}
    </button>
  );
}
