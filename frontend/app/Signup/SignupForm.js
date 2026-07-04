"use client";

import { useState } from "react";
import {
  HiOutlineEnvelope,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";

export default function SignupForm() {
  const [role, setRole] = useState("user");

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white">Create Account</h2>

        <p className="mt-3 leading-7 text-white/55">
          Create your Cluvio account and start managing your clubs with ease.
        </p>
      </div>

      <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-3.5 font-medium text-white transition hover:bg-white/10">
        <FcGoogle className="text-2xl" />
        Continue with Google
      </button>

      <div className="my-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-sm text-white/40">OR</span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <form className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Full Name
          </label>

          <div className="relative">
            <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white/35" />

            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-white/30 focus:border-[var(--accent)]"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Email Address
          </label>

          <div className="relative">
            <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white/35" />

            <input
              type="email"
              placeholder="john@example.com"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-white/30 focus:border-[var(--accent)]"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white/75">
            Password
          </label>

          <div className="relative">
            <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white/35" />

            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-white/30 focus:border-[var(--accent)]"
            />
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-white/75">
            Register As
          </label>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`rounded-2xl border p-5 text-left transition ${
                role === "user"
                  ? "border-[var(--accent)] bg-[var(--accent)]/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <h3 className="font-semibold text-white">Student</h3>
              <p className="mt-1 text-sm text-white/50">Join clubs & events</p>
            </button>

            <button
              type="button"
              onClick={() => setRole("owner")}
              className={`rounded-2xl border p-5 text-left transition ${
                role === "owner"
                  ? "border-[var(--accent)] bg-[var(--accent)]/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <h3 className="font-semibold text-white">Club Owner</h3>
              <p className="mt-1 text-sm text-white/50">Manage your club</p>
            </button>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--accent)]" />

          <span className="text-sm leading-6 text-white/55">
            I agree to the{" "}
            <a href="#" className="text-[var(--accent)] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[var(--accent)] hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

        <button className="mt-2 w-full rounded-2xl bg-[var(--accent)] py-3.5 text-lg font-semibold text-black transition hover:opacity-90">
          Create Account
        </button>
      </form>

      <p className="mt-8 text-center text-white/55">
        Already have an account?
        <a href="/login" className="ml-2 font-semibold text-[var(--accent)] hover:underline">
          Sign In
        </a>
      </p>
    </div>
  );
}
