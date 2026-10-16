"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HiOutlineEnvelope,
  HiOutlineArrowRight,
  HiOutlineKey,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { api } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mode: 'student' (Student / Club Member) or 'president' (Club President)
  const initialRoleParam = searchParams.get("role");
  const isInitiallyPresident =
    initialRoleParam === "president" || initialRoleParam === "club head";

  const [isPresidentMode, setIsPresidentMode] = useState(isInitiallyPresident);
  const [isClubMemberSubrole, setIsClubMemberSubrole] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "president" || roleParam === "club head") {
      setIsPresidentMode(true);
    } else if (roleParam === "student") {
      setIsPresidentMode(false);
    }

    const reason = searchParams.get("reason");
    if (reason === "inactive") {
      setError("Your session expired after 30 days of inactivity. Please sign in again.");
    } else if (reason === "expired") {
      setError("Your session has expired. Please sign in again.");
    }
  }, [searchParams]);

  const activeRole = isPresidentMode
    ? "club head"
    : isClubMemberSubrole
    ? "club member"
    : "student";

  const toggleAuthMode = () => {
    setError(null);
    setIsPresidentMode(!isPresidentMode);
    if (!isPresidentMode) {
      // Switching to President mode
      setIsClubMemberSubrole(false);
      setSecretKey("admin123");
    } else {
      // Switching to Student mode
      setSecretKey("");
    }
  };

  const handleFillDemo = (type) => {
    setError(null);
    if (type === "student") {
      setIsPresidentMode(false);
      setIsClubMemberSubrole(false);
      setEmail("student@campus.edu");
      setPassword("Student@123");
      setSecretKey("");
    } else if (type === "member") {
      setIsPresidentMode(false);
      setIsClubMemberSubrole(true);
      setEmail("member@campus.edu");
      setPassword("Member@123");
      setSecretKey("admin123");
    } else if (type === "president") {
      setIsPresidentMode(true);
      setIsClubMemberSubrole(false);
      setEmail("clubhead@campus.edu");
      setPassword("Head@123");
      setSecretKey("admin123");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const requiresPasskey = isPresidentMode || isClubMemberSubrole;

    if (requiresPasskey) {
      if (!secretKey || secretKey.trim() !== "admin123") {
        setError(
          `Valid secret passkey ("admin123") is required for ${
            isPresidentMode ? "Club President" : "Club Member"
          }.`
        );
        return;
      }
    }

    setLoading(true);

    try {
      const response = await api.auth.login({
        email: email.trim(),
        password,
        role: activeRole,
        secretKey: requiresPasskey ? secretKey.trim() : undefined,
      });

      if (response.success && response.user) {
        if (response.user.role === "president" || response.user.role === "club head") {
          router.push("/president/dashboard");
        } else if (
          response.user.role === "college-admin" ||
          response.user.role === "college admin"
        ) {
          window.location.href = "http://localhost:5173";
        } else if (response.user.role === "admin") {
          window.location.href = "http://localhost:3001/dashboard";
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError(
        err.message ||
          "Invalid credentials. Please verify your email, password, or secret passkey."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#0c0c0f]/85 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] text-left relative">
      {/* Contextual Header */}
      <div className="mb-6 space-y-1.5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-300">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isPresidentMode ? "bg-violet-400" : "bg-white"
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300">
            {isPresidentMode ? "President Portal" : "Student / Member Portal"}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          {isPresidentMode ? "Welcome back, President." : "Welcome back."}
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
          {isPresidentMode
            ? "Manage your club and community with BroClubs."
            : "Sign in to continue to your BroClubs community."}
        </p>
      </div>

      {/* 1-Click Demo Fill Bar */}
      <div className="mb-5 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-3 py-1.5 text-xs">
        <span className="text-[11px] font-mono text-neutral-400">
          Demo fill:
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => handleFillDemo("student")}
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono transition-all cursor-pointer ${
              !isPresidentMode && !isClubMemberSubrole
                ? "border-white bg-white text-black font-bold"
                : "border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08]"
            }`}
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("member")}
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono transition-all cursor-pointer ${
              !isPresidentMode && isClubMemberSubrole
                ? "border-white bg-white text-black font-bold"
                : "border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08]"
            }`}
          >
            👥 Member
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("president")}
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono transition-all cursor-pointer ${
              isPresidentMode
                ? "border-violet-400 bg-violet-400 text-black font-bold"
                : "border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08]"
            }`}
          >
            👑 President
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-950/25 p-3 text-xs text-rose-300 flex items-start justify-between">
          <span className="leading-relaxed">{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-2 text-rose-400 hover:text-white font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="auth-email"
            className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
          >
            Campus Email Address
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
              <HiOutlineEnvelope className="text-sm" />
            </div>
            <input
              id="auth-email"
              type="email"
              placeholder={
                isPresidentMode ? "clubhead@campus.edu" : "student@campus.edu"
              }
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-violet-500/25"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="auth-password"
            className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
          >
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
              <HiOutlineLockClosed className="text-sm" />
            </div>
            <input
              id="auth-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your account password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-10 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-violet-500/25"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-neutral-400 hover:text-white cursor-pointer"
            >
              {showPassword ? (
                <HiOutlineEyeSlash className="text-sm" />
              ) : (
                <HiOutlineEye className="text-sm" />
              )}
            </button>
          </div>
        </div>

        {/* Secret Key Input (Required for President or Club Member) */}
        {(isPresidentMode || isClubMemberSubrole) && (
          <div className="rounded-2xl border border-violet-500/30 bg-violet-500/[0.05] p-3.5 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <label
                htmlFor="auth-secret-key"
                className="flex items-center gap-1.5 text-xs font-mono font-semibold text-violet-200"
              >
                <HiOutlineKey className="text-sm text-violet-300" />
                <span>Executive Secret Passkey</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/10">
                Authorized: admin123
              </span>
            </div>

            <div className="relative">
              <input
                id="auth-secret-key"
                type={showSecretKey ? "text" : "password"}
                placeholder="Enter secret passkey (admin123)"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
                className="h-10 w-full rounded-xl border border-violet-500/40 bg-black/40 pl-3.5 pr-10 text-xs text-white placeholder:text-neutral-500 outline-none font-mono focus:border-violet-400"
              />
              <button
                type="button"
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-white cursor-pointer"
              >
                {showSecretKey ? (
                  <HiOutlineEyeSlash className="text-sm" />
                ) : (
                  <HiOutlineEye className="text-sm" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Optional Student Subrole Toggle for Club Member with Passkey */}
        {!isPresidentMode && (
          <div className="pt-0.5">
            <button
              type="button"
              onClick={() => {
                const nextState = !isClubMemberSubrole;
                setIsClubMemberSubrole(nextState);
                if (nextState) setSecretKey("admin123");
                else setSecretKey("");
              }}
              className="text-[11px] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {isClubMemberSubrole
                ? "← Switch back to standard student sign-in"
                : "Signing in as Club Member with passkey? Click here"}
            </button>
          </div>
        )}

        {/* Remember me checkbox */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-black focus:ring-0 cursor-pointer"
            />
            <span className="text-neutral-400">Remember session for 30 days</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs sm:text-sm transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xs"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              Signing in...
            </span>
          ) : (
            <>
              <span>
                Sign In as {isPresidentMode ? "President" : "Student"}
              </span>
              <HiOutlineArrowRight className="text-xs" />
            </>
          )}
        </button>
      </form>

      {/* Auth Navigation: Switching between Student and President */}
      <div className="mt-6 pt-5 border-t border-white/8 space-y-3 text-center text-xs">
        <div>
          {isPresidentMode ? (
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Student or Club Member?{" "}
              <span className="text-white underline font-medium">
                Sign in here →
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleAuthMode}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Club President?{" "}
              <span className="text-white underline font-medium">
                Sign in here →
              </span>
            </button>
          )}
        </div>

        {/* Register link (Only for student/member flow as specified in prompt) */}
        {!isPresidentMode && (
          <p className="text-neutral-400">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="text-white font-semibold underline hover:text-neutral-200 transition-colors"
            >
              Register as Student →
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
