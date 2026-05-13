import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  Target,
  StickyNote,
  BarChart3,
  Calendar,
  Sparkles,
  Flame,
  Users,
  Lightbulb,
  Settings,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { Logo } from "./Logo";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/dashboard/tasks", label: "Tasks", icon: CheckSquare },
  { to: "/dashboard/focus", label: "Focus", icon: Timer },
  { to: "/dashboard/goals", label: "Goals", icon: Target },
  { to: "/dashboard/notes", label: "Notes", icon: StickyNote },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/calendar", label: "Calendar", icon: Calendar },
  { to: "/dashboard/ai", label: "AI Assistant", icon: Sparkles },
  { to: "/dashboard/habits", label: "Habits", icon: Flame },
  { to: "/dashboard/community", label: "Community", icon: Users },
  { to: "/dashboard/insights", label: "Insights", icon: Lightbulb },
];

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { LogoutModal } from "../auth/LogoutModal";
import { motion } from "framer-motion";

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "U";

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 flex-col p-4 z-40">
        <div className="glass-strong rounded-3xl flex-1 flex flex-col p-4">
          <div className="px-2 py-3">
            <Logo />
          </div>

          {/* Profile mini card */}
          <div className="mt-2 mb-4 glass rounded-2xl p-3 hover-lift">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-aurora grid place-items-center text-sm font-semibold text-background">
                  {initials}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-card animate-pulse-glow" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{user?.name || "User"}</p>
                <p className="text-[11px] text-muted-foreground">Lvl 12 · 47-day streak 🔥</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-aurora rounded-full" style={{ width: "68%" }} />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto -mx-1 px-1 space-y-0.5">
            {items.map((item) => {
              const active = path === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-black/5"
                    }`}
                >
                  {active && <span className="absolute inset-0 rounded-xl bg-aurora opacity-20" />}
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-aurora" />
                  )}
                  <Icon
                    className={`h-[18px] w-[18px] relative z-10 transition-transform group-hover:scale-110 ${active ? "text-primary" : ""}`}
                  />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-3 pt-3 border-t border-border space-y-0.5">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 transition text-left cursor-pointer"
            >
              <motion.div
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.4 }}
              >
                {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </motion.div>
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <Link
              to="/dashboard/settings"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-black/5 transition"
            >
              <Settings className="h-[18px] w-[18px]" /> Settings
            </Link>
            <button
              onClick={() => setLogoutOpen(true)}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-red-500 hover:bg-red-500/5 transition text-left cursor-pointer"
            >
              <LogOut className="h-[18px] w-[18px]" /> Logout
            </button>
          </div>
        </div>
      </aside>

      <LogoutModal open={logoutOpen} setOpen={setLogoutOpen} />
    </>
  );
}

