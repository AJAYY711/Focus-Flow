import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { Pin, Plus } from "lucide-react";
export const Route = createFileRoute("/dashboard/notes")({
  component: NotesPage,
  head: () => ({ meta: [{ title: "Notes — FocusFlow" }] }),
});
const notes = [
  {
    t: "Product strategy 2026",
    e: "Three pillars: AI-native UX, deep analytics, beautiful defaults...",
    c: "oklch(0.72 0.22 295 / 0.2)",
    p: true,
  },
  {
    t: "Meeting — Maya",
    e: "Discuss Q2 roadmap, hiring plan, and brand refresh timing.",
    c: "oklch(0.7 0.21 250 / 0.2)",
  },
  {
    t: "Reading list",
    e: "• Designing Data-Intensive Apps\n• Shape Up\n• The Almanack of Naval",
    c: "oklch(0.85 0.16 200 / 0.2)",
  },
  {
    t: "Brain dump",
    e: "What if we visualized focus as constellations? Each star = session.",
    c: "oklch(0.75 0.24 350 / 0.2)",
    p: true,
  },
  {
    t: "Daily journal · May 11",
    e: "Felt deeply present today. Morning meditation made the difference.",
    c: "oklch(0.65 0.2 145 / 0.2)",
  },
  {
    t: "Vision board",
    e: "Ship FocusFlow v2 → 1M users → fund the dream studio.",
    c: "oklch(0.72 0.22 295 / 0.2)",
  },
];
function NotesPage() {
  return (
    <>
      <TopBar title="Notes" subtitle="Your second brain, beautifully arranged." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <button className="glass rounded-2xl p-6 min-h-[200px] flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-white/20 transition border-dashed">
          <div className="h-10 w-10 rounded-full bg-aurora grid place-items-center">
            <Plus className="h-5 w-5 text-background" />
          </div>
          <span className="text-sm">New note</span>
        </button>
        {notes.map((n, i) => (
          <div
            key={n.t}
            className="relative glass rounded-2xl p-6 min-h-[200px] hover-lift overflow-hidden animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div
              className="absolute -top-10 -right-10 h-32 w-32 rounded-full blur-2xl opacity-80"
              style={{ background: n.c }}
            />
            <div className="relative">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-lg">{n.t}</h3>
                {n.p && <Pin className="h-4 w-4 text-neon-violet" />}
              </div>
              <p className="text-sm text-muted-foreground mt-3 whitespace-pre-line leading-relaxed">
                {n.e}
              </p>
              <p className="text-[10px] text-muted-foreground/70 mt-4 uppercase tracking-wider">
                Edited 2h ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
