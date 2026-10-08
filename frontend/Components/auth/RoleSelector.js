"use client";

import React from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiCheck,
} from "react-icons/hi2";

export default function RoleSelector({ role, onChange }) {
  const roles = [
    {
      id: "student",
      title: "Student",
      subtitle: "Join clubs and participate in events",
      badge: "Campus Member",
      icon: HiOutlineAcademicCap,
    },
    {
      id: "president",
      title: "Club President",
      subtitle: "Manage your college club and members",
      badge: "Club Leadership",
      icon: HiOutlineShieldCheck,
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <label className="block text-sm font-medium text-white/80">
          Register As
        </label>
        <span className="text-xs text-white/40">Select your account role</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map((item) => {
          const isSelected = role === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`
                group relative flex flex-col justify-between p-4 rounded-2xl border text-left
                transition-all duration-200 cursor-pointer outline-none
                ${
                  isSelected
                    ? "border-[var(--accent)] bg-[var(--accent)]/[0.08] shadow-[0_0_24px_rgba(34,211,238,0.12)] ring-1 ring-[var(--accent)]/40"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }
              `}
            >
              <div className="flex items-start justify-between w-full">
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-xl transition-colors
                    ${
                      isSelected
                        ? "bg-[var(--accent)] text-black"
                        : "bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white"
                    }
                  `}
                >
                  <Icon className="text-xl" />
                </div>

                <div
                  className={`
                    flex h-5 w-5 items-center justify-center rounded-full border transition-all
                    ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                        : "border-white/20 bg-transparent text-transparent"
                    }
                  `}
                >
                  <HiCheck className="text-xs font-bold" />
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-white/50">
                  {item.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
