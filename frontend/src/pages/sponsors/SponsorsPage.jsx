import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Building2 } from "lucide-react";

// Internal component to handle image loading errors gracefully
const SponsorLogo = ({ src, alt, name }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError || !src) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-20 w-full px-2">
        <Building2 className="w-8 h-8 text-slate-300 mb-2" />
        <span className="text-xs font-bold text-slate-500 leading-tight">
          {name}
        </span>
      </div>
    );
  }

  return (
    <img
      className="max-h-16 w-auto object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      src={src}
      alt={alt}
      onError={() => setImgError(true)}
    />
  );
};

export default function Sponsors() {
  const sponsors = [
    {
      name: "Jalgaon Municipal Corporation",
      url: "https://www.jcmc.gov.in/",
      logo: "/images/Jalgaon Logo.png",
    },
    {
      name: "Pune Municipal Corporation",
      url: "https://www.pmc.gov.in/en",
      logo: "/images/PMC logo.webp",
    },
    {
      name: "Chh. Sambhajinagar Municipal Corporation",
      url: "https://chhsambhajinagarmc.org/",
      logo: "/images/CSMC logo.jpeg",
    },
    {
      name: "Nagpur Municipal Corporation",
      url: "https://nmcnagpur.gov.in",
      logo: "/images/NMC logo.png", // Update with correct path if available
    },
    {
      name: "Nashik Municipal Corporation",
      url: "https://nmc.gov.in/",
      logo: "/images/Nashik logo.png", // Update with correct path if available
    },
  ];

  return (
    <section className="relative py-16 bg-white border-t border-slate-100 overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#9f1239_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold text-[#9f1239] tracking-[0.2em] uppercase bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Strategic Partners
          </span>
          <h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl font-serif">
            Collaborating with Major Corporations
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-3 sm:gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {sponsors.map((sponsor, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex justify-center"
            >
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center justify-center w-full h-32 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#9f1239]/20 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#9f1239]/0 to-[#9f1239]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <SponsorLogo
                  src={sponsor.logo}
                  alt={sponsor.name}
                  name={sponsor.name}
                />

                {/* Hover Action Text */}
                <div className="absolute bottom-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1 text-[10px] font-bold text-[#9f1239] uppercase tracking-wide">
                  Visit Site <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
