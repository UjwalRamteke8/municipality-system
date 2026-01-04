import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// Component Imports
import Navbar from "../components/layouts/Navbar";
import { HeroSection } from "../components/Home/HeroSection";
import { CitizenServices } from "../components/Home/CitizenServices";
import { CitizenConnect } from "../components/Home/CitizenConnect";
import Sponsors from "./sponsors/SponsorsPage";
import HeroSlider from "../components/Home/HeroSlider";
import ImportantServices from "../components/Home/ImportantServices";
import { QuickLinks } from "../components/Home/QuickLinks";
import { Announcement } from "./announcements/AnnouncementsPageWrapper";
import apiClient from "../api/apiClinet";
import {
  CheckCircle,
  Clock,
  TrendingUp,
  FileText,
  Wrench,
  Award,
  ClipboardCheck,
} from "lucide-react";

const fetchServices = async () => {
  try {
    const response = await apiClient.get("/services/important");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch services:", error);
  }
};

export default function HomePage() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user] = useAuthState(auth);

  // 🧠 The "Smart" Navigation Function
  const handleServiceClick = (path) => {
    if (user) {
      // 1. If logged in, go directly to the service
      navigate(path);
    } else {
      // 2. If NOT logged in, go to login BUT remember where they wanted to go
      navigate("/citizenlogin", { state: { from: path } });
    }
  };

  const services = [
    {
      title: "File Complaint",
      desc: "Report civic issues directly to the administration.",
      icon: <FileText size={32} className="text-[#9f1239]" />,
      path: "/complaints/new",
    },
    {
      title: "Request Service",
      desc: "Water, drainage, and road repair requests.",
      icon: <Wrench size={32} className="text-[#9f1239]" />,
      path: "/services/request",
    },
    {
      title: "Track Status",
      desc: "Monitor your complaints and service requests.",
      icon: <ClipboardCheck size={32} className="text-[#9f1239]" />,
      path: "/services/tracker",
    },
    {
      title: "Achievements",
      desc: "View municipality performance and initiatives.",
      icon: <Award size={32} className="text-[#9f1239]" />,
      path: "/achievements",
    },
  ];

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Transparent Tracking",
      description: "Real-time updates on your requests and complaints",
      color: "text-green-600 bg-green-50",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Quick Response",
      description: "Fast processing and resolution of your concerns",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Smart Monitoring",
      description: "IoT-powered insights for better city management",
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <HeroSection />

      <QuickLinks />

      <HeroSlider />

      <Announcement />

      {/* Smart Services Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Quick Access Services
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Access essential services with one click. Log in to unlock all
              features.
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
                whileHover={{ scale: 1.05 }}
                className="border border-slate-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-1 bg-white flex flex-col items-center text-center group"
              >
                <div className="bg-rose-50 p-4 rounded-full mb-6 group-hover:bg-[#9f1239] transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  {service.desc}
                </p>

                {/* 🧠 The Button triggers our smart function */}
                <button
                  onClick={() => handleServiceClick(service.path)}
                  className="mt-auto text-[#9f1239] font-bold text-sm tracking-wide hover:text-rose-800 flex items-center gap-1 uppercase"
                >
                  Access Now <span className="text-lg">→</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CitizenServices />
      <CitizenConnect />
      <ImportantServices />

      <Sponsors />

      {/* Services Overview / Why Choose Us */}
      <section className="py-16 px-4 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our portal serves citizens, staff and administrators with
              transparency, efficiency and accountability. From complaint
              tracking to service requests and live IoT dashboards — we bring
              public services into your hands.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
