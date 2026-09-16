import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
 


function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen((currentState) => !currentState);
  }
  function closeSidebar(){
    setSidebarOpen(false);
  }
  return (
    <div>
      <Navbar onMenuClick={toggleSidebar} />

      <div className="flex bg-red-200">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
          />
        )}

        <Sidebar isOpen={sidebarOpen} 
        onItemClick={closeSidebar}
        />

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


export default MainLayout;