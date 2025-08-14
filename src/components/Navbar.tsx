import { useAuthActions } from "@/hooks/use-auth-actions";
import {
  LayoutDashboard,
  LogOut,
  MessageCircle,
  User,
  ClipboardCheck,
} from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Chat", href: "/admin/chat", icon: MessageCircle },
  { name: "Profile", href: "/admin/profile", icon: User },
  { name: "Tasks", href: "/admin/tasks", icon: ClipboardCheck },
];

const Navbar = () => {
  //hook
  const { logout } = useAuthActions();

  return (
    <header className="shadow-md border-b">
      <nav className="p-4 flex gap-4 ">
        {navigation.map((item) => (
          <NavLink
            to={item.href}
            key={item.name}
            className={({ isActive }) =>
              cn(
                "text-gray-700 hover:text-blue-800 flex items-center gap-2",
                isActive ? "text-blue-800 font-bold" : "text-gray-700"
              )
            }
            end
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
        <Button className="ml-auto" onClick={logout}>
          <LogOut className="w-5 h-5 " />
          Logout
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
