export function Blobs({ variant = "default" }) {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="blob absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.1 60 / 0.5), transparent 70%)" }}
      />
      <div
        className="blob absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.15 260 / 0.25), transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="blob absolute -bottom-40 left-1/4 h-[450px] w-[450px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.75 0.16 50 / 0.3), transparent 70%)", animationDelay: "-12s" }}
      />
    </div>
  );
}
