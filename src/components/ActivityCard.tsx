import { Link } from "@tanstack/react-router";
import type { Activity } from "@/lib/vibe-data";

/** One activity tile. Used on the dashboard and in mood recommendations. */
export function ActivityCard({ activity }: { activity: Activity }) {
  const content = (
    <div className="glass group h-full rounded-3xl p-5 transition-transform duration-200 hover:-translate-y-1 hover:glow">
      <div className="mb-3 text-3xl">{activity.emoji}</div>
      <h3 className="text-base font-semibold">{activity.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{activity.description}</p>
      <span className="mt-4 inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-muted-foreground">
        {activity.minutes} min
      </span>
    </div>
  );

  if (!activity.href) return content;

  return (
    <Link to={activity.href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-3xl">
      {content}
    </Link>
  );
}
