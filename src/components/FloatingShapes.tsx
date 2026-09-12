/** Decorative neon blobs that float in the background. Purely visual. */
export function FloatingShapes() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-neon/20 blur-3xl animate-float" />
      <div
        className="absolute right-[-6rem] top-1/4 h-80 w-80 rounded-full bg-grape/25 blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-hotpink/20 blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-56 w-56 rounded-full bg-cyan/20 blur-3xl animate-float"
        style={{ animationDelay: "4.5s" }}
      />
    </div>
  );
}
