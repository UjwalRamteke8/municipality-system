import { motion } from "framer-motion";
import { Users, Building2, PhoneCall } from "lucide-react";

export const DistrictHighlightCard = () => {
  const districtStats = [
    {
      icon: <Users className="w-6 h-6" />,
      label: "Citizens Served",
      value: "9.4M+",
      description: "Total Population",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      label: "Admin Offices",
      value: "15",
      description: "Ward Offices",
    },
    {
      icon: <PhoneCall className="w-6 h-6" />,
      label: "Support",
      value: "24/7",
      description: "Helpline Active",
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200"
        >
          {districtStats.map((stat, index) => (
            <div key={index} className="pt-8 md:pt-0 px-4 text-center">
              <div className="flex flex-col items-center">
                <div className="mb-4 p-3 bg-red-50 rounded-full text-[#9f1239]">
                  {stat.icon}
                </div>
                <div className="text-4xl font-extrabold text-slate-900 mb-2 font-serif">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#9f1239] uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="text-slate-500 text-sm">{stat.description}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
