import React from "react";

const Card = ({ children, className = "", interactive = true, as: Component = "div" }) => {
  return (
    <Component
      className={`card-surface ${interactive ? "card-interactive" : ""} ${className}`}
    >
      {children}
    </Component>
  );
};

export default Card;
