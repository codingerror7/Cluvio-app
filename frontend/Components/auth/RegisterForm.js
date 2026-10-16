"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineIdentification,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineKey,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiCheck,
} from "react-icons/hi2";
import { api } from "@/lib/api";

const AVAILABLE_GENRES = [
  "Technical",
  "AI & ML",
  "Robotics",
  "Design",
  "Cultural",
  "Sports",
  "Social",
];

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Account & Credentials | 2: Campus Details & Terms

  const [role, setRole] = useState("student"); // 'student' | 'club member'
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [secretKey, setSecretKey] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);

  // Step 2 fields
  const [enrollment, setEnrollment] = useState("");
  const [age, setAge] = useState("20");
  const [department, setDepartment] = useState("Computer Science");
  const [year, setYear] = useState("1st Year");
  const [favouriteGenres, setFavouriteGenres] = useState(["Technical"]);
  const [bio, setBio] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isClubMember = role === "club member";

  const toggleGenre = (genre) => {
    if (favouriteGenres.includes(genre)) {
      setFavouriteGenres(favouriteGenres.filter((g) => g !== genre));
    } else {
      setFavouriteGenres([...favouriteGenres, genre]);
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid campus email address.");
      return;
    }
    if (isClubMember) {
      if (!secretKey || secretKey.trim() !== "admin123") {
        setError('Valid secret passkey ("admin123") is required for Club Member.');
        return;
      }
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password and confirmation password do not match.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!enrollment.trim()) {
      setError("Please enter your Enrollment / Student ID.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the Terms of Service to create your account.");
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
        secretKey: isClubMember ? secretKey.trim() : undefined,
        enrollmentNumber: enrollment.trim(),
        studentId: enrollment.trim(),
        age: Number(age) || 20,
        bio: bio.trim() || "Active campus enthusiast.",
        department,
        year,
        favouriteGenres,
      });

      if (response.success) {
        router.push("/dashboard");
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
      setFullName("Alex Morgan");
      setEmail(`alex.${rand}@campus.edu`);
      setEnrollment(`STU-2024-${rand}`);
      setPassword("Student@123");
      setConfirmPassword("Student@123");
      setSecretKey("");
      setAge("19");
      setDepartment("Computer Science");
      setYear("1st Year");
      setBio("Excited to explore campus clubs!");
      setAgreeTerms(true);
    } else if (type === "member") {
      setRole("club member");
      setFullName("Rohan Gupta");
      setEmail(`rohan.${rand}@campus.edu`);
      setEnrollment(`MEM-2024-${rand}`);
      setPassword("Member@123");
      setConfirmPassword("Member@123");
      setSecretKey("admin123");
      setAge("20");
      setDepartment("Data Science & AI");
      setYear("2nd Year");
      setBio("Active club member coordinating hackathons.");
      setAgreeTerms(true);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#0c0c0f]/85 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] text-left relative">
      {/* Header & Stepper */}
      <div className="mb-6 space-y-1.5">
        <div className="flex items-center justify-between mb-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-300">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300">
              Student Registration
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
            <span className="h-4 w-4 rounded-full bg-white text-black flex items-center justify-center font-bold text-[9px]">
              {step}
            </span>
            <span>of 2</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          {step === 1 ? "Create Your Account" : "Campus Profile"}
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
          {step === 1
            ? "Enter your details to create your student identity."
            : "Complete your college background and club interests."}
        </p>

        {/* Progress Bar */}
        <div className="grid grid-cols-2 gap-1.5 h-1 pt-1">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              step >= 1 ? "bg-white" : "bg-white/10"
            }`}
          />
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              step === 2 ? "bg-white" : "bg-white/10"
            }`}
          />
        </div>
      </div>

      {/* 1-Click Demo Fill */}
      <div className="mb-5 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-3 py-1.5 text-xs">
        <span className="text-[11px] font-mono text-neutral-400">Demo fill:</span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => handlePresetFill("student")}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-neutral-300 hover:bg-white/[0.08] cursor-pointer"
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => handlePresetFill("member")}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-mono text-neutral-300 hover:bg-white/[0.08] cursor-pointer"
          >
            👥 Member
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

      {/* STEP 1: CREDENTIALS */}
      {step === 1 && (
        <form onSubmit={handleNextStep} className="space-y-4">
          {/* Role selector pill */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
              Role
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl border border-white/10 bg-white/[0.02]">
              <button
                type="button"
                onClick={() => {
                  setRole("student");
                  setSecretKey("");
                }}
                className={`h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === "student"
                    ? "bg-white text-black font-bold shadow-xs"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole("club member");
                  setSecretKey("admin123");
                }}
                className={`h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  role === "club member"
                    ? "bg-white text-black font-bold shadow-xs"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Club Member
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="reg-name"
              className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                <HiOutlineUser className="text-sm" />
              </div>
              <input
                id="reg-name"
                type="text"
                placeholder="e.g. Alex Morgan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-violet-500/25"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="reg-email"
              className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
            >
              Campus Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-400">
                <HiOutlineEnvelope className="text-sm" />
              </div>
              <input
                id="reg-email"
                type="email"
                placeholder="alex@campus.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-10 pr-4 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-violet-500/25"
              />
            </div>
          </div>

          {/* Secret Key if Club Member */}
          {isClubMember && (
            <div className="rounded-2xl border border-violet-500/30 bg-violet-500/[0.05] p-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="reg-secret"
                  className="flex items-center gap-1.5 text-xs font-mono font-semibold text-violet-200"
                >
                  <HiOutlineKey className="text-sm text-violet-300" />
                  <span>Passkey (admin123)</span>
                </label>
              </div>
              <div className="relative">
                <input
                  id="reg-secret"
                  type={showSecretKey ? "text" : "password"}
                  placeholder="Enter secret passkey"
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

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                htmlFor="reg-password"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 chars"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-3.5 pr-9 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-violet-500/25"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="text-sm" />
                  ) : (
                    <HiOutlineEye className="text-sm" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="reg-confirm-password"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
              >
                Confirm
              </label>
              <div className="relative">
                <input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-3.5 pr-9 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.05] focus:ring-1 focus:ring-violet-500/25"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400 hover:text-white cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <HiOutlineEyeSlash className="text-sm" />
                  ) : (
                    <HiOutlineEye className="text-sm" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs sm:text-sm transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-98 cursor-pointer shadow-xs"
          >
            <span>Continue to Campus Profile</span>
            <HiOutlineArrowRight className="text-xs" />
          </button>
        </form>
      )}

      {/* STEP 2: PROFILE & FINISH */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                htmlFor="reg-enrollment"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
              >
                Enrollment ID
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                  <HiOutlineIdentification className="text-sm" />
                </div>
                <input
                  id="reg-enrollment"
                  type="text"
                  placeholder="STU-2024-..."
                  value={enrollment}
                  onChange={(e) => setEnrollment(e.target.value)}
                  required
                  className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-9 pr-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.05]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="reg-age"
                className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
              >
                Age
              </label>
              <input
                id="reg-age"
                type="number"
                min="16"
                max="99"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs sm:text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50 focus:bg-white/[0.05]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-[#121217] px-3 text-xs text-white outline-none cursor-pointer focus:border-violet-500/50"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics & Communication">Electronics & Comm.</option>
                <option value="Data Science & AI">Data Science & AI</option>
                <option value="Mechanical Engineering">Mechanical Eng.</option>
                <option value="Business Administration">Business Admin.</option>
                <option value="Design & Visual Arts">Design & Arts</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
                Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="h-11 w-full rounded-xl border border-white/10 bg-[#121217] px-3 text-xs text-white outline-none cursor-pointer focus:border-violet-500/50"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          {/* Club Interests */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300">
              Club Interests
            </label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_GENRES.map((genre) => {
                const selected = favouriteGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleGenre(genre)}
                    className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer ${
                      selected
                        ? "border-violet-400 bg-violet-400/15 text-violet-200 font-semibold"
                        : "border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {selected && <HiCheck className="text-[10px]" />}
                    <span>{genre}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label
              htmlFor="reg-bio"
              className="block text-xs font-mono uppercase tracking-wider text-neutral-300"
            >
              Short Bio (Optional)
            </label>
            <input
              id="reg-bio"
              type="text"
              placeholder="e.g. Passionate about robotics and competitive coding."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="h-11 w-full rounded-xl border border-white/10 bg-white/[0.03] px-3 text-xs text-white placeholder:text-neutral-500 outline-none transition-all focus:border-violet-500/50"
            />
          </div>

          {/* Terms checkbox */}
          <label className="flex items-center gap-2 cursor-pointer select-none text-xs">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
              className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 text-black focus:ring-0 cursor-pointer"
            />
            <span className="text-neutral-400 text-[11px]">
              I agree to the BroClubs Terms of Service & Campus Guidelines.
            </span>
          </label>

          {/* Back & Submit */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setStep(1);
              }}
              className="col-span-1 flex h-11 items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.04] text-neutral-300 font-semibold text-xs hover:bg-white/[0.08] cursor-pointer"
            >
              <HiOutlineArrowLeft className="text-xs" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-xs sm:text-sm transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xs"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
                  Creating Account...
                </span>
              ) : (
                <>
                  <span>Create Account</span>
                  <HiOutlineArrowRight className="text-xs" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Footer Navigation */}
      <div className="mt-6 pt-5 border-t border-white/8 text-center text-xs text-neutral-400">
        Already have an account?{" "}
        <Link
          href="/Login"
          className="text-white font-semibold underline hover:text-neutral-200 transition-colors"
        >
          Sign In →
        </Link>
      </div>
    </div>
  );
}
