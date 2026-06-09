"use client";

import React from "react";
import { motion } from "framer-motion";

export const Card = ({
  children,
  className = "",
  hoverable = true,
  glow = false,
  ...props
}) => {
  const baseStyles = "relative overflow-hidden rounded-2xl border border-border-custom bg-card/60 backdrop-blur-md p-6 transition-all duration-300";
  
  const hoverStyles = hoverable 
    ? "hover:border-border-hover hover:bg-card-elevated/80 hover:shadow-premium" 
    : "";
    
  const glowStyles = glow 
    ? "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)] before:pointer-events-none" 
    : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${glowStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
