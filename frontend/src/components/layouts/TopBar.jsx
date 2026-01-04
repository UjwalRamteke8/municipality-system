import React from "react";
import { Link } from "react-router-dom";
import { PhoneCall } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="bg-[#9f1239] text-white py-2 px-4 hidden md:block transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
        <div className="flex gap-4">
          <span className="flex items-center gap-2 font-medium">
            <PhoneCall className="w-4 h-4" /> Toll Free: 1800 103 0222
          </span>
          <span className="bg-white/20 px-2 py-0.5 rounded text-xs uppercase tracking-wide">
            General Election 2025-26
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-3">
            <FaLinkedin className="w-4 h-4 cursor-pointer hover:text-gray-200" />
            <FaGithub className="w-4 h-4 cursor-pointer hover:text-gray-200" />
            <FaTwitter className="w-4 h-4 cursor-pointer hover:text-gray-200" />
            <FaInstagram className="w-4 h-4 cursor-pointer hover:text-gray-200" />
          </div>
          <div className="h-4 w-px bg-white/30"></div>
          <Link to="/staff-login">
            <button className="bg-white text-[#9f1239] px-3 py-1 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors">
              Department Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
