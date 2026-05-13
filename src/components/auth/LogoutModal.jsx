import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export function LogoutModal({ open, setOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully.");
    setOpen(false);
    navigate({ to: '/login' });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="glass-strong border border-border/40">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display">Sign out of FocusFlow?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your current session. Make sure your work is synced.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleLogout}
            className="rounded-xl bg-red-500 hover:bg-red-600 text-white"
          >
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
