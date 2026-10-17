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
  HiOutlineIdentification,
  HiOutlineKey,
} from "react-icons/hi2";
import { api, setAuthToken, setStoredUser } from "@/lib/api";
import { UserRole, ROLE_HOME_ROUTES } from "@/lib/roles";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
  const [enrollmentNumber, setEnrollmentNumber] = useState("");
  const [presidentCode, setPresidentCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      setEnrollmentNumber("STU-2026-0142");
    } else {
      setEmail("president@campus.edu");
      setEnrollmentNumber("PRES-2024-DEMO");
      setPresidentCode("482910");
      setPassword("President@123");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let response;
      if (selectedRole === UserRole.CLUB_PRESIDENT) {
        // Authenticate with Email + Enrollment Number + 6-digit President Code
        response = await api.auth.presidentLogin({
          email: email.trim(),
          enrollmentNumber: enrollmentNumber.trim(),
          code: presidentCode.trim(),
          password: password || undefined,
        });
      } else {
        // Student login
        response = await api.auth.login({
          email: email.trim(),
          password,
          role: UserRole.STUDENT,
        });
      }

      if (response.success && response.user) {
        const userRole = response.user.role;
        const targetRoute =
          ROLE_HOME_ROUTES[userRole] ||
          (userRole === UserRole.CLUB_PRESIDENT ? "/president" : "/student");

        router.push(targetRoute);
      }
    } catch (err) {
      setError(
        err.message ||
          "Authentication failed. Please check your credentials and try again."
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
            ? "Sign in with your Email, Enrollment Number, and 6-digit President Code."
            : "Sign in to access your clubs, event passes, and campus activity."}
        </p>
      </div>

      {/* Role Selection Tabs */}
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
          Demo quick-fill:
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
            👑 President (Code: 482910)
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@campus.edu"
            required
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors"
          />
        </div>

        {/* President: Enrollment Number */}
        {isPresident && (
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <HiOutlineIdentification className="text-neutral-400 text-sm" />
              <span>Enrollment Number</span>
            </label>
            <input
              type="text"
              value={enrollmentNumber}
              onChange={(e) => setEnrollmentNumber(e.target.value)}
              placeholder="e.g. PRES-2024-DEMO"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors font-mono"
            />
          </div>
        )}

        {/* President: 6-Digit Code */}
        {isPresident && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <HiOutlineKey className="text-neutral-400 text-sm" />
                <span>6-Digit President Code</span>
              </label>
              <span className="text-[11px] text-neutral-400 font-mono">Issued by College Admin</span>
            </div>
            <input
              type="text"
              maxLength={6}
              value={presidentCode}
              onChange={(e) => setPresidentCode(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 482910"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors font-mono text-center tracking-widest text-lg font-bold"
            />
          </div>
        )}

        {/* Password (Required for students, optional for president activation) */}
        {!isPresident && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <HiOutlineLockClosed className="text-neutral-400 text-sm" />
                <span>Password</span>
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-11 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <HiOutlineEyeSlash className="text-base" /> : <HiOutlineEye className="text-base" />}
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
        >
          <span>{loading ? "Authenticating..." : isPresident ? "Activate & Sign In" : "Sign In to Cluvio"}</span>
          <HiOutlineArrowRight className="text-base" />
        </button>
      </form>

      {/* Footer link to register */}
      <div className="mt-6 text-center text-xs text-neutral-400">
        New student on campus?{" "}
        <Link href="/register" className="font-semibold text-white hover:underline">
          Register student profile
        </Link>
      </div>
    </div>
  );
}
