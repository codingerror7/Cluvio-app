"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Skipper UI - Theme Toggle Component (skiper26 & skiper4)
 * Provides instant, single-click switching between Dark Mode and Light Mode.
 *
 * Dark: Black / White / Grey + 2% Violet Accent
 * Light: White / Black / Grey + Warm Cream Accent
 */
export default function ThemeToggle({ className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  // Synchronize state with document attribute and localStorage on mount
  useEffect(() => {
    setMounted(true);
    let activeTheme = "dark";
    try {
      const fromDoc = document.documentElement.getAttribute("data-theme");
      const fromStorage = localStorage.getItem("broclubs_theme");
      activeTheme = fromDoc || fromStorage || "dark";
    } catch (e) {}

    setTheme(activeTheme);

    // Listen to theme change events from other toggle buttons (e.g. mobile vs desktop)
    const handleSync = () => {
      try {
        const current = localStorage.getItem("broclubs_theme") || "dark";
        setTheme(current);
      } catch (e) {}
    };

    window.addEventListener("broclubs_theme_change", handleSync);
    return () => window.removeEventListener("broclubs_theme_change", handleSync);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    // Immediate DOM update
    const root = document.documentElement;
    root.classList.add("theme-transition");

    if (nextTheme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      root.setAttribute("data-theme", "dark");
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }

    try {
      localStorage.setItem("broclubs_theme", nextTheme);
      window.dispatchEvent(new Event("broclubs_theme_change"));
    } catch (e) {}

    setTheme(nextTheme);

    // Remove transition class after smooth CSS transition completes
    setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 320);
  }, [theme]);

  // Initial SSR placeholder
  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 rounded-full border border-white/10 bg-white/[0.04] ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 active:scale-90 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-violet-400/30 ${
        isDark
          ? "border-white/12 bg-white/[0.04] text-neutral-300 hover:border-violet-500/40 hover:bg-white/[0.08] hover:text-white"
          : "border-black/10 bg-[#f5f0e8] text-neutral-800 hover:border-black/20 hover:bg-[#ede4d3] shadow-xs"
      } ${className}`}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        animate={{
          rotate: isDark ? 0 : 180,
          scale: [1, 0.88, 1],
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0.1 }
            : { duration: 0.3, ease: "easeInOut" }
        }
      >
        {isDark ? (
          // Moon icon for dark mode
          <motion.path
            d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        ) : (
          // Sun icon for light mode
          <motion.g
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </motion.g>
        )}
      </motion.svg>
    </button>
  );
}
