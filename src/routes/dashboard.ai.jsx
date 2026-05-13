import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { Sparkles, ArrowUp } from "lucide-react";
export const Route = createFileRoute("/dashboard/ai")({
  component: AIPage,
  head: () => ({ meta: [{ title: "AI Assistant — FocusFlow" }] }),
});
const messages = [
  {
    from: "ai",
    t: "Hey Ajay 👋 I noticed your focus dropped 18% last Wednesday afternoon. Want me to suggest a recovery routine?",
  },
  { from: "me", t: "Yes — and reschedule my deep work blocks to mornings this week." },
  {
    from: "ai",
    t: "Done. I've moved your 4 deep work sessions to 9–11 AM (your peak window). I also blocked Slack and email until 11. Want me to add a 10-min breathwork session at 8:50?",
  },
];
function AIPage() {
  const suggestions = [
    "Plan my week",
    "Summarize my notes",
    "Suggest a focus playlist",
    "Coach me on a goal",
  ];
  return (
    <>
      <TopBar title="AI Co-pilot" subtitle="Your personal productivity strategist." />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-8 glass-strong rounded-3xl p-6 md:p-8 min-h-[600px] flex flex-col neon-border">
          <div className="flex items-center gap-3 pb-5 border-b border-white/5">
            <div className="h-10 w-10 rounded-xl bg-aurora grid place-items-center glow-ring">
              <Sparkles className="h-5 w-5 text-background" />
            </div>
            <div>
              <p className="font-medium">Flow AI</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online ·
                GPT-4o powered
              </p>
            </div>
          </div>
          <div className="flex-1 space-y-5 py-6 overflow-y-auto">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.from === "me" ? "justify-end" : "justify-start"} animate-fade-up`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.from === "me" ? "bg-aurora text-background" : "glass"}`}
                >
                  {m.t}
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5">
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  className="text-xs glass px-3 py-1.5 rounded-full hover:border-white/20 transition"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 glass rounded-2xl p-2 pl-4">
              <input
                placeholder="Ask Flow anything…"
                className="flex-1 bg-transparent outline-none text-sm py-2"
              />
              <button className="bg-aurora h-10 w-10 rounded-xl grid place-items-center text-background glow-ring hover:scale-105 transition">
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-5">
          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Today's insights
            </p>
            <ul className="mt-3 space-y-3 text-sm">
              {[
                "Peak focus 9–11 AM",
                "Energy dip at 14:30",
                "3 unfinished tasks from Mon",
                "Suggested break: 18:00",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-neon-violet mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-3">
              Recent threads
            </p>
            {["Weekly review", "Goal: Run 500km", "Brain dump · May 8"].map((t) => (
              <div
                key={t}
                className="py-2 border-b border-white/5 last:border-0 text-sm hover:text-gradient cursor-pointer"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
