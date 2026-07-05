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
    <div className="w-full max-w-md">

  {/* Heading */}

  <div className="mb-10">

    <h1 className="text-3xl font-bold tracking-tight text-white">
      Create your account
    </h1>

    <p className="mt-3 text-[15px] leading-7 text-white/55">
      Join Cluvio to manage clubs, organize events and collaborate with your campus community.
    </p>

  </div>

  {/* Google */}

  <button
    className="
      flex
      h-12
      w-full
      items-center
      justify-center
      gap-3
      rounded-xl
      border
      border-white/10
      bg-white/[0.03]
      text-sm
      font-medium
      text-white
      transition
      hover:bg-white/[0.05]
      hover:border-white/15
    "
  >
    <FcGoogle className="text-xl" />
    Continue with Google
  </button>

  {/* Divider */}

  <div className="my-8 flex items-center gap-4">

    <div className="h-px flex-1 bg-white/10" />

    <span className="text-xs uppercase tracking-[0.25em] text-white/35">
      OR
    </span>

    <div className="h-px flex-1 bg-white/10" />

  </div>

  <form className="space-y-5">

    {/* Name */}

    <div>

      <label className="mb-2 block text-sm font-medium text-white/70">
        Full Name
      </label>

      <div className="relative">

        <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/30" />

        <input
          type="text"
          placeholder="John Doe"
          className="
            h-12
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            pl-11
            pr-4
            text-white
            placeholder:text-white/30
            outline-none
            transition-all
            focus:border-[var(--accent)]
            focus:bg-white/[0.05]
          "
        />

      </div>

    </div>

    {/* Email */}

    <div>

      <label className="mb-2 block text-sm font-medium text-white/70">
        Email Address
      </label>

      <div className="relative">

        <HiOutlineEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/30" />

        <input
          type="email"
          placeholder="john@example.com"
          className="
            h-12
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            pl-11
            pr-4
            text-white
            placeholder:text-white/30
            outline-none
            transition-all
            focus:border-[var(--accent)]
            focus:bg-white/[0.05]
          "
        />

      </div>

    </div>

    {/* Password */}

    <div>

      <label className="mb-2 block text-sm font-medium text-white/70">
        Password
      </label>

      <div className="relative">

        <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/30" />

        <input
          type="password"
          placeholder="••••••••"
          className="
            h-12
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            pl-11
            pr-4
            text-white
            placeholder:text-white/30
            outline-none
            transition-all
            focus:border-[var(--accent)]
            focus:bg-white/[0.05]
          "
        />

      </div>

    </div>

    {/* Role */}

    <div>

      <label className="mb-3 block text-sm font-medium text-white/70">
        Register As
      </label>

      <div className="grid grid-cols-2 gap-3">

        <button
          type="button"
          onClick={() => setRole("user")}
          className={`
            rounded-xl
            border
            p-4
            text-left
            transition-all

            ${
              role === "user"
                ? "border-[var(--accent)] bg-[var(--accent)]/10"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
            }
          `}
        >

          <h3 className="font-medium text-white">
            Student
          </h3>

          <p className="mt-1 text-xs text-white/45">
            Join clubs & events
          </p>

        </button>

        <button
          type="button"
          onClick={() => setRole("owner")}
          className={`
            rounded-xl
            border
            p-4
            text-left
            transition-all

            ${
              role === "owner"
                ? "border-[var(--accent)] bg-[var(--accent)]/10"
                : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
            }
          `}
        >

          <h3 className="font-medium text-white">
            Club Owner
          </h3>

          <p className="mt-1 text-xs text-white/45">
            Manage a club
          </p>

        </button>

      </div>

    </div>

    {/* Terms */}

    <label className="flex items-start gap-3">

      <input
        type="checkbox"
        className="mt-1 h-4 w-4 accent-[var(--accent)]"
      />

      <span className="text-sm leading-6 text-white/50">

        I agree to the{" "}

        <a
          href="#"
          className="text-[var(--accent)] hover:underline"
        >
          Terms
        </a>

        {" "}and{" "}

        <a
          href="#"
          className="text-[var(--accent)] hover:underline"
        >
          Privacy Policy
        </a>

      </span>

    </label>

    {/* CTA */}

    <button
      className="
        h-12
        w-full
        rounded-xl
        bg-[var(--accent)]
        font-semibold
        text-black
        transition
        hover:brightness-110
      "
    >
      Create Account
    </button>

  </form>

  {/* Footer */}

  <p className="mt-8 text-center text-sm text-white/50">

    Already have an account?

    <a
      href="/login"
      className="ml-2 font-semibold text-[var(--accent)] hover:underline"
    >
      Sign In
    </a>

  </p>

</div>
  );
}
