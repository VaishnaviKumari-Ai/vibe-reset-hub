/**
 * Responsive navigation.
 * - Desktop/tablet: top bar with links.
 * - Mobile: compact top logo + fixed bottom navigation (thumb friendly).
 */
import { Link } from "@tanstack/react-router";
import { Home, Sparkles, Smile, NotebookPen, BarChart3 } from "lucide-react";

const LINKS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/activities", label: "Activities", icon: Sparkles },
  { to: "/mood", label: "Mood", icon: Smile },
  { to: "/journal", label: "Journal", icon: NotebookPen },
  { to: "/progress", label: "Progress", icon: BarChart3 },
] as const;

export function NavBar() {
  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="font-display text-xl font-bold tracking-tight">
            Vibe<span className="text-gradient">Reset</span> ⚡
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-secondary text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/70 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/about"
              activeProps={{ className: "bg-secondary text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/70 hover:text-foreground"
            >
              About
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden">
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1">
          {LINKS.map((l) => (
            <li key={l.to} className="flex-1">
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-neon" }}
                inactiveProps={{ className: "text-muted-foreground" }}
                className="flex flex-col items-center gap-1 rounded-xl px-1 py-2 text-[11px] font-medium"
                aria-label={l.label}
              >
                <l.icon className="h-5 w-5" />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
