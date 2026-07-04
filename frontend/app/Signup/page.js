"use client";

import SignupForm from "./SignupForm";
import {
  HiOutlineSquares2X2,
  HiOutlineUserGroup,
  HiOutlineCalendarDays,
  HiOutlineBell,
} from "react-icons/hi2";

export default function Signup() {
  return (
    <main className="min-h-screen bg-[#070B13]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#070B13]" />
          <div className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12">
            <div>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
                  <HiOutlineSquares2X2 className="text-3xl text-[var(--accent)]" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-white">Cluvio</h1>
                  <p className="text-white/50">Club Management Platform</p>
                </div>
              </div>
            </div>

            <div className="max-w-xl">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--accent)]">
                Modern Campus Management
              </span>

              <h2 className="mt-8 text-6xl font-bold leading-tight text-white">
                Build
                <br />
                Better
                <br />
                Communities.
              </h2>

              <p className="mt-8 text-lg leading-8 text-white/60">
                Join thousands of students and club leaders managing events, members and communities from one beautifully crafted platform.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-cyan-500/10 p-3">
                    <HiOutlineUserGroup className="text-2xl text-cyan-400" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">12,000+ Members</h3>
                    <p className="text-white/50">Connected across clubs</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <HiOutlineCalendarDays className="text-3xl text-violet-400" />
                  <h3 className="mt-4 text-3xl font-bold text-white">850+</h3>
                  <p className="text-white/50">Events Hosted</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
                  <HiOutlineBell className="text-3xl text-emerald-400" />
                  <h3 className="mt-4 text-3xl font-bold text-white">98%</h3>
                  <p className="text-white/50">Active Engagement</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
                <HiOutlineSquares2X2 className="text-2xl text-[var(--accent)]" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white">Cluvio</h1>
                <p className="text-sm text-white/50">Club Management Platform</p>
              </div>
            </div>

            <SignupForm />
          </div>
        </section>
      </div>
    </main>
  );
}
