import {
  TrendingUp,
  Flame,
  Zap,
  Brain,
  Clock,
  Plus,
  Play,
  Pause,
  SkipForward,
  Music2,
  Heart,
  Trophy,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: custom * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const hoverScale = {
  scale: 1.01,
  y: -4,
  boxShadow: "0 20px 50px -15px oklch(0.65 0.2 295 / 0.15)",
  borderColor: "oklch(0.65 0.2 295 / 0.2)",
  transition: { duration: 0.3, ease: "easeOut" },
};

export function GlassCard({ children, className = "", glow = false, delay = 0 }) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20px" }}
      custom={delay}
      whileHover={hoverScale}
      className={`glass rounded-2xl p-5 relative ${glow ? "neon-border" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function GreetingCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={0}
      className="relative overflow-hidden glass-strong rounded-3xl p-6 md:p-8 col-span-12 lg:col-span-8"
    >
      <motion.div
        className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-aurora opacity-30 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative">
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3"
        >
          Tuesday · May 11, 2026
        </motion.p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
          Good Evening, <span className="text-gradient">Ajay</span> 👋
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl">
          You're <span className="text-foreground font-medium">3 tasks</span> away from a perfect
          day. Your focus score is at an all-time high.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-aurora text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium glow-ring transition flex items-center gap-2 cursor-pointer"
          >
            <Play className="h-4 w-4" /> Start Focus Session
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, borderColor: "var(--color-primary)" }}
            whileTap={{ scale: 0.97 }}
            className="glass px-4 py-2.5 rounded-xl text-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add Task
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export function ClockCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={1}
      whileHover={hoverScale}
      className="relative overflow-hidden glass-strong rounded-3xl p-6 col-span-12 lg:col-span-4"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, oklch(0.62 0.18 250 / 0.3), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Local Time</p>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-4 font-display text-5xl md:text-6xl font-semibold tracking-tight tabular-nums">
          18<span className="text-gradient">:42</span>
          <span className="text-2xl text-muted-foreground ml-2">PM</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">Sunset in 1h 12m · San Francisco</p>
        <div className="mt-5 flex gap-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className={`flex-1 text-center rounded-lg py-2 text-xs cursor-default ${i === 1 ? "bg-aurora text-primary-foreground font-semibold" : "glass text-muted-foreground"}`}
            >
              {d}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Ring({ value, size = 130, color = "url(#auroraGrad)" }) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <defs>
        <linearGradient id="auroraGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.22 295)" />
          <stop offset="50%" stopColor="oklch(0.7 0.21 250)" />
          <stop offset="100%" stopColor="oklch(0.85 0.16 200)" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="oklch(0 0 0 / 0.06)"
        strokeWidth="10"
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: off }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 8px oklch(0.65 0.2 295 / 0.4))" }}
      />
    </svg>
  );
}


export function ProductivityScore() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={2}
      whileHover={hoverScale}
      className="glass rounded-2xl p-6 col-span-12 sm:col-span-6 lg:col-span-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Productivity</p>
          <h3 className="font-display text-lg mt-1">Today's Score</h3>
        </div>
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md"
        >
          <TrendingUp className="h-3 w-3" /> +12%
        </motion.span>
      </div>
      <div className="flex items-center gap-5 mt-4">
        <div className="relative grid place-items-center">
          <Ring value={87} />
          <div className="absolute inset-0 grid place-items-center">
            <div className="text-center">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="font-display text-3xl font-semibold tabular-nums"
              >
                87
              </motion.p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Score</p>
            </div>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          <Stat label="Tasks done" value="14/17" />
          <Stat label="Deep work" value="3h 42m" />
          <Stat
            label="Streak"
            value="47 days"
            icon={<Flame className="h-3 w-3 text-orange-400" />}
          />
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, icon }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5 font-medium">
        {icon}
        {value}
      </span>
    </div>
  );
}

export function FocusScoreCard() {
  const bars = [40, 65, 50, 80, 72, 90, 78];
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={3}
      whileHover={hoverScale}
      className="glass rounded-2xl p-6 col-span-12 sm:col-span-6 lg:col-span-4"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Focus</p>
          <h3 className="font-display text-lg mt-1">Weekly Deep Work</h3>
        </div>
        <Brain className="h-5 w-5 text-neon-violet" />
      </div>
      <div className="mt-6 flex items-end gap-2 h-32">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: "easeOut" }}
              className="w-full rounded-md bg-aurora opacity-90 hover:opacity-100 transition-opacity cursor-pointer relative group"
            >
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-popover px-2 py-1 rounded text-[10px] shadow-lg whitespace-nowrap z-10">
                {h}m
              </div>
            </motion.div>
            <span className="text-[10px] text-muted-foreground">
              {["M", "T", "W", "T", "F", "S", "S"][i]}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <span className="text-muted-foreground">Avg session</span>
        <span className="font-medium">
          52 min · <span className="text-emerald-400">+8%</span>
        </span>
      </div>
    </motion.div>
  );
}

export function PomodoroCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={4}
      whileHover={hoverScale}
      className="relative overflow-hidden glass rounded-2xl p-6 col-span-12 sm:col-span-6 lg:col-span-4"
    >
      <div className="absolute -bottom-20 -right-10 h-48 w-48 rounded-full bg-aurora opacity-20 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Pomodoro</p>
            <h3 className="font-display text-lg mt-1">Focus Timer</h3>
          </div>
          <Zap className="h-5 w-5 text-neon-cyan" />
        </div>
        <div className="mt-6 text-center">
          <motion.p
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="font-display text-6xl font-semibold tabular-nums text-gradient"
          >
            24:18
          </motion.p>
          <p className="text-xs text-muted-foreground mt-1">Working on · Design system</p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass h-11 w-11 rounded-full grid place-items-center cursor-pointer transition hover:border-primary/30"
          >
            <Pause className="h-4 w-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="bg-aurora h-14 w-14 rounded-full grid place-items-center text-primary-foreground glow-ring cursor-pointer"
          >
            <Play className="h-5 w-5 ml-0.5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="glass h-11 w-11 rounded-full grid place-items-center cursor-pointer transition hover:border-primary/30"
          >
            <SkipForward className="h-4 w-4" />
          </motion.button>
        </div>
        <div className="mt-5 flex justify-center gap-1.5">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={`h-1.5 w-6 rounded-full ${i <= 2 ? "bg-aurora" : "bg-muted"}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}


const tasks = [
  {
    title: "Ship FocusFlow v2 design system",
    project: "Design",
    priority: "high",
    done: true,
    time: "9:00",
  },
  {
    title: "Review Q2 product roadmap",
    project: "Strategy",
    priority: "high",
    done: false,
    time: "11:30",
  },
  {
    title: "Sync with engineering pod",
    project: "Team",
    priority: "med",
    done: false,
    time: "14:00",
  },
  {
    title: "Write release notes",
    project: "Marketing",
    priority: "low",
    done: false,
    time: "16:30",
  },
  {
    title: "Meditation & journal",
    project: "Wellness",
    priority: "low",
    done: true,
    time: "18:00",
  },
];

export function TasksWidget() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={5}
      whileHover={hoverScale}
      className="glass rounded-2xl p-6 col-span-12 lg:col-span-7"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Today</p>
          <h3 className="font-display text-lg mt-1">Priority Tasks</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 hover:border-primary/30 transition cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" /> Add
        </motion.button>
      </div>
      <ul className="space-y-2">
        {tasks.map((t, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            whileHover={{ x: 4, backgroundColor: "rgba(0,0,0,0.02)" }}
            className="group flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors"
          >
            <div
              className={`h-5 w-5 rounded-md border grid place-items-center transition ${t.done ? "bg-aurora border-transparent" : "border-border group-hover:border-neon-violet"}`}
            >
              {t.done && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  viewBox="0 0 24 24"
                  className="h-3 w-3 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </motion.svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${t.done ? "line-through text-muted-foreground" : ""}`}
              >
                {t.title}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {t.project} · {t.time}
              </p>
            </div>
            <span
              className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-md font-semibold ${
                t.priority === "high"
                  ? "bg-neon-pink/15 text-neon-pink"
                  : t.priority === "med"
                    ? "bg-neon-cyan/15 text-neon-cyan"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {t.priority}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function GoalsWidget() {
  const goals = [
    { name: "Launch FocusFlow", progress: 78, color: "oklch(0.72 0.22 295)" },
    { name: "Read 24 books", progress: 54, color: "oklch(0.7 0.21 250)" },
    { name: "Run 500km", progress: 42, color: "oklch(0.85 0.16 200)" },
    { name: "Learn Rust", progress: 28, color: "oklch(0.75 0.24 350)" },
  ];
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={6}
      whileHover={hoverScale}
      className="glass rounded-2xl p-6 col-span-12 lg:col-span-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">2026</p>
          <h3 className="font-display text-lg mt-1">Yearly Goals</h3>
        </div>
        <Trophy className="h-5 w-5 text-neon-cyan" />
      </div>
      <div className="space-y-4">
        {goals.map((g, i) => (
          <div key={g.name}>
            <div className="flex justify-between text-sm mb-1.5">
              <span>{g.name}</span>
              <span className="text-muted-foreground tabular-nums">{g.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${g.progress}%` }}
                transition={{ duration: 1, delay: 0.8 + i * 0.1, ease: "circOut" }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${g.color}, oklch(0.85 0.16 200))`,
                  boxShadow: `0 0 12px ${g.color}`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function MoodCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={7}
      whileHover={hoverScale}
      className="glass rounded-2xl p-6 col-span-12 sm:col-span-6 lg:col-span-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Mood</p>
        <Heart className="h-4 w-4 text-neon-pink" />
      </div>
      <p className="font-display text-4xl mt-3">😌</p>
      <p className="text-sm mt-2 font-medium">Calm & focused</p>
      <div className="mt-3 flex gap-1.5">
        {["😞", "😐", "🙂", "😌", "🤩"].map((e, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className={`flex-1 aspect-square rounded-lg text-lg grid place-items-center cursor-pointer transition ${i === 3 ? "bg-aurora shadow-glow" : "glass hover:border-primary/30"}`}
          >
            {e}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export function MusicCard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={8}
      whileHover={hoverScale}
      className="relative overflow-hidden glass rounded-2xl p-6 col-span-12 sm:col-span-6 lg:col-span-5"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 80% 50%, oklch(0.7 0.2 350 / 0.3), transparent 60%)",
        }}
      />
      <div className="relative flex items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="h-16 w-16 rounded-full bg-aurora grid place-items-center shrink-0 shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]"
        >
          <Music2 className="h-7 w-7 text-primary-foreground" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Focus Music</p>
          <p className="font-semibold truncate">Lo-fi Deep Work · vol. 12</p>
          <p className="text-xs text-muted-foreground truncate">Brain.fm · 2h 14m left</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "10%" }}
                animate={{ width: ["33%", "35%", "33%"] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="h-full bg-aurora rounded-full"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="h-8 w-8 rounded-full bg-muted/50 border border-border/50 grid place-items-center cursor-pointer hover:bg-black/5"
            >
              <Play className="h-3.5 w-3.5 ml-0.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function AICard() {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={9}
      whileHover={hoverScale}
      className="relative overflow-hidden glass-strong rounded-2xl p-6 col-span-12 lg:col-span-4 neon-border"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
        <Sparkles className="h-3.5 w-3.5 text-neon-violet animate-pulse" /> AI Insight
      </div>
      <p className="font-display text-lg mt-3 leading-snug font-medium">
        "Your focus peaks between <span className="text-gradient">9–11 AM</span>. Consider
        scheduling deep work then."
      </p>
      <div className="mt-4 flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass px-3 py-1.5 rounded-lg text-xs font-medium hover:border-primary/30 transition cursor-pointer"
        >
          Apply schedule
        </motion.button>
        <button className="text-xs text-muted-foreground px-2 hover:text-foreground transition">
          Dismiss
        </button>
      </div>
    </motion.div>
  );
}

export function HabitsCard() {
  const habits = [
    { name: "Meditate", days: [1, 1, 1, 1, 0, 1, 1] },
    { name: "Workout", days: [1, 0, 1, 1, 1, 0, 1] },
    { name: "Read", days: [1, 1, 0, 1, 1, 1, 1] },
    { name: "No sugar", days: [0, 1, 1, 1, 0, 1, 1] },
  ];
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={10}
      whileHover={hoverScale}
      className="glass rounded-2xl p-6 col-span-12 lg:col-span-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Habits</p>
          <h3 className="font-display text-lg mt-1">This Week</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          className="text-muted-foreground hover:text-foreground cursor-pointer p-1"
        >
          <MoreHorizontal className="h-4 w-4" />
        </motion.button>
      </div>
      <div className="space-y-3">
        {habits.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="flex items-center gap-4"
          >
            <span className="text-sm font-medium w-24 truncate">{h.name}</span>
            <div className="flex-1 grid grid-cols-7 gap-1.5">
              {h.days.map((d, j) => (
                <motion.div
                  key={j}
                  whileHover={{ scale: 1.15, zIndex: 10 }}
                  className={`h-7 rounded-md relative ${d ? "bg-aurora" : "bg-muted/50"}`}
                  style={d ? { boxShadow: "0 0 8px oklch(0.65 0.2 295 / 0.3)" } : undefined}
                >
                  {d && (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 1.3 + j * 0.05, type: "spring" }}
                      className="absolute inset-0 rounded-md"
                    />
                  )}
                </motion.div>
              ))}
            </div>
            <span className="text-xs font-semibold text-muted-foreground w-10 text-right tabular-nums">
              {h.days.filter(Boolean).length}/7
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

