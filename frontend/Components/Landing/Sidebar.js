"use client";

import React from "react";
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineSquares2X2,
} from "react-icons/hi2";

const menuItems = [
  {
    title: "Home",
    icon: HiOutlineHome,
  },
  {
    title: "Calendar",
    icon: HiOutlineCalendarDays,
  },
  {
    title: "Profile",
    icon: HiOutlineUser,
  },
  {
    title: "Notifications",
    icon: HiOutlineBell,
  },
  {
    title: "Settings",
    icon: HiOutlineCog6Tooth,
  },
];

const Sidebar = () => {
  return (
    <aside className="flex h-full w-full flex-col overflow-hidden border-r border-white/10 bg-transparent backdrop-blur-lg">
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
          {menuItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                className={`group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-200 ${
                  index === 0
                    ? "bg-[var(--accent)] text-black shadow-lg"
                    : "text-white/65 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  className={`text-xl ${
                    index === 0
                      ? "text-black"
                      : "text-white/60 group-hover:text-white"
                  }`}
                />

                <span className="font-medium">{item.title}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-4">
        <button className="group flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-white/60 transition hover:bg-red-500/10 hover:text-red-400">
          <HiOutlineArrowLeftOnRectangle className="text-xl" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;