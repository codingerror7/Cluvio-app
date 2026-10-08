"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineIdentification,
  HiOutlineArrowRight,
  HiOutlineSparkles,
} from "react-icons/hi2";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import RoleSelector from "./RoleSelector";

export default function RegisterForm() {
  const [role, setRole] = useState("student");
  const [enrollment, setEnrollment] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Non-functional mock submit (purely UI feedback demonstration)
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const isPresident = role === "president";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Create your Cluvio account
        </h1>
        <p className="mt-2 text-sm leading-6 text-white/55">
          {isPresident
            ? "Register to lead and manage your college club community."
            : "Join campus clubs, RSVP for events, and connect with peers."}
        </p>
      </div>

      {/* Mock notice if form is submitted */}
      {submitted && (
        <div className="mb-6 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-3.5 text-xs text-[var(--accent)] flex items-center justify-between animate-fadeIn">
          <span>
            Demo preview: Registered as {isPresident ? "Club President" : "Student"} (UI/UX only).
          </span>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-white/60 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      {/* Role Selection */}
      <div className="mb-6">
        <RoleSelector role={role} onChange={setRole} />
      </div>

      {/* Role Context Pill */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-xs text-white/70">
        <HiOutlineSparkles className="text-sm text-[var(--accent)] shrink-0" />
        <span>
          {isPresident
            ? "Club President profile: includes club dashboard & event publishing tools."
            : "Student profile: explore student organizations, activities & membership."}
        </span>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Enrollment Number */}
        <FormInput
          label="Enrollment Number"
          id="register-enrollment"
          type="text"
          placeholder="Enter your enrollment number"
          value={enrollment}
          onChange={(e) => setEnrollment(e.target.value)}
          icon={HiOutlineIdentification}
          helper="University-issued student ID or enrollment code"
          required
        />

        {/* Full Name */}
        <FormInput
          label="Full Name"
          id="register-name"
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          icon={HiOutlineUser}
          required
        />

        {/* Email Address */}
        <FormInput
          label="Email Address"
          id="register-email"
          type="email"
          placeholder={isPresident ? "Enter your official / college email" : "Enter your email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={HiOutlineEnvelope}
          required
        />

        {/* Password */}
        <PasswordInput
          label="Password"
          id="register-password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showStrengthMeter={true}
          helper="Use at least 8 characters with letters, numbers, and symbols"
          required
        />

        {/* Terms and conditions */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-[var(--accent)] focus:ring-0 shrink-0"
            />
            <span className="text-xs leading-relaxed text-white/50">
              I agree to the{" "}
              <a href="#" className="text-[var(--accent)] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[var(--accent)] hover:underline">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="
            mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl
            bg-[var(--accent)] font-semibold text-black transition-all duration-200
            hover:brightness-110 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]
            active:scale-[0.99] cursor-pointer
          "
        >
          <span>
            {isPresident ? "Create President Account" : "Create Student Account"}
          </span>
          <HiOutlineArrowRight className="text-base" />
        </button>
      </form>

      {/* Login Footer */}
      <p className="mt-8 text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[var(--accent)] hover:underline ml-1"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
