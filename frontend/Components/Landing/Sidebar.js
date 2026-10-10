"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineHome,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { getStoredUser, clearAuthToken } from "@/lib/api";

const Sidebar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleLogout = () => {
    clearAuthToken();
    setUser(null);
    router.push("/Login");
  };

  const isHead = user?.role === "president" || user?.role === "club head";
  const dashboardHref = user
    ? isHead
      ? "/president/dashboard"
      : "/dashboard"
    : "/Login";

  return (
    <aside className="flex h-full w-full flex-col overflow-hidden border-r border-white/10 bg-[#070B13]/95 backdrop-blur-lg">
      <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)]/10">
          <HiOutlineSquares2X2 className="text-2xl text-[var(--accent)]" />
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Cluvio</h1>
          <p className="text-xs text-white/45">Club Management</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="mb-4 px-4 text-xs font-semibold uppercase tracking-widest text-white/35">
          Navigation
        </p>

        <div className="space-y-2">
          <Link
            href="/"
            className="group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 bg-[var(--accent)] text-black font-semibold shadow-lg transition-all"
          >
            <HiOutlineHome className="text-xl" />
            <span>Home</span>
          </Link>

          <Link
            href={dashboardHref}
            className="group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-white/65 hover:bg-white/5 hover:text-white transition-all"
          >
            {isHead ? (
              <HiOutlineShieldCheck className="text-xl text-white/60 group-hover:text-white" />
            ) : (
              <HiOutlineUser className="text-xl text-white/60 group-hover:text-white" />
            )}
            <span className="font-medium">
              {user
                ? isHead
                  ? "Club Head Console"
                  : user.role === "club member"
                  ? "Member Portal"
                  : "Student Portal"
                : "Portal Sign In"}
            </span>
          </Link>

          <Link
            href="/About"
            className="group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-white/65 hover:bg-white/5 hover:text-white transition-all"
          >
            <HiOutlineInformationCircle className="text-xl text-white/60 group-hover:text-white" />
            <span className="font-medium">About Cluvio</span>
          </Link>
        </div>
      </nav>

      {user && (
        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-white/60 transition hover:bg-red-500/10 hover:text-red-400 cursor-pointer"
          >
            <HiOutlineArrowLeftOnRectangle className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;