'use client';

import React, { useState, Suspense } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

interface AdminShellProps {
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#111827] flex">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop sticky + Mobile drawer) wrapped in Suspense for Next.js 16 usePathname */}
      <Suspense fallback={<aside className="hidden lg:block w-64 border-r border-gray-200 bg-white" />}>
        <Sidebar
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </Suspense>

      {/* Main Container */}
      <div className="flex flex-1 flex-col min-w-0">
        <Suspense fallback={<header className="h-16 border-b border-gray-200 bg-white" />}>
          <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />
        </Suspense>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 max-w-7xl w-full mx-auto">
          <Suspense fallback={<div className="animate-pulse h-64 bg-gray-100 rounded-xl" />}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
};
