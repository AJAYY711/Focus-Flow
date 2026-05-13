import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Zap, Brain, Target, BarChart3, Star, Check } from "lucide-react";
import { AuroraBackground } from "@/components/focusflow/AuroraBackground";
import { Logo } from "@/components/focusflow/Logo";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "FocusFlow — The Productivity Operating System" },
      {
        name: "description",
        content: "Cinematic, AI-native productivity workspace for ambitious humans.",
      },
    ],
  }),
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AuroraBackground />

      {/* Nav */}
      <header className="sticky top-0 z-40 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto glass-strong rounded-2xl px-4 md:px-6 py-3 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">
              Features
            </a>
            <a href="#showcase" className="hover:text-foreground transition">
              Showcase
            </a>
            <a href="#pricing" className="hover:text-foreground transition">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-foreground transition">
              Loved by
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="bg-aurora text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl glow-ring hover:scale-[1.03] transition flex items-center gap-1.5"
            >
              Get started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 md:px-8 pt-12 md:pt-24 pb-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs text-muted-foreground animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-neon-violet" />
            Now with AI Co-pilot · v2.0
          </div>
          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mt-6 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Your <span className="text-gradient">productivity</span>
            <br />
            operating system.
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Tasks, focus, goals, habits, and AI insights — all unified in one cinematic workspace
            built for ambitious humans.
          </p>
          <div
            className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/signup"
              className="bg-aurora text-primary-foreground px-6 py-3.5 rounded-xl font-medium glow-ring hover:scale-[1.03] transition flex items-center gap-2"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#showcase"
              className="glass px-6 py-3.5 rounded-xl font-medium hover:border-primary/30 transition"
            >
              See it in action
            </a>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            No credit card · 14-day premium trial · Cancel anytime
          </p>
        </div>

        {/* Floating dashboard preview */}
        <div
          className="max-w-6xl mx-auto mt-16 md:mt-24 relative animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="absolute inset-0 -top-20 bg-aurora opacity-20 blur-3xl rounded-full" />
          <div className="relative glass-strong rounded-3xl p-2 neon-border">
            <div className="rounded-2xl overflow-hidden bg-background/60 grid grid-cols-12 gap-3 p-4 md:p-6 min-h-[420px]">
              <div className="col-span-3 hidden md:flex flex-col gap-2">
                {["Dashboard", "Tasks", "Focus", "Goals", "Notes", "Analytics"].map((l, i) => (
                  <div
                    key={l}
                    className={`px-3 py-2.5 rounded-lg text-xs ${i === 0 ? "bg-aurora text-primary-foreground" : "glass text-muted-foreground"}`}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div className="col-span-12 md:col-span-9 grid grid-cols-6 gap-3">
                <div className="col-span-6 glass rounded-xl p-4">
                  <p className="text-xs text-muted-foreground">Good evening, Ajay</p>
                  <p className="font-display text-2xl mt-1">You're in deep flow 🔥</p>
                </div>
                <div className="col-span-3 glass rounded-xl p-4">
                  <p className="text-xs text-muted-foreground">Productivity</p>
                  <p className="font-display text-3xl text-gradient mt-1">87</p>
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[87%] bg-aurora rounded-full" />
                  </div>
                </div>
                <div className="col-span-3 glass rounded-xl p-4">
                  <p className="text-xs text-muted-foreground">Focus</p>
                  <div className="flex items-end gap-1 mt-2 h-12">
                    {[40, 65, 50, 80, 72, 90, 78].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-aurora rounded-sm"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-span-6 glass rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs text-muted-foreground">Today's tasks</p>
                    <span className="text-xs text-muted-foreground">14/17</span>
                  </div>
                  {["Ship FocusFlow v2 design", "Review Q2 roadmap", "Sync with engineering"].map(
                    (t, i) => (
                      <div key={i} className="flex items-center gap-3 py-1.5">
                        <div
                          className={`h-4 w-4 rounded border ${i === 0 ? "bg-aurora border-transparent" : "border-border"}`}
                        />
                        <span
                          className={`text-sm ${i === 0 ? "line-through text-muted-foreground" : ""}`}
                        >
                          {t}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-12 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Trusted by teams at
        </p>
        <div className="flex gap-16 animate-marquee whitespace-nowrap text-2xl font-display text-muted-foreground/60">
          {Array(2)
            .fill(0)
            .map((_, r) => (
              <div key={r} className="flex gap-16">
                {["Stripe", "Linear", "Notion", "Vercel", "Figma", "Arc", "Raycast", "Loom"].map(
                  (b) => (
                    <span key={b}>{b}</span>
                  ),
                )}
              </div>
            ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 md:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Features</p>
            <h2 className="font-display text-4xl md:text-5xl mt-4">
              Everything you need.
              <br />
              Nothing you don't.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-16">
            {[
              {
                icon: Brain,
                title: "AI Co-pilot",
                desc: "Smart suggestions that learn your rhythm and protect deep work.",
              },
              {
                icon: Target,
                title: "Goal Engine",
                desc: "Cascade yearly goals into daily actions with progress rings.",
              },
              {
                icon: Zap,
                title: "Focus Mode",
                desc: "Pomodoro, ambient sounds, and distraction-free zones.",
              },
              {
                icon: BarChart3,
                title: "Deep Analytics",
                desc: "Heatmaps, streaks, and weekly reports — beautifully visualized.",
              },
              {
                icon: Sparkles,
                title: "Neural Notes",
                desc: "AI-linked notes with semantic search across your second brain.",
              },
              {
                icon: Star,
                title: "Habit System",
                desc: "Build streaks with elegant grid tracking and gentle reminders.",
              },
            ].map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6 hover-lift">
                <div className="h-11 w-11 rounded-xl bg-aurora grid place-items-center glow-ring">
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl mt-4">{f.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-8 py-20">
        <div className="max-w-5xl mx-auto glass-strong rounded-3xl p-10 md:p-14 grid md:grid-cols-4 gap-8 text-center neon-border">
          {[
            { v: "2.4M+", l: "Active users" },
            { v: "98%", l: "Retention" },
            { v: "180h", l: "Saved/year" },
            { v: "4.9★", l: "App Store" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-5xl text-gradient">{s.v}</p>
              <p className="text-sm text-muted-foreground mt-2">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="px-4 md:px-8 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Cinematic UI</p>
            <h2 className="font-display text-4xl md:text-5xl mt-4">
              An interface that feels <span className="text-gradient">alive.</span>
            </h2>
            <p className="text-muted-foreground mt-5 text-lg">
              Glassmorphism, aurora gradients, and 60fps interactions. Every pixel obsessed over.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Beautifully crafted dashboards",
                "Buttery-smooth animations",
                "Native performance everywhere",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm">
                  <div className="h-5 w-5 rounded-full bg-aurora grid place-items-center">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-aurora opacity-20 blur-3xl rounded-full" />
            <div className="relative glass-strong rounded-3xl p-6 neon-border">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm">Focus Session</p>
                <span className="text-xs text-emerald-400">● Live</span>
              </div>
              <p className="font-display text-7xl text-gradient text-center my-6 tabular-nums">
                24:18
              </p>
              <div className="flex justify-center gap-3">
                <div className="glass h-12 w-12 rounded-full grid place-items-center">⏸</div>
                <div className="bg-aurora h-14 w-14 rounded-full grid place-items-center text-primary-foreground glow-ring">
                  ▶
                </div>
                <div className="glass h-12 w-12 rounded-full grid place-items-center">⏭</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="px-4 md:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Loved by</p>
            <h2 className="font-display text-4xl md:text-5xl mt-4">
              Builders, founders & dreamers.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-16">
            {[
              {
                q: "FocusFlow replaced 6 apps. My deep work tripled.",
                n: "Maya Chen",
                r: "Founder, Lumen",
              },
              {
                q: "The most beautiful productivity app I've ever used.",
                n: "Diego Santos",
                r: "Designer, Stripe",
              },
              {
                q: "Feels like Apple meets Linear meets the future.",
                n: "Aria Kapoor",
                r: "PM, Notion",
              },
            ].map((t) => (
              <div key={t.n} className="glass rounded-2xl p-6 hover-lift">
                <div className="flex gap-0.5">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-neon-cyan text-neon-cyan" />
                    ))}
                </div>
                <p className="mt-4 text-foreground/90 leading-relaxed">"{t.q}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-aurora grid place-items-center text-xs font-semibold text-primary-foreground">
                    {t.n[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.n}</p>
                    <p className="text-xs text-muted-foreground">{t.r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="px-4 md:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center glass-strong rounded-3xl p-12 md:p-16 relative overflow-hidden neon-border">
          <div className="absolute -top-32 -left-20 h-80 w-80 rounded-full bg-aurora opacity-30 blur-3xl" />
          <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-aurora opacity-30 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              Enter the <span className="text-gradient">flow state.</span>
            </h2>
            <p className="text-muted-foreground mt-5 max-w-xl mx-auto">
              Join 2.4M+ ambitious humans who design their day with FocusFlow.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-aurora text-primary-foreground px-7 py-4 rounded-xl font-medium glow-ring hover:scale-[1.03] transition mt-8"
            >
              Start your trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="px-4 md:px-8 py-10 border-t border-border mt-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-xs text-muted-foreground">© 2026 FocusFlow Inc. Designed in flow.</p>
        </div>
      </footer>
    </div>
  );
}
