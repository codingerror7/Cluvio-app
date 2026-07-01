import React from "react";

const Input = ({ label, hint, error, id, className = "", ...props }) => {
  const inputId = id || props.name;

  return (
    <label className={`block ${className}`} htmlFor={inputId}>
      {label && <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">{label}</span>}
      <input id={inputId} className="input-surface" aria-invalid={error ? "true" : undefined} {...props} />
      {(hint || error) && (
        <span className={`mt-1.5 block text-xs ${error ? "text-[var(--danger)]" : "text-[var(--muted-soft)]"}`}>
          {error || hint}
        </span>
      )}
    </label>
  );
};

export default Input;
