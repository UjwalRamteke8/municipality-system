import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Settings,
  FileText,
  LogOut,
} from "lucide-react";

const StaffSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    {
      title: "Manage Complaints",
      path: "/staff/complaints",
      icon: ClipboardList,
    },
    { title: "Service Requests", path: "/staff/services", icon: FileText },
    { title: "Admin Settings", path: "/admin", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-slate-900 min-h-screen text-white p-4 hidden md:flex flex-col">
      <div className="mb-10 px-2 text-rose-500 font-bold text-xl flex items-center gap-2">
        <div className="w-8 h-8 bg-rose-600 rounded-lg"></div>
        PMC STAFF
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              isActive(item.path)
                ? "bg-rose-600 text-white shadow-lg shadow-rose-900/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-white/10 pt-4">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/staff-login";
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-500 w-full transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default StaffSidebar;
