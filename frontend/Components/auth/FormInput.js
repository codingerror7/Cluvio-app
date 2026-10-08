"use client";

import React from "react";

export default function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  helper,
  disabled = false,
  required = false,
  className = "",
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-white/80 select-none"
          >
            {label}
            {required && <span className="ml-1 text-[var(--accent)]">*</span>}
          </label>
        </div>
      )}

      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/35 transition-colors">
            <Icon className="text-lg" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            h-12 w-full rounded-xl border bg-white/[0.03] text-sm text-white placeholder:text-white/30
            outline-none transition-all duration-200
            ${Icon ? "pl-11" : "pl-4"} pr-4
            ${
              error
                ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                : "border-white/10 hover:border-white/20 focus:border-[var(--accent)] focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/20"
            }
            ${disabled ? "opacity-50 cursor-not-allowed bg-white/[0.01]" : ""}
          `}
          {...props}
        />
      </div>

      {error ? (
        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
          <span>{error}</span>
        </p>
      ) : helper ? (
        <p className="mt-1.5 text-xs text-white/40">{helper}</p>
      ) : null}
    </div>
  );
}
