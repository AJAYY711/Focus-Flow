import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Flag, Bell, Loader2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTasks } from "@/context/TaskContext";
import { toast } from "sonner";

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  reminder: z.number().nullable().optional(),
});

const priorities = [
  { value: "low", label: "Low", color: "text-muted-foreground", bg: "bg-muted" },
  { value: "medium", label: "Medium", color: "text-neon-cyan", bg: "bg-neon-cyan/15" },
  { value: "high", label: "High", color: "text-neon-pink", bg: "bg-neon-pink/15" },
];

const reminderOptions = [
  { value: null, label: "No reminder" },
  { value: 5, label: "5 min before" },
  { value: 10, label: "10 min before" },
  { value: 15, label: "15 min before" },
  { value: 30, label: "30 min before" },
  { value: 60, label: "1 hour before" },
];

export function TaskModal({ open, onClose, editTask = null }) {
  const { createTask, updateTask } = useTasks();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "",
      priority: "medium",
      reminder: null,
    },
  });

  const selectedPriority = watch("priority");
  const selectedReminder = watch("reminder");
  const titleValue = watch("title");
  const descValue = watch("description");
  const dateValue = watch("date");
  const timeValue = watch("time");

  useEffect(() => {
    if (editTask) {
      reset({
        title: editTask.title,
        description: editTask.description || "",
        date: editTask.date,
        time: editTask.time || "",
        priority: editTask.priority || "medium",
        reminder: editTask.reminder || null,
      });
    } else {
      reset({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        time: "",
        priority: "medium",
        reminder: null,
      });
    }
  }, [editTask, open, reset]);

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      if (editTask) {
        await updateTask(editTask.id, values);
        toast.success("Task updated!");
      } else {
        await createTask(values);
        toast.success("Task created!");
      }
      onClose();
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
          >
            <div className="glass-strong rounded-3xl p-6 md:p-8 shadow-2xl border border-border/50 relative overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-aurora opacity-20 blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6 relative">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-neon-violet" />
                  <h2 className="font-display text-xl font-semibold tracking-tight">
                    {editTask ? "Edit Task" : "New Task"}
                  </h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="h-8 w-8 rounded-lg glass grid place-items-center text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 relative">
                {/* Title — floating label */}
                <div className="relative">
                  <input
                    {...register("title")}
                    id="task-title"
                    placeholder=" "
                    className={`peer w-full bg-muted/20 border rounded-xl px-4 pt-6 pb-2 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm ${errors.title ? "border-red-500" : "border-border/60"}`}
                  />
                  <label
                    htmlFor="task-title"
                    className={`absolute left-4 text-muted-foreground text-sm transition-all pointer-events-none
                      ${titleValue ? "top-2 text-[10px] uppercase tracking-wider font-semibold" : "top-1/2 -translate-y-1/2"}
                      peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:font-semibold peer-focus:translate-y-0`}
                  >
                    Task Title
                  </label>
                  {errors.title && <p className="text-xs text-red-500 mt-1 pl-1">{errors.title.message}</p>}
                </div>

                {/* Description — floating label */}
                <div className="relative">
                  <textarea
                    {...register("description")}
                    id="task-desc"
                    placeholder=" "
                    rows={3}
                    className="peer w-full bg-muted/20 border border-border/60 rounded-xl px-4 pt-6 pb-2 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm resize-none"
                  />
                  <label
                    htmlFor="task-desc"
                    className={`absolute left-4 text-muted-foreground text-sm transition-all pointer-events-none
                      ${descValue ? "top-2 text-[10px] uppercase tracking-wider font-semibold" : "top-4"}
                      peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-wider peer-focus:font-semibold`}
                  >
                    Description (optional)
                  </label>
                </div>

                {/* Date & Time row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="date"
                      {...register("date")}
                      className={`w-full bg-muted/20 border rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm ${errors.date ? "border-red-500" : "border-border/60"}`}
                    />
                    {errors.date && <p className="text-xs text-red-500 mt-1 pl-1">{errors.date.message}</p>}
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="time"
                      {...register("time")}
                      className="w-full bg-muted/20 border border-border/60 rounded-xl pl-10 pr-3 py-3 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Priority */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Flag className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Priority</span>
                  </div>
                  <div className="flex gap-2">
                    {priorities.map((p) => (
                      <motion.button
                        key={p.value}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setValue("priority", p.value)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer border ${
                          selectedPriority === p.value
                            ? p.value === "high"
                              ? "bg-neon-pink/15 text-neon-pink border-neon-pink/30"
                              : p.value === "medium"
                                ? "bg-neon-cyan/15 text-neon-cyan border-neon-cyan/30"
                                : "bg-muted text-foreground border-border"
                            : "glass border-border/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {p.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Reminder */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <Bell className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Reminder</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {reminderOptions.map((r) => (
                      <motion.button
                        key={r.label}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setValue("reminder", r.value)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer border ${
                          selectedReminder === r.value
                            ? "bg-aurora text-primary-foreground border-transparent"
                            : "glass border-border/50 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {r.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-foreground text-background py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:bg-foreground/90 shadow-lg shadow-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : editTask ? (
                      "Update Task"
                    ) : (
                      "Create Task"
                    )}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
