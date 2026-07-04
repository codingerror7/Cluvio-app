"use client";

import React from "react";
import {
  FaArrowRight,
  FaPlay,
  FaUsers,
  FaCalendarAlt,
  FaBell,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

const Hero = ({ onEnterDashboard }) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-36"
    >
      <div className="container-page">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.95fr]">

          {/* Left Content */}

          <div>

            {/* Heading */}

            <h1 className="mt-8 text-5xl font-bold leading-tight text-white md:text-6xl xl:text-7xl">
              The Operating System
              <span className="block text-[var(--accent)]">
                for Student Clubs
              </span>
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
              Manage members, events, announcements, attendance and every club
              activity from one beautifully designed platform built exclusively
              for colleges.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <button
                onClick={onEnterDashboard}
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 font-medium text-black transition hover:scale-[1.02]"
              >
                Get Started
                <FaArrowRight className="text-sm" />
              </button>

              <button
                onClick={onEnterDashboard}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-medium text-white transition hover:bg-white/10"
              >
                <FaPlay className="text-sm" />
                Watch Demo
              </button>

            </div>

          </div>

          {/* Right Dashboard */}

          <div className="relative">

            <div
              onClick={onEnterDashboard}
              className="cursor-pointer rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:border-[var(--accent)]/50 hover:-translate-y-1"
            >

              {/* Header */}

              <div className="mb-8 flex items-center justify-between">

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Cluvio Dashboard
                  </h3>

                  <p className="mt-1 text-sm text-white/50">
                    Club Management Workspace
                  </p>
                </div>

                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>

              </div>

              {/* Stats */}

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl bg-white/5 p-5">

                  <FaUsers className="mb-4 text-xl text-[var(--accent)]" />

                  <h2 className="text-3xl font-bold text-white">
                    482
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    Active Members
                  </p>

                </div>

                <div className="rounded-2xl bg-white/5 p-5">

                  <FaCalendarAlt className="mb-4 text-xl text-yellow-400" />

                  <h2 className="text-3xl font-bold text-white">
                    12
                  </h2>

                  <p className="mt-1 text-sm text-white/50">
                    Upcoming Events
                  </p>

                </div>

              </div>

              {/* Activity */}

              <div className="mt-5 rounded-2xl bg-white/5 p-5">

                <div className="mb-5 flex items-center gap-3">

                  <FaChartLine className="text-[var(--accent)]" />

                  <h4 className="font-medium text-white">
                    Recent Activity
                  </h4>

                </div>

                <div className="space-y-4">

                  {[
                    {
                      title: "New member joined",
                      time: "2 min ago",
                    },
                    {
                      title: "Event registration approved",
                      time: "15 min ago",
                    },
                    {
                      title: "Announcement published",
                      time: "1 hour ago",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between border-b border-white/5 pb-3 last:border-none last:pb-0"
                    >
                      <span className="text-sm text-white/65">
                        {item.title}
                      </span>

                      <span className="text-xs text-white/40">
                        {item.time}
                      </span>
                    </div>
                  ))}

                </div>

              </div>

            </div>

            {/* Floating Notification */}

            <div className="absolute -left-8 bottom-12 hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl lg:block">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-[var(--accent)]/15 p-3">
                  <FaBell className="text-[var(--accent)]" />
                </div>

                <div>

                  <p className="text-sm font-medium text-white">
                    New Event Created
                  </p>

                  <p className="text-xs text-white/50">
                    AI Workshop • Tomorrow
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;