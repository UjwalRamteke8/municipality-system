import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { MapPin, Phone, Mail, ChevronRight, ArrowUp, Send } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = [
    {
      title: "Services",
      links: [
        { name: "Online Services", path: "/services/online" },
        { name: "Birth & Death Registration", path: "/services/birth-death" },
        { name: "Property Tax Payment", path: "/services/property-tax" },
        { name: "Water Tax Payment", path: "/services/water-tax" },
        { name: "Building Plan Approval", path: "/services/building-plan" },
        { name: "Tenders & Quotations", path: "/services/tenders" },
      ],
    },
    {
      title: "Information",
      links: [
        { name: "About PMC", path: "/about" },
        { name: "Corporators", path: "/corporators" },
        { name: "Departments", path: "/departments" },
        { name: "RTI Act", path: "/rti" },
        { name: "News & Press", path: "/news" },
        { name: "FAQs", path: "/faqs" },
      ],
    },
    {
      title: "Quick Links",
      links: [
        { name: "Maharashtra Govt.", url: "https://www.maharashtra.gov.in/" },
        { name: "National Portal", url: "https://www.india.gov.in/" },
        { name: "Sitemap", path: "/sitemap" },
        { name: "Terms & Conditions", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Help & Support", path: "/help" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-50 pt-16 border-t border-slate-200 text-slate-700 font-sans relative">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9f1239] via-orange-500 to-[#9f1239]"></div>

      <div className="container mx-auto px-6 lg:px-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Dynamic Link Columns */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-[#9f1239] font-bold text-lg mb-6 uppercase tracking-wider border-b-2 border-[#9f1239]/10 pb-2 inline-block">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    {link.path ? (
                      <Link
                        to={link.path}
                        className="group flex items-center text-sm font-medium hover:text-[#9f1239] transition-all duration-300"
                      >
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#9f1239] mr-2 transition-transform group-hover:translate-x-1" />
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center text-sm font-medium hover:text-[#9f1239] transition-all duration-300"
                      >
                        <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-[#9f1239] mr-2 transition-transform group-hover:translate-x-1" />
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact & Newsletter Column */}
          <div>
            <h3 className="text-[#9f1239] font-bold text-lg mb-6 uppercase tracking-wider border-b-2 border-[#9f1239]/10 pb-2 inline-block">
              Contact Us
            </h3>

            {/* Address Info */}
            <ul className="space-y-4 text-sm mb-8">
              <li className="flex items-start gap-3">
                <MapPin className="text-[#9f1239] w-5 h-5 shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-600">
                  Municipal Corporation Headquarters,
                  <br />
                  Main Administrative Building,
                  <br />
                  Maharashtra, India - 411 001.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[#9f1239] w-5 h-5 shrink-0" />
                <a
                  href="tel:18001030222"
                  className="hover:text-[#9f1239] font-bold"
                >
                  1800 103 0222 (Toll Free)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[#9f1239] w-5 h-5 shrink-0" />
                <a
                  href="mailto:ujwalramteke8739@gmail.com"
                  className="hover:text-[#9f1239]"
                >
                  ujwalramteke8739@gmail.com
                </a>
              </li>
            </ul>

            {/* Newsletter Input */}
            <div className="bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex items-center mb-6">
              <input
                type="email"
                placeholder="Subscribe to updates..."
                className="w-full px-3 py-2 text-sm outline-none text-slate-700 bg-transparent placeholder:text-slate-400"
              />
              <button className="bg-[#9f1239] hover:bg-[#881337] text-white p-2 rounded-md transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                {
                  icon: FaLinkedin,
                  link: "https://www.linkedin.com/in/ujwal-ramteke-082209262",
                },
                { icon: FaGithub, link: "https://github.com/UjwalRamteke8" },
                { icon: FaTwitter, link: "#" },
                { icon: FaFacebookF, link: "#" },
                { icon: FaInstagram, link: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-[#9f1239] hover:text-white hover:border-[#9f1239] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-slate-100 border-t border-slate-200 py-6">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left space-y-1">
            <p className="font-semibold text-slate-700">
              &copy; {new Date().getFullYear()} Municipal Corporation. All
              Rights Reserved.
            </p>
            <p>
              Last Updated:{" "}
              <span className="text-slate-700">
                {new Date().toLocaleDateString()}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center bg-white px-4 py-1 rounded-full border border-slate-200 shadow-sm">
              <span className="text-slate-400 mr-2">Total Visitors:</span>
              <span className="font-mono font-bold text-[#9f1239] text-sm tracking-widest">
                6,38,371
              </span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="flex items-center justify-center md:justify-end gap-1">
              Designed & Developed by{" "}
              <a
                href="https://github.com/UjwalRamteke8"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-[#9f1239] hover:underline"
              >
                Ujwal Ramteke
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#9f1239] hover:bg-[#881337] text-white p-3 rounded-full shadow-lg shadow-red-900/30 transition-all hover:-translate-y-1 z-50 group"
        title="Back to Top"
      >
        <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
      </button>
    </footer>
  );
};

export default Footer;
