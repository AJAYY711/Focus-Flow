import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { TrendingUp, TrendingDown, Brain, Clock, Target, Zap } from "lucide-react";
export const Route = createFileRoute("/dashboard/analytics")({
  component: Analytics,
  head: () => ({ meta: [{ title: "Analytics — FocusFlow" }] }),
});
function Analytics() {
  const stats = [
    { label: "Productivity", value: "87", delta: "+12%", up: true, icon: Zap },
    { label: "Deep Work", value: "26h", delta: "+8%", up: true, icon: Brain },
    { label: "Goals Done", value: "14", delta: "-3%", up: false, icon: Target },
    { label: "Focus Time", value: "3.2h", delta: "+18%", up: true, icon: Clock },
  ];
  return (
    <>
      <TopBar title="Analytics" subtitle="Patterns of your peak self." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="glass rounded-2xl p-5 hover-lift animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-start justify-between">
              <s.icon className="h-5 w-5 text-neon-violet" />
              <span
                className={`text-xs flex items-center gap-1 ${s.up ? "text-emerald-400" : "text-neon-pink"}`}
              >
                {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {s.delta}
              </span>
            </div>
            <p className="font-display text-4xl mt-4 text-gradient">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Last 30 days
              </p>
              <h3 className="font-display text-lg mt-1">Productivity Trend</h3>
            </div>
            <div className="flex gap-2 text-xs">
              {["7d", "30d", "90d", "All"].map((p, i) => (
                <button
                  key={p}
                  className={`px-3 py-1.5 rounded-lg ${i === 1 ? "bg-aurora text-background" : "glass text-muted-foreground"}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 600 220" className="w-full h-56">
            <defs>
              <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.22 295)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.72 0.22 295)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.72 0.22 295)" />
                <stop offset="100%" stopColor="oklch(0.85 0.16 200)" />
              </linearGradient>
            </defs>
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                x2="600"
                y1={i * 50 + 10}
                y2={i * 50 + 10}
                stroke="oklch(1 0 0 / 0.05)"
              />
            ))}
            <path
              d="M0,170 C50,140 100,160 150,120 C200,80 250,100 300,70 C350,40 400,90 450,50 C500,20 550,60 600,30 L600,220 L0,220 Z"
              fill="url(#area)"
            />
            <path
              d="M0,170 C50,140 100,160 150,120 C200,80 250,100 300,70 C350,40 400,90 450,50 C500,20 550,60 600,30"
              stroke="url(#line)"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>
        <div className="col-span-12 lg:col-span-4 glass rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Time distribution
          </p>
          <h3 className="font-display text-lg mt-1 mb-6">By project</h3>
          <div className="space-y-4">
            {[
              { n: "Design", v: 42, c: "oklch(0.72 0.22 295)" },
              { n: "Engineering", v: 28, c: "oklch(0.7 0.21 250)" },
              { n: "Strategy", v: 18, c: "oklch(0.85 0.16 200)" },
              { n: "Wellness", v: 12, c: "oklch(0.75 0.24 350)" },
            ].map((d) => (
              <div key={d.n}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span>{d.n}</span>
                  <span className="text-muted-foreground">{d.v}h</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${d.v * 2}%`, background: d.c, boxShadow: `0 0 10px ${d.c}` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Focus heatmap
              </p>
              <h3 className="font-display text-lg mt-1">Last 12 weeks</h3>
            </div>
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {Array(84)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm hover:scale-125 transition"
                  style={{ background: `oklch(0.72 0.22 295 / ${(((i * 73) % 80) + 10) / 100})` }}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
