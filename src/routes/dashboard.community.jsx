import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { Trophy, Heart, MessageCircle, Crown } from "lucide-react";
export const Route = createFileRoute("/dashboard/community")({
  component: CommunityPage,
  head: () => ({ meta: [{ title: "Community — FocusFlow" }] }),
});
const leaders = [
  { n: "Maya Chen", s: 9847, r: 1, badge: "Mythic" },
  { n: "Diego Santos", s: 8923, r: 2, badge: "Legendary" },
  { n: "You", s: 8540, r: 3, badge: "Epic", you: true },
  { n: "Aria Kapoor", s: 8211, r: 4, badge: "Epic" },
  { n: "Jin Park", s: 7895, r: 5, badge: "Rare" },
];
const posts = [
  {
    n: "Maya Chen",
    t: "Hit 100 days of meditation today 🧘 The compounding is unreal.",
    l: 142,
    c: 38,
  },
  {
    n: "Diego Santos",
    t: "FocusFlow's AI rescheduled my entire week. Productivity 2x'd. Wild.",
    l: 98,
    c: 24,
  },
  {
    n: "Aria Kapoor",
    t: "Anyone else doing a 30-day deep work challenge? Day 12 here 🔥",
    l: 67,
    c: 51,
  },
];
function CommunityPage() {
  return (
    <>
      <TopBar title="Community" subtitle="Build alongside ambitious humans." />
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-5 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">This week</p>
              <h3 className="font-display text-lg mt-1 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-neon-cyan" /> Leaderboard
              </h3>
            </div>
          </div>
          <div className="space-y-2">
            {leaders.map((l) => (
              <div
                key={l.n}
                className={`flex items-center gap-3 p-3 rounded-xl ${l.you ? "bg-aurora/15 neon-border" : ""}`}
              >
                <span
                  className={`font-display text-lg w-6 ${l.r === 1 ? "text-yellow-400" : l.r === 2 ? "text-slate-300" : l.r === 3 ? "text-orange-400" : "text-muted-foreground"}`}
                >
                  #{l.r}
                </span>
                <div className="h-9 w-9 rounded-full bg-aurora grid place-items-center text-background text-sm font-semibold relative">
                  {l.n[0]}
                  {l.r === 1 && (
                    <Crown className="absolute -top-2 -right-1 h-4 w-4 text-yellow-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{l.n}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {l.badge}
                  </p>
                </div>
                <span className="font-display text-lg text-gradient tabular-nums">
                  {l.s.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 space-y-4">
          {posts.map((p, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-aurora grid place-items-center text-background text-sm font-semibold">
                  {p.n[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{p.n}</p>
                  <p className="text-xs text-muted-foreground">2h ago</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed">{p.t}</p>
              <div className="flex items-center gap-5 mt-4 text-xs text-muted-foreground">
                <button className="flex items-center gap-1.5 hover:text-neon-pink transition">
                  <Heart className="h-4 w-4" /> {p.l}
                </button>
                <button className="flex items-center gap-1.5 hover:text-foreground transition">
                  <MessageCircle className="h-4 w-4" /> {p.c}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
