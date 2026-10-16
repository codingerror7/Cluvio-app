"use client";

import React from "react";

/**
 * Skipper UI - Background Beam Component
 * Provides a soft, elegant directional light beam with controlled blur.
 * Restyled for BroClubs with 2% subtle violet depth.
 */
export default function BackgroundBeam({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] opacity-40 blur-[140px] ${className}`}
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(139, 92, 246, 0.15), rgba(255, 255, 255, 0.05) 50%, transparent 80%)",
      }}
      aria-hidden="true"
    />
  );
}
