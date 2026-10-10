"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineEnvelope,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineKey,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import { api } from "@/lib/api";

export default function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState("student"); // 'student' | 'club member' | 'club head'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isSpecialRole = role === "club member" || role === "club head";

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setError(null);
    if (newRole === "student") {
      setSecretKey("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate secret key for special roles on client first
    if (isSpecialRole) {
      if (!secretKey || secretKey.trim() !== "admin123") {
        setError(
          `Secret key is required for ${
            role === "club head" ? "Club Head" : "Club Member"
          }. Please enter 'admin123'.`
        );
        return;
      }
    }

    setLoading(true);

    try {
      const response = await api.auth.login({
        email: email.trim(),
        password,
        role,
        secretKey: isSpecialRole ? secretKey.trim() : undefined,
      });

      if (response.success && response.user) {
        if (response.user.role === "president" || response.user.role === "club head") {
          router.push("/president/dashboard");
        } else if (response.user.role === "admin") {
          window.location.href = "http://localhost:3001/dashboard";
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError(
        err.message || "Invalid credentials. Please verify your email, password, or secret key."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (roleType) => {
    setError(null);
    if (roleType === "student") {
      setRole("student");
      setEmail("student@campus.edu");
      setPassword("Student@123");
      setSecretKey("");
    } else if (roleType === "club member") {
      setRole("club member");
      setEmail("member@campus.edu");
      setPassword("Member@123");
      setSecretKey("admin123");
    } else if (roleType === "club head") {
      setRole("club head");
      setEmail("clubhead@campus.edu");
      setPassword("Head@123");
      setSecretKey("admin123");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 mb-3">
          <HiOutlineSparkles className="text-sm" />
          <span>Cluvio Multi-Role Authentication</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Sign In to Cluvio
        </h1>
        <p className="mt-1.5 text-sm leading-6 text-white/55">
          Select your campus role and enter your credentials.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="mb-5">
        <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">
          Select Login Role
        </label>
        <div className="grid grid-cols-3 gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-md">
          <button
            type="button"
            onClick={() => handleRoleChange("student")}
            className={`
              flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer
              ${
                role === "student"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_16px_rgba(34,211,238,0.35)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <HiOutlineAcademicCap className="text-base" />
            <span>Student</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("club member")}
            className={`
              flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer
              ${
                role === "club member"
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <HiOutlineUserGroup className="text-base" />
            <span>Club Member</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("club head")}
            className={`
              flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer
              ${
                role === "club head"
                  ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-[0_0_16px_rgba(245,158,11,0.35)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }
            `}
          >
            <HiOutlineShieldCheck className="text-base" />
            <span>Club Head</span>
          </button>
        </div>
      </div>

      {/* Role Context Pill */}
      <div
        className={`mb-5 flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs transition-all ${
          role === "student"
            ? "border-cyan-500/20 bg-cyan-500/5 text-cyan-300"
            : role === "club member"
            ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
            : "border-amber-500/20 bg-amber-500/5 text-amber-300"
        }`}
      >
        <div className="flex items-center gap-2">
          {role === "student" ? (
            <HiOutlineAcademicCap className="text-base shrink-0" />
          ) : role === "club member" ? (
            <HiOutlineUserGroup className="text-base shrink-0" />
          ) : (
            <HiOutlineShieldCheck className="text-base shrink-0" />
          )}
          <span>
            {role === "student"
              ? "Open student access — no secret key needed."
              : role === "club member"
              ? "Club Member role requires secret key 'admin123'."
              : "Club Head leadership role requires secret key 'admin123'."}
          </span>
        </div>
        {isSpecialRole && (
          <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase tracking-wide">
            Key Req.
          </span>
        )}
      </div>

      {/* Quick Demo Autofill Bar */}
      <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-1.5 font-semibold text-white/80">
            <HiOutlineSparkles className="text-sm text-cyan-400" />
            <span>1-Click Demo Fill:</span>
          </span>
          <span className="text-[10px] text-white/40">Select to test quickly</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => handleFillDemo("student")}
            className="rounded-xl border border-white/10 bg-white/5 py-2 px-2 text-center hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all cursor-pointer"
          >
            <p className="font-semibold text-white text-[11px]">🎓 Student</p>
            <p className="text-[10px] text-white/45 truncate">student@campus.edu</p>
          </button>

          <button
            type="button"
            onClick={() => handleFillDemo("club member")}
            className="rounded-xl border border-white/10 bg-white/5 py-2 px-2 text-center hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all cursor-pointer"
          >
            <p className="font-semibold text-white text-[11px]">👥 Member</p>
            <p className="text-[10px] text-white/45 truncate">member@campus.edu</p>
          </button>

          <button
            type="button"
            onClick={() => handleFillDemo("club head")}
            className="rounded-xl border border-white/10 bg-white/5 py-2 px-2 text-center hover:border-amber-400/50 hover:bg-amber-500/10 transition-all cursor-pointer"
          >
            <p className="font-semibold text-white text-[11px]">👑 Club Head</p>
            <p className="text-[10px] text-white/45 truncate">clubhead@campus.edu</p>
          </button>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 flex items-center justify-between">
          <span className="font-medium">{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-2 text-white/60 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <FormInput
          label="Campus Email Address"
          id="login-email"
          type="email"
          placeholder="your.name@campus.edu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={HiOutlineEnvelope}
          required
        />

        {/* Password */}
        <div>
          <PasswordInput
            label="Password"
            id="login-password"
            placeholder="Enter your account password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Secret Key Input (Visible only for Club Member & Club Head) */}
        {isSpecialRole && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.05] p-3.5 space-y-2 transition-all">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-secret-key"
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-300"
              >
                <HiOutlineKey className="text-sm" />
                <span>Secret Key (Required)</span>
              </label>
              <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/20 px-2 py-0.5 rounded-md">
                Passcode: admin123
              </span>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-amber-400/60">
                <HiOutlineLockClosed className="text-base" />
              </div>
              <input
                id="login-secret-key"
                type={showSecretKey ? "text" : "password"}
                placeholder="Enter 'admin123'"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
                className="h-11 w-full rounded-xl border border-amber-500/30 bg-black/40 pl-10 pr-10 text-sm text-white placeholder:text-white/30 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/50 hover:text-white cursor-pointer"
              >
                {showSecretKey ? (
                  <HiOutlineEyeSlash className="text-base" />
                ) : (
                  <HiOutlineEye className="text-base" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-white/45 leading-relaxed">
              Security check: enter <code className="text-amber-300 font-bold">admin123</code> to verify {role === "club head" ? "Club Head" : "Club Member"} authority.
            </p>
          </div>
        )}

        {/* Remember me row */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-cyan-400 focus:ring-0 cursor-pointer"
            />
            <span className="text-xs text-white/60 hover:text-white/80 transition-colors">
              Remember me
            </span>
          </label>

          <span className="text-xs text-cyan-400/80">
            Role: <span className="capitalize font-semibold text-white">{role}</span>
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className={`
            mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl
            font-semibold text-black transition-all duration-200 cursor-pointer disabled:opacity-50
            hover:brightness-110 active:scale-[0.99]
            ${
              role === "student"
                ? "bg-cyan-400 hover:shadow-[0_0_24px_rgba(34,211,238,0.4)]"
                : role === "club member"
                ? "bg-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.4)]"
                : "bg-amber-400 hover:shadow-[0_0_24px_rgba(245,158,11,0.4)]"
            }
          `}
        >
          {loading ? (
            <span>Authenticating...</span>
          ) : (
            <>
              <span>Sign In as {role === "student" ? "Student" : role === "club member" ? "Club Member" : "Club Head"}</span>
              <HiOutlineArrowRight className="text-base" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-7 text-center text-sm text-white/50">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/register"
          className="font-semibold text-cyan-400 hover:underline ml-1"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}
