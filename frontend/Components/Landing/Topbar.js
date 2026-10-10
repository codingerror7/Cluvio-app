"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineInformationCircle,
  HiOutlineUser,
} from "react-icons/hi2";
import { getStoredUser, clearAuthToken } from "@/lib/api";

const Topbar = () => {
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

  const getDashboardLink = () => {
    if (!user) return "/Login";
    if (user.role === "president" || user.role === "club head") return "/president/dashboard";
    return "/dashboard";
  };

  return (
    <header className="flex h-24 w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8 bg-transparent backdrop-blur-lg border-b border-white/10">
      <div>
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Good Day,
          <span className="ml-2 text-[var(--accent)]">
            {user?.name ? `${user.name.split(" ")[0]} 👋` : "Campus Leader 👋"}
          </span>
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Welcome to Cluvio. Real-time college club management.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <Link
          href="/About"
          className="hidden md:flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <HiOutlineInformationCircle className="text-lg" />
          About Us
        </Link>

        {user ? (
          <div className="flex items-center gap-2">
            <Link
              href={getDashboardLink()}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 pr-4 transition hover:bg-white/10 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center font-bold text-sm">
                {user.name?.[0] || "U"}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-[var(--accent)] capitalize">{user.role} Portal</p>
              </div>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/Login"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="rounded-2xl bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-black transition hover:brightness-110 cursor-pointer"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;