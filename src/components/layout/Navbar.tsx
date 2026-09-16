import Logo from "../common/Logo";
import { Menu } from "lucide-react";
type NavbarProps = {
  onMenuClick: () => void;
};
function Navbar({ onMenuClick }: NavbarProps){
  return (
    <nav className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <Logo />
      <button
  type="button"
  onClick={onMenuClick}
  className="rounded-lg p-1 hover:bg-slate-100"
>
  <Menu className="h-6 w-6" />
</button>
      <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
        Entrar
      </button>
      
    </nav>
  );
}

export default Navbar;