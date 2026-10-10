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
  HiOutlineKey,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
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
  const [role, setRole] = useState("student"); // 'student' | 'club member' | 'club head'
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);
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

  const isSpecialRole = role === "club member" || role === "club head";
  const isHead = role === "club head";

  const toggleGenre = (genre) => {
    if (favouriteGenres.includes(genre)) {
      setFavouriteGenres(favouriteGenres.filter((g) => g !== genre));
    } else {
      setFavouriteGenres([...favouriteGenres, genre]);
    }
  };

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

    if (isSpecialRole) {
      if (!secretKey || secretKey.trim() !== "admin123") {
        setError(
          `Secret key 'admin123' is required to register as ${
            role === "club head" ? "Club Head" : "Club Member"
          }.`
        );
        return;
      }
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
        secretKey: isSpecialRole ? secretKey.trim() : undefined,
        enrollmentNumber: enrollment.trim(),
        studentId: enrollment.trim(),
        age: Number(age) || 20,
        bio: bio.trim(),
        department,
        year,
        favouriteGenres: isHead ? [] : favouriteGenres,
      });

      if (response.success) {
        if (role === "club head" || role === "president") {
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

  const handlePresetFill = (type) => {
    setError(null);
    const rand = Math.floor(100 + Math.random() * 900);
    if (type === "student") {
      setRole("student");
      setFullName("Kabir Das");
      setEmail(`kabir.${rand}@campus.edu`);
      setEnrollment(`STU-2024-${rand}`);
      setPassword("Student@123");
      setConfirmPassword("Student@123");
      setSecretKey("");
      setAge("19");
      setBio("Excited to explore campus clubs and technical workshops!");
      setAgreeTerms(true);
    } else if (type === "club member") {
      setRole("club member");
      setFullName("Neha Varma");
      setEmail(`neha.${rand}@campus.edu`);
      setEnrollment(`MEM-2024-${rand}`);
      setPassword("Member@123");
      setConfirmPassword("Member@123");
      setSecretKey("admin123");
      setAge("20");
      setBio("Active club member looking to organize campus hackathons!");
      setAgreeTerms(true);
    } else if (type === "club head") {
      setRole("club head");
      setFullName("Aditya Roy");
      setEmail(`aditya.${rand}@campus.edu`);
      setEnrollment(`HEAD-2024-${rand}`);
      setPassword("Head@123");
      setConfirmPassword("Head@123");
      setSecretKey("admin123");
      setAge("21");
      setBio("Founder & Lead of Campus Developer Society.");
      setAgreeTerms(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400 mb-3">
          <HiOutlineSparkles className="text-sm" />
          <span>Join Cluvio Community</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Create an Account
        </h1>
        <p className="mt-1 text-sm leading-6 text-white/55">
          {role === "student"
            ? "Register to browse clubs, attend events & submit memberships."
            : role === "club member"
            ? "Register as an active club member with Secret Key 'admin123'."
            : "Register as Club Head to direct club operations & review requests."}
        </p>
      </div>

      {/* Role Selection */}
      <div className="mb-5">
        <RoleSelector role={role} onChange={handleRoleChange} />
      </div>

      {/* Preset Fill Bar */}
      <div className="mb-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-xs">
        <span className="text-white/60 font-medium">Quick Autofill Preset:</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => handlePresetFill("student")}
            className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-[11px] text-cyan-300 hover:bg-cyan-500/20 cursor-pointer"
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => handlePresetFill("club member")}
            className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 text-[11px] text-emerald-300 hover:bg-emerald-500/20 cursor-pointer"
          >
            Member
          </button>
          <button
            type="button"
            onClick={() => handlePresetFill("club head")}
            className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-1 text-[11px] text-amber-300 hover:bg-amber-500/20 cursor-pointer"
          >
            Club Head
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-xs text-rose-300 flex items-center justify-between">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-white/60 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

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
          placeholder={
            role === "club head"
              ? "clubhead@campus.edu"
              : role === "club member"
              ? "member@campus.edu"
              : "student@campus.edu"
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={HiOutlineEnvelope}
          required
        />

        {/* Secret Key Input if Club Member or Club Head */}
        {isSpecialRole && (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/[0.05] p-3.5 space-y-2 transition-all">
            <div className="flex items-center justify-between">
              <label
                htmlFor="register-secret-key"
                className="flex items-center gap-1.5 text-xs font-semibold text-amber-300"
              >
                <HiOutlineKey className="text-sm" />
                <span>Secret Key (Required for {role === "club head" ? "Club Head" : "Club Member"})</span>
              </label>
              <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/20 px-2 py-0.5 rounded-md">
                admin123
              </span>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-amber-400/60">
                <HiOutlineLockClosed className="text-base" />
              </div>
              <input
                id="register-secret-key"
                type={showSecretKey ? "text" : "password"}
                placeholder="Enter secret key 'admin123'"
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
              Required access code: enter <code className="text-amber-300 font-bold">admin123</code> to verify authorized registration.
            </p>
          </div>
        )}

        {/* Enrollment ID and Age */}
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label="Enrollment ID"
            id="register-enrollment"
            type="text"
            placeholder={
              role === "club head"
                ? "HEAD-2024-..."
                : role === "club member"
                ? "MEM-2024-..."
                : "STU-2024-..."
            }
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

        {/* Department and Academic Year */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">
              Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-[#111827] px-3 text-sm text-white outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Electronics & Communication">Electronics & Comm.</option>
              <option value="Mechanical Engineering">Mechanical Eng.</option>
              <option value="Data Science & AI">Data Science & AI</option>
              <option value="Business Administration">Business Admin.</option>
              <option value="Design & Visual Arts">Design & Visual Arts</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">
              Academic Year
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="h-12 w-full rounded-xl border border-white/10 bg-[#111827] px-3 text-sm text-white outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
        </div>

        {/* Favourite Genres for Student & Member */}
        {!isHead && (
          <div>
            <label className="block text-xs font-medium text-white/80 mb-2">
              Areas of Interest & Club Genres
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_GENRES.map((genre) => {
                const selected = favouriteGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`
                      flex items-center gap-1.5 rounded-xl border px-2.5 py-1 text-xs font-medium transition-all cursor-pointer
                      ${
                        selected
                          ? "border-cyan-400 bg-cyan-500/15 text-cyan-300"
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
              role === "club head"
                ? "Brief summary of your club leadership experience..."
                : role === "club member"
                ? "Summary of your club contributions and skills..."
                : "A short bio about yourself and what you're excited to learn..."
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder:text-white/30 outline-none focus:border-cyan-400 resize-none"
          />
        </div>

        {/* Password */}
        <PasswordInput
          label="Password"
          id="register-password"
          placeholder="Create password (min. 6 chars)"
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

        {/* Terms */}
        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 accent-cyan-400 focus:ring-0 shrink-0 cursor-pointer"
            />
            <span className="text-xs leading-relaxed text-white/50">
              I agree to the{" "}
              <a href="#" className="text-cyan-400 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-cyan-400 hover:underline">
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
            <span>Creating account...</span>
          ) : (
            <>
              <span>
                Register as {role === "student" ? "Student" : role === "club member" ? "Club Member" : "Club Head"}
              </span>
              <HiOutlineArrowRight className="text-base" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-white/50">
        Already have an account?{" "}
        <Link
          href="/Login"
          className="font-semibold text-cyan-400 hover:underline ml-1"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
