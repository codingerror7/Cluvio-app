"use client";

import React from "react";
import {
  HiOutlineSquares2X2,
  HiOutlineEnvelope,
  HiOutlineArrowUpRight,
} from "react-icons/hi2";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Support", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/10 py-20">

      <div className="container-page">

        <div className="grid gap-14 md:grid-cols-12">

          {/* Brand */}

          <div className="md:col-span-5">

            <a
              href="/"
              className="inline-flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)]/10">

                <HiOutlineSquares2X2 className="text-xl text-[var(--accent)]" />

              </div>

              <span className="text-2xl font-bold text-white">
                Cluvio
              </span>

            </a>

            <p className="mt-6 max-w-sm leading-8 text-white/60">
              A modern operating system for student clubs. Manage members,
              events, announcements, attendance, and communities from one
              unified platform.
            </p>

            <a
              href="mailto:support@cluvio.com"
              className="mt-6 inline-flex items-center gap-2 text-white/60 transition hover:text-white"
            >

              <HiOutlineEnvelope className="text-lg" />

              support@cluvio.com

            </a>

          </div>

          {/* Navigation */}

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">

            {footerLinks.map((group) => (
              <div key={group.title}>

                <h4 className="font-semibold text-white">
                  {group.title}
                </h4>

                <ul className="mt-5 space-y-3">

                  {group.links.map((link) => (
                    <li key={link.label}>

                      <a
                        href={link.href}
                        className="text-white/60 transition hover:text-white"
                      >
                        {link.label}
                      </a>

                    </li>
                  ))}

                </ul>

              </div>
            ))}

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">

          <p className="text-sm text-white/50">
            © {new Date().getFullYear()} Cluvio. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm">

            <a
              href="#"
              className="text-white/50 transition hover:text-white"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-white/50 transition hover:text-white"
            >
              Terms
            </a>

            <a
              href="#home"
              className="inline-flex items-center gap-1 text-white/50 transition hover:text-white"
            >
              Back to top

              <HiOutlineArrowUpRight className="text-base" />

            </a>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;