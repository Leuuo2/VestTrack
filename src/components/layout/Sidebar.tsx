import {
  BookOpen,
  User,
  LayoutDashboard,
  ClipboardList,
  Cloud,
  Brain,
  CalendarCheck,
  Layers,
  Calendar,
  Timer,
  Trophy,
  AlertTriangle,
  Map,
  Bot,
  StickyNote,
  Target,
  BarChart3,
} from "lucide-react";
import SidebarItem from "../layout/SidebarItem";

type SidebarProps = {
  isOpen: boolean;
  onItemClick: () => void;
};

function Sidebar({ isOpen, onItemClick }: SidebarProps) {
  const menuItems = [
    {
      text: "Dashboard",
      to: "/app",
      icon: LayoutDashboard,
    },
    {
      text: "Hoje",
      to: "/app/today",
      icon: CalendarCheck,
    },
    {
      text: "Matérias",
      to: "/app/subjects",
      icon: BookOpen,
    },
    {
      text: "Questões",
      to: "/app/questions",
      icon: Brain,
    },
    {
      text: "Flashcards",
      to: "/app/flashcards",
      icon: Layers,
    },
    {
      text: "Calendário",
      to: "/app/calendar",
      icon: Calendar,
    },
    {
      text: "Plano",
      to: "/app/study-plan",
      icon: Map,
    },
    {
      text: "Foco",
      to: "/app/focus",
      icon: Timer,
    },
    {
      text: "Simulados",
      to: "/app/mock-tests",
      icon: ClipboardList,
    },
    {
      text: "Resumos",
      to: "/app/summaries",
      icon: StickyNote,
    },
    {
      text: "Tutor IA",
      to: "/app/tutor",
      icon: Bot,
    },
    {
      text: "Metas",
      to: "/app/goals",
      icon: Target,
    },
    {
      text: "Analytics",
      to: "/app/analytics",
      icon: BarChart3,
    },
    {
      text: "Pontos fracos",
      to: "/app/weak-topics",
      icon: AlertTriangle,
    },
    {
      text: "Conquistas",
      to: "/app/achievements",
      icon: Trophy,
    },
    {
      text: "Sincronizar",
      to: "/app/sync",
      icon: Cloud,
    },
    {
      text: "Perfil",
      to: "/app/profile",
      icon: User,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" onClick={onItemClick} />
      )}

      <aside
        className={`
          z-40 bg-card transition-all duration-300 ease-out
          border-border/60
          
          /* Mobile: fixed drawer */
          fixed left-0 top-0 h-screen w-64 p-4
          md:hidden
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center gap-2.5 px-2 pt-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white shadow-sm">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="font-bold tracking-tight">VestTrack</span>
          </div>

          <div className="flex-1 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <SidebarItem
                text={item.text}
                key={item.to}
                to={item.to}
                icon={item.icon}
                onClick={onItemClick}
              />
            ))}
          </div>

          <div className="mt-auto rounded-xl bg-muted p-3">
            <p className="text-xs font-medium">VestTrack</p>
            <p className="mt-1 text-[11px] text-muted-foreground">10 matérias · 500 questões · offline</p>
          </div>
        </div>
      </aside>

      {/* Desktop: sticky sidebar that stays fixed while scrolling */}
      <aside className="sticky top-[64px] hidden h-[calc(100vh-64px)] w-64 shrink-0 flex-col border-r border-border/60 bg-card/80 p-4 backdrop-blur-xl md:flex">
        <div className="flex h-full flex-col">
          <div className="flex-1 space-y-1 overflow-y-auto pr-1 [scrollbar-width:thin]">
            {menuItems.map((item) => (
              <SidebarItem
                text={item.text}
                key={`desktop-${item.to}`}
                to={item.to}
                icon={item.icon}
                onClick={onItemClick}
              />
            ))}
          </div>

          <div className="mt-auto space-y-3">
            <div className="rounded-xl bg-muted p-3.5">
              <p className="text-xs font-medium">VestTrack</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                10 matérias · 500 questões · planner
              </p>
            </div>
            <p className="px-2 text-[10px] text-muted-foreground">© 2026 VestTrack</p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
