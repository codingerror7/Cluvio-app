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
      badge: "Open",
      requiresKey: false,
      icon: HiOutlineAcademicCap,
      activeBg: "bg-blue-50 border-blue-600 text-blue-700 shadow-xs",
      iconColor: "text-blue-600",
    },
    {
      id: "club member",
      title: "Club Member",
      badge: "admin123",
      requiresKey: true,
      icon: HiOutlineUserGroup,
      activeBg: "bg-emerald-50 border-emerald-600 text-emerald-800 shadow-xs",
      iconColor: "text-emerald-600",
    },
    {
      id: "club head",
      title: "Club Head",
      badge: "admin123",
      requiresKey: true,
      icon: HiOutlineShieldCheck,
      activeBg: "bg-amber-50 border-amber-600 text-amber-800 shadow-xs",
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
                group relative flex flex-col items-center justify-center p-2.5 rounded-xl border text-center
                transition-all duration-150 cursor-pointer outline-none
                ${
                  isSelected
                    ? `${item.activeBg} ring-1 ring-offset-0 font-bold`
                    : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/70 text-slate-600"
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
                    inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[9px] font-semibold
                    ${
                      isSelected
                        ? "bg-white/80 border border-slate-200 text-slate-800"
                        : item.requiresKey
                        ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                        : "bg-blue-50 text-blue-700 border border-blue-200/60"
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
