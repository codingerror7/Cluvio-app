"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  Megaphone,
  ArrowRight,
} from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";

const features = [
  {
    title: "Member Management",
    description:
      "Manage members, roles, attendance, and club participation from a single workspace.",
    icon: Users,
    stat: "500+ Members",
  },
  {
    title: "Event Operations",
    description:
      "Create events, collect registrations, track attendance, and manage RSVPs effortlessly.",
    icon: CalendarDays,
    stat: "10K+ Registrations",
  },
  {
    title: "Communication Hub",
    description:
      "Send announcements, updates, and important information to your entire community instantly.",
    icon: Megaphone,
    stat: "Instant Delivery",
  },
];

export const ClubShowcase = () => {
  return (
    <section
      id="features"
      className="relative py-24 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-40 w-[400px] h-[400px] bg-brand-primary/5 rounded-full blur-[120px]" />
        <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-brand-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <Badge variant="primary" className="mb-5">
            Core Features
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-5">
            Everything your club needs.
          </h2>

          <p className="text-text-muted text-lg leading-relaxed">
            One modern workspace to manage members, events,
            and communication without juggling multiple tools.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Members */}
          <motion.div
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.2,
            }}
            className="lg:col-span-1"
          >
            <Card
              glow
              className="h-[320px] p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-brand-primary" />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  Member Management
                </h3>

                <p className="text-text-muted leading-relaxed">
                  Organize members, assign roles, track attendance,
                  and maintain a structured club directory.
                </p>
              </div>

              <div>
                <div className="text-3xl font-bold text-white">
                  500+
                </div>
                <p className="text-sm text-text-muted">
                  Active Members
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Events */}
          <motion.div
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.2,
            }}
            className="lg:col-span-1"
          >
            <Card
              glow
              className="h-[320px] p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center mb-6">
                  <CalendarDays className="w-6 h-6 text-brand-secondary" />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  Event Management
                </h3>

                <p className="text-text-muted leading-relaxed">
                  Plan events, collect registrations,
                  monitor attendance, and manage schedules.
                </p>
              </div>

              <div>
                <div className="text-3xl font-bold text-white">
                  10K+
                </div>

                <p className="text-sm text-text-muted">
                  Event Registrations
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Communication */}
          <motion.div
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.2,
            }}
            className="lg:col-span-1"
          >
            <Card
              glow
              className="h-[320px] p-8 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                  <Megaphone className="w-6 h-6 text-amber-400" />
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">
                  Communication Hub
                </h3>

                <p className="text-text-muted leading-relaxed">
                  Send announcements, updates, and important
                  notifications to your entire community instantly.
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white">
                    Instant
                  </div>

                  <p className="text-sm text-text-muted">
                    Delivery
                  </p>
                </div>

                <ArrowRight className="w-5 h-5 text-text-muted" />
              </div>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ClubShowcase;