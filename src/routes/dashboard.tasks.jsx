import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { Plus, Flag, Calendar, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/dashboard/tasks")({
  component: TasksPage,
  head: () => ({ meta: [{ title: "Tasks — FocusFlow" }] }),
});

const columns = [
  {
    name: "Backlog",
    color: "oklch(0.68 0.03 270)",
    tasks: [
      { t: "Refactor onboarding flow", p: "low", tag: "Engineering" },
      { t: "User research interviews", p: "med", tag: "Product" },
      { t: "Brand guideline doc", p: "low", tag: "Design" },
    ],
  },
  {
    name: "In Progress",
    color: "oklch(0.7 0.21 250)",
    tasks: [
      { t: "Ship FocusFlow v2 design system", p: "high", tag: "Design" },
      { t: "Q2 roadmap review", p: "high", tag: "Strategy" },
    ],
  },
  {
    name: "In Review",
    color: "oklch(0.85 0.16 200)",
    tasks: [{ t: "Marketing site copy", p: "med", tag: "Marketing" }],
  },
  {
    name: "Done",
    color: "oklch(0.65 0.2 145)",
    tasks: [
      { t: "Onboarding email sequence", p: "med", tag: "Growth" },
      { t: "Investor update Q1", p: "high", tag: "Ops" },
      { t: "Pricing experiment results", p: "low", tag: "Product" },
    ],
  },
];

export default function TasksPage() {
  return (
    <>
      <TopBar title="Tasks" subtitle="Drag, drop, dominate." />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {columns.map((col) => (
          <div key={col.name} className="glass rounded-2xl p-4 min-h-[400px] animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: col.color, boxShadow: `0 0 8px ${col.color}` }}
                />
                <h3 className="font-medium text-sm">{col.name}</h3>
                <span className="text-xs text-muted-foreground bg-white/5 px-1.5 rounded">
                  {col.tasks.length}
                </span>
              </div>
              <button className="text-muted-foreground hover:text-foreground">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2.5">
              {col.tasks.map((t, i) => (
                <div
                  key={i}
                  className="glass rounded-xl p-3.5 hover-lift cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm leading-snug">{t.t}</p>
                    <button className="text-muted-foreground">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {t.tag}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <Flag
                        className={`h-3 w-3 ${t.p === "high" ? "text-neon-pink" : t.p === "med" ? "text-neon-cyan" : ""}`}
                      />
                      <Calendar className="h-3 w-3" /> May 12
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
