import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/focusflow/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});
