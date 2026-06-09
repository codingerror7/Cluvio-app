"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Layers3 } from "lucide-react";
import Button from "../ui/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6 lg:px-8 py-5">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className={`
            mx-auto
            max-w-7xl
            transition-all
            duration-300
          `}
        >
          <div
            className={`
              flex items-center justify-between
              rounded-2xl
              px-6 lg:px-8
              py-4
              border
              transition-all
              duration-300

              ${
                scrolled
                  ? "bg-[#0f1117]/80 backdrop-blur-xl border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.25)]"
                  : "bg-transparent border-transparent"
              }
            `}
          >
            {/* Logo */}
            <a
              href="#home"
              className="group flex items-center gap-3"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-violet-500/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                  <Layers3 className="w-5 h-5 text-white" />
                </div>
              </div>

              <div className="flex flex-col leading-none">
                <span className="text-white font-semibold text-lg tracking-tight">
                  Cluvio
                </span>

                <span className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                  Club OS
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-sm text-white/60 hover:text-white transition-colors duration-200"
                >
                  <span className="relative">
                    {link.name}

                    <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-violet-400 transition-all duration-300 hover:w-full" />
                  </span>
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-white/70 hover:text-white"
              >
                Login
              </Button>

              <Button
                variant="primary"
                size="sm"
                className="group"
              >
                Get Started

                <ArrowRight
                  className="
                    w-4 h-4
                    ml-2
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              aria-label="Toggle Menu"
              onClick={() => setIsOpen(!isOpen)}
              className="
                md:hidden
                flex
                items-center
                justify-center
                w-11
                h-11
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                text-white
              "
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
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
                  rounded-3xl
                  border
                  border-white/10
                  bg-[#111318]
                  backdrop-blur-xl
                  p-6
                  shadow-2xl
                "
              >
                <nav className="flex flex-col gap-1">
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="
                        px-4
                        py-4
                        rounded-xl
                        text-white/70
                        hover:text-white
                        hover:bg-white/[0.04]
                        transition-all
                      "
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>

                <div className="my-6 h-px bg-white/10" />

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="md"
                    className="w-full"
                  >
                    Login
                  </Button>

                  <Button
                    variant="primary"
                    size="md"
                    className="w-full group"
                  >
                    Get Started

                    <ArrowRight
                      className="
                        w-4 h-4
                        ml-2
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </Button>
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