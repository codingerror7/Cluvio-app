"use client";

import React, { useState } from "react";
import AppTopbar from "@/Components/layout/AppTopbar";
import PresidentSidebarNav from "./PresidentSidebarNav";
import { PRESIDENT_USER } from "@/lib/mockData";
import { HiXMark } from "react-icons/hi2";

export default function PresidentLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* 1. Fixed Topbar with President context */}
      <AppTopbar
        user={PRESIDENT_USER}
        role="president"
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        isMobileMenuOpen={mobileMenuOpen}
      />

      {/* 2. Workspace Layout */}
      <div className="flex flex-1 relative">
        {/* Persistent Desktop Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="sticky top-16 h-[calc(100vh-4rem)]">
            <PresidentSidebarNav />
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative z-50 w-72 max-w-[80vw] bg-[#09090b] h-full shadow-2xl flex flex-col">
              <div className="p-4 border-b border-white/8 flex items-center justify-between">
                <span className="font-semibold text-sm text-white">President Console</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg p-1.5 text-neutral-400 hover:text-white hover:bg-white/5"
                >
                  <HiXMark className="text-xl" />
                </button>
              </div>
              <PresidentSidebarNav
                onNavigate={() => setMobileMenuOpen(false)}
                className="border-r-0 flex-1"
              />
            </div>
          </div>
        )}

        {/* Main Workspace Content */}
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
