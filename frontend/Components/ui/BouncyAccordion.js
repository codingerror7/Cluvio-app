"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePlus } from "react-icons/hi2";

/**
 * Skipper UI - Skiper103 Style Bouncy Accordion Component
 * Features spring transitions, rotating glass pill icons, and clean isolation.
 * Restyled for BroClubs with monochrome glass and subtle violet accent.
 */
export default function BouncyAccordion({
  items = [],
  allowMultiple = false,
  className = "",
}) {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={`space-y-3.5 ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);

        return (
          <motion.div
            key={item.id || index}
            initial={false}
            className={`bouncy-accordion-item group rounded-2xl border transition-colors duration-300 overflow-hidden ${
              isOpen
                ? "border-violet-500/35 bg-[#0e0e13]/90 shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(139,92,246,0.06)]"
                : "border-white/8 bg-[#0b0b0e]/75 hover:border-white/15 hover:bg-[#0f0f14]/85"
            } backdrop-blur-2xl`}
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer transition-colors"
            >
              <span className="text-sm sm:text-base font-semibold text-white tracking-tight pr-4">
                {item.question}
              </span>

              {/* Skipper UI Spring Rotating Pill */}
              <motion.div
                animate={{ rotate: isOpen ? 135 : 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200 ${
                  isOpen
                    ? "border-violet-500/40 bg-violet-500/15 text-violet-300"
                    : "border-white/10 bg-white/[0.04] text-neutral-400 group-hover:text-white"
                }`}
              >
                <HiOutlinePlus className="text-sm" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                    transition: {
                      height: { type: "spring", stiffness: 300, damping: 25 },
                      opacity: { duration: 0.25 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: 0.2 },
                      opacity: { duration: 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal border-t border-white/5 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
