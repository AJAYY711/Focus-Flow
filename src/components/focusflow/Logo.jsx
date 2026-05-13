import { Link } from "@tanstack/react-router";

export function Logo({ to = "/" }) {
  return (
    <Link to={to} className="group flex items-center gap-2.5">
      <div className="relative h-8 w-8 rounded-xl bg-aurora glow-ring grid place-items-center">
        <div className="h-3 w-3 rounded-sm bg-background/80 group-hover:rotate-45 transition-transform duration-500" />
      </div>
      <span className="font-display text-lg font-semibold tracking-tight">
        Focus<span className="text-gradient">Flow</span>
      </span>
    </Link>
  );
}
