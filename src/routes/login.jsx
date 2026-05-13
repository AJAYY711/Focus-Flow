import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Mail, Lock, Github, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/focusflow/AuroraBackground";
import { Logo } from "@/components/focusflow/Logo";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [
      { title: "Sign in — FocusFlow" },
      { name: "description", content: "Sign in to your FocusFlow workspace." },
    ],
  }),
});

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const res = await login(values.email, values.password);
      if (res.success) {
        toast.success("Successfully signed in.");
        navigate({ to: "/dashboard" });
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to sign in. Check your credentials.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSocial = async () => {
    setSubmitting(true);
    try {
      const res = await googleLogin();
      if (res.success) {
        toast.success(`Welcome back, ${res.user.name}!`);
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error("Instant login failed to initialize.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative grid lg:grid-cols-2 bg-background selection:bg-primary/10">
      <AuroraBackground />

      {/* Visual side */}
      <div className="relative hidden lg:flex items-center justify-center p-12 overflow-hidden border-r bg-muted/5">
        <motion.div
          className="absolute top-8 left-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Logo />
        </motion.div>
        <div className="absolute inset-0 bg-aurora opacity-[0.03] blur-3xl" />
        <motion.div
          className="relative max-w-md"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="glass-strong rounded-3xl p-10 border border-border/50 shadow-elegant">
            <p className="font-display text-3xl font-semibold leading-tight tracking-tight text-foreground/90">
              "FocusFlow turned my chaotic days into{" "}
              <span className="text-gradient font-bold">deliberate flow</span>."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-11 w-11 rounded-full bg-aurora grid place-items-center text-primary-foreground font-medium shadow-md">
                M
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Maya Chen</p>
                <p className="text-xs text-muted-foreground font-medium">Founder, Lumen</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 md:p-12 relative">
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
              transition: {
                staggerChildren: 0.1,
                duration: 0.4,
              },
            },
          }}
        >
          <motion.h1 variants={fadeInUp} className="font-display text-3xl font-bold tracking-tight">
            Welcome back
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-muted-foreground text-sm mt-2">
            Sign in to continue your flow.
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
                    placeholder="Password"
                    className={`w-full bg-muted/20 border border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                </div>
                {errors.password && <p className="text-xs text-red-500 pl-1">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between text-xs font-medium">
                <label className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
                  <input type="checkbox" className="accent-primary rounded border-border" /> Remember
                  me
                </label>
                <Link to="/forgot-password" className="text-muted-foreground hover:text-foreground transition-colors">
                  Forgot password?
                </Link>
              </div>

              <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-2 bg-foreground text-background py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:bg-foreground/90 shadow-lg shadow-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Sign in <ArrowRight className="h-4 w-4" />
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
            New here?{" "}
            <Link
              to="/signup"
              className="text-foreground underline decoration-border hover:decoration-foreground underline-offset-4 transition-colors"
            >
              Create account
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}


