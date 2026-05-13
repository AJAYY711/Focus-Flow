import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Clock, AlarmClock } from "lucide-react";
import { useTasks } from "@/context/TaskContext";

export function ReminderPopup() {
  const { reminder, dismissReminder } = useTasks();

  return (
    <AnimatePresence>
      {reminder && (
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 80, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm w-full"
        >
          <div className="relative glass-strong rounded-2xl p-5 shadow-2xl neon-border overflow-hidden">
            {/* Pulsing glow */}
            <motion.div
              className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-aurora opacity-30 blur-2xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: [0, -15, 15, -10, 10, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <AlarmClock className="h-5 w-5 text-neon-violet" />
                  </motion.div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                    Reminder
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={dismissReminder}
                  className="h-7 w-7 rounded-lg glass grid place-items-center text-muted-foreground hover:text-foreground transition cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </motion.button>
              </div>

              {/* Task info */}
              <p className="font-display text-base font-semibold leading-snug">{reminder.title}</p>
              {reminder.description && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{reminder.description}</p>
              )}

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{reminder.time}</span>
                </div>
                <span
                  className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md font-semibold ${
                    reminder.priority === "high"
                      ? "bg-neon-pink/15 text-neon-pink"
                      : reminder.priority === "medium"
                        ? "bg-neon-cyan/15 text-neon-cyan"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {reminder.priority}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={dismissReminder}
                  className="flex-1 bg-aurora text-primary-foreground py-2.5 rounded-xl text-xs font-semibold glow-ring cursor-pointer"
                >
                  Got it!
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={dismissReminder}
                  className="glass px-4 py-2.5 rounded-xl text-xs font-medium hover:border-primary/30 transition cursor-pointer"
                >
                  Dismiss
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
