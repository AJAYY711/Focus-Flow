export function AuroraBackground({ subtle = false }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-25 animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.65 0.2 295 / 0.3), transparent 70%)",
        }}
      />

      <div
        className="absolute top-1/3 -right-32 h-[600px] w-[600px] rounded-full blur-3xl opacity-20 animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.62 0.18 250 / 0.3), transparent 70%)",
          animationDelay: "2s",
        }}
      />

      <div
        className="absolute -bottom-40 left-1/3 h-[500px] w-[500px] rounded-full blur-3xl opacity-20 animate-float"
        style={{
          background: "radial-gradient(circle, oklch(0.7 0.2 350 / 0.25), transparent 70%)",
          animationDelay: "4s",
        }}
      />

      {!subtle && (
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      )}
    </div>
  );
}
