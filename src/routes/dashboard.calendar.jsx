import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
export const Route = createFileRoute("/dashboard/calendar")({
  component: CalendarPage,
  head: () => ({ meta: [{ title: "Calendar — FocusFlow" }] }),
});
function CalendarPage() {
  const days = Array.from({ length: 35 }, (_, i) => i - 3);
  const events = [
    { d: 11, t: "Deep work — Design", c: "oklch(0.72 0.22 295)" },
    { d: 11, t: "Sync · Engineering", c: "oklch(0.7 0.21 250)" },
    { d: 13, t: "Investor call", c: "oklch(0.75 0.24 350)" },
    { d: 15, t: "Brand workshop", c: "oklch(0.85 0.16 200)" },
    { d: 18, t: "Yoga + journaling", c: "oklch(0.65 0.2 145)" },
    { d: 22, t: "Launch review", c: "oklch(0.72 0.22 295)" },
  ];
  return (
    <>
      <TopBar title="Calendar" subtitle="May 2026 · Plan with intention." />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-2xl">
              May <span className="text-muted-foreground">2026</span>
            </h3>
            <div className="flex gap-2">
              <button className="glass h-9 w-9 rounded-lg grid place-items-center hover:border-white/20">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="glass h-9 w-9 rounded-lg grid place-items-center hover:border-white/20">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {days.map((d, i) => {
              const isMonth = d >= 1 && d <= 31;
              const ev = events.filter((e) => e.d === d);
              const isToday = d === 11;
              return (
                <div
                  key={i}
                  className={`aspect-square glass rounded-xl p-2 text-left relative overflow-hidden hover-lift ${!isMonth ? "opacity-30" : ""} ${isToday ? "neon-border" : ""}`}
                >
                  <span
                    className={`text-xs ${isToday ? "text-gradient font-semibold" : "text-muted-foreground"}`}
                  >
                    {isMonth ? d : ""}
                  </span>
                  <div className="absolute bottom-1 left-1 right-1 space-y-0.5">
                    {ev.slice(0, 2).map((e, j) => (
                      <div
                        key={j}
                        className="h-1 rounded-full"
                        style={{ background: e.c, boxShadow: `0 0 6px ${e.c}` }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4">
          <div className="glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Today · May 11
            </p>
            {events
              .filter((e) => e.d === 11)
              .concat([{ d: 11, t: "Pomodoro · Notes", c: "oklch(0.85 0.16 200)" }])
              .map((e, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 py-2.5 border-b border-white/5 last:border-0"
                >
                  <span
                    className="h-2 w-2 mt-1.5 rounded-full shrink-0"
                    style={{ background: e.c, boxShadow: `0 0 8px ${e.c}` }}
                  />
                  <div className="flex-1">
                    <p className="text-sm">{e.t}</p>
                    <p className="text-xs text-muted-foreground">
                      {["09:00", "11:30", "14:00"][i]}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
