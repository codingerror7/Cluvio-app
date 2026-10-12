"use client";

import React from "react";
import {
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineKey,
} from "react-icons/hi2";

export default function RoleSelector({ role, onChange }) {
  const roles = [
    {
      id: "student",
      title: "Student",
      badge: "Open",
      requiresKey: false,
      icon: HiOutlineAcademicCap,
      iconColor: "text-blue-600",
    },
    {
      id: "club member",
      title: "Member",
      badge: "Passkey",
      requiresKey: true,
      icon: HiOutlineUserGroup,
      iconColor: "text-emerald-600",
    },
    {
      id: "club head",
      title: "Club Head",
      badge: "Passkey",
      requiresKey: true,
      icon: HiOutlineShieldCheck,
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-1.5 flex items-center justify-between">
        <label className="block text-xs font-semibold text-slate-700">
          Account Role
        </label>
        <span className="text-[11px] text-slate-400">
          Select campus role
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {roles.map((item) => {
          const isSelected = role === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`
                group relative flex flex-col items-center justify-center p-2.5 rounded-2xl border text-center
                transition-all duration-150 cursor-pointer outline-none
                ${
                  isSelected
                    ? "border-slate-900 bg-white text-slate-900 shadow-xs ring-1 ring-slate-900 font-bold"
                    : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-medium"
                }
              `}
            >
              <div className="flex items-center gap-1.5">
                <Icon className={`text-base ${isSelected ? item.iconColor : "text-slate-400"}`} />
                <span className="text-xs">{item.title}</span>
              </div>

              <div className="mt-1 flex items-center gap-1">
                <span
                  className={`
                    inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[9px] font-semibold
                    ${
                      isSelected
                        ? "bg-slate-100 text-slate-800"
                        : item.requiresKey
                        ? "bg-amber-50 text-amber-700 border border-amber-200/70"
                        : "bg-blue-50 text-blue-700 border border-blue-200/70"
                    }
                  `}
                >
                  {item.requiresKey && <HiOutlineKey className="text-[8px]" />}
                  {item.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
