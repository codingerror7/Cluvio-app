"use client";

import React from "react";
import { HiOutlineUserGroup } from "react-icons/hi2";

const clubs = [
  {
    title: "Coding Club",
    description:
      "Build real-world software projects, participate in hackathons, and sharpen your development skills.",
    category: "Technology",
    admin: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=12",
    color: "from-cyan-500/20 to-blue-600/5",
  },
  {
    title: "Design Society",
    description:
      "Explore UI/UX, branding, illustrations, and collaborate on creative campus initiatives.",
    category: "Design",
    admin: "Sophia Lee",
    avatar: "https://i.pravatar.cc/150?img=32",
    color: "from-pink-500/20 to-purple-600/5",
  },
  {
    title: "AI & ML Community",
    description:
      "Learn artificial intelligence, machine learning, deep learning, and build impactful projects.",
    category: "Artificial Intelligence",
    admin: "David Kim",
    avatar: "https://i.pravatar.cc/150?img=18",
    color: "from-violet-500/20 to-indigo-600/5",
  },
  {
    title: "Photography Club",
    description:
      "Capture moments, organize photo walks, editing sessions, and creative storytelling workshops.",
    category: "Creative",
    admin: "Emma Wilson",
    avatar: "https://i.pravatar.cc/150?img=45",
    color: "from-orange-500/20 to-red-500/5",
  },
  {
    title: "Entrepreneurship Cell",
    description:
      "Pitch startup ideas, network with founders, and participate in innovation challenges.",
    category: "Startup",
    admin: "James Miller",
    avatar: "https://i.pravatar.cc/150?img=55",
    color: "from-emerald-500/20 to-green-600/5",
  },
  {
    title: "Robotics Club",
    description:
      "Design autonomous robots, IoT devices, and compete in national robotics competitions.",
    category: "Engineering",
    admin: "Noah Carter",
    avatar: "https://i.pravatar.cc/150?img=24",
    color: "from-sky-500/20 to-cyan-600/5",
  },
];

export default function ClubsGrid() {
  return (
    <section className="rounded-[32px] border border-white/10 bg-transparent p-6 shadow-[0_20px_80px_rgba(2,8,23,0.25)] sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-[var(--accent)]">
            Featured Clubs
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
            Discover active communities ready to grow.
          </h2>
          <p className="mt-3 text-base leading-7 text-white/60">
            Each club card is now aligned with the rest of the dashboard so the experience feels structured and balanced.
          </p>
        </div>

        <button className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white">
          Explore all
        </button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {clubs.map((club) => (
          <div
            key={club.title}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111827] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-100`} />

            <div className="relative flex h-full flex-col p-6 sm:p-7">
              <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
                {club.category}
              </span>

              <h3 className="mt-5 text-2xl font-bold text-white">{club.title}</h3>
              <p className="mt-3 flex-1 leading-7 text-white/60">{club.description}</p>

              <div className="my-6 h-px bg-white/10" />

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={club.avatar}
                    alt={club.admin}
                    className="h-12 w-12 rounded-2xl object-cover ring-2 ring-white/10"
                  />

                  <div>
                    <p className="text-sm font-semibold text-white">{club.admin}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-white/45">
                      <HiOutlineUserGroup />
                      Club Admin
                    </div>
                  </div>
                </div>

                <button className="rounded-2xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105">
                  Join
                </button>
              </div>
            </div>

            <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  );
}