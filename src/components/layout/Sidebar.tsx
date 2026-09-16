import { BookOpen, User, LayoutDashboard, ClipboardList } from "lucide-react";
import SidebarItem from "../layout/SidebarItem";
type SidebarProps = {
  isOpen: boolean;
  onItemClick: () => void;
};
function Sidebar({isOpen, onItemClick}: SidebarProps){
    const menuItems = [
  {
    text: "Dashboard",
    to: "/",
    icon: LayoutDashboard,
  },
  {
    text: "Matérias",
    to: "/subjects",
    icon: BookOpen,
  },
  {
    text: "Simulados",
    to: "/mock-tests",
    icon: ClipboardList,
  },
  {
    text: "Perfil",
    to: "/profile",
    icon: User,
  },
];
    return (
        <aside   className={`
    fixed left-0 top-0 z-40 h-screen
    overflow-hidden bg-slate-100
    transition-all duration-300

    md:static md:z-auto md:translate-x-0

    ${
      isOpen
        ? "w-64 translate-x-0 border-r p-4 md:w-64 md:p-4"
        : "-translate-x-full border-0 p-4 md:w-0 md:translate-x-0 md:p-0"
    }
  `}
>
    <div className="w-56 space -y-2">

        {menuItems.map((stat) => (
        <SidebarItem 
            text ={stat.text}
            key={stat.to}
            to = {stat.to}
            icon={stat.icon}
            onClick={onItemClick}
          />

        ))} 
    </div>

        </aside>
    )
}

export default Sidebar;