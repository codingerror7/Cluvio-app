"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Users,
  CalendarDays,
  Bell,
} from "lucide-react";

import Button from "../ui/Button";
import Badge from "../ui/Badge";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand-primary/10 blur-[140px]" />

        <div className="absolute right-0 top-40 w-[400px] h-[400px] rounded-full bg-brand-secondary/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT CONTENT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge
                variant="primary"
                className="mb-6 px-3 py-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Modern Club Management
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                text-5xl
                sm:text-6xl
                xl:text-7xl
                font-bold
                tracking-tight
                leading-[1.05]
                text-white
                max-w-3xl
              "
            >
              Everything Your Club Needs.
              <span className="block text-brand-primary">
                One Workspace.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="
                mt-8
                text-lg
                leading-relaxed
                text-text-muted
                max-w-xl
              "
            >
              Manage members, events, registrations, announcements,
              and club operations from a single platform designed
              for modern student communities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <Button
                variant="primary"
                size="lg"
                className="group"
              >
                Get Started

                <ArrowRight
                  className="
                    ml-2
                    w-4
                    h-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Button>

              <Button
                variant="outline"
                size="lg"
              >
                Contact Us
              </Button>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="
                mt-14
                flex
                flex-wrap
                gap-8
                border-t
                border-white/[0.06]
                pt-8
              "
            >
              <div>
                <h3 className="text-2xl font-bold text-white">
                  500+
                </h3>
                <p className="text-sm text-text-muted">
                  Members Managed
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  10K+
                </h3>
                <p className="text-sm text-text-muted">
                  Event Registrations
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  Real-time
                </h3>
                <p className="text-sm text-text-muted">
                  Announcements
                </p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div
              className="
                rounded-3xl
                border
                border-white/[0.08]
                bg-[#0F1115]
                p-6
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-white font-semibold">
                    Cluvio Workspace
                  </h3>

                  <p className="text-xs text-text-muted mt-1">
                    Centralized Club Operations
                  </p>
                </div>

                <div className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-white/[0.06] p-5 bg-white/[0.02]">
                  <Users className="w-5 h-5 text-brand-primary mb-3" />
                  <div className="text-2xl font-bold text-white">
                    482
                  </div>
                  <div className="text-xs text-text-muted">
                    Active Members
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] p-5 bg-white/[0.02]">
                  <CalendarDays className="w-5 h-5 text-brand-primary mb-3" />
                  <div className="text-2xl font-bold text-white">
                    12
                  </div>
                  <div className="text-xs text-text-muted">
                    Upcoming Events
                  </div>
                </div>

                <div className="col-span-2 rounded-2xl border border-white/[0.06] p-5 bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-4">
                    <Bell className="w-4 h-4 text-brand-primary" />
                    <span className="text-sm text-white font-medium">
                      Recent Activity
                    </span>
                  </div>

                  <div className="space-y-3">

                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">
                        New member registration
                      </span>
                      <span className="text-white">
                        2 min ago
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">
                        Event RSVP confirmed
                      </span>
                      <span className="text-white">
                        12 min ago
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-text-muted">
                        Announcement sent
                      </span>
                      <span className="text-white">
                        1 hour ago
                      </span>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;