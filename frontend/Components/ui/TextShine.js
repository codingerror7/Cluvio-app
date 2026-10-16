"use client";

import React from "react";

/**
 * Skipper UI - Text Shine Component
 * Renders high-end monochrome text with a smooth periodic light sweep across the characters.
 * Restyled for BroClubs dark aesthetic.
 */
export default function TextShine({
  children,
  className = "",
  as: Component = "span",
}) {
  return (
    <Component
      className={`inline-block bg-[linear-gradient(110deg,#a1a1aa,45%,#ffffff,55%,#a1a1aa)] [background-size:250%_100%] bg-clip-text text-transparent animate-text-shine ${className}`}
    >
      {children}
    </Component>
  );
}
