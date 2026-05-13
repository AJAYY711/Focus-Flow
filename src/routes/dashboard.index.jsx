import { createFileRoute } from "@tanstack/react-router";
import { TopBar } from "@/components/focusflow/TopBar";
import {
  GreetingCard,
  ClockCard,
  ProductivityScore,
  FocusScoreCard,
  PomodoroCard,
  TasksWidget,
  GoalsWidget,
  MoodCard,
  MusicCard,
  AICard,
  HabitsCard,
} from "@/components/focusflow/widgets";
export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
  head: () => ({ meta: [{ title: "Dashboard — FocusFlow" }] }),
});
function DashboardHome() {
  return (
    <>
      <TopBar title="Dashboard" subtitle="Your day at a glance" />
      <div className="grid grid-cols-12 gap-5">
        <GreetingCard />
        <ClockCard />
        <ProductivityScore />
        <FocusScoreCard />
        <PomodoroCard />
        <TasksWidget />
        <GoalsWidget />
        <MoodCard />
        <MusicCard />
        <AICard />
        <HabitsCard />
      </div>
    </>
  );
}
