import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, CheckSquare, Timer, BarChart3, Sparkles } from "lucide-react";

const items = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Home" },
  { to: "/dashboard/tasks", icon: CheckSquare, label: "Tasks" },
  { to: "/dashboard/focus", icon: Timer, label: "Focus" },
  { to: "/dashboard/analytics", icon: BarChart3, label: "Stats" },
  { to: "/dashboard/ai", icon: Sparkles, label: "AI" },
];

export function MobileNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="glass-strong rounded-2xl px-2 py-2 flex items-center justify-between">
        {items.map((it) => {
          const Icon = it.icon;
          const active = path === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              className="flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-xl relative"
            >
              {active && <span className="absolute inset-1 rounded-xl bg-aurora opacity-25" />}
              <Icon
                className={`h-5 w-5 relative ${active ? "text-primary" : "text-muted-foreground"}`}
              />
              <span
                className={`text-[10px] relative ${active ? "text-primary font-medium" : "text-muted-foreground"}`}
              >
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
