import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { Flame, Plus } from "lucide-react";
export const Route = createFileRoute("/dashboard/habits")({
  component: HabitsPage,
  head: () => ({ meta: [{ title: "Habits — FocusFlow" }] }),
});
const habits = [
  {
    n: "Meditate",
    streak: 47,
    goal: "10 min daily",
    days: Array.from({ length: 30 }, (_, i) => ((i * 7 + 3) % 10 > 2 ? 1 : 0)),
  },
  {
    n: "Workout",
    streak: 12,
    goal: "5x weekly",
    days: Array.from({ length: 30 }, (_, i) => ((i * 5 + 1) % 10 > 3 ? 1 : 0)),
  },
  {
    n: "Read",
    streak: 23,
    goal: "30 pages",
    days: Array.from({ length: 30 }, (_, i) => ((i * 3 + 5) % 10 > 2 ? 1 : 0)),
  },
  {
    n: "Cold shower",
    streak: 8,
    goal: "Every morning",
    days: Array.from({ length: 30 }, (_, i) => ((i * 11 + 2) % 10 > 4 ? 1 : 0)),
  },
  {
    n: "Journal",
    streak: 34,
    goal: "Before bed",
    days: Array.from({ length: 30 }, (_, i) => ((i * 7 + 9) % 10 > 2 ? 1 : 0)),
  },
];
function HabitsPage() {
  return (
    <>
      <TopBar title="Habits" subtitle="Small actions, compounding lives." />
      <div className="space-y-4">
        {habits.map((h, i) => (
          <div
            key={h.n}
            className="glass rounded-2xl p-5 hover-lift animate-fade-up flex flex-col md:flex-row md:items-center gap-5"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-center gap-4 md:w-64">
              <div className="h-12 w-12 rounded-xl bg-aurora grid place-items-center glow-ring">
                <Flame className="h-5 w-5 text-background" />
              </div>
              <div>
                <p className="font-medium">{h.n}</p>
                <p className="text-xs text-muted-foreground">{h.goal}</p>
              </div>
            </div>
            <div
              className="flex-1 grid gap-1"
              style={{ gridTemplateColumns: "repeat(30, minmax(0, 1fr))" }}
            >
              {h.days.map((d, j) => (
                <div
                  key={j}
                  className="aspect-square rounded-sm"
                  style={{
                    background: d ? "oklch(0.72 0.22 295)" : "oklch(1 0 0 / 0.05)",
                    boxShadow: d ? "0 0 6px oklch(0.72 0.22 295 / 0.5)" : "none",
                  }}
                />
              ))}
            </div>
            <div className="md:w-24 text-right">
              <p className="font-display text-2xl text-gradient">{h.streak}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                day streak
              </p>
            </div>
          </div>
        ))}
        <button className="glass rounded-2xl p-5 w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-white/20 transition border-dashed">
          <Plus className="h-4 w-4" /> Add habit
        </button>
      </div>
    </>
  );
}
