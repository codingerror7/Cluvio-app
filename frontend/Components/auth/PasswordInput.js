"use client";

import React, { useState } from "react";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";

export default function PasswordInput({
  label = "Password",
  id = "password",
  placeholder = "Enter your password",
  value = "",
  onChange,
  error,
  helper,
  disabled = false,
  required = false,
  showStrengthMeter = false,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const calculateStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = calculateStrength(value);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-rose-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-blue-600",
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-1.5">
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-slate-700 select-none"
        >
          {label}
          {required && <span className="ml-1 text-blue-600">*</span>}
        </label>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <HiOutlineLockClosed className="text-base" />
        </div>

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            h-10 sm:h-11 w-full rounded-xl border bg-white pl-10 pr-10 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400
            outline-none transition-all duration-150
            ${
              error
                ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                : "border-slate-200/90 hover:border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            }
            ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : ""}
          `}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-700 focus:outline-none cursor-pointer"
        >
          {showPassword ? (
            <HiOutlineEyeSlash className="text-base" />
          ) : (
            <HiOutlineEye className="text-base" />
          )}
        </button>
      </div>

      {showStrengthMeter && value.length > 0 && (
        <div className="mt-1.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-400">Strength:</span>
            <span className="text-[10px] font-semibold text-slate-600">
              {strengthLabels[strength - 1] || "Too weak"}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 h-1">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-full rounded-full transition-all duration-300 ${
                  strength > step
                    ? strengthColors[strength - 1]
                    : "bg-slate-100"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {error ? (
        <p className="mt-1 text-[11px] text-rose-500 font-medium">{error}</p>
      ) : helper ? (
        <p className="mt-1 text-[11px] text-slate-400">{helper}</p>
      ) : null}
    </div>
  );
}
