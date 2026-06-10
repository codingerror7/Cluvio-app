"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Layers3,
} from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "How It Works",
      href: "#how-it-works",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ];

  return (
    <>
      <header
        className={`
          fixed
          top-0
          left-0
          right-0
          z-50
          transition-all
          duration-300
          ${
            scrolled
              ? "bg-[#0B0F19]/80 backdrop-blur-xl border-b border-white/10"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">

            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3"
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-violet-600
                  flex
                  items-center
                  justify-center
                "
              >
                <Layers3
                  size={18}
                  className="text-white"
                />
              </div>

              <div className="flex flex-col">
                <span
                  className="
                    text-white
                    font-semibold
                    text-lg
                    tracking-tight
                  "
                >
                  Cluvio
                </span>

                <span
                  className="
                    text-xs
                    text-white/40
                  "
                >
                  Club Management Platform
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav
              className="
                hidden
                md:flex
                items-center
                gap-8
              "
            >
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="
                    text-sm
                    text-white/65
                    hover:text-white
                    transition-colors
                    duration-200
                  "
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div
              className="
                hidden
                md:flex
                items-center
                gap-3
              "
            >
              <button
                className="
                  px-4
                  py-2
                  text-sm
                  text-white/70
                  hover:text-white
                  transition-colors
                "
              >
                Sign In
              </button>

              <button
                className="
                  flex
                  items-center
                  gap-2
                  px-5
                  py-2.5
                  rounded-xl
                  bg-violet-600
                  hover:bg-violet-500
                  text-white
                  text-sm
                  font-medium
                  transition-all
                  duration-200
                "
              >
                Get Started

                <ArrowRight
                  size={16}
                />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() =>
                setMobileOpen(!mobileOpen)
              }
              className="
                md:hidden
                w-10
                h-10
                flex
                items-center
                justify-center
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                text-white
              "
            >
              {mobileOpen ? (
                <X size={20} />
              ) : (
                <Menu size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileOpen(false)
              }
              className="
                fixed
                inset-0
                bg-black/60
                backdrop-blur-sm
                z-40
              "
            />

            {/* Menu */}
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                fixed
                top-24
                left-4
                right-4
                z-50
                md:hidden
              "
            >
              <div
                className="
                  bg-[#111827]
                  border
                  border-white/10
                  rounded-3xl
                  p-4
                  shadow-2xl
                "
              >
                <nav className="flex flex-col">
                  {navLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() =>
                        setMobileOpen(false)
                      }
                      className="
                        px-4
                        py-4
                        rounded-2xl
                        text-white/70
                        hover:text-white
                        hover:bg-white/[0.04]
                        transition-all
                      "
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="h-px bg-white/10 my-4" />

                <div className="space-y-3">
                  <button
                    className="
                      w-full
                      py-3
                      rounded-xl
                      border
                      border-white/10
                      text-white
                    "
                  >
                    Sign In
                  </button>

                  <button
                    className="
                      w-full
                      py-3
                      rounded-xl
                      bg-violet-600
                      text-white
                      font-medium
                    "
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;