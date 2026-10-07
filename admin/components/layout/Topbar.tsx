'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Dropdown } from '@/components/ui/Dropdown';

interface TopbarProps {
  onOpenMobileMenu: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const pathname = usePathname();
  const [showNotifications, setShowNotifications] = useState(false);

  // Derive title from pathname
  const getPageInfo = () => {
    if (pathname === '/' || pathname === '/dashboard') {
      return { title: 'Dashboard', subtitle: 'Overview of Cluvio platform activity' };
    }
    if (pathname.startsWith('/clubs/')) {
      return { title: 'Club Overview', subtitle: 'Management / Clubs / Club Profile' };
    }
    if (pathname === '/clubs') {
      return { title: 'Clubs', subtitle: 'Management / Clubs' };
    }
    if (pathname.startsWith('/presidents/')) {
      return { title: 'President Profile', subtitle: 'Management / Club Presidents / Leadership Profile' };
    }
    if (pathname === '/presidents') {
      return { title: 'Club Presidents', subtitle: 'Management / Club Presidents' };
    }
    if (pathname.startsWith('/students/')) {
      return { title: 'Student Dossier', subtitle: 'Management / Students / Student Profile' };
    }
    if (pathname === '/students') {
      return { title: 'Students', subtitle: 'Management / Students' };
    }
    if (pathname === '/analytics') {
      return { title: 'Analytics', subtitle: 'Campus engagement, growth & club metrics' };
    }
    return { title: 'Admin Console', subtitle: 'Cluvio College Club Management' };
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200/90 bg-white/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base font-bold text-gray-900 sm:text-lg leading-tight">
            {title}
          </h1>
          <p className="hidden text-[11px] text-gray-400 sm:block">{subtitle}</p>
        </div>
      </div>

      {/* Right: Controls & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Academic Term Tag */}
        <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="font-medium">Academic Year 2026-27</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400">Term 1</span>
        </div>

        {/* Global Search Bar visual button */}
        <div className="relative hidden md:block">
          <div className="flex h-9 w-60 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/80 px-3 text-xs text-gray-400 hover:border-gray-300 cursor-pointer">
            <Search className="h-3.5 w-3.5" />
            <span>Search clubs, presidents...</span>
            <kbd className="ml-auto rounded border border-gray-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Search icon on mobile */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 md:hidden"
        >
          <Search className="h-4 w-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-50 mt-2 w-80 rounded-xl border border-gray-200 bg-white p-3 shadow-xl ring-1 ring-black/5">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="text-xs font-semibold text-gray-900">Notifications</span>
                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-600">
                  3 unread
                </span>
              </div>
              <div className="mt-2 space-y-2 text-xs">
                <div className="flex gap-2.5 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer">
                  <Sparkles className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">New club charter submitted</p>
                    <p className="text-[11px] text-gray-500">Aeromodelling Club pending review</p>
                    <span className="text-[10px] text-gray-400">12 min ago</span>
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Budget request approved</p>
                    <p className="text-[11px] text-gray-500">Robotics Club granted ₹50,000</p>
                    <span className="text-[10px] text-gray-400">2 hours ago</span>
                  </div>
                </div>
                <div className="flex gap-2.5 rounded-lg p-2 hover:bg-gray-50 transition-colors cursor-pointer">
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Attendance threshold alert</p>
                    <p className="text-[11px] text-gray-500">Blockchain Guild fell below 60%</p>
                    <span className="text-[10px] text-gray-400">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <Dropdown
          trigger={
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-lg border border-gray-200 p-1.5 pr-2.5 hover:bg-gray-50 transition-colors"
            >
              <Avatar
                name="Dr. Samantha Rao"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                size="sm"
              />
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-gray-900 leading-tight">
                  Dr. Samantha Rao
                </p>
                <p className="text-[10px] text-gray-400 leading-tight">Dean Office</p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-gray-400 hidden sm:block" />
            </button>
          }
          items={[
            { label: 'Admin Settings', onClick: () => {} },
            { label: 'System Audit Logs', onClick: () => {} },
            { label: 'Campus Directory', onClick: () => {} },
            { label: 'Sign Out', variant: 'danger', onClick: () => {} },
          ]}
        />
      </div>
    </header>
  );
};
