"use client";

import React, { useState } from "react";
import {
  HiOutlineCog6Tooth,
  HiOutlineShieldCheck,
  HiOutlineBell,
  HiOutlineKey,
  HiOutlineCheck,
} from "react-icons/hi2";
import { PRESIDENT_CLUB, PRESIDENT_USER } from "@/lib/mockData";

export default function PresidentSettingsView() {
  const [toast, setToast] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-white/20 bg-black/90 px-4 py-2.5 text-xs text-white shadow-2xl backdrop-blur-md">
          Settings preferences saved successfully.
        </div>
      )}

      {/* Header */}
      <div className="space-y-1 border-b border-white/8 pb-6">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
            Chapter Configuration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Configure society permissions, notifications, charter renewal, and passkey delegation.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* General Club Preferences */}
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white border-b border-white/6 pb-3">
            General Club Preferences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-neutral-400 block mb-1">Official Society Name</label>
              <input
                type="text"
                defaultValue={PRESIDENT_CLUB.name}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Sector / Department</label>
              <input
                type="text"
                defaultValue={PRESIDENT_CLUB.sector}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Primary Meeting Lab</label>
              <input
                type="text"
                defaultValue={PRESIDENT_CLUB.meetingLocation}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1">Contact Email</label>
              <input
                type="email"
                defaultValue={PRESIDENT_CLUB.contactEmail}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-2.5 text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>
        </div>

        {/* Membership Policies */}
        <div className="rounded-2xl border border-white/8 bg-[#0d0d10] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white border-b border-white/6 pb-3">
            Membership Policies
          </h3>

          <div className="space-y-3 text-xs">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="mt-0.5 rounded border-white/20 bg-white/5 text-white focus:ring-0"
              />
              <div>
                <p className="font-medium text-white">Auto-approve verified student applications</p>
                <p className="text-[11px] text-neutral-400">
                  Students enrolled in affiliated engineering departments bypass manual interview review.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="mt-0.5 rounded border-white/20 bg-white/5 text-white focus:ring-0"
              />
              <div>
                <p className="font-medium text-white">Public directory visibility</p>
                <p className="text-[11px] text-neutral-400">
                  Allow any student on campus to view upcoming activities and sprint showcases.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-xl bg-white px-5 py-2 text-xs font-semibold text-black hover:bg-neutral-200 transition-colors cursor-pointer active:scale-95"
          >
            Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
