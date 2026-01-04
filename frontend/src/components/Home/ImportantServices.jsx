import { motion } from "framer-motion";
import {
  Flame,
  Ambulance,
  PhoneCall,
  Siren,
  Stethoscope,
  Droplets,
} from "lucide-react";

const ImportantServicesContacts = () => {
  const services = [
    {
      label: "Fire Brigade",
      icon: <Flame className="w-8 h-8" />,
      link: "https://mahafireservice.gov.in/",
    },
    {
      label: "Ambulance",
      icon: <Ambulance className="w-8 h-8" />,
      link: "https://112.gov.in/",
    },
    {
      label: "Emergency Numbers",
      icon: <PhoneCall className="w-8 h-8" />,
      link: "https://112.gov.in/",
    },
    {
      label: "Police",
      icon: <Siren className="w-8 h-8" />,
      link: "https://dial112.mahapolice.gov.in/CitizenPortal-Maharashtra/dial-112",
    },
    {
      label: "Hospitals",
      icon: <Stethoscope className="w-8 h-8" />,
      link: "https://112.gov.in/",
    },
    {
      label: "Blood Bank",
      icon: <Droplets className="w-8 h-8" />,
      link: "https://ors.gov.in/ebloodbankportal/",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mb-2">
            Important Services and Contacts
          </h2>
          <div className="h-1 w-24 bg-[#9f1239] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.a
              key={index}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer block"
            >
              <div className="h-32 flex flex-col items-center justify-center rounded-2xl border-2 border-slate-200 bg-gray-50 hover:bg-white hover:border-[#9f1239] hover:shadow-xl transition-all duration-300">
                <div className="mb-2 text-slate-600 group-hover:text-[#9f1239] transition-colors">
                  {service.icon}
                </div>
                <span className="text-lg font-bold text-slate-800 group-hover:text-[#9f1239] transition-colors">
                  {service.label}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// FIX: Change named export to default export
export default ImportantServicesContacts;
