import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { Trophy, Calendar } from "lucide-react";
export const Route = createFileRoute("/dashboard/goals")({
  component: GoalsPage,
  head: () => ({ meta: [{ title: "Goals — FocusFlow" }] }),
});
const goals = [
  {
    n: "Launch FocusFlow v2",
    p: 78,
    due: "Jul 2026",
    desc: "Ship the redesigned product to 1M+ users.",
    color: "oklch(0.72 0.22 295)",
  },
  {
    n: "Read 24 books",
    p: 54,
    due: "Dec 2026",
    desc: "13 of 24 done. Currently reading: Shape Up.",
    color: "oklch(0.7 0.21 250)",
  },
  {
    n: "Run 500km",
    p: 42,
    due: "Dec 2026",
    desc: "210km of 500km. Avg pace 5:24/km.",
    color: "oklch(0.85 0.16 200)",
  },
  {
    n: "Learn Rust",
    p: 28,
    due: "Sep 2026",
    desc: "Working through The Rust Book + Rustlings.",
    color: "oklch(0.75 0.24 350)",
  },
];
function GoalsPage() {
  return (
    <>
      <TopBar title="Goals" subtitle="Yearly intentions, daily progress." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {goals.map((g, i) => (
          <div
            key={g.n}
            className="glass rounded-2xl p-6 hover-lift animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-3 w-3" /> Due {g.due}
                </p>
                <h3 className="font-display text-2xl mt-1">{g.n}</h3>
              </div>
              <Trophy className="h-5 w-5 text-neon-cyan" />
            </div>
            <p className="text-sm text-muted-foreground">{g.desc}</p>
            <div className="mt-5">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Progress</span>
                <span className="text-gradient font-display text-lg tabular-nums">{g.p}%</span>
              </div>
              <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full relative"
                  style={{
                    width: `${g.p}%`,
                    background: `linear-gradient(90deg,${g.color},oklch(0.85 0.16 200))`,
                    boxShadow: `0 0 14px ${g.color}`,
                  }}
                >
                  <div className="absolute inset-0 shimmer rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
