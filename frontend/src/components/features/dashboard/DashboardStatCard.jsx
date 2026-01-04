import React from "react";

export default function DashboardStatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm transition-shadow h-full">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">{value}</h3>
        </div>
        <div
          className={`p-3 rounded-lg bg-opacity-10 ${color.replace(
            "text-",
            "bg-"
          )}`}
        >
          <span className={`text-2xl`}>{icon}</span>
        </div>
      </div>
    </div>
  );
}
