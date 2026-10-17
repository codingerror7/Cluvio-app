"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineIdentification,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineAcademicCap,
  HiOutlineBuildingLibrary,
  HiOutlinePhone,
  HiCheck,
} from "react-icons/hi2";
import { api } from "@/lib/api";
import { UserRole } from "@/lib/roles";

const AVATAR_OPTIONS = [
  { id: "avatar-1", path: "/avatars/avatar-1.svg", label: "Avatar 1" },
  { id: "avatar-2", path: "/avatars/avatar-2.svg", label: "Avatar 2" },
  { id: "avatar-3", path: "/avatars/avatar-3.svg", label: "Avatar 3" },
  { id: "avatar-4", path: "/avatars/avatar-4.svg", label: "Avatar 4" },
  { id: "avatar-5", path: "/avatars/avatar-5.svg", label: "Avatar 5" },
];

export default function RegisterForm() {
  const router = useRouter();

  const [step, setStep] = useState(1); // 1: Credentials | 2: Academic Profile & Avatar

  // Step 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 2
  const [colleges, setColleges] = useState([]);
  const [selectedCollegeId, setSelectedCollegeId] = useState("");
  const [enrollment, setEnrollment] = useState("");
  const [department, setDepartment] = useState("Computer Science");
  const [course, setCourse] = useState("B.Tech");
  const [year, setYear] = useState("1st Year");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("/avatars/avatar-1.svg");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successInfo, setSuccessInfo] = useState(null);

  useEffect(() => {
    // Fetch active colleges
    api.auth.getColleges()
      .then((res) => {
        if (res.success && Array.isArray(res.colleges) && res.colleges.length > 0) {
          setColleges(res.colleges);
          setSelectedCollegeId(res.colleges[0]._id);
        }
      })
      .catch(() => {});
  }, []);

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
      setError("Please enter your official Student ID / Enrollment Number.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the campus community guidelines.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.auth.register({
        name: fullName.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        role: UserRole.STUDENT,
        collegeId: selectedCollegeId,
        enrollmentNumber: enrollment.trim(),
        studentId: enrollment.trim(),
        department,
        course,
        year,
        phone: phone.trim(),
        bio: bio.trim(),
        avatar: selectedAvatar,
      });

      if (response.success) {
        setSuccessInfo(
          "Your student account and profile have been submitted! Your profile is currently pending approval by your College Admin."
        );
        setTimeout(() => {
          router.push("/student/profile");
        }, 1500);
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-3xl border border-white/10 bg-[#0c0c0f]/85 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_24px_64px_rgba(0,0,0,0.8)] text-left relative">
      {/* Header */}
      <div className="mb-6 space-y-1.5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-300">
            Student Registration • Step {step} of 2
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          {step === 1 ? "Create student account" : "Campus profile & avatar"}
        </h1>

        <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
          {step === 1
            ? "Enter your credentials to join your verified college ecosystem."
            : "Complete your profile details. Profiles enter College Admin review."}
        </p>
      </div>

      {/* President notice banner */}
      <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.02] p-3 text-xs text-neutral-400 flex items-center justify-between">
        <span>Are you a Club President with a 6-digit code?</span>
        <Link href="/Login?role=president" className="text-white font-semibold hover:underline">
          President Sign In →
        </Link>
      </div>

      {/* Success Notification */}
      {successInfo && (
        <div className="mb-5 rounded-2xl border border-emerald-500/25 bg-emerald-500/[0.08] p-3 text-xs text-emerald-200">
          {successInfo}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-5 rounded-2xl border border-red-500/25 bg-red-500/[0.08] p-3 text-xs text-red-200">
          {error}
        </div>
      )}

      {step === 1 ? (
        /* STEP 1: Basic Credentials */
        <form onSubmit={handleNextStep} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <HiOutlineUser className="text-neutral-400 text-sm" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Sneha Roy"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <HiOutlineEnvelope className="text-neutral-400 text-sm" />
              <span>Campus Email Address</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@campus.edu"
              required
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <HiOutlineLockClosed className="text-neutral-400 text-sm" />
              <span>Password (min. 6 characters)</span>
            </label>
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

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <HiOutlineLockClosed className="text-neutral-400 text-sm" />
              <span>Confirm Password</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 pr-11 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <HiOutlineEyeSlash className="text-base" /> : <HiOutlineEye className="text-base" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-98"
          >
            <span>Continue to Profile Details</span>
            <HiOutlineArrowRight className="text-base" />
          </button>
        </form>
      ) : (
        /* STEP 2: Academic Profile & 5 Predefined Avatar Slots */
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar Selector (5 Predefined Slots) */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-neutral-300 block">
              Select Profile Avatar (5 Predefined Slots)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {AVATAR_OPTIONS.map((av) => {
                const isSelected = selectedAvatar === av.path;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => setSelectedAvatar(av.path)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? "border-white bg-white/10 ring-2 ring-white"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <img src={av.path} alt={av.label} className="w-12 h-12 rounded-xl object-cover" />
                    <span className="text-[10px] font-mono text-neutral-300">{av.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* College Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
              <HiOutlineBuildingLibrary className="text-neutral-400 text-sm" />
              <span>Assigned College / Institution</span>
            </label>
            <select
              value={selectedCollegeId}
              onChange={(e) => setSelectedCollegeId(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-[#121216] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-hidden transition-colors"
            >
              {colleges.map((col) => (
                <option key={col._id} value={col._id}>
                  {col.name} ({col.code})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Enrollment */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <HiOutlineIdentification className="text-neutral-400 text-sm" />
                <span>Enrollment / Student ID</span>
              </label>
              <input
                type="text"
                value={enrollment}
                onChange={(e) => setEnrollment(e.target.value)}
                placeholder="e.g. STU-2026-0042"
                required
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors font-mono"
              />
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <HiOutlineAcademicCap className="text-neutral-400 text-sm" />
                <span>Department</span>
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#121216] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-hidden transition-colors"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Robotics & Automation">Robotics & Automation</option>
                <option value="Electronics & Communication">Electronics & Communication</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Design & Visual Arts">Design & Visual Arts</option>
                <option value="Business Administration">Business Administration</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Course */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Course</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#121216] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-hidden transition-colors"
              >
                <option value="B.Tech">B.Tech</option>
                <option value="B.Sc">B.Sc</option>
                <option value="B.Des">B.Des</option>
                <option value="BBA">BBA</option>
                <option value="M.Tech">M.Tech</option>
              </select>
            </div>

            {/* Year */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 block">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-[#121216] px-4 py-3 text-sm text-white focus:border-white/40 focus:outline-hidden transition-colors"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-neutral-300 flex items-center gap-1.5">
                <HiOutlinePhone className="text-neutral-400 text-sm" />
                <span>Phone Number</span>
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 ..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-neutral-300 block">Bio / About</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell clubs what areas of campus life and technology excite you..."
              rows={2}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:border-white/40 focus:outline-hidden transition-colors"
            />
          </div>

          {/* Guidelines agreement */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-white"
            />
            <label htmlFor="agreeTerms" className="text-xs text-neutral-400 cursor-pointer">
              I agree that profile information is verified and subject to College Admin review.
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-1/3 flex items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <HiOutlineArrowLeft className="text-base" />
              <span>Back</span>
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3.5 text-sm font-bold text-black hover:bg-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? "Submitting..." : "Submit Profile for Approval"}</span>
              <HiOutlineArrowRight className="text-base" />
            </button>
          </div>
        </form>
      )}

      {/* Footer link to sign in */}
      <div className="mt-6 text-center text-xs text-neutral-400">
        Already have a student account?{" "}
        <Link href="/Login?role=student" className="font-semibold text-white hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
