import React from "react";
import Badge from "./Badge";

const SectionHeading = ({ eyebrow, title, accent, children, className = "" }) => {
  return (
    <div className={`section-heading ${className}`}>
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h2 className="section-title">
        {title}
        {accent && <span className="block">{accent}</span>}
      </h2>
      {children && <p className="section-copy">{children}</p>}
    </div>
  );
};

export default SectionHeading;
