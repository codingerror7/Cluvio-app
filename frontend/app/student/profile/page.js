"use client";

import React from "react";
import StudentProfile from "@/Components/student/StudentProfile";

export default function StudentProfilePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 border-b border-white/8 pb-4 sm:pb-5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Student Profile
        </h1>
        <p className="text-xs text-neutral-400">
          Your personal academic credentials, verified society memberships, and campus statistics.
        </p>
      </div>

      <StudentProfile />
    </div>
  );
}
