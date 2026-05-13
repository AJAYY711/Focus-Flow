import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/focusflow/AuroraBackground";
import { Logo } from "@/components/focusflow/Logo";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPassword,
  head: () => ({
    meta: [{ title: "Recover Access — FocusFlow" }],
  }),
});

function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.post('/auth/forgot-password', { email: data.email });
      setSent(true);
      toast.success("Recovery email requested.");
    } catch (e) {
      toast.error("Failed to request recovery. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden">
      <AuroraBackground />
      
      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md px-6 z-10"
      >
        <div className="glass-strong p-8 md:p-10 rounded-3xl border border-border/40 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 bg-aurora opacity-[0.02]" />
          
          {!sent ? (
            <>
              <h1 className="text-2xl font-display font-bold tracking-tight text-foreground mb-2">
                Recover Access
              </h1>
              <p className="text-sm text-muted-foreground mb-8">
                Enter your email address and we'll send you instructions to reset your password.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-1.5">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                    <input
                      {...register("email")}
                      type="email"
                      disabled={submitting}
                      placeholder="Enter your email"
                      className={`w-full bg-muted/20 border border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-500 pl-1">{errors.email.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-foreground text-background py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:bg-foreground/90 disabled:opacity-50 shadow-lg shadow-foreground/10"
                >
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
                </button>
              </form>
            </>
          ) : (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-4"
            >
              <div className="h-12 w-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">Check your email</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                We have sent a recovery link to your inbox. Please check your spam folder if you don't see it.
              </p>
            </motion.div>
          )}

          <div className="mt-8 pt-6 border-t border-border/40 text-center">
            <Link to="/login" className="text-xs font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="h-3 w-3" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
