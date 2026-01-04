import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  Battery,
  Waves,
  Wind,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const IoTDashboard = () => {
  // Mock Data
  const [sensorData, setSensorData] = useState({
    temperature: 24,
    humidity: 65,
    battery: 85,
    waterLevel: 75,
    airQuality: 92,
  });

  const [alerts] = useState([
    {
      id: 1,
      type: "warning",
      message: "Zone A: Temp limit exceeded > 35°C",
      time: "2 min ago",
    },
    {
      id: 2,
      type: "success",
      message: "Pump Station 4: Routine check passed",
      time: "10 min ago",
    },
    {
      id: 3,
      type: "error",
      message: "Sector 9: Street light grid failure",
      time: "1 hr ago",
    },
  ]);

  // Simulation Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData((prev) => ({
        temperature: +(prev.temperature + (Math.random() - 0.5)).toFixed(1),
        humidity: Math.min(
          100,
          Math.max(0, +(prev.humidity + (Math.random() - 0.5) * 2).toFixed(0))
        ),
        battery: Math.max(0, +(prev.battery - 0.05).toFixed(1)),
        waterLevel: Math.min(
          100,
          Math.max(0, +(prev.waterLevel + (Math.random() - 0.5)).toFixed(0))
        ),
        airQuality: Math.max(
          0,
          +(prev.airQuality + (Math.random() - 0.5)).toFixed(0)
        ),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (val, max, type) => {
    const pct = (val / max) * 100;
    if (type === "battery")
      return pct < 20
        ? "text-red-600"
        : pct < 50
        ? "text-yellow-600"
        : "text-green-600";
    if (type === "air")
      return val < 50
        ? "text-red-600"
        : val < 80
        ? "text-yellow-600"
        : "text-green-600";
    return "text-slate-800";
  };

  const SensorCard = ({ icon: Icon, title, value, unit, max, colorClass }) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col justify-between h-36 relative overflow-hidden group hover:shadow-md transition-all">
      <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-full -mr-4 -mt-4 z-0 group-hover:scale-110 transition-transform"></div>

      <div className="flex justify-between items-start relative z-10">
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${colorClass.replace("bg-", "text-")}`} />
        </div>
        {value > max * 0.9 && (
          <span className="animate-pulse w-2 h-2 rounded-full bg-red-500"></span>
        )}
      </div>

      <div className="relative z-10 mt-2">
        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wide">
          {title}
        </h3>
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold text-slate-800">{value}</span>
          <span className="text-sm font-bold text-slate-400 mb-1">{unit}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-100">
        <motion.div
          className={`h-full ${colorClass.replace("bg-", "bg-")}`}
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Activity className="text-[#9f1239]" /> Smart City Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Real-time infrastructure monitoring system • Zone: Central
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-600">
              System Online
            </span>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <SensorCard
            icon={Thermometer}
            title="Avg Temp"
            value={sensorData.temperature}
            unit="°C"
            max={50}
            colorClass="bg-orange-500 text-orange-600"
          />
          <SensorCard
            icon={Droplets}
            title="Humidity"
            value={sensorData.humidity}
            unit="%"
            max={100}
            colorClass="bg-blue-500 text-blue-600"
          />
          <SensorCard
            icon={Wind}
            title="Air Quality"
            value={sensorData.airQuality}
            unit="AQI"
            max={200}
            colorClass="bg-purple-500 text-purple-600"
          />
          <SensorCard
            icon={Waves}
            title="Water Level"
            value={sensorData.waterLevel}
            unit="%"
            max={100}
            colorClass="bg-cyan-500 text-cyan-600"
          />
          <SensorCard
            icon={Battery}
            title="Sensor Bat."
            value={sensorData.battery}
            unit="%"
            max={100}
            colorClass="bg-green-500 text-green-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Placeholder */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800">
                24h Temperature Trends
              </h3>
              <select className="text-xs border border-slate-300 rounded-md px-2 py-1 bg-slate-50">
                <option>Last 24 Hours</option>
                <option>Last Week</option>
              </select>
            </div>
            {/* Visual Placeholder for a Chart */}
            <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-l border-slate-200 pb-2">
              {[40, 60, 45, 70, 50, 65, 55, 80, 75, 60, 90, 85].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full bg-blue-100 hover:bg-[#9f1239] hover:bg-opacity-80 rounded-t-sm transition-colors relative group"
                >
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white px-1.5 rounded">
                    {h}°
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400 font-mono">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>Now</span>
            </div>
          </div>

          {/* Live Alerts Feed */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center justify-between">
              Live Alerts
              <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-bold">
                3 Active
              </span>
            </h3>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex gap-3 items-start pb-3 border-b border-slate-50 last:border-0 last:pb-0"
                >
                  <div
                    className={`mt-0.5 flex-shrink-0 w-2 h-2 rounded-full ${
                      alert.type === "warning"
                        ? "bg-yellow-500"
                        : alert.type === "error"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  ></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 leading-tight">
                      {alert.message}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <ClockIcon className="w-3 h-3" /> {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-xs font-bold text-slate-500 hover:text-[#9f1239] border border-dashed border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              View System Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Clock Icon component for local usage
const ClockIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default IoTDashboard;
