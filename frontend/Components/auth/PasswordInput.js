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

  // Purely visual password strength score (0 to 4)
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
    "bg-red-500",
    "bg-amber-500",
    "bg-emerald-500",
    "bg-[var(--accent)]",
  ];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-white/80 select-none"
        >
          {label}
          {required && <span className="ml-1 text-[var(--accent)]">*</span>}
        </label>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/35">
          <HiOutlineLockClosed className="text-lg" />
        </div>

        <input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            h-12 w-full rounded-xl border bg-white/[0.03] pl-11 pr-12 text-sm text-white placeholder:text-white/30
            outline-none transition-all duration-200
            ${
              error
                ? "border-red-500/60 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                : "border-white/10 hover:border-white/20 focus:border-[var(--accent)] focus:bg-white/[0.05] focus:ring-2 focus:ring-[var(--accent)]/20"
            }
            ${disabled ? "opacity-50 cursor-not-allowed bg-white/[0.01]" : ""}
          `}
          {...props}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40 transition-colors hover:text-white focus:outline-none"
        >
          {showPassword ? (
            <HiOutlineEyeSlash className="text-lg" />
          ) : (
            <HiOutlineEye className="text-lg" />
          )}
        </button>
      </div>

      {/* Visual password strength indicator (UI only) */}
      {showStrengthMeter && value.length > 0 && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/40">Password strength</span>
            <span className="text-xs font-medium text-white/70">
              {strengthLabels[strength - 1] || "Too weak"}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 h-1">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-full rounded-full transition-all duration-300 ${
                  strength > step
                    ? strengthColors[strength - 1]
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {error ? (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      ) : helper ? (
        <p className="mt-1.5 text-xs text-white/40">{helper}</p>
      ) : null}
    </div>
  );
}
