import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  LayoutDashboard,
  CheckSquare,
  Settings,
  Sparkles,
  Timer,
  Plus,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
          return;
        }
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          <div className="fixed inset-0 flex items-start justify-center pt-32 pointer-events-none">
            <motion.div
              className="w-full max-w-[640px] px-4 pointer-events-auto"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Command
                className="glass-strong relative w-full rounded-2xl overflow-hidden border border-primary/10 flex flex-col neon-border"
                label="Global Command Menu"
              >
                <div className="flex items-center border-b px-4 py-3">
                  <Search className="mr-3 h-4 w-4 text-muted-foreground shrink-0" />
                  <Command.Input
                    placeholder="Type a command or search..."
                    className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    autoFocus
                  />
                  <div className="ml-2 text-[10px] border border-muted px-1.5 py-0.5 rounded-md text-muted-foreground bg-muted/30 font-mono">
                    ESC
                  </div>
                </div>
                <Command.List className="max-h-[320px] overflow-y-auto overflow-x-hidden p-2 scrollbar-none">
                  <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                    No results found.
                  </Command.Empty>

                  <Command.Group
                    heading="Quick Actions"
                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground px-2 py-1.5 mt-2"
                  >
                    <Item icon={<Plus />} label="New Task" onSelect={() => runCommand(() => navigate({ to: "/dashboard/tasks" }))} />
                    <Item icon={<Timer />} label="Start Focus Session" onSelect={() => runCommand(() => navigate({ to: "/dashboard/focus" }))} />
                    <Item icon={<Sparkles />} label="Ask AI Assistant" onSelect={() => runCommand(() => navigate({ to: "/dashboard/ai" }))} />
                  </Command.Group>

                  <div className="h-px bg-muted/50 my-2 mx-2" />

                  <Command.Group
                    heading="Navigation"
                    className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground px-2 py-1.5"
                  >
                    <Item icon={<LayoutDashboard />} label="Go to Dashboard" onSelect={() => runCommand(() => navigate({ to: "/dashboard" }))} />
                    <Item icon={<CheckSquare />} label="View Tasks" onSelect={() => runCommand(() => navigate({ to: "/dashboard/tasks" }))} />
                    <Item icon={<Settings />} label="Open Settings" onSelect={() => runCommand(() => navigate({ to: "/dashboard/settings" }))} />
                  </Command.Group>
                </Command.List>

                <div className="flex items-center justify-between bg-muted/20 px-4 py-2 text-xs text-muted-foreground border-t">
                  <p>
                    FocusFlow <span className="text-[10px] opacity-70">v1.2.0</span>
                  </p>
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <span className="font-mono">↑↓</span> navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="font-mono">↵</span> select
                    </span>
                  </div>
                </div>
              </Command>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Item({ icon, label, onSelect }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-default select-none items-center rounded-xl px-3 py-2.5 text-sm outline-none aria-selected:bg-primary aria-selected:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors group"
    >
      <div className="mr-3 h-4 w-4 flex items-center justify-center opacity-70 group-aria-selected:opacity-100">
        {React.cloneElement(icon, { className: "h-4 w-4" })}
      </div>
      <span className="flex-1">{label}</span>
    </Command.Item>
  );
}
