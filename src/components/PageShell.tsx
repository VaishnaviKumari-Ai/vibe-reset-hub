import type { ReactNode } from "react";

/** Standard page wrapper: centered width, spacing, room for mobile bottom nav. */
export function PageShell({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-8 md:pb-16 md:pt-12">
      {title && (
        <header className="mb-8">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
        </header>
      )}
      {children}
    </main>
  );
}
