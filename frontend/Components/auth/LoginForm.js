"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HiOutlineEnvelope,
  HiOutlineArrowRight,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineShieldCheck,
  HiOutlineAcademicCap,
} from "react-icons/hi2";
import { api, setAuthToken, setStoredUser } from "@/lib/api";
import { UserRole, ROLE_LABELS, ROLE_HOME_ROUTES } from "@/lib/roles";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Selected role: strictly UserRole.STUDENT ("student") or UserRole.CLUB_PRESIDENT ("club_president")
  const initialRoleParam = searchParams.get("role");
  const isInitiallyPresident =
    initialRoleParam === "president" ||
    initialRoleParam === "club_president" ||
    initialRoleParam === "club head";

  const [selectedRole, setSelectedRole] = useState(
    isInitiallyPresident ? UserRole.CLUB_PRESIDENT : UserRole.STUDENT
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "president" || roleParam === "club_president") {
      setSelectedRole(UserRole.CLUB_PRESIDENT);
    } else if (roleParam === "student") {
      setSelectedRole(UserRole.STUDENT);
    }

    const reason = searchParams.get("reason");
    if (reason === "inactive") {
      setError("Your session expired after 30 days of inactivity. Please sign in again.");
    } else if (reason === "unauthorized") {
      setError("Please sign in with the appropriate role to access that area.");
    }
  }, [searchParams]);

  const handleFillDemo = (role) => {
    setError(null);
    setSelectedRole(role);
    if (role === UserRole.STUDENT) {
      setEmail("student@campus.edu");
      setPassword("Student@123");
    } else {
      setEmail("president@campus.edu");
      setPassword("President@123");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.auth.login({
        email: email.trim(),
        password,
        role: selectedRole,
      });

      if (response.success && response.user) {
        // Enforce redirection strictly based on authenticated user's actual role
        const userRole = response.user.role;
        const targetRoute =
          ROLE_HOME_ROUTES[userRole] ||
          (userRole === UserRole.CLUB_PRESIDENT ? "/president" : "/student");

        router.push(targetRoute);
      }
    } catch (err) {
      // In offline / mock development fallback, provide smooth navigation with mock identity
      if (
        err.message?.includes("Failed to fetch") ||
        err.message?.includes("NetworkError") ||
        err.message?.includes("404")
      ) {
        const mockUser =
          selectedRole === UserRole.CLUB_PRESIDENT
            ? {
                id: "pres-demo",
                name: "Arjun Mehta",
                email: email || "president@campus.edu",
                role: UserRole.CLUB_PRESIDENT,
                department: "Robotics & Automation",
                studentId: "STU-2025-0089",
              }
            : {
                id: "stu-demo",
                name: "Aarav Sharma",
                email: email || "student@campus.edu",
                role: UserRole.STUDENT,
                department: "Computer Science",
                studentId: "STU-2026-0142",
              };

        setAuthToken("demo-mock-token-2026");
        setStoredUser(mockUser);

        const targetRoute = ROLE_HOME_ROUTES[selectedRole] || "/student";
        router.push(targetRoute);
        return;
      }

      setError(
        err.message ||
          "Invalid credentials. Please verify your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  const isPresident = selectedRole === UserRole.CLUB_PRESIDENT;

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#0c0c0f]/85 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] text-left relative">
      {/* Header */}
      <div className="mb-6 space-y-1.5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300">
            {isPresident ? "Club President Portal" : "Student Portal"}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Welcome back.
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
          {isPresident
            ? "Sign in to manage your club charter, activities, and members."
            : "Sign in to access your clubs, event passes, and campus activity."}
        </p>
      </div>

      {/* Role Selection Tabs (Student vs Club President ONLY) */}
      <div className="mb-6 space-y-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
          Login as
        </label>
        <div className="grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/[0.02] p-1.5">
          <button
            type="button"
            onClick={() => {
              setSelectedRole(UserRole.STUDENT);
              setError(null);
            }}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer ${
              !isPresident
                ? "bg-white text-black shadow-xs font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <HiOutlineAcademicCap className="text-base" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSelectedRole(UserRole.CLUB_PRESIDENT);
              setError(null);
            }}
            className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all cursor-pointer ${
              isPresident
                ? "bg-white text-black shadow-xs font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <HiOutlineShieldCheck className="text-base" />
            <span>Club President</span>
          </button>
        </div>
      </div>

      {/* 1-Click Demo Fill Bar */}
      <div className="mb-5 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-3 py-1.5 text-xs">
        <span className="text-[11px] font-mono text-neutral-400">
          Demo login:
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => handleFillDemo(UserRole.STUDENT)}
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono transition-all cursor-pointer ${
              !isPresident
                ? "border-white bg-white text-black font-bold"
                : "border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08]"
            }`}
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo(UserRole.CLUB_PRESIDENT)}
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-mono transition-all cursor-pointer ${
              isPresident
                ? "border-white bg-white text-black font-bold"
                : "border-white/10 bg-white/[0.04] text-neutral-300 hover:bg-white/[0.08]"
            }`}
          >
            👑 President
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-5 rounded-2xl border border-red-500/25 bg-red-500/[0.08] p-3 text-xs text-red-200">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
            <HiOutlineEnvelope className="text-neutral-400 text-sm" />
            <span>Email Address</span>
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            placeholder={
              isPresident
                ? "president@campus.edu"
                : "student@campus.edu"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 transition-colors focus:border-white/30 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <HiOutlineLockClosed className="text-neutral-400 text-sm" />
              <span>Password</span>
            </label>
            <span className="text-[11px] text-neutral-500 font-mono">
              Min 6 characters
            </span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 pr-10 text-xs text-white placeholder-neutral-500 transition-colors focus:border-white/30 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              {showPassword ? (
                <HiOutlineEyeSlash className="text-sm" />
              ) : (
                <HiOutlineEye className="text-sm" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-neutral-400 hover:text-neutral-300">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-white focus:ring-0"
            />
            <span>Keep session active</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white font-semibold text-xs text-black shadow-xs transition-all hover:bg-neutral-200 active:scale-95 disabled:opacity-50 cursor-pointer mt-4"
        >
          <span>{loading ? "Authenticating..." : `Login as ${ROLE_LABELS[selectedRole]}`}</span>
          <HiOutlineArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
        </button>
      </form>

      {/* Registration Footer */}
      <div className="mt-6 border-t border-white/8 pt-5 text-center text-xs text-neutral-400">
        <span>Don't have an account? </span>
        <Link
          href={`/register?role=${selectedRole}`}
          className="font-medium text-white underline underline-offset-4 hover:text-neutral-200"
        >
          Register as {ROLE_LABELS[selectedRole]} →
        </Link>
      </div>
    </div>
  );
}
