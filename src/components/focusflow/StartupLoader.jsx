import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function StartupLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            scale: 1.05,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <div className="absolute inset-0 bg-gradient-mesh opacity-60" />

          <div className="relative flex flex-col items-center">
            <motion.div
              className="relative h-32 w-32"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              {/* Galaxy Orbits */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                style={{ scale: 0.6, skewX: 12, skewY: 12 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-neon-violet/40"
                style={{ scale: 0.8, skewX: -20, skewY: 10 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-neon-cyan/30"
                style={{ scale: 1, skewX: 30, skewY: -20 }}
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              />

              {/* Center Glowing Core */}
              <motion.div
                className="absolute inset-[35%] rounded-full bg-aurora blur-md shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="mt-12 text-center overflow-hidden">
              <motion.div
                initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-3xl font-semibold tracking-tight font-display flex items-center gap-2">
                  Focus<span className="text-gradient">Flow</span>
                </h2>
              </motion.div>

              <div className="mt-3 h-[1px] w-48 mx-auto bg-muted relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-aurora w-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2.8,
                    ease: [0.6, 0.05, 0.01, 0.9],
                  }}
                />
              </div>

              <motion.p
                className="mt-4 text-xs text-muted-foreground tracking-[0.2em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.5, 1] }}
                transition={{ delay: 0.8, duration: 1.5 }}
              >
                Initializing Neural Space
              </motion.p>
            </div>
          </div>

          {/* Floating Ambient Dust particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/20"
              initial={{
                x: Math.random() * 1000 - 500,
                y: Math.random() * 1000 - 500,
                opacity: Math.random(),
              }}
              animate={{
                y: [null, Math.random() * -200],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{ filter: "blur(1px)" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
