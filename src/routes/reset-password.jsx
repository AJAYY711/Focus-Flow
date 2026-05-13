import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock, ArrowLeft, Loader2 } from "lucide-react";
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
  password: z.string().min(6, "Must be 6 characters"),
  confirmPassword: z.string().min(6, "Must be 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  head: () => ({ meta: [{ title: "Reset Password — FocusFlow" }] }),
});

function ResetPassword() {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.post('/auth/reset-password', { password: data.password, token: "mock_token" });
      toast.success("Password reset successful!");
      navigate({ to: "/login" });
    } catch (e) {
      toast.error("Failed to reset password. Request a new link.");
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md px-6 z-10">
        <div className="glass-strong p-8 md:p-10 rounded-3xl border border-border/40 shadow-elegant relative">
          <h1 className="text-2xl font-display font-bold tracking-tight text-foreground mb-2">Create New Password</h1>
          <p className="text-sm text-muted-foreground mb-8">Secure your account with a fresh password.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground" />
                <input {...register("password")} type="password" placeholder="New password" className={`w-full bg-muted/20 border border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm ${errors.password ? 'border-red-500' : ''}`} />
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-1.5">
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground" />
                <input {...register("confirmPassword")} type="password" placeholder="Confirm new password" className={`w-full bg-muted/20 border border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:border-primary/40 focus:bg-background transition-all shadow-sm ${errors.confirmPassword ? 'border-red-500' : ''}`} />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
            <button type="submit" disabled={submitting} className="w-full bg-foreground text-background py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 mt-2 transition-all hover:bg-foreground/90 disabled:opacity-50">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reset Password"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
