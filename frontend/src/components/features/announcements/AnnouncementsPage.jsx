import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  Megaphone,
  FileText,
  AlertTriangle,
} from "lucide-react";

export const Announcement = () => {
  const announcements = [
    {
      id: 1,
      title: "Water Supply Disruption in Zone A",
      date: "2024-01-15",
      category: "Alert",
      description:
        "Due to emergency pipeline repairs, water supply will be affected from 10 AM to 4 PM in Sector 7 and 8.",
      type: "urgent",
    },
    {
      id: 2,
      title: "Property Tax Amnesty Scheme 2024",
      date: "2024-01-14",
      category: "Taxation",
      description:
        "Avail 75% waiver on interest for outstanding property tax payments. Offer valid till March 31st.",
      type: "info",
    },
    {
      id: 3,
      title: "New City Park Inauguration",
      date: "2024-01-13",
      category: "Events",
      description:
        "Join us for the opening of the new Green Belt Park at Shivaji Nagar. Chief Guest: Municipal Commissioner.",
      type: "event",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "info":
        return <FileText className="w-5 h-5 text-blue-600" />;
      default:
        return <Megaphone className="w-5 h-5 text-orange-600" />;
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "urgent":
        return "bg-red-100 text-red-800 border-red-200";
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-1 bg-[#9f1239]"></div>
              <h2 className="text-3xl font-bold text-slate-900 font-serif">
                Official Announcements
              </h2>
            </div>
            <p className="text-slate-600 ml-3">
              Stay updated with the latest news, tenders, and public notices.
            </p>
          </div>
          <Link
            to="/announcements"
            className="inline-flex items-center gap-2 text-[#9f1239] font-bold hover:text-[#881337] transition-colors border-b-2 border-transparent hover:border-[#9f1239]"
          >
            View All Archive <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {announcements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-slate-200 overflow-hidden flex flex-col h-full transition-all duration-300"
            >
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getBadgeColor(
                      item.type
                    )}`}
                  >
                    {item.category}
                  </span>
                  <div className="flex items-center text-slate-400 text-xs font-medium">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-3 mb-3">
                  <div className="mt-1 flex-shrink-0">{getIcon(item.type)}</div>
                  <h3 className="text-xl font-bold text-slate-800 leading-snug hover:text-[#9f1239] transition-colors cursor-pointer">
                    {item.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed pl-8">
                  {item.description}
                </p>
              </div>

              <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex justify-end">
                <Link
                  to={`/announcements/${item.id}`}
                  className="text-sm font-bold text-[#9f1239] flex items-center group"
                >
                  Read Details{" "}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
