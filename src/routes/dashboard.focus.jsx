import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { Play, Pause, SkipForward, Music2, Volume2, Wind, Waves, Coffee } from "lucide-react";
export const Route = createFileRoute("/dashboard/focus")({
  component: FocusPage,
  head: () => ({ meta: [{ title: "Focus — FocusFlow" }] }),
});
function FocusPage() {
  return (
    <>
      <TopBar title="Focus Mode" subtitle="Enter the deep work zone." />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 relative overflow-hidden glass-strong rounded-3xl p-10 md:p-16 text-center neon-border animate-fade-up">
          <div className="absolute inset-0 bg-aurora opacity-20 blur-3xl" />
          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Currently focusing on
            </p>
            <h2 className="font-display text-3xl mt-3">Design system v2 — Components</h2>
            <div className="my-12 relative inline-block">
              <svg width="280" height="280" className="-rotate-90">
                <defs>
                  <linearGradient id="bigRing" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.22 295)" />
                    <stop offset="100%" stopColor="oklch(0.85 0.16 200)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="140"
                  cy="140"
                  r="125"
                  stroke="oklch(1 0 0 / 0.05)"
                  strokeWidth="14"
                  fill="none"
                />
                <circle
                  cx="140"
                  cy="140"
                  r="125"
                  stroke="url(#bigRing)"
                  strokeWidth="14"
                  fill="none"
                  strokeDasharray="785"
                  strokeDashoffset="280"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 20px oklch(0.72 0.22 295 / 0.7))" }}
                />
              </svg>
              <div className="absolute inset-0 grid place-items-center">
                <div>
                  <p className="font-display text-7xl font-semibold tabular-nums text-gradient">
                    24:18
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">
                    Session 2 of 4
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <button className="glass h-14 w-14 rounded-full grid place-items-center hover:border-white/20 transition">
                <Pause className="h-5 w-5" />
              </button>
              <button className="bg-aurora h-20 w-20 rounded-full grid place-items-center text-background glow-ring hover:scale-110 transition animate-pulse-glow">
                <Play className="h-7 w-7 ml-1" />
              </button>
              <button className="glass h-14 w-14 rounded-full grid place-items-center hover:border-white/20 transition">
                <SkipForward className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-5">
          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Ambient sounds
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                { i: Wind, n: "Forest" },
                { i: Waves, n: "Ocean" },
                { i: Coffee, n: "Cafe" },
                { i: Music2, n: "Lo-fi" },
              ].map(({ i: Icon, n }) => (
                <button
                  key={n}
                  className="glass rounded-xl p-3 flex flex-col items-center gap-1.5 hover:border-white/20 hover:scale-105 transition"
                >
                  <Icon className="h-5 w-5 text-neon-cyan" />
                  <span className="text-xs">{n}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Volume</p>
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-aurora rounded-full" />
            </div>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Today's deep work
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl text-gradient">3h 42m</span>
              <span className="text-xs text-emerald-400">+22%</span>
            </div>
            <div className="mt-3 grid grid-cols-12 gap-0.5">
              {Array(48)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-3 rounded-sm"
                    style={{ background: `oklch(0.72 0.22 295 / ${(((i * 37) % 85) + 10) / 100})` }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
