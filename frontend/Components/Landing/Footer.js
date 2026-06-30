"use client";

import React from "react";
import { Layers3, Mail, ArrowUpRight } from "lucide-react";

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

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-[#070b13]/80 py-10 pt-20">
      <div className="container-page relative z-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <a href="/" className="inline-flex items-center gap-3" aria-label="Cluvio home">
              <div className="brand-mark flex h-10 w-10 items-center justify-center rounded-2xl">
                <Layers3 size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">Cluvio</span>
            </a>
            <p className="mt-5 max-w-sm leading-relaxed text-white/60">
              A modern operating system for student clubs. Manage members, events, announcements,
              and communities in one unified platform.
            </p>
            <a
              href="mailto:support@cluvio.com"
              className="mt-6 inline-flex items-center gap-2 text-white/60 transition hover:text-white"
            >
              <Mail size={16} />
              <span>support@cluvio.com</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8">
            {links.map((group) => (
              <div key={group.title}>
                <h4 className="mb-4 font-semibold text-white">{group.title}</h4>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item}>
                      <a
                        href="#home"
                        className="text-sm text-white/58 transition hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Cluvio. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/50">
            <a href="#home" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#home" className="transition hover:text-white">
              Terms
            </a>
            <a href="#home" className="inline-flex items-center gap-1 transition hover:text-white">
              Back to top
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
