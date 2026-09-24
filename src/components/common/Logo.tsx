import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

function Logo({ to = "/app" }: { to?: string }) {
  return (
    <Link to={to} className="group flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-md shadow-violet-500/25 transition-transform duration-300 group-hover:scale-105">
        <GraduationCap className="h-5 w-5 text-white" />
      </span>
      <span className="text-xl font-bold tracking-tight text-foreground">
        VestTrack
      </span>
    </Link>
  );
}

export default Logo;
