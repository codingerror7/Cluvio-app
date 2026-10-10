"use client";

import React from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineKey,
  HiCheck,
} from "react-icons/hi2";

export default function RoleSelector({ role, onChange }) {
  const roles = [
    {
      id: "student",
      title: "Student",
      subtitle: "Join clubs & events",
      badge: "Open Access",
      requiresKey: false,
      icon: HiOutlineAcademicCap,
      color: "from-cyan-500/20 to-blue-500/10",
      activeBorder: "border-cyan-400",
      accentText: "text-cyan-400",
    },
    {
      id: "club member",
      title: "Club Member",
      subtitle: "Active member duties",
      badge: "Secret Key Req.",
      requiresKey: true,
      icon: HiOutlineUserGroup,
      color: "from-emerald-500/20 to-teal-500/10",
      activeBorder: "border-emerald-400",
      accentText: "text-emerald-400",
    },
    {
      id: "club head",
      title: "Club Head",
      subtitle: "Lead & manage club",
      badge: "Secret Key Req.",
      requiresKey: true,
      icon: HiOutlineShieldCheck,
      color: "from-amber-500/20 to-purple-500/10",
      activeBorder: "border-amber-400",
      accentText: "text-amber-400",
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <label className="block text-sm font-medium text-white/90">
          Account Role
        </label>
        <span className="text-xs text-white/45">
          Select your campus responsibility
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {roles.map((item) => {
          const isSelected = role === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`
                group relative flex flex-col justify-between p-3.5 rounded-2xl border text-left
                transition-all duration-200 cursor-pointer outline-none overflow-hidden
                ${
                  isSelected
                    ? `${item.activeBorder} bg-gradient-to-br ${item.color} shadow-[0_0_20px_rgba(34,211,238,0.15)] ring-1 ring-white/20`
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
                }
              `}
            >
              {/* Header Icon + Checkmark */}
              <div className="flex items-start justify-between w-full">
                <div
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-xl transition-all
                    ${
                      isSelected
                        ? "bg-white text-black shadow-md"
                        : "bg-white/5 text-white/70 group-hover:bg-white/10 group-hover:text-white"
                    }
                  `}
                >
                  <Icon className="text-lg" />
                </div>

                <div
                  className={`
                    flex h-5 w-5 items-center justify-center rounded-full border transition-all
                    ${
                      isSelected
                        ? "border-white bg-white text-black"
                        : "border-white/20 bg-transparent text-transparent"
                    }
                  `}
                >
                  <HiCheck className="text-xs font-bold" />
                </div>
              </div>

              {/* Title & Info */}
              <div className="mt-3">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-0.5 text-[11px] leading-tight text-white/50">
                  {item.subtitle}
                </p>

                {/* Badge */}
                <div className="mt-2.5">
                  <span
                    className={`
                      inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium
                      ${
                        isSelected
                          ? "bg-white/20 text-white font-semibold backdrop-blur-xs"
                          : item.requiresKey
                          ? "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                          : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                      }
                    `}
                  >
                    {item.requiresKey && <HiOutlineKey className="text-[10px]" />}
                    {item.badge}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
