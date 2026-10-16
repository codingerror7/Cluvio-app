"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Module-level guard to prevent re-triggering during in-session component re-renders or theme changes
let sessionPreloaderDone = false;

/**
 * Skipper UI - Stairs Preloader Component (skiper9)
 * Features 5 vertical columns that smoothly slide up in a staggered wave,
 * seamlessly revealing the landing page underneath.
 */
export default function StairsPreloader() {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState("loading"); // 'loading' | 'exiting' | 'done'
  const totalStairs = 5;

  useEffect(() => {
    // If reduced motion is preferred or already shown in this session, skip immediately
    if (shouldReduceMotion) {
      setPhase("done");
      sessionPreloaderDone = true;
      return;
    }

    if (sessionPreloaderDone) {
      setPhase("done");
      return;
    }

    try {
      const stored = sessionStorage.getItem("broclubs_preloader_done");
      if (stored === "true") {
        sessionPreloaderDone = true;
        setPhase("done");
        return;
      }
    } catch (e) {}

    // Short, intentional initial reveal timing (~800ms display, then smooth stairs lift)
    const exitTimer = setTimeout(() => {
      setPhase("exiting");
      sessionPreloaderDone = true;
      try {
        sessionStorage.setItem("broclubs_preloader_done", "true");
      } catch (e) {}
    }, 850);

    // Full cleanup after animation completes
    const doneTimer = setTimeout(() => {
      setPhase("done");
    }, 1800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [shouldReduceMotion]);

  if (phase === "done") {
    return null;
  }

  const isExiting = phase === "exiting";

  return (
    <div
      className="fixed inset-0 z-[999] flex w-screen h-screen pointer-events-none select-none overflow-hidden"
      aria-hidden={isExiting ? "true" : "false"}
    >
      {/* Center Brand Identity */}
      <AnimatePresence>
        {!isExiting && (
          <motion.div
            key="preloader-brand"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.28, ease: "easeIn" } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-auto"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.35)]">
                <span className="font-black text-lg">B</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-mono">
                  BROCLUBS
                </span>
                <span className="text-[10px] font-mono tracking-widest text-violet-400 uppercase">
                  Campus Life OS
                </span>
              </div>
            </div>

            {/* Glowing Accent Progress Line */}
            <div className="mt-5 w-28 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-white to-violet-400"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 0.85,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5 Vertical Staggered Stairs Columns */}
      {[...Array(totalStairs)].map((_, i) => (
        <motion.div
          key={`stair-col-${i}`}
          initial={{ y: "0%" }}
          animate={{ y: isExiting ? "-100%" : "0%" }}
          transition={{
            duration: 0.72,
            ease: [0.76, 0, 0.24, 1],
            delay: i * 0.065, // Staggered staircase lift
          }}
          className="relative h-full w-full bg-[#08080a] border-r border-white/[0.04] last:border-r-0 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        />
      ))}
    </div>
  );
}
