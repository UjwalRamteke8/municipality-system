import React from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  BookOpen,
  Zap,
  Target,
  Eye,
  Users,
  Landmark,
  Award,
  ArrowRight,
} from "lucide-react";

// --- CONSTANTS ---
const CITY_NAME = "Smart City"; // Change this to your specific city name (e.g., Jalgaon, Pune)

const LEADERSHIP = [
  {
    name: "Dr. Rajesh Kumar",
    role: "Municipal Commissioner",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    message: "Committed to transparency and digital transformation.",
  },
  {
    name: "Smt. Anjali Patil",
    role: "Mayor",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    message: "Working together for a cleaner, greener city.",
  },
];

const STATS = [
  {
    label: "Citizens Served",
    value: "6.4M+",
    icon: <Users className="w-6 h-6" />,
  },
  {
    label: "Admin Ward Offices",
    value: "15",
    icon: <Landmark className="w-6 h-6" />,
  },
  {
    label: "Years of Heritage",
    value: "100+",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    label: "National Awards",
    value: "24",
    icon: <Award className="w-6 h-6" />,
  },
];

export const About = () => {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=2070&auto=format&fit=crop"
            alt="City Skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 max-w-4xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-[#9f1239] border border-white/20 text-xs font-bold tracking-widest uppercase mb-4">
            Since 1950
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight">
            Preserving Heritage, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-200">
              Building the Future
            </span>
          </h1>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto font-light">
            Welcome to the official portal of {CITY_NAME} Municipal Corporation.
            We are dedicated to sustainable urban development and efficient
            civic services.
          </p>
        </motion.div>
      </section>

      {/* --- MISSION & VISION --- */}
      <section className="py-20 px-4 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-xl shadow-slate-200 border-l-4 border-[#9f1239]"
          >
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-[#9f1239] mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              To provide responsive, transparent, and efficient municipal
              services that enhance the quality of life for all citizens while
              preserving our rich cultural heritage.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#9f1239] p-10 rounded-2xl shadow-xl shadow-red-900/20 text-white"
          >
            <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-red-100 leading-relaxed text-lg">
              To transform {CITY_NAME} into a world-class, sustainable, and
              smart metropolis that is economically vibrant, environmentally
              resilient, and socially inclusive.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- HISTORY & HIGHLIGHTS --- */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-sm font-bold text-[#9f1239] tracking-widest uppercase mb-2">
                City Profile
              </h2>
              <h3 className="text-4xl font-bold text-slate-900 font-serif mb-8">
                A City of{" "}
                <span className="border-b-4 border-[#9f1239]/20">
                  Culture & Innovation
                </span>
              </h3>

              <div className="space-y-8">
                <motion.div variants={itemVariants} className="flex gap-5">
                  <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      Historical Significance
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Known as the central hub of the Maratha Empire, the city
                      experienced major growth under Chhatrapati Shivaji Maharaj
                      and the Peshwas, leaving behind a legacy of forts and
                      wadas.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-5">
                  <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      Education Hub
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Often referred to as the "Oxford of the East," we are home
                      to premier research institutes and universities attracting
                      students from across the globe.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="flex gap-5">
                  <div className="flex-shrink-0 mt-1 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      Smart City Evolution
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      Balancing tradition with modernity, {CITY_NAME} has
                      evolved into a global IT and automotive manufacturing hub,
                      embracing smart governance technologies.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Image Grid */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                <img
                  src="https://images.unsplash.com/photo-1596324278456-5421c9a6224d?q=80&w=1000&auto=format&fit=crop"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover transform translate-y-8"
                  alt="City Culture"
                />
                <img
                  src="https://images.unsplash.com/photo-1626156976695-17d4722883a9?q=80&w=1000&auto=format&fit=crop"
                  className="rounded-2xl shadow-lg w-full h-64 object-cover"
                  alt="City Development"
                />
              </motion.div>

              {/* Decorative Circle */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-200 rounded-full opacity-50 border-dashed animate-spin-slow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 bg-[#9f1239] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-4"
              >
                <div className="flex justify-center mb-3 text-red-200">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-red-100 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ADMINISTRATION / LEADERSHIP --- */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16 font-serif">
            City Administration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {LEADERSHIP.map((leader, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-slate-50 rounded-2xl overflow-hidden shadow-lg border border-slate-100 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div className="text-left text-white">
                      <h4 className="text-xl font-bold">{leader.name}</h4>
                      <p className="text-[#9f1239] font-bold bg-white px-2 py-0.5 rounded text-xs inline-block mt-1 uppercase">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-left relative">
                  <span className="absolute top-4 right-6 text-6xl font-serif text-slate-200 -z-10 leading-none">
                    "
                  </span>
                  <p className="text-slate-600 italic">{leader.message}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Want to know more about city projects?
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#9f1239] hover:bg-[#881337] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto transition-all shadow-lg shadow-red-900/40"
        >
          View Development Plan <ArrowRight className="w-5 h-5" />
        </motion.button>
      </section>
    </div>
  );
};
