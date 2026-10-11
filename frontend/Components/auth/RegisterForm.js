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
  "AI & ML",
  "Robotics",
  "Design",
  "Cultural",
  "E-Cell",
  "Sports",
  "Social",
];

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Account & Credentials | 2: Campus Details & Terms

  const [role, setRole] = useState("student"); // 'student' | 'club member' | 'club head'
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
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

  const handleNextStep = (e) => {
    e.preventDefault();
    setError(null);

    // Validate Step 1
    if (!fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid campus email address.");
      return;
    }
    if (isSpecialRole) {
      if (!secretKey || secretKey.trim() !== "admin123") {
        setError(
          `Secret key 'admin123' is required for ${
            role === "club head" ? "Club Head" : "Club Member"
          }.`
        );
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

    // Validate Step 2
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
        secretKey: isSpecialRole ? secretKey.trim() : undefined,
        enrollmentNumber: enrollment.trim(),
        studentId: enrollment.trim(),
        age: Number(age) || 20,
        bio: bio.trim() || "Active campus enthusiast.",
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
      setDepartment("Computer Science");
      setYear("1st Year");
      setBio("Excited to explore campus clubs!");
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
      setDepartment("Data Science & AI");
      setYear("2nd Year");
      setBio("Active club member coordinating events.");
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
      setDepartment("Computer Science");
      setYear("3rd Year");
      setBio("Leading campus technical club society.");
      setAgreeTerms(true);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
      {/* Header & Stepper */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200/80 bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700">
            <HiOutlineSparkles className="text-xs text-blue-600" />
            <span>Campus Registration</span>
          </div>

          {/* Stepper indicator */}
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                step === 1
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-emerald-600 text-white"
              }`}
            >
              {step === 2 ? "✓" : "1"}
            </span>
            <span>Step {step} of 2</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {step === 1 ? "Create Account" : "Campus Profile"}
        </h1>
        <p className="mt-0.5 text-xs text-slate-500">
          {step === 1
            ? "Choose role and set your account login credentials."
            : "Complete your college details and interest areas."}
        </p>

        {/* Progress bar */}
        <div className="mt-2.5 grid grid-cols-2 gap-1.5 h-1">
          <div
            className={`h-full rounded-full transition-all duration-200 ${
              step >= 1 ? "bg-blue-600" : "bg-slate-100"
            }`}
          />
          <div
            className={`h-full rounded-full transition-all duration-200 ${
              step === 2 ? "bg-blue-600" : "bg-slate-100"
            }`}
          />
        </div>
      </div>

      {/* 1-Click Demo Presets Bar */}
      <div className="mb-3.5 flex items-center justify-between rounded-lg border border-slate-200/80 bg-slate-50/60 px-2.5 py-1.5 text-xs">
        <span className="text-[11px] font-medium text-slate-500">
          Demo fill:
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => handlePresetFill("student")}
            className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-600 cursor-pointer shadow-2xs"
          >
            🎓 Student
          </button>
          <button
            type="button"
            onClick={() => handlePresetFill("club member")}
            className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:border-emerald-300 hover:text-emerald-600 cursor-pointer shadow-2xs"
          >
            👥 Member
          </button>
          <button
            type="button"
            onClick={() => handlePresetFill("club head")}
            className="rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-semibold text-slate-700 hover:border-amber-300 hover:text-amber-600 cursor-pointer shadow-2xs"
          >
            👑 Head
          </button>
        </div>
      </div>

      {/* Error alert */}
      {error && (
        <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-700 flex items-center justify-between">
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

      {/* STEP 1: ROLE & CREDENTIALS */}
      {step === 1 && (
        <form onSubmit={handleNextStep} className="space-y-3">
          {/* Role selector */}
          <RoleSelector role={role} onChange={handleRoleChange} />

          {/* Full Name & Email in compact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <FormInput
              label="Full Name"
              id="register-name"
              type="text"
              placeholder="e.g. Kabir Das"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={HiOutlineUser}
              required
            />

            <FormInput
              label="Campus Email"
              id="register-email"
              type="email"
              placeholder="name@campus.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={HiOutlineEnvelope}
              required
            />
          </div>

          {/* Secret Key Input if Club Member or Club Head */}
          {isSpecialRole && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-2.5 space-y-1.5 transition-all">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="register-secret-key"
                  className="flex items-center gap-1.5 text-xs font-semibold text-amber-900"
                >
                  <HiOutlineKey className="text-sm text-amber-700" />
                  <span>
                    Secret Key ({role === "club head" ? "Club Head" : "Club Member"})
                  </span>
                </label>
                <span className="text-[10px] font-mono text-amber-800 bg-white border border-amber-200 px-1.5 py-0.2 rounded font-semibold">
                  admin123
                </span>
              </div>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                  <HiOutlineLockClosed className="text-sm" />
                </div>
                <input
                  id="register-secret-key"
                  type={showSecretKey ? "text" : "password"}
                  placeholder="Enter 'admin123'"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  required
                  className="h-9 sm:h-10 w-full rounded-lg border border-amber-200 bg-white pl-9 pr-9 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-200 transition-all font-mono"
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
            </div>
          )}

          {/* Password & Confirm Password (2-col grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <PasswordInput
              label="Password"
              id="register-password"
              placeholder="Min. 6 chars"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <PasswordInput
              label="Confirm Password"
              id="register-confirm-password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="mt-2 flex h-10 sm:h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            <span>Next: Campus Details</span>
            <HiOutlineArrowRight className="text-sm" />
          </button>
        </form>
      )}

      {/* STEP 2: CAMPUS PROFILE & FINISH */}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Enrollment ID and Age */}
          <div className="grid grid-cols-2 gap-2.5">
            <FormInput
              label="Enrollment ID"
              id="register-enrollment"
              type="text"
              placeholder="e.g. STU-2024-..."
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
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="h-10 sm:h-11 w-full rounded-xl border border-slate-200/90 bg-white px-2.5 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Electronics & Communication">Electronics & Comm.</option>
                <option value="Data Science & AI">Data Science & AI</option>
                <option value="Mechanical Engineering">Mechanical Eng.</option>
                <option value="Business Administration">Business Admin.</option>
                <option value="Design & Visual Arts">Design & Arts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Academic Year
              </label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="h-10 sm:h-11 w-full rounded-xl border border-slate-200/90 bg-white px-2.5 text-xs text-slate-800 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 cursor-pointer"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>

          {/* Areas of interest chips */}
          {!isHead && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Club Interests (Pick 1 or more)
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
                        flex items-center gap-1 rounded-lg border px-2 py-0.5 text-[11px] font-medium transition-all cursor-pointer
                        ${
                          selected
                            ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }
                      `}
                    >
                      {selected && <HiCheck className="text-[10px]" />}
                      <span>{genre}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Brief Bio */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Short Bio (Optional)
            </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Brief tagline about yourself or your goals"
              className="h-10 w-full rounded-xl border border-slate-200/90 bg-white px-3 text-xs text-slate-800 placeholder:text-slate-400 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Terms Checkbox */}
          <div className="pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-[11px] text-slate-600">
                I agree to the Cluvio{" "}
                <span className="text-blue-600 font-medium">Terms of Service</span>{" "}
                & Club Guidelines.
              </span>
            </label>
          </div>

          {/* Back & Submit Button Group */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                setError(null);
                setStep(1);
              }}
              className="col-span-1 flex h-10 sm:h-11 items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-xs hover:bg-slate-50 cursor-pointer shadow-2xs"
            >
              <HiOutlineArrowLeft className="text-xs" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              disabled={loading}
              className="col-span-2 flex h-10 sm:h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>Registering...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <HiOutlineArrowRight className="text-sm" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Footer */}
      <p className="mt-4 text-center text-xs text-slate-500">
        Already have an account?{" "}
        <Link
          href="/Login"
          className="font-semibold text-blue-600 hover:underline ml-1"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
}
