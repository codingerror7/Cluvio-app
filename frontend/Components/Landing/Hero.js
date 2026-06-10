"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Users,
  CalendarDays,
  Bell,
  Activity,
  CheckCircle2,
} from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-24"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            top-20
            left-[-120px]
            h-[450px]
            w-[450px]
            rounded-full
            bg-black/10
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-[-150px]
            h-[500px]
            w-[500px]
            rounded-full
            bg-indigo-600/10
            blur-[140px]
          "
        />

      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-violet-500/20
                  bg-violet-500/10
                  px-4
                  py-2
                  text-sm
                  text-violet-300
                "
              >
                <CheckCircle2 size={14} />
                Built for Modern Student Clubs
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                mt-8
                text-5xl
                md:text-6xl
                xl:text-7xl
                font-bold
                leading-[1.02]
                tracking-tight
                text-white
              "
            >
              The Operating System
              <span className="block text-violet-400">
                For Student Clubs
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1,
              }}
              className="
                mt-8
                max-w-xl
                text-lg
                leading-relaxed
                text-white/65
              "
            >
              Manage members, events, announcements,
              attendance, and club operations from one
              beautifully designed workspace built for
              campus communities.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
              className="
                mt-10
                flex
                flex-wrap
                gap-4
              "
            >
              <button
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-violet-600
                  px-6
                  py-3.5
                  text-white
                  font-medium
                  hover:bg-violet-500
                  transition-all
                "
              >
                Get Started

                <ArrowRight size={16} />
              </button>

              <button
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-6
                  py-3.5
                  text-white
                  hover:bg-white/[0.06]
                  transition-all
                "
              >
                <Play size={16} />
                Watch Demo
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.4,
              }}
              className="
                mt-14
                flex
                flex-wrap
                gap-10
              "
            >
              <div>
                <h3 className="text-2xl font-bold text-white">
                  10+
                </h3>

                <p className="text-sm text-white/50">
                  Student Clubs
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  500+
                </h3>

                <p className="text-sm text-white/50">
                  Members Managed
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  100%
                </h3>

                <p className="text-sm text-white/50">
                  Cloud Based
                </p>
              </div>
            </motion.div>

          </div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="relative"
          >
            {/* Main Dashboard */}
            <div
              className="
                relative
                rounded-3xl
                border
                border-white/10
                bg-[#111827]
                p-6
                shadow-[0_30px_80px_rgba(0,0,0,0.4)]
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">

                <div>
                  <h3 className="text-white font-semibold">
                    Cluvio Dashboard
                  </h3>

                  <p className="text-sm text-white/50">
                    Club Management Workspace
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                  "
                >
                  <Users
                    size={20}
                    className="text-violet-400 mb-3"
                  />

                  <h3 className="text-2xl font-bold text-white">
                    482
                  </h3>

                  <p className="text-sm text-white/50">
                    Active Members
                  </p>
                </div>

                <div
                  className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-5
                  "
                >
                  <CalendarDays
                    size={20}
                    className="text-violet-400 mb-3"
                  />

                  <h3 className="text-2xl font-bold text-white">
                    12
                  </h3>

                  <p className="text-sm text-white/50">
                    Upcoming Events
                  </p>
                </div>

              </div>

              {/* Activity */}
              <div
                className="
                  mt-5
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-5
                "
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity
                    size={16}
                    className="text-violet-400"
                  />

                  <span className="text-white font-medium">
                    Recent Activity
                  </span>
                </div>

                <div className="space-y-3">

                  <div className="flex justify-between">
                    <span className="text-white/60 text-sm">
                      New member joined
                    </span>

                    <span className="text-white text-sm">
                      2m ago
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/60 text-sm">
                      Event registration approved
                    </span>

                    <span className="text-white text-sm">
                      15m ago
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/60 text-sm">
                      Announcement published
                    </span>

                    <span className="text-white text-sm">
                      1h ago
                    </span>
                  </div>

                </div>
              </div>
            </div>

            {/* Floating Card */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="
                hidden
                md:block
                absolute
                -left-10
                bottom-12
                rounded-2xl
                border
                border-white/10
                bg-[#141A25]
                p-4
                shadow-xl
              "
            >
              <div className="flex items-center gap-3">

                <Bell
                  size={18}
                  className="text-violet-400"
                />

                <div>
                  <p className="text-white text-sm font-medium">
                    New Event Created
                  </p>

                  <p className="text-xs text-white/50">
                    AI Workshop • Tomorrow
                  </p>
                </div>

              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;