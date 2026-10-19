"use client";

import React, { useState } from "react";
import AppTopbar from "@/Components/layout/AppTopbar";
import StudentSidebar from "./StudentSidebar";
import { STUDENT_USER } from "@/lib/mockData";
import { HiXMark } from "react-icons/hi2";

export default function StudentLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* 1. Fixed / Sticky Topbar */}
      <AppTopbar
        user={STUDENT_USER}
        role="student"
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        isMobileMenuOpen={mobileMenuOpen}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex flex-1 relative">
        {/* Desktop Persistent Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-16 h-[calc(100vh-4rem)]">
            <StudentSidebar />
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div className="relative z-50 w-72 max-w-[85vw] bg-[#09090b] h-full shadow-2xl flex flex-col border-r border-white/10">
              <div className="p-4 border-b border-white/8 flex items-center justify-between">
                <span className="font-semibold text-sm text-white">Student Workspace</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl p-2 text-neutral-400 hover:text-white hover:bg-white/5 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer transition-colors"
                  aria-label="Close menu"
                >
                  <HiXMark className="text-xl" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <StudentSidebar
                  onNavigate={() => setMobileMenuOpen(false)}
                  className="border-r-0 w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* 3. Main Content Container */}
        <main className="flex-1 w-full min-w-0 p-3.5 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
