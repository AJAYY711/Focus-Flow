import { Outlet, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { AuroraBackground } from "./AuroraBackground";
import { CommandPalette } from "./CommandPalette";

import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../context/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: '/login' });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 w-full max-w-sm p-4">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4 mx-auto" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Handled by redirect
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-background selection:bg-primary/10">
      <AuroraBackground />
      <CommandPalette />
      <Sidebar />
      <main className="lg:pl-64 min-h-screen relative">
        <div className="p-4 md:p-8 pb-28 lg:pb-8 max-w-[1600px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <MobileNav />
    </div>
  );
}


