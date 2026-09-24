import { CloudCheck, LogIn, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import ThemeToggle from "../ThemeToggle";
import { useCloudUser } from "@/lib/useCloudUser";

type NavbarProps = {
  onMenuClick: () => void;
};

function Navbar({ onMenuClick }: NavbarProps) {
  const user = useCloudUser();

  return (
    <nav className="sticky top-0 z-30 flex h-[64px] items-center justify-between border-b border-border/60 bg-card/80 px-6 shadow-[0_1px_0_0_rgba(0,0,0,0.02),0_8px_24px_-12px_rgba(139,92,246,0.15)] backdrop-blur-xl supports-[backdrop-filter]:bg-card/70">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-500/[0.06] via-transparent to-transparent" />
      <Logo />

      <div className="relative flex items-center gap-2">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menu"
          className="rounded-xl p-2.5 text-foreground transition-colors hover:bg-muted"
        >
          <Menu className="h-5 w-5" />
        </button>

        <ThemeToggle />

        {user ? (
          <Link
            to="/app/sync"
            className="group flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-2 text-sm font-semibold text-emerald-600 shadow-sm ring-1 ring-emerald-500/10 transition-all hover:bg-emerald-500/15 hover:shadow dark:text-emerald-400"
          >
            <CloudCheck className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="hidden sm:inline">Sincronizado</span>
          </Link>
        ) : (
          <Link
            to="/app/sync"
            className="group flex items-center gap-1.5 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_4px_12px_-2px_rgba(139,92,246,0.4)] transition-all hover:shadow-[0_6px_16px_-2px_rgba(139,92,246,0.5)] hover:from-violet-500 hover:to-fuchsia-500"
          >
            <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
