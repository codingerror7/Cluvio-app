"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Layers3,
} from "lucide-react";
import Button from "../UI/Button";

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
              ? "bg-[#080d16]/78 backdrop-blur-2xl border-b border-white/10 shadow-[0_16px_48px_rgba(2,6,23,0.22)]"
              : "bg-transparent"
          }
        `}
      >
        <div className="container-page">
          <div className="h-[72px] sm:h-20 flex items-center justify-between">

            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3"
              aria-label="Cluvio home"
            >
              <div
                className="
                  w-10
                  h-10
                  rounded-2xl
                  brand-mark
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
                    font-bold
                    text-lg
                  "
                >
                  Cluvio
                </span>

                <span
                  className="
                    text-xs
                    text-white/48
                    hidden
                    sm:block
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
              <Button variant="ghost" size="sm">
                Sign In
              </Button>

              <Button size="sm">
                Get Started

                <ArrowRight
                  size={16}
                />
              </Button>
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
                bg-white/[0.052]
                text-white
                transition
                hover:bg-white/[0.09]
              "
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
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
                  bg-[#0f1726]/95
                  border
                  border-white/10
                  rounded-[24px]
                  p-4
                  shadow-soft
                  backdrop-blur-2xl
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
                        py-3.5
                        rounded-xl
                        text-white/70
                        hover:text-white
                        hover:bg-white/[0.06]
                        transition-all
                      "
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

                <div className="h-px bg-white/10 my-4" />

                <div className="space-y-3">
                  <Button variant="secondary" className="w-full">
                    Sign In
                  </Button>

                  <Button className="w-full">
                    Get Started
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
