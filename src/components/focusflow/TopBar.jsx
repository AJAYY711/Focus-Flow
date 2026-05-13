import { Search, Bell, Command, Plus } from "lucide-react";

export function TopBar({ title, subtitle }) {
  return (
    <header className="flex items-center justify-between gap-4 mb-8 animate-fade-up">
      <div className="min-w-0">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight truncate">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <div className="hidden md:flex items-center gap-2 glass rounded-xl px-3.5 py-2 w-72 hover:border-primary/30 transition">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search anything…"
            className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground/70"
          />

          <kbd className="hidden lg:flex items-center gap-1 text-[10px] text-muted-foreground border border-border rounded px-1.5 py-0.5">
            <Command className="h-3 w-3" />K
          </kbd>
        </div>
        <button className="glass h-10 w-10 grid place-items-center rounded-xl hover:border-primary/30 transition relative group">
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-neon-pink animate-pulse-glow" />
        </button>
        <button className="bg-aurora text-primary-foreground h-10 px-4 rounded-xl text-sm font-medium flex items-center gap-2 hover:scale-[1.03] transition glow-ring">
          <Plus className="h-4 w-4" /> <span className="hidden sm:inline">New</span>
        </button>
      </div>
    </header>
  );
}
