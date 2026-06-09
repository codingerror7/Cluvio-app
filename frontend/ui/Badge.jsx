import React from "react";

export const Badge = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyles = "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-all duration-300";
  
  const variants = {
    primary: "bg-brand-primary/10 border-brand-primary/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.05)]",
    secondary: "bg-white/5 border-border-custom text-text-muted hover:text-foreground",
    success: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.05)]",
    warning: "bg-amber-500/10 border-amber-500/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.05)]"
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
