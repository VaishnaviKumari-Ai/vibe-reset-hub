import { useEffect, useState } from "react";

/**
 * Saved data lives in the browser, which the server can't read.
 * This hook tells a component when it is safe to show that data
 * (after the page has loaded in the browser) so server and browser
 * render the same thing first.
 */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
