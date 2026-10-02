import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Onboarding from "@/components/Onboarding";
import ShortcutsHelp from "@/components/ShortcutsHelp";
import SupabaseStatus from "@/components/SupabaseStatus";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

function MainLayout() {
 const [sidebarOpen, setSidebarOpen] = useState(false);
 const location = useLocation();

 useEffect(() => {
  trackPageView(location.pathname);
 }, [location.pathname]);

 function toggleSidebar() {
  setSidebarOpen((currentState) => !currentState);
 }

 function closeSidebar() {
  setSidebarOpen(false);
 }

 return (
  <div className="flex min-h-screen flex-col bg-background">
   {/* Rich background - subtle but filled */}
   <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.04] via-transparent to-fuchsia-500/[0.04] dark:from-violet-500/[0.08] dark:to-fuchsia-500/[0.06]" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)] opacity-[0.03] dark:opacity-[0.06]" />
    <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-400/12 to-fuchsia-400/8 blur-[80px] " />
    <div className="absolute top-[20%] -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-fuchsia-400/8 to-violet-400/6 blur-[100px] " style={{animationDelay: "1s"}} />
    <div className="absolute top-[60%] -left-48 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-300/6 to-indigo-400/6 blur-[100px] " style={{animationDelay: "2s"}} />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(217,70,239,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.12),transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(217,70,239,0.08),transparent_50%)]" />
   </div>

   <Navbar onMenuClick={toggleSidebar} />

   <div className="flex flex-1">
    {sidebarOpen && (
     <button
      type="button"
      aria-label="Fechar menu"
      onClick={() => setSidebarOpen(false)}
      className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
     />
    )}

    <Sidebar isOpen={sidebarOpen} onItemClick={closeSidebar} />

    <main className="flex-1 p-4 sm:p-6 md:p-8">
     <div className="mx-auto max-w-[1400px]">
      <Outlet />
     </div>
    </main>
   </div>
   <Onboarding />
   <ShortcutsHelp />
   <SupabaseStatus />
  </div>
 );
}

export default MainLayout;
