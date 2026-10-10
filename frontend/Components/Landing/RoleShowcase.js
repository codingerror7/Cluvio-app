"use client";

import React from "react";
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineKey,
  HiOutlineCheckCircle,
  HiOutlineArrowRight,
} from "react-icons/hi2";

export default function RoleShowcase() {
  const roles = [
    {
      title: "Student",
      subtitle: "Campus Explorer & Member",
      badge: "Open Access",
      keyRequired: false,
      icon: HiOutlineAcademicCap,
      color: "border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 via-cyan-500/[0.02] to-transparent",
      accent: "text-cyan-400",
      buttonBg: "bg-cyan-400 text-black hover:brightness-110",
      description:
        "The standard campus access tier for all enrolled students seeking community and extracurricular growth.",
      features: [
        "Discover 50+ campus clubs by category",
        "View club charters & meeting schedules",
        "1-click membership application submissions",
        "Track pending request approval statuses",
      ],
      loginRole: "student",
    },
    {
      title: "Club Member",
      subtitle: "Active Contributor & Participant",
      badge: "Secret Key: admin123",
      keyRequired: true,
      icon: HiOutlineUserGroup,
      color: "border-emerald-500/30 bg-gradient-to-b from-emerald-500/10 via-emerald-500/[0.02] to-transparent",
      accent: "text-emerald-400",
      buttonBg: "bg-emerald-400 text-black hover:brightness-110",
      description:
        "Designed for students actively appointed to club committees, workshops, and internal societies.",
      features: [
        "Verified 'Club Member' status badge",
        "Internal club project & activity tracking",
        "Exclusive member RSVP & event privileges",
        "Protected authentication with passcode 'admin123'",
      ],
      loginRole: "club member",
    },
    {
      title: "Club Head",
      subtitle: "Club President & Executive Leader",
      badge: "Secret Key: admin123",
      keyRequired: true,
      icon: HiOutlineShieldCheck,
      color: "border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-amber-500/[0.02] to-transparent",
      accent: "text-amber-400",
      buttonBg: "bg-amber-400 text-black hover:brightness-110",
      description:
        "Full administrative power for club presidents, coordinators, and college leadership teams.",
      features: [
        "Review & approve/reject membership requests",
        "Create, update, and manage club profiles",
        "Remove members & manage leadership rosters",
        "Club Head Management Console access",
      ],
      loginRole: "club head",
    },
  ];

  return (
    <section id="roles" className="py-16 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-cyan-400">
            Role-Based Campus Architecture
          </span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl tracking-tight">
            Built for Students,
            <span className="block text-cyan-400">Trusted by Club Leaders.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/60">
            Cluvio features dedicated portals tailored to each participant's campus duties. Secret key authorization protects leadership accounts.
          </p>
        </div>

        {/* Roles 3-Column Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className={`relative flex flex-col justify-between rounded-3xl border p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${r.color}`}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                      <Icon className="text-2xl" />
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                        r.keyRequired
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                          : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300"
                      }`}
                    >
                      {r.keyRequired && <HiOutlineKey className="text-xs" />}
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-white tracking-tight">
                    {r.title}
                  </h3>
                  <p className={`text-xs font-semibold mt-0.5 ${r.accent}`}>
                    {r.subtitle}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/60">
                    {r.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                    {r.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-white/80">
                        <HiOutlineCheckCircle className={`text-base shrink-0 mt-0.5 ${r.accent}`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Actions (Login & Register) */}
                <div className="mt-8 pt-5 border-t border-white/10 space-y-2">
                  <Link
                    href="/Login"
                    className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold transition-all ${r.buttonBg}`}
                  >
                    <span>Sign In as {r.title}</span>
                    <HiOutlineArrowRight className="text-xs" />
                  </Link>

                  <div className="text-center">
                    <Link
                      href="/register"
                      className="text-[11px] text-white/50 hover:text-white transition-colors"
                    >
                      Or create new account →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
