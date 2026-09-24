import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen((currentState) => !currentState);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(217,70,239,0.06),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.12),transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(217,70,239,0.08),transparent_50%)]" />
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

        <main className="flex-1 p-6 md:p-8">
          <div className="mx-auto max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
