import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { Sparkles } from "lucide-react";
export const Route = createFileRoute("/dashboard/insights")({
  component: InsightsPage,
  head: () => ({ meta: [{ title: "Insights — FocusFlow" }] }),
});
const insights = [
  {
    i: "Mornings are your superpower",
    d: "You complete 67% of your deep work between 9–11 AM. Defend this window.",
    c: "oklch(0.72 0.22 295)",
  },
  {
    i: "Wednesdays drag",
    d: "Your productivity dips 22% mid-week. Try lighter scheduling on Wednesday afternoons.",
    c: "oklch(0.7 0.21 250)",
  },
  {
    i: "Meditation → Output",
    d: "Days you meditate, your focus score is +18% higher on average.",
    c: "oklch(0.85 0.16 200)",
  },
  {
    i: "Notification debt",
    d: "You check Slack 47 times/day. Cutting in half could reclaim ~38 min.",
    c: "oklch(0.75 0.24 350)",
  },
];
function InsightsPage() {
  return (
    <>
      <TopBar title="Insights" subtitle="What your data is whispering." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {insights.map((ins, i) => (
          <div
            key={ins.i}
            className="relative glass rounded-2xl p-6 hover-lift overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <div
              className="absolute -top-20 -right-10 h-48 w-48 rounded-full blur-3xl opacity-40"
              style={{ background: ins.c }}
            />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-neon-violet" /> AI insight #{i + 1}
              </div>
              <h3 className="font-display text-2xl mt-3 leading-tight">{ins.i}</h3>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{ins.d}</p>
              <div className="mt-5 flex items-center gap-2">
                <button className="bg-aurora text-background text-xs px-3 py-1.5 rounded-lg glow-ring hover:scale-105 transition">
                  Apply
                </button>
                <button className="text-xs text-muted-foreground px-3 py-1.5">Dismiss</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
