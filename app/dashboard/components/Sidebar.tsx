"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  Package,
  ShoppingCart,
  TrendingUp,
  MessageSquare,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Users", href: "/dashboard/users", icon: <BarChart2 size={20} /> },
  { name: "Orders", href: "/dashboard/orders", icon: <ShoppingCart size={20} /> },
  { name: "Projects", href: "/dashboard/projects", icon: <Package size={20} /> },
  { name: "Services", href: "/dashboard/services", icon: <TrendingUp size={20} /> },

];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-64 bg-white shadow-sm border-r h-screen p-6 flex flex-col">

      {/* Brand */}
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-purple-600 text-white rounded-xl p-2">
          <LayoutDashboard size={22} />
        </div>
        <h1 className="text-xl font-bold text-gray-800">Constuct&Repair</h1>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-4">
        {menu.map((item) => {
          const isActive = path === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all
              ${
                isActive
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="mt-auto">
        <button
          className="flex items-center gap-3 text-gray-500 px-4 py-3 rounded-xl w-full hover:bg-gray-100"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

    </aside>
  );
}
