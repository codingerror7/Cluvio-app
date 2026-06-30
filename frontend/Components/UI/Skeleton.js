import React from "react";

const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`animate-pulse rounded-[var(--radius-sm)] bg-white/[0.075] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
