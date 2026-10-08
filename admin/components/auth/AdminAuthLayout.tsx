'use client';

import React from 'react';
import Link from 'next/link';
import { LayoutGrid, ShieldCheck } from 'lucide-react';

interface AdminAuthLayoutProps {
  children: React.ReactNode;
}

export const AdminAuthLayout: React.FC<AdminAuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 relative selection:bg-gray-900 selection:text-white">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      {/* Top Branding */}
      <div className="relative z-10 mx-auto w-full max-w-md text-center pt-4 sm:pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-3 group transition-transform active:scale-95"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm group-hover:bg-black transition-colors">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-gray-950 font-sans">
                CLUVIO
              </span>
              <span className="rounded bg-gray-100 border border-gray-200/80 px-2 py-0.5 text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                Admin
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium tracking-tight">
              Platform Administration Console
            </p>
          </div>
        </Link>
      </div>

      {/* Center Form Card */}
      <div className="relative z-10 mx-auto w-full max-w-[440px] my-auto py-6">
        <div className="rounded-2xl border border-gray-200/90 bg-white p-7 sm:p-9 shadow-[0_12px_40px_rgba(0,0,0,0.04)] ring-1 ring-gray-900/[0.02]">
          {children}
        </div>

        {/* Security Assurance Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="h-4 w-4 text-gray-500 shrink-0" />
          <span>Authorized administrators only • End-to-end audit logging</span>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="relative z-10 mx-auto w-full max-w-md text-center pb-2">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-medium text-gray-500">Cluvio Control Center v2.4</span>
          <span>•</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">
            Dashboard Home
          </Link>
        </div>
      </div>
    </div>
  );
};
