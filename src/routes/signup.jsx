import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Mail, Lock, User, Github, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/focusflow/AuroraBackground";
import { Logo } from "@/components/focusflow/Logo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const signupSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 letters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Route = createFileRoute("/signup")({
  component: Signup,
  head: () => ({
    meta: [
      { title: "Create account — FocusFlow" },
      { name: "description", content: "Create your FocusFlow workspace." },
    ],
  }),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

function Signup() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const res = await registerUser(values.name, values.email, values.password);
      if (res.success) {
        toast.success("Account created successfully!");
        navigate({ to: "/dashboard" });
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to create account. Try another email.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocial = () => {
    toast.info("Social enrollment coming soon.");
  };

  return (
    <div className="min-h-screen relative grid lg:grid-cols-2 bg-background selection:bg-primary/10">
      <AuroraBackground />

      {/* Form Side */}
      <div className="flex items-center justify-center p-6 md:p-12 relative order-2 lg:order-1">
        <div className="lg:hidden absolute top-6 left-6">
          <Logo />
        </div>
        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1, duration: 0.4 },
            },
          }}
        >
          <motion.h1 variants={fadeInUp} className="font-display text-3xl font-bold tracking-tight">
            Design your day.
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-sm mt-2">
            Create your FocusFlow workspace in seconds.
          </motion.p>

          <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-3 mt-8">
            <motion.button
              type="button"
              onClick={handleSocial}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer border border-border/50 hover:bg-muted/20 transition-colors"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                />
              </svg>
              Google
            </motion.button>
            <motion.button
              type="button"
              onClick={handleSocial}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-xl py-2.5 text-sm font-medium flex items-center justify-center gap-2 cursor-pointer border border-border/50 hover:bg-muted/20 transition-colors"
            >
              <Github className="h-4 w-4" /> GitHub
            </motion.button>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-3 my-7">
            <div className="flex-1 h-px bg-border/60" />
            <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
              or email
            </span>
            <div className="flex-1 h-px bg-border/60" />
          </motion.div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="space-y-1.5">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    disabled={submitting}
                    className={`w-full bg-muted/20 border border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-xs text-red-500 pl-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                  <input
                    {...register("email")}
                    type="email"
                    disabled={submitting}
                    placeholder="you@example.com"
                    className={`w-full bg-muted/20 border border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-xs text-red-500 pl-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-1.5">
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
                  <input
                    {...register("password")}
                    type="password"
                    disabled={submitting}
                    placeholder="Create a strong password"
                    className={`w-full bg-muted/20 border border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                </div>
                {errors.password && <p className="text-xs text-red-500 pl-1">{errors.password.message}</p>}
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-foreground text-background py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:bg-foreground/90 shadow-lg shadow-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Create workspace <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.div>
            </motion.div>
          </form>

          <motion.p
            variants={fadeInUp}
            className="text-center text-sm text-muted-foreground mt-8 font-medium"
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-foreground underline decoration-border hover:decoration-foreground underline-offset-4 transition-colors"
            >
              Sign in
            </Link>
          </motion.p>
        </motion.div>
      </div>

      {/* Visual Side */}
      <div className="relative hidden lg:flex items-center justify-center p-12 overflow-hidden border-l bg-muted/5 order-1 lg:order-2">
        <motion.div
          className="absolute top-8 right-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Logo />
        </motion.div>
        <div className="absolute inset-0 bg-aurora opacity-[0.03] blur-3xl" />
        <motion.div
          className="relative max-w-md w-full"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="glass-strong rounded-3xl p-10 border border-border/50 shadow-elegant">
            <h3 className="font-display text-2xl font-semibold tracking-tight">What you'll get</h3>
            <ul className="mt-6 space-y-4">
              {[
                "Unified workspace for tasks, notes & goals",
                "Minimal co-pilot that aligns with your flow",
                "Cinematic focus sessions with analytics",
                "Seamless experience across all devices",
              ].map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm font-medium text-foreground/80"
                >
                  <div className="h-5 w-5 rounded-full bg-aurora grid place-items-center shrink-0 mt-0.5 shadow-sm">
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


