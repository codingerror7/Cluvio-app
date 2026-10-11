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
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold text-slate-700 select-none"
          >
            {label}
            {required && <span className="ml-1 text-blue-600">*</span>}
          </label>
        </div>
      )}

      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Icon className="text-base" />
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
            h-10 sm:h-11 w-full rounded-xl border bg-white text-xs sm:text-sm text-slate-800 placeholder:text-slate-400
            outline-none transition-all duration-150
            ${Icon ? "pl-10" : "pl-3.5"} pr-3.5
            ${
              error
                ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                : "border-slate-200/90 hover:border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            }
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : ""}
          `}
          {...props}
        />
      </div>

      {error ? (
        <p className="mt-1 text-[11px] text-rose-500 flex items-center gap-1 font-medium">
          <span>{error}</span>
        </p>
      ) : helper ? (
        <p className="mt-1 text-[11px] text-slate-400">{helper}</p>
      ) : null}
    </div>
  );
}
