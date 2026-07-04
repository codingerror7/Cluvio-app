"use client";

import { useEffect, useState } from "react";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineArrowRight,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

const links = [
  {
    label: "Features",
    href: "#features",
  },
  {
    label: "How it Works",
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

export default function Navbar({ onEnterDashboard }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#070b13]/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-page">

          <div className="flex h-20 items-center justify-between">

            {/* Logo */}

            <a
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent)]/10">

                <HiOutlineSquares2X2 className="text-xl text-[var(--accent)]" />

              </div>

              <div>

                <h1 className="text-lg font-bold text-white">
                  Cluvio
                </h1>

                <p className="hidden text-xs text-white/45 sm:block">
                  Club Management Platform
                </p>

              </div>

            </a>

            {/* Desktop */}

            <nav className="hidden items-center gap-8 md:flex">

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {link.label}
                </a>
              ))}

            </nav>

            {/* Desktop Buttons */}

            <div className="hidden items-center gap-3 md:flex">

              <button
                onClick={onEnterDashboard}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-white/70 transition hover:text-white"
              >
                Sign In
              </button>

              <button
                onClick={onEnterDashboard}
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Get Started

                <HiOutlineArrowRight className="text-lg" />

              </button>

            </div>

            {/* Mobile Button */}

            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 md:hidden"
            >
              {mobileMenu ? (
                <HiOutlineXMark className="text-2xl text-white" />
              ) : (
                <HiOutlineBars3 className="text-2xl text-white" />
              )}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Menu */}

      {mobileMenu && (
        <>
          <div
            onClick={() =>
              setMobileMenu(false)
            }
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />

          <div className="fixed left-4 right-4 top-24 z-50 rounded-3xl border border-white/10 bg-[#0b1019] p-5 md:hidden">

            <nav className="space-y-2">

              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="block rounded-xl px-4 py-3 text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}

            </nav>

            <div className="my-5 h-px bg-white/10" />

            <div className="space-y-3">

              <button
                onClick={onEnterDashboard}
                className="w-full rounded-xl border border-white/10 py-3 font-medium text-white transition hover:bg-white/5"
              >
                Sign In
              </button>

              <button
                onClick={onEnterDashboard}
                className="w-full rounded-xl bg-[var(--accent)] py-3 font-semibold text-black transition hover:opacity-90"
              >
                Get Started
              </button>

            </div>

          </div>
        </>
      )}
    </>
  );
}