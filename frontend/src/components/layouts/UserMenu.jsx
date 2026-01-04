import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext"; // Import Context

const getInitials = (name) => {
  return name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";
};

const UserMenu = () => {
  const { currentUser, logout } = useAuth(); // Consume Context
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); // Smooth redirect
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!currentUser) return null; // Safety check

  const displayName =
    currentUser.displayName || currentUser.email.split("@")[0];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-2 py-1.5 rounded-full transition-all border border-white/20 backdrop-blur-sm">
          <span className="hidden md:block px-2 py-0.5 bg-indigo-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
            Citizen
          </span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9f1239] to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md border-2 border-white">
            {currentUser.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              getInitials(displayName)
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 origin-top-right"
          >
            <div className="p-6 border-b border-gray-100 bg-slate-50">
              <h4 className="text-slate-900 font-bold text-base line-clamp-1">
                {displayName}
              </h4>
              <p className="text-slate-500 text-xs truncate">
                {currentUser.email}
              </p>
            </div>
            <div className="p-2">
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#9f1239] rounded-xl transition-colors"
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              {/* Add other links here */}
            </div>
            <div className="p-2 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
