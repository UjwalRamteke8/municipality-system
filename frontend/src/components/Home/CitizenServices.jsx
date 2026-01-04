import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FileText, Wrench, Award, FileCheck, ArrowRight } from "lucide-react";

export const CitizenServices = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  // Smart navigation: go to service if logged in, otherwise go to login and remember destination
  const handleServiceClick = (path) => {
    if (currentUser) {
      navigate(path);
    } else {
      navigate("/citizenlogin", { state: { from: path } });
    }
  };

  const services = [
    {
      icon: <FileText className="w-7 h-7" />,
      title: "File Complaint",
      description: "Report civic issues directly to the administration.",
      path: "/complaints/new",
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Upload Photo",
      description: "Report civic issues directly to the administration.",
      path: "/gallery/upload-photo",
    },
    {
      icon: <Wrench className="w-7 h-7" />,
      title: "Request Service",
      description: "Water, drainage, and road repair requests.",
      path: "/services/request",
    },
    {
      icon: <Award className="w-7 h-7" />,
      title: "Certificates",
      description: "Birth, Death, and Marriage registration services.",
      path: "/certificates",
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Gallery Access",
      description: "City media and public uploads.",
      path: "/gallery",
    },
    {
      icon: <FileText className="w-7 h-7" />,
      title: "Licenses & Permits",
      description: "Apply for trade licenses and building permits.",
      path: "/licenses",
    },
  ];

  return (
    <section className="py-16 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-serif mb-3">
            Citizen Services
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Convenient digital services to save your time and improve city
            governance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <button
                type="button"
                onClick={() => handleServiceClick(service.path)}
                className="block h-full text-left"
              >
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:border-[#9f1239]/30 group">
                  <div className="w-14 h-14 bg-red-50 text-[#9f1239] rounded-full flex items-center justify-center mb-5 group-hover:bg-[#9f1239] group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#9f1239] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-500 text-sm mb-6 flex-grow">
                    {service.description}
                  </p>

                  <div className="flex items-center text-[#9f1239] font-bold text-sm tracking-wide uppercase mt-auto group-hover:gap-2 transition-all">
                    Access Now <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
