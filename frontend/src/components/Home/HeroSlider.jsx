import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// --- DATA CONSTANTS ---
const SLIDES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1577086664693-894553052526?q=80&w=2070&auto=format&fit=crop",
    alt: "City Administration",
    title: "Municipal Corporation",
    subtitle:
      "Empowering citizens with seamless digital services and sustainable infrastructure for a better tomorrow.",
    cta: "View Services",
    link: "/services/new",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    alt: "Smart City",
    title: "Digital Governance",
    subtitle:
      "Experience the future of urban living with our transparent, efficient, and accessible e-governance portal.",
    cta: "Citizen Login",
    link: "/citizenlogin",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?q=80&w=2070&auto=format&fit=crop",
    alt: "Green Infrastructure",
    title: "Sustainable Development",
    subtitle:
      "Building a greener, cleaner city through community participation and modern urban planning.",
    cta: "View Projects",
    link: "/about",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timeoutRef = useRef(null);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1.1, // Subtle zoom effect on entry
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 1,
    }),
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isAutoPlaying) {
      timeoutRef.current = setTimeout(nextSlide, 6000); // 6 seconds for better readability
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, isAutoPlaying]);

  return (
    <div
      className="relative w-full h-[600px] lg:h-[750px] overflow-hidden bg-slate-900 group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Image */}
          <img
            src={SLIDES[current].src}
            alt={SLIDES[current].alt}
            className="w-full h-full object-cover"
          />

          {/* Dark Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

          {/* Text Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-7xl w-full px-6 flex flex-col items-center md:items-start text-center md:text-left text-white mt-16">
              {/* Badge Animation */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-block py-1.5 px-4 rounded-full bg-[#9f1239]/90 border border-white/20 backdrop-blur-md text-xs font-bold tracking-widest uppercase mb-6 shadow-lg"
              >
                Official Portal
              </motion.span>

              {/* Title Animation */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl"
              >
                {SLIDES[current].title}
              </motion.h1>

              {/* Subtitle Animation */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8 leading-relaxed drop-shadow-md font-light"
              >
                {SLIDES[current].subtitle}
              </motion.p>

              {/* CTA Button Animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link to={SLIDES[current].link}>
                  <button className="px-8 py-4 bg-[#9f1239] hover:bg-[#881337] text-white rounded-lg font-bold flex items-center gap-3 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-red-900/30 ring-2 ring-white/10 hover:ring-white/30">
                    {SLIDES[current].cta} <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* --- UI CONTROLS --- */}

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-[#9f1239] text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hidden md:block"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-[#9f1239] text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100 hover:scale-110 hidden md:block"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > current ? 1 : -1);
              setCurrent(index);
            }}
            className={`h-2 transition-all rounded-full ${
              current === index
                ? "w-8 bg-[#9f1239]"
                : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
