"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineEnvelope, HiOutlineArrowRight } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Non-functional mock submit (purely UI feedback demonstration)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Sign in to continue to your Cluvio account.
        </p>
      </div>

      {/* Mock notice if form is submitted */}
      {submitted && (
        <div className="mb-6 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-3.5 text-xs text-[var(--accent)] flex items-center justify-between animate-fadeIn">
          <span>Demo preview: Form submit prevented (UI/UX only).</span>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Google OAuth button (Visual only) */}
      <button
        type="button"
        onClick={(e) => e.preventDefault()}
        className="
          flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/10
          bg-white/[0.03] text-sm font-medium text-white transition-all duration-200
          hover:border-white/20 hover:bg-white/[0.06] active:scale-[0.99]
        "
      >
        <FcGoogle className="text-xl" />
        <span>Continue with Google</span>
      </button>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
          OR
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email address"
          id="login-email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={HiOutlineEnvelope}
          required
        />

        <div>
          <PasswordInput
            label="Password"
            id="login-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="mt-2.5 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[var(--accent)] focus:ring-0"
              />
              <span className="text-xs text-white/50 hover:text-white/70 transition-colors">
                Remember me
              </span>
            </label>

            <button
              type="button"
              className="text-xs font-medium text-[var(--accent)] hover:underline transition-all"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="
            mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl
            bg-[var(--accent)] font-semibold text-black transition-all duration-200
            hover:brightness-110 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]
            active:scale-[0.99] cursor-pointer
          "
        >
          <span>Sign In</span>
          <HiOutlineArrowRight className="text-base" />
        </button>
      </form>

      {/* Register Footer */}
      <p className="mt-8 text-center text-sm text-white/50">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-[var(--accent)] hover:underline ml-1"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
