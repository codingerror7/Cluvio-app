import React from "react";

const Input = ({ label, hint, error, id, className = "", ...props }) => {
  const inputId = id || props.name;

  return (
    <label className={`block ${className}`} htmlFor={inputId}>
      {label && <span className="mb-2 block text-sm font-semibold text-white/72">{label}</span>}
      <input id={inputId} className="input-surface" aria-invalid={error ? "true" : undefined} {...props} />
      {(hint || error) && (
        <span className={`mt-2 block text-xs ${error ? "text-[var(--danger)]" : "text-white/46"}`}>
          {error || hint}
        </span>
      )}
    </label>
  );
};

export default Input;
