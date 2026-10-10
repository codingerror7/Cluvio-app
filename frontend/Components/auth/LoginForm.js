"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineEnvelope, HiOutlineArrowRight, HiOutlineSparkles } from "react-icons/hi2";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import { api } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.auth.login({ email: email.trim(), password });
      if (response.success && response.user) {
        if (response.user.role === "president") {
          router.push("/president/dashboard");
        } else if (response.user.role === "admin") {
          // Admin redirected to admin dashboard or alert
          window.location.href = "http://localhost:3001/dashboard";
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError(err.message || "Invalid credentials. Please verify your email and password.");
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (roleType) => {
    if (roleType === "student") {
      setEmail("aarav.s@campus.edu");
      setPassword("Student@123");
    } else if (roleType === "president") {
      setEmail("rahul.sharma@campus.edu");
      setPassword("President@123");
    }
    setError(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Sign in to continue to your Cluvio account.
        </p>
      </div>

      {/* Demo Credentials Quick Fill Bar */}
      <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-xs text-white/80">
        <div className="flex items-center gap-1.5 font-semibold text-[var(--accent)] mb-2">
          <HiOutlineSparkles className="text-sm" />
          <span>Quick Demo Auto-Fill:</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleFillDemo("student")}
            className="rounded-xl border border-white/10 bg-white/5 py-1.5 px-2 text-left hover:border-[var(--accent)]/40 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <p className="font-semibold text-white">Student Demo</p>
            <p className="text-[10px] text-white/50 truncate">aarav.s@campus.edu</p>
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("president")}
            className="rounded-xl border border-white/10 bg-white/5 py-1.5 px-2 text-left hover:border-[var(--accent)]/40 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <p className="font-semibold text-white">President Demo</p>
            <p className="text-[10px] text-white/50 truncate">rahul.sharma@campus.edu</p>
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email address"
          id="login-email"
          type="email"
          placeholder="Enter your registered email"
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
                className="h-4 w-4 rounded border-white/20 bg-white/5 accent-[var(--accent)] focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-white/50 hover:text-white/70 transition-colors">
                Remember me
              </span>
            </label>

            <span className="text-xs text-white/40">
              Pass: Student@123 / President@123
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl
            bg-[var(--accent)] font-semibold text-black transition-all duration-200
            hover:brightness-110 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]
            active:scale-[0.99] cursor-pointer disabled:opacity-50
          "
        >
          {loading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In</span>
              <HiOutlineArrowRight className="text-base" />
            </>
          )}
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
