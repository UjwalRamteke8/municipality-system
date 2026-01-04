import React from "react";
import { motion } from "framer-motion";

const DashboardCard = ({
  title,
  value,
  icon,
  colorClass = "text-slate-600",
  delay = 0,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick} // Handle the click here
      className={`bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-full ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-1 h-full ${String(
          colorClass
        ).replace("text-", "bg-")}`}
      ></div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
        <div
          className={`p-3 rounded-lg bg-opacity-10 ${String(colorClass).replace(
            "text-",
            "bg-"
          )}`}
        >
          {/* Check if icon is a component or string */}
          {typeof icon === "function" || typeof icon === "object" ? (
            /* If you are passing a Lucide component directly */
            <span className={`w-6 h-6 ${colorClass}`}>{icon}</span>
          ) : (
            <span className={`text-2xl ${colorClass}`}>{icon}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardCard;
