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
      cardBorder: "border-slate-200/90 hover:border-blue-300",
      iconBg: "bg-blue-50 text-blue-600",
      badgeStyle: "bg-blue-50 border-blue-200 text-blue-700",
      accent: "text-blue-600",
      buttonBg: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
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
      badge: "Key: admin123",
      keyRequired: true,
      icon: HiOutlineUserGroup,
      cardBorder: "border-slate-200/90 hover:border-emerald-300",
      iconBg: "bg-emerald-50 text-emerald-600",
      badgeStyle: "bg-emerald-50 border-emerald-200 text-emerald-700",
      accent: "text-emerald-600",
      buttonBg: "bg-emerald-600 text-white hover:bg-emerald-700",
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
      badge: "Key: admin123",
      keyRequired: true,
      icon: HiOutlineShieldCheck,
      cardBorder: "border-slate-200/90 hover:border-amber-300",
      iconBg: "bg-amber-50 text-amber-600",
      badgeStyle: "bg-amber-50 border-amber-200 text-amber-700",
      accent: "text-amber-600",
      buttonBg: "bg-amber-600 text-white hover:bg-amber-700",
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
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold text-blue-700">
            Role-Based Campus Architecture
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl lg:text-5xl tracking-tight">
            Built for Students,
            <span className="block text-blue-600">Trusted by Club Leaders.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
            Cluvio features dedicated portals tailored to each participant's campus duties. Secret key authorization protects leadership accounts.
          </p>
        </div>

        {/* Roles 3-Column Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {roles.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className={`relative flex flex-col justify-between rounded-3xl border bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${r.cardBorder}`}
              >
                <div>
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${r.iconBg} text-2xl`}>
                      <Icon />
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold border ${r.badgeStyle}`}
                    >
                      {r.keyRequired && <HiOutlineKey className="text-xs" />}
                      {r.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-slate-900 tracking-tight">
                    {r.title}
                  </h3>
                  <p className={`text-xs font-semibold mt-0.5 ${r.accent}`}>
                    {r.subtitle}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-slate-600">
                    {r.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                    {r.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <HiOutlineCheckCircle className={`text-base shrink-0 mt-0.5 ${r.accent}`} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom Actions */}
                <div className="mt-8 pt-5 border-t border-slate-100 space-y-2.5">
                  <Link
                    href="/Login"
                    className={`flex h-11 w-full items-center justify-center gap-2 rounded-full text-xs font-bold transition-all shadow-xs ${r.buttonBg}`}
                  >
                    <span>Sign In as {r.title}</span>
                    <HiOutlineArrowRight className="text-xs" />
                  </Link>

                  <div className="text-center">
                    <Link
                      href="/register"
                      className="text-[11px] text-slate-500 hover:text-slate-900 font-medium transition-colors"
                    >
                      Or register an account →
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
