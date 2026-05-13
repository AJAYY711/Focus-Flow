import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import { TaskModal } from "@/components/focusflow/TaskModal";
import { ReminderPopup } from "@/components/focusflow/ReminderPopup";
import { useTasks } from "@/context/TaskContext";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Flag,
  Calendar,
  Clock,
  MoreHorizontal,
  Search,
  Trash2,
  Pencil,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  Flame,
  AlertCircle,
  Sparkles,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/tasks")({
  component: TasksPage,
  head: () => ({ meta: [{ title: "Tasks — FocusFlow" }] }),
});

const filters = [
  { key: "today", label: "Today", icon: Calendar },
  { key: "upcoming", label: "Upcoming", icon: Clock },
  { key: "completed", label: "Completed", icon: CheckCircle2 },
  { key: "missed", label: "Missed", icon: AlertCircle },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, x: -40, transition: { duration: 0.25 } },
};

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (d.toDateString() === today.toDateString()) return "Today";
  if (d.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatTime(timeStr) {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function isOverdue(task) {
  if (task.completed) return false;
  const now = new Date();
  const taskDate = new Date(`${task.date}T${task.time || "23:59"}`);
  return taskDate < now;
}

export default function TasksPage() {
  const {
    tasks,
    stats,
    loading,
    activeFilter,
    searchQuery,
    priorityFilter,
    setActiveFilter,
    setSearchQuery,
    setPriorityFilter,
    toggleComplete,
    deleteTask,
  } = useTasks();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [dragId, setDragId] = useState(null);

  const handleEdit = (task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleToggle = async (task) => {
    try {
      await toggleComplete(task.id, !task.completed);
      if (!task.completed) toast.success("Nice! Task completed 🎉");
    } catch {
      toast.error("Failed to update");
    }
  };

  // AI-style tip based on stats
  const getSmartTip = () => {
    if (!stats) return null;
    if (stats.missed > 0) return `You have ${stats.missed} overdue task${stats.missed > 1 ? "s" : ""}. Reschedule or knock them out first!`;
    if (stats.productivity >= 80) return "You're on fire! 🔥 Productivity is above 80%. Keep the momentum going.";
    if (stats.streak > 7) return `Amazing ${stats.streak}-day streak! Consistency is your superpower.`;
    if (stats.pending === 0 && stats.total > 0) return "All tasks done! You've earned a break. 🎉";
    if (stats.todayTotal === 0) return "No tasks for today. Add some tasks to stay productive!";
    return `${stats.todayCompleted}/${stats.todayTotal} done today. You've got this!`;
  };

  return (
    <>
      <TopBar title="Tasks" subtitle="Organize. Execute. Dominate." />

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total", value: stats?.total || 0, icon: ListTodo, color: "text-neon-violet" },
          { label: "Completed", value: stats?.completed || 0, icon: CheckCircle2, color: "text-emerald-400" },
          { label: "Pending", value: stats?.pending || 0, icon: Clock, color: "text-neon-cyan" },
          { label: "Productivity", value: `${stats?.productivity || 0}%`, icon: TrendingUp, color: "text-neon-pink" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-2xl p-4 hover-lift"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
                {s.label}
              </span>
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className="font-display text-2xl font-semibold mt-2 tabular-nums">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Tip */}
      {getSmartTip() && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-2xl p-4 mb-6 flex items-start gap-3 neon-border"
        >
          <Sparkles className="h-4 w-4 text-neon-violet mt-0.5 shrink-0 animate-pulse" />
          <p className="text-sm">
            <span className="font-semibold text-gradient">AI Insight</span>{" "}
            <span className="text-muted-foreground">— {getSmartTip()}</span>
          </p>
        </motion.div>
      )}

      {/* Filter Tabs + Search + Actions */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex gap-1.5 glass rounded-2xl p-1.5">
          {filters.map((f) => {
            const active = activeFilter === f.key;
            const Icon = f.icon;
            return (
              <motion.button
                key={f.key}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  active
                    ? "bg-aurora text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {f.label}
              </motion.button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Search */}
          <div className="flex items-center gap-2 glass rounded-xl px-3 py-2 flex-1 md:w-56">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks…"
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground/70"
            />
          </div>

          {/* Priority filter */}
          <div className="relative">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="glass rounded-xl px-3 py-2.5 text-xs font-medium outline-none appearance-none pr-8 cursor-pointer border border-border/50 bg-transparent"
            >
              <option value="all">All</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
          </div>

          {/* Add button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setEditTask(null);
              setModalOpen(true);
            }}
            className="bg-aurora text-primary-foreground h-10 px-4 rounded-xl text-sm font-medium flex items-center gap-2 glow-ring cursor-pointer whitespace-nowrap"
          >
            <Plus className="h-4 w-4" /> New Task
          </motion.button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2.5 min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {loading ? (
            // Loading skeletons
            [...Array(4)].map((_, i) => (
              <motion.div
                key={`skel-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-2xl p-4 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-muted" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/3" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : tasks.length === 0 ? (
            // Empty state
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-12 text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl mb-4"
              >
                {activeFilter === "completed" ? "🎉" : activeFilter === "missed" ? "😅" : "📝"}
              </motion.div>
              <h3 className="font-display text-lg font-semibold">
                {activeFilter === "completed"
                  ? "No completed tasks yet"
                  : activeFilter === "missed"
                    ? "No missed tasks!"
                    : "No tasks here"}
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                {activeFilter === "completed"
                  ? "Complete some tasks and they'll show up here."
                  : activeFilter === "missed"
                    ? "Great job staying on top of everything!"
                    : "Create your first task to get started on your productivity journey."}
              </p>
              {(activeFilter === "today" || activeFilter === "upcoming") && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditTask(null);
                    setModalOpen(true);
                  }}
                  className="mt-5 bg-aurora text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium glow-ring cursor-pointer inline-flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Create Task
                </motion.button>
              )}
            </motion.div>
          ) : (
            tasks.map((task, i) => (
              <motion.div
                key={task.id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={i}
                draggable
                onDragStart={() => setDragId(task.id)}
                onDragEnd={() => setDragId(null)}
                className={`group glass rounded-2xl p-4 cursor-grab active:cursor-grabbing transition-all ${
                  dragId === task.id ? "opacity-50 scale-95" : ""
                } ${isOverdue(task) ? "ring-1 ring-red-400/30" : ""}`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    onClick={() => handleToggle(task)}
                    className="mt-0.5 shrink-0 cursor-pointer"
                  >
                    {task.completed ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-5 w-5 rounded-full bg-aurora grid place-items-center"
                      >
                        <svg viewBox="0 0 24 24" className="h-3 w-3 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </motion.div>
                    ) : (
                      <div className={`h-5 w-5 rounded-full border-2 transition ${
                        isOverdue(task) ? "border-red-400/60" : "border-border group-hover:border-neon-violet"
                      }`} />
                    )}
                  </motion.button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className={`text-sm font-medium leading-snug ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{task.description}</p>
                        )}
                      </div>

                      {/* Actions (visible on hover) */}
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(task)}
                          className="h-7 w-7 rounded-lg glass grid place-items-center text-muted-foreground hover:text-foreground transition cursor-pointer"
                        >
                          <Pencil className="h-3 w-3" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(task.id)}
                          className="h-7 w-7 rounded-lg glass grid place-items-center text-muted-foreground hover:text-red-500 transition cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Meta row */}
                    <div className="flex items-center gap-3 mt-2.5 flex-wrap">
                      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(task.date)}</span>
                      </div>
                      {task.time && (
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(task.time)}</span>
                        </div>
                      )}
                      {isOverdue(task) && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold bg-red-500/15 text-red-400">
                          Overdue
                        </span>
                      )}
                      {task.reminder && !task.completed && (
                        <div className="flex items-center gap-1 text-[11px] text-neon-violet">
                          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                          </svg>
                          <span>{task.reminder}m before</span>
                        </div>
                      )}
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold ${
                          task.priority === "high"
                            ? "bg-neon-pink/15 text-neon-pink"
                            : task.priority === "medium"
                              ? "bg-neon-cyan/15 text-neon-cyan"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Streak footer */}
      {stats?.streak > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5">
            <Flame className="h-4 w-4 text-orange-400" />
            <span className="text-sm font-medium">
              {stats.streak}-day streak
            </span>
            <span className="text-xs text-muted-foreground">Keep it going!</span>
          </div>
        </motion.div>
      )}

      {/* Floating Add Button (mobile) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setEditTask(null);
          setModalOpen(true);
        }}
        className="md:hidden fixed bottom-24 right-5 h-14 w-14 bg-aurora rounded-full grid place-items-center text-primary-foreground shadow-2xl glow-ring z-40 cursor-pointer"
      >
        <Plus className="h-6 w-6" />
      </motion.button>

      {/* Modal */}
      <TaskModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTask(null);
        }}
        editTask={editTask}
      />

      {/* Reminder Popup */}
      <ReminderPopup />
    </>
  );
}
