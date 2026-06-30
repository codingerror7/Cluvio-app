import React from "react";

const Badge = ({ children, className = "" }) => {
  return <span className={`eyebrow ${className}`}>{children}</span>;
};

export default Badge;
