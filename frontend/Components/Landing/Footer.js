"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Layers3,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const Footer = () => {
  const links = [
    {
      title: "Product",
      items: ["Features", "How It Works", "Benefits", "FAQ"],
    },
    {
      title: "Company",
      items: ["About", "Contact", "Careers"],
    },
    {
      title: "Resources",
      items: ["Documentation", "Support", "Community"],
    },
  ];


  return (
    <footer className="relative pt-24 pb-10 border-t border-white/10 bg-[#0B0F19]">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            w-[600px]
            h-[200px]
            bg-violet-600/10
            blur-[140px]
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid md:grid-cols-12 gap-12">

          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                <Layers3 size={18} className="text-white" />
              </div>

              <span className="text-white font-semibold text-lg">
                Cluvio
              </span>
            </div>

            <p className="mt-5 text-white/60 leading-relaxed">
              A modern operating system for student clubs.
              Manage members, events, announcements, and
              communities in one unified platform.
            </p>

            {/* Email */}
            <div className="mt-6 flex items-center gap-2 text-white/60">
              <Mail size={16} />
              <span>support@cluvio.com</span>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {links.map((group) => (
              <div key={group.title}>
                <h4 className="text-white font-medium mb-4">
                  {group.title}
                </h4>

                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="
                        text-white/60
                        hover:text-white
                        transition-colors
                        cursor-pointer
                        text-sm
                      "
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-white font-medium mb-4">
              Social
            </h4>

          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Cluvio. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-white/50">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>

            <span className="hover:text-white cursor-pointer">
              Terms
            </span>

            <span className="flex items-center gap-1 hover:text-white cursor-pointer">
              Back to top
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;