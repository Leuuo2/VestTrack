import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  text: string;
  to: string;
  icon: LucideIcon;
  onClick: () => void;
};

function SidebarItem({ text, to, icon: Icon, onClick }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/app"}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`
      }
    >
      <Icon className="h-5 w-5" />

      {text}
    </NavLink>
  );
}

export default SidebarItem;
