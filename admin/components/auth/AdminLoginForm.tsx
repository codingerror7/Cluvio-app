'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldAlert } from 'lucide-react';

export const AdminLoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberSession, setRememberSession] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Non-functional mock submit (purely UI feedback demonstration)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900">
          Administrator Sign In
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
          Sign in to access the Cluvio platform management console.
        </p>
      </div>

      {/* Mock notice if form is submitted */}
      {submitted && (
        <div className="mb-5 rounded-xl border border-gray-900/10 bg-gray-50 p-3.5 text-xs text-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-gray-700 shrink-0" />
            <span>Admin sign-in simulated (UI/UX only).</span>
          </div>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-gray-400 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div>
          <label
            htmlFor="admin-email"
            className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your admin email"
              required
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-3.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 hover:border-gray-300"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="admin-password"
              className="block text-xs sm:text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <button
              type="button"
              className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-11 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 hover:border-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-700 transition-colors focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Session Remember Checkbox */}
        <div className="flex items-center gap-2 pt-0.5">
          <input
            id="admin-remember"
            type="checkbox"
            checked={rememberSession}
            onChange={(e) => setRememberSession(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/20 accent-gray-900 cursor-pointer"
          />
          <label
            htmlFor="admin-remember"
            className="text-xs text-gray-600 select-none cursor-pointer"
          >
            Keep me signed in on this trusted workstation
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 text-sm font-semibold text-white shadow-xs transition-all hover:bg-black hover:shadow-sm active:scale-[0.99] cursor-pointer"
        >
          <span>Sign In to Console</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Administrative Compliance Note */}
      <div className="mt-6 border-t border-gray-100 pt-4 text-center">
        <p className="text-[11px] leading-relaxed text-gray-400">
          This system is restricted to authorized Cluvio administrators. All sign-in attempts and session activities are securely audited.
        </p>
      </div>
    </div>
  );
};
