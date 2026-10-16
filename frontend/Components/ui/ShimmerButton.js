"use client";

import React from "react";

/**
 * Skipper UI - Shimmer Button Component
 * A premium interactive button with a subtle perimeter light sweep and active micro-scale.
 * Restyled for BroClubs in white-primary or glass-secondary variants.
 */
export default function ShimmerButton({
  children,
  className = "",
  variant = "primary", // 'primary' | 'glass'
  onClick,
  disabled = false,
  ...props
}) {
  if (variant === "glass") {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-white/12 bg-white/[0.04] px-6 py-2.5 text-xs sm:text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.08] hover:shadow-[0_0_24px_rgba(139,92,246,0.12)] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-7 py-3 text-xs sm:text-sm font-semibold text-black transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_28px_rgba(255,255,255,0.25)] active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
