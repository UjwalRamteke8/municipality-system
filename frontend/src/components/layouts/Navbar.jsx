import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, Search, Landmark, ChevronDown, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { NAV_LINKS } from "../../constants/navData";
import TopBar from "./TopBar";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  // Connect to Auth Context
  const { currentUser } = useAuth();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) =>
    setIsScrolled(latest > 50)
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300">
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          animate={{
            height: isScrolled ? 0 : "auto",
            opacity: isScrolled ? 0 : 1,
          }}
          className="overflow-hidden"
        >
          <TopBar />
        </motion.div>

        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-gray-200"
              : "bg-gradient-to-b from-black/70 to-transparent py-4"
          }`}
          onMouseLeave={() => setActiveMegaMenu(null)}
        >
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            {/* Logo Section */}
            <Link
              to="/"
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`p-2 rounded-lg shadow-lg transition-colors ${
                  isScrolled ? "bg-[#9f1239]" : "bg-white"
                }`}
              >
                <Landmark
                  className={`w-6 h-6 ${
                    isScrolled ? "text-white" : "text-[#9f1239]"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-lg font-bold leading-tight ${
                    isScrolled ? "text-slate-800" : "text-white"
                  }`}
                >
                  Municipal
                </span>
                <span
                  className={`text-xs uppercase tracking-wider ${
                    isScrolled ? "text-slate-500" : "text-gray-300"
                  }`}
                >
                  Corporation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.name}
                  onMouseEnter={() =>
                    link.type === "mega-menu" && setActiveMegaMenu(link.name)
                  }
                  className="relative"
                >
                  <Link
                    to={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 group ${
                      isScrolled
                        ? "text-slate-700 hover:text-[#9f1239]"
                        : "text-gray-100 hover:text-white"
                    } ${
                      activeMegaMenu === link.name
                        ? isScrolled
                          ? "text-[#9f1239] bg-red-50"
                          : "bg-white/20"
                        : ""
                    }`}
                  >
                    {link.name}{" "}
                    {link.type === "mega-menu" && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Link>

                  {/* Mega Menu Logic */}
                  {link.type === "mega-menu" &&
                    activeMegaMenu === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[800px] -ml-[100px]"
                      >
                        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8 grid grid-cols-12 gap-8 relative overflow-hidden">
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9f1239] to-orange-500" />

                          {/* Citizen Services Column */}
                          <div className="col-span-4">
                            <h4 className="text-[#9f1239] font-bold mb-4 flex items-center gap-2">
                              <User className="w-4 h-4" /> Citizen Services
                            </h4>
                            <ul className="space-y-2">
                              {link.data.citizen.slice(0, 8).map((item) => (
                                <li
                                  key={item}
                                  className="text-sm text-slate-600 hover:text-[#9f1239] cursor-pointer hover:translate-x-1 transition-transform"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Business Services Column */}
                          <div className="col-span-4 border-l border-gray-100 pl-8">
                            <h4 className="text-orange-600 font-bold mb-4 flex items-center gap-2">
                              <Landmark className="w-4 h-4" /> Business
                            </h4>
                            <ul className="space-y-2">
                              {link.data.business.map((item) => (
                                <li
                                  key={item}
                                  className="text-sm text-slate-600 hover:text-orange-600 cursor-pointer hover:translate-x-1 transition-transform"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Quick Actions Column */}
                          <div className="col-span-4 bg-slate-50 -my-8 -mr-8 p-8 flex flex-col">
                            <h4 className="text-slate-800 font-bold mb-4">
                              Quick Actions
                            </h4>
                            <button className="mt-auto w-full bg-[#9f1239] text-white py-3 rounded-lg font-bold hover:bg-[#881337] transition-colors">
                              All Services
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button
                className={`p-2 rounded-full transition-colors ${
                  isScrolled
                    ? "hover:bg-gray-100 text-slate-600"
                    : "hover:bg-white/20 text-white"
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* SMART LOGIN LOGIC: Depends on AuthContext */}
              {currentUser ? (
                <UserMenu />
              ) : (
                <Link to="/citizenlogin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-[#9f1239] hover:bg-[#881337] text-white rounded-full font-medium shadow-lg shadow-red-600/30 transition-all flex items-center gap-2"
                  >
                    Login
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-slate-800" : "text-white"
              }`}
            >
              <Menu className="w-8 h-8" />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
