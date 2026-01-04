import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Megaphone, Activity, MessageSquare } from "lucide-react";

export const QuickLinks = () => {
  const quickLinks = [
    {
      label: "Track Application",
      path: "/services/tracker",
      icon: <Clock className="w-5 h-5" />,
    },
    {
      label: "Tenders & Notices",
      path: "/announcements",
      icon: <Megaphone className="w-5 h-5" />,
    },
    {
      label: "Smart City Dashboard",
      path: "/iot",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      label: "Grievance Redressal",
      path: "/chat",
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-slate-100 border-y border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <span className="w-2 h-8 bg-[#9f1239] rounded-sm"></span>
            Quick Access
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <Link
                to={link.path}
                className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-[#9f1239] hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-[#9f1239] group-hover:text-white transition-colors">
                  {link.icon}
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-[#9f1239] transition-colors">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
