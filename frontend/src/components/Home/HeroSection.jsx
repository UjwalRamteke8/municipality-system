import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, ChevronRight, Bell } from "lucide-react";

export const HeroSection = () => {
  // Animation Variants for Staggered Entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger delays for children
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white min-h-[700px] flex items-center">
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 select-none">
        {/* Main Image with Zoom Effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1577086664693-894553052526?q=80&w=2070&auto=format&fit=crop"
            alt="City Infrastructure"
            className="w-full h-full object-cover opacity-50"
          />
        </motion.div>

        {/* Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-8 text-center md:text-left"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center md:justify-start"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9f1239]/20 border border-[#9f1239]/50 text-red-200 text-xs font-bold tracking-widest uppercase backdrop-blur-md shadow-lg shadow-red-900/10">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Official Municipal Portal
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
          >
            Building a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Smarter City
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto md:mx-0 leading-relaxed font-light border-l-4 border-[#9f1239] pl-6"
          >
            Empowering citizens with seamless digital services. Experience
            transparent governance, pay taxes instantly, and track city
            developments in real-time.
          </motion.p>

          {/* Buttons Area */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-5 pt-4 justify-center md:justify-start"
          >
            {/* Primary Action */}
            <Link to="/citizen-services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-8 py-4 bg-[#9f1239] hover:bg-[#881337] text-white rounded-xl font-bold shadow-xl shadow-red-900/30 overflow-hidden flex items-center justify-center gap-3 transition-all"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <span>Citizen Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>

            {/* Secondary Action (Glassmorphism) */}
            <Link to="/staff-login">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold backdrop-blur-md flex items-center justify-center gap-3 transition-all hover:border-white/30"
              >
                <Building2 className="w-5 h-5 text-slate-300" />
                <span>Department Login</span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* --- LIVE UPDATES TICKER (Bottom Strip) --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 bg-slate-950/80 border-t border-white/5 backdrop-blur-lg hidden md:flex items-center py-3 px-8 text-sm text-slate-300 z-20"
      >
        <div className="flex items-center gap-3 border-r border-white/10 pr-6 mr-6">
          <Bell className="w-4 h-4 text-[#9f1239]" />
          <span className="font-bold text-white uppercase tracking-wider text-xs">
            Live Updates
          </span>
        </div>
        <div className="flex-1 overflow-hidden relative h-6">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute whitespace-nowrap flex gap-12"
          >
            <span className="flex items-center gap-2">
              🔹 Property Tax filing deadline extended to Dec 31st
            </span>
            <span className="flex items-center gap-2">
              🔹 New water pipeline maintenance scheduled for Zone 4
            </span>
            <span className="flex items-center gap-2">
              🔹 Smart City Hackathon winners announced
            </span>
          </motion.div>
        </div>
        <Link
          to="/announcements"
          className="text-xs font-bold text-white/70 hover:text-white flex items-center gap-1 ml-4 transition-colors"
        >
          View All <ChevronRight className="w-3 h-3" />
        </Link>
      </motion.div>
    </section>
  );
};
