"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Skipper UI - Rolling Text Animation Component (Adapted from skiper27)
 * Specifically configured for the hero text: "Next-Gen OS"
 *
 * Each character rolls vertically like an odometer/cylinder across two lines:
 * the outgoing character slides up to -100%, while the incoming character slides in from 100% to 0%.
 * Triggers periodically (every 3.8s) and on mouse hover with staggered timing.
 */
export default function RollingText({
  text = "Next-Gen OS",
  className = "",
  interval = 3800,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [rollKey, setRollKey] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Periodic automatic rolling trigger
    timerRef.current = setInterval(() => {
      setRollKey((prev) => prev + 1);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [shouldReduceMotion, interval]);

  const handleTrigger = () => {
    setRollKey((prev) => prev + 1);
  };

  // If user prefers reduced motion, render static text
  if (shouldReduceMotion) {
    return <span className={`inline-block font-black ${className}`}>{text}</span>;
  }

  const chars = Array.from(text);

  return (
    <span
      onMouseEnter={handleTrigger}
      onClick={handleTrigger}
      title="Click or hover to roll"
      className={`inline-flex items-baseline cursor-pointer select-none relative font-black ${className}`}
      aria-label={text}
    >
      {chars.map((char, index) => {
        if (char === " ") {
          return (
            <span key={`space-${index}`} className="inline-block w-[0.26em]">
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={`char-wrap-${index}`}
            className="inline-block relative overflow-hidden h-[1.14em] leading-[1.14em] align-top"
          >
            {/* The vertical rolling cylinder of 2 stacked identical characters */}
            <motion.span
              key={`char-anim-${index}-${rollKey}`}
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              transition={{
                duration: 0.62,
                ease: [0.65, 0, 0.35, 1],
                delay: index * 0.042, // Staggered wave from left to right
              }}
              className="flex flex-col"
            >
              <span className="inline-block">{char}</span>
              <span className="inline-block">{char}</span>
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
