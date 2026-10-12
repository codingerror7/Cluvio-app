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

    // Validate secret key for special roles
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
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 sm:p-7">
      {/* Header */}
      <div className="mb-4 text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-800 shadow-[0_1px_4px_rgba(0,0,0,0.02)] mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <span>Campus Access Portal</span>
        </div>
        <h1 className="text-2xl sm:text-[26px] font-black tracking-tight text-slate-900">
          Sign In to BroClubs
        </h1>
        <p className="mt-1 text-xs text-slate-500 font-normal">
          Choose your campus role and enter credentials to continue.
        </p>
      </div>

      {/* Role Selection Tabs */}
      <div className="mb-3.5">
        <div className="grid grid-cols-3 gap-1 rounded-2xl border border-slate-200/70 bg-slate-100/70 p-1">
          <button
            type="button"
            onClick={() => handleRoleChange("student")}
            className={`
              flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs transition-all cursor-pointer
              ${
                role === "student"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200 font-bold"
                  : "text-slate-600 hover:text-slate-900 font-medium"
              }
            `}
          >
            <HiOutlineAcademicCap className="text-sm text-blue-600 shrink-0" />
            <span className="truncate">Student</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("club member")}
            className={`
              flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs transition-all cursor-pointer
              ${
                role === "club member"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200 font-bold"
                  : "text-slate-600 hover:text-slate-900 font-medium"
              }
            `}
          >
            <HiOutlineUserGroup className="text-sm text-emerald-600 shrink-0" />
            <span className="truncate">Member</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleChange("club head")}
            className={`
              flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs transition-all cursor-pointer
              ${
                role === "club head"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200 font-bold"
                  : "text-slate-600 hover:text-slate-900 font-medium"
              }
            `}
          >
            <HiOutlineShieldCheck className="text-sm text-amber-600 shrink-0" />
            <span className="truncate">Club Head</span>
          </button>
        </div>
      </div>

      {/* 1-Click Demo Fill bar */}
      <div className="mb-3.5 flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50/70 px-3 py-1.5 text-xs">
        <span className="text-[11px] font-medium text-slate-500">
          Demo login:
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => handleFillDemo("student")}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-2xs"
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("club member")}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-2xs"
          >
            👥 Member
          </button>
          <button
            type="button"
            onClick={() => handleFillDemo("club head")}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-2xs"
          >
            👑 Head
          </button>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-3 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 flex items-center justify-between">
          <span className="font-medium">{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="ml-2 text-rose-500 hover:text-rose-800 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
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
        <PasswordInput
          label="Password"
          id="login-password"
          placeholder="Enter your account password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Secret Key Input (Visible only for Club Member & Club Head) */}
        {isSpecialRole && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-3 space-y-1.5 transition-all">
            <div className="flex items-center justify-between">
              <label
                htmlFor="login-secret-key"
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-900"
              >
                <HiOutlineKey className="text-sm text-amber-700" />
                <span>Secret Passkey (Required)</span>
              </label>
              <span className="text-[10px] font-mono text-amber-800 bg-white border border-amber-200 px-1.5 py-0.2 rounded-md font-semibold">
                admin123
              </span>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                <HiOutlineLockClosed className="text-sm" />
              </div>
              <input
                id="login-secret-key"
                type={showSecretKey ? "text" : "password"}
                placeholder="Enter 'admin123'"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required
                className="h-10 w-full rounded-xl border border-amber-200 bg-white pl-9 pr-9 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowSecretKey(!showSecretKey)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                {showSecretKey ? (
                  <HiOutlineEyeSlash className="text-sm" />
                ) : (
                  <HiOutlineEye className="text-sm" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-amber-800/80 leading-normal">
              Security validation required for leadership accounts.
            </p>
          </div>
        )}

        {/* Remember me & role info */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
            />
            <span className="text-xs text-slate-600 hover:text-slate-900 transition-colors">
              Remember me
            </span>
          </label>

          <span className="text-[11px] text-slate-500">
            Role: <span className="capitalize font-semibold text-slate-800">{role}</span>
          </span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {loading ? (
            <span>Signing In...</span>
          ) : (
            <>
              <span>Sign In as {role === "student" ? "Student" : role === "club member" ? "Club Member" : "Club Head"}</span>
              <HiOutlineArrowRight className="text-sm" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-4 text-center text-xs text-slate-500">
        Don&apos;t have an account yet?{" "}
        <Link
          href="/register"
          className="font-semibold text-slate-900 hover:text-blue-600 underline decoration-slate-300 ml-1 transition-colors"
        >
          Create account →
        </Link>
      </p>
    </div>
  );
}
