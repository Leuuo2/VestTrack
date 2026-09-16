import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

type SidebarItemProps = {
  text: string;
  to: string;
  icon: LucideIcon;
  onClick: ()=> void;
};

function SidebarItem({
  text,
  to,
  icon: Icon,
  onClick,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-700 hover:bg-slate-200"
        }`
      }
    >
      <Icon className="h-5 w-5" />

      {text}
    </NavLink>
  );
}

export default SidebarItem;