'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Users2,
  GraduationCap,
  FileCheck,
  Settings,
  FileText,
  LogOut,
  X,
  LayoutGrid,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { api, getStoredUser } from '@/lib/api';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any | null>(null);

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    api.auth.logout();
    router.push('/login');
  };

  const isNavActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const overviewNav = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  const managementNav = [
    { label: 'Clubs', href: '/clubs', icon: ShieldCheck },
    { label: 'Club Presidents', href: '/presidents', icon: Users2 },
    { label: 'Students', href: '/students', icon: GraduationCap },
    { label: 'Membership Requests', href: '/requests', icon: FileCheck },
  ];

  const secondaryNav = [
    { label: 'Campus Settings', href: '#', icon: Settings },
    { label: 'Audit Logs', href: '#', icon: FileText },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
        isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:shadow-none'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-100 px-5">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-900 text-white shadow-2xs group-hover:bg-black transition-colors">
            <LayoutGrid className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-gray-900">
                CLUVIO
              </span>
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-gray-600 uppercase tracking-wide">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Club Control Center</p>
          </div>
        </Link>

        {/* Mobile close button */}
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 lg:hidden cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
        {/* Overview Section */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Overview
          </div>
          <nav className="space-y-1">
            {overviewNav.map((item) => {
              const active = isNavActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-gray-900 text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Management Section */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Management
          </div>
          <nav className="space-y-1">
            {managementNav.map((item) => {
              const active = isNavActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                    active
                      ? 'bg-gray-900 text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100/70 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Settings & Logs */}
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            System
          </div>
          <nav className="space-y-1">
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
                >
                  <Icon className="h-4 w-4 text-gray-400" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Admin Profile Footer */}
      <div className="border-t border-gray-100 p-3 bg-gray-50/50">
        <div className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-100/60 transition-colors">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar
              name={currentUser?.name || 'Administrator'}
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'}
              size="sm"
              status="online"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-gray-900">
                {currentUser?.name || 'Administrator'}
              </p>
              <p className="truncate text-[10px] text-gray-500 font-medium">
                {currentUser?.email || 'admin@cluvio.edu'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            title="Log out of Admin Console"
            className="flex h-7 w-7 items-center justify-center rounded text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
