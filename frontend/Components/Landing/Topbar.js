"use client";

import React from "react";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineBell,
  HiOutlineInformationCircle,
} from "react-icons/hi2";

const Topbar = () => {
  return (
    <header className="flex h-24 w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8 bg-transparent backdrop-blur-lg border-b border-white/10">
      <div>
        <h1 className="text-xl font-bold text-white sm:text-2xl">
          Good Morning,
          <span className="ml-2 text-[var(--accent)]">User 👋</span>
        </h1>
        <p className="mt-1 text-sm text-white/50">
          Welcome back. Here's what's happening today.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        <div className="relative hidden lg:block">
          <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/40" />
          <input
            type="text"
            placeholder="Search clubs, events..."
            className="w-72 rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[var(--accent)]"
          />
        </div>

        <a
          href="/About"
          className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
        >
          <HiOutlineInformationCircle className="text-lg" />
          About Us
        </a>

        <button className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white">
          <HiOutlineBell className="text-xl" />
          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[var(--accent)]"></span>
        </button>

        <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2 pr-4 transition hover:bg-white/10">
          <img
            src="https://i.pravatar.cc/100"
            alt="Profile"
            className="h-10 w-10 rounded-xl object-cover"
          />

          <div className="hidden xl:block text-left">
            <p className="text-sm font-semibold text-white">Sujal</p>
            <p className="text-xs text-white/45">Club Admin</p>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Topbar;