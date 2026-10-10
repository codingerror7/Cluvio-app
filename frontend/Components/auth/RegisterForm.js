"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineIdentification,
  HiOutlineArrowRight,
  HiOutlineSparkles,
  HiOutlineCalendar,
  HiOutlineAcademicCap,
  HiOutlineChatBubbleBottomCenterText,
  HiCheck,
} from "react-icons/hi2";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import RoleSelector from "./RoleSelector";
import { api } from "@/lib/api";

const AVAILABLE_GENRES = [
  "Technical",
  "Engineering",
  "AI & ML",
  "Robotics",
  "Creative",
  "Cultural",
  "Entrepreneurship",
  "Sports",
  "Social",
];

export default function RegisterForm() {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [age, setAge] = useState("20");
  const [bio, setBio] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [year, setYear] = useState("1st Year");
  const [favouriteGenres, setFavouriteGenres] = useState(["Technical"]);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isPresident = role === "president";

  const toggleGenre = (genre) => {
    if (favouriteGenres.includes(genre)) {
      setFavouriteGenres(favouriteGenres.filter((g) => g !== genre));
    } else {
      setFavouriteGenres([...favouriteGenres, genre]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validations
    if (!fullName.trim() || !email.trim() || !password || !enrollment.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and confirmation password do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service to create an account.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.auth.register({
        name: fullName.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        role,
        enrollmentNumber: enrollment.trim(),
        studentId: enrollment.trim(),
        age: Number(age) || 20,
        bio: bio.trim(),
        department,
        year,
        favouriteGenres: isPresident ? [] : favouriteGenres,
      });

      if (response.success) {
        if (role === "president") {
          router.push("/president/dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please check your details.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* Role Selection */}
      <div className="mb-6">
        <RoleSelector role={role} onChange={setRole} />
      </div>

      {/* Role Context Pill */}
      <div className="mb-6 flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-xs text-white/70">
        <HiOutlineSparkles className="text-sm text-[var(--accent)] shrink-0" />
        <span>
          {isPresident
            ? "Club President profile: includes club creation & member request management."
            : "Student profile: explore student organizations & submit membership requests."}
        </span>
      </div>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder={isPresident ? "president@campus.edu" : "student@campus.edu"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={HiOutlineEnvelope}
          required
        />

        {/* Enrollment Number and Age */}
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="Enrollment ID"
            id="register-enrollment"
            type="text"
            placeholder={isPresident ? "PRES-2024-..." : "STU-2024-..."}
            value={enrollment}
            onChange={(e) => setEnrollment(e.target.value)}
            icon={HiOutlineIdentification}
            required
          />

          <FormInput
            label="Age"
            id="register-age"
            type="number"
            min="16"
            max="99"
            placeholder="20"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            icon={HiOutlineCalendar}
            required
          />
        </div>

        {/* Department and Year */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-[var(--accent)]"
            >
              <option value="Computer Science" className="bg-[#111827]">Computer Science</option>
              <option value="Electronics & Communication" className="bg-[#111827]">Electronics & Comm.</option>
              <option value="Mechanical Engineering" className="bg-[#111827]">Mechanical Eng.</option>
              <option value="Data Science & AI" className="bg-[#111827]">Data Science & AI</option>
              <option value="Business Administration" className="bg-[#111827]">Business Admin.</option>
              <option value="Design & Visual Arts" className="bg-[#111827]">Design & Visual Arts</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">
              Academic Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none focus:border-[var(--accent)]"
            >
              <option value="1st Year" className="bg-[#111827]">1st Year</option>
              <option value="2nd Year" className="bg-[#111827]">2nd Year</option>
              <option value="3rd Year" className="bg-[#111827]">3rd Year</option>
              <option value="4th Year" className="bg-[#111827]">4th Year</option>
            </select>
          </div>
        </div>

        {/* Student Specific: Favourite Genres */}
        {!isPresident && (
          <div>
            <label className="block text-xs font-medium text-white/80 mb-2">
              Favourite Genres / Areas of Interest
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_GENRES.map((genre) => {
                const selected = favouriteGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`
                      flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer
                      ${
                        selected
                          ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--accent)] shadow-xs"
                          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/20 hover:text-white"
                      }
                    `}
                  >
                    {selected && <HiCheck className="text-xs" />}
                    <span>{genre}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bio */}
        <div>
          <label className="block text-xs font-medium text-white/80 mb-1.5">
            Brief Bio
          </label>
          <textarea
            rows={2}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={
              isPresident
                ? "Brief overview of your leadership background..."
                : "A short bio about yourself and what clubs you'd like to join..."
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder:text-white/30 outline-none focus:border-[var(--accent)] resize-none"
          />
        </div>

        {/* Password */}
        <PasswordInput
          label="Password"
          id="register-password"
          placeholder="Create a password (min. 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showStrengthMeter={true}
          required
        />

        {/* Confirm Password */}
        <PasswordInput
          label="Confirm Password"
          id="register-confirm-password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-[var(--accent)] focus:ring-0 shrink-0 cursor-pointer"
            />
            <span className="text-xs leading-relaxed text-white/50">
              I agree to the{" "}
              <a href="#" className="text-[var(--accent)] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[var(--accent)] hover:underline">
                Club Code of Conduct
              </a>
              .
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl
            bg-[var(--accent)] font-semibold text-black transition-all duration-200
            hover:brightness-110 hover:shadow-[0_0_24px_rgba(34,211,238,0.3)]
            active:scale-[0.99] cursor-pointer disabled:opacity-50
          "
        >
          {loading ? (
            <span>Creating account...</span>
          ) : (
            <>
              <span>
                {isPresident ? "Create President Account" : "Create Student Account"}
              </span>
              <HiOutlineArrowRight className="text-base" />
            </>
          )}
        </button>
      </form>

      {/* Login Footer */}
      <p className="mt-8 text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link
          href="/Login"
          className="font-semibold text-[var(--accent)] hover:underline ml-1"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
