"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  BellRing,
  BarChart3,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Card from "../UI/Card";
import SectionHeading from "../UI/SectionHeading";

const features = [
  {
    icon: Users,
    title: "Member Management",
    description:
      "Manage members, leadership teams, committees, and participation from one centralized workspace.",
  },
  {
    icon: CalendarDays,
    title: "Event Management",
    description: "Create events, track registrations, and coordinate activities effortlessly.",
  },
  {
    icon: BellRing,
    title: "Announcements",
    description: "Keep members informed through real-time updates and club-wide communication.",
  },
  {
    icon: BarChart3,
    title: "Insights & Analytics",
    description: "Understand participation trends, event performance, and member engagement.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description: "Securely manage permissions for admins, coordinators, and members.",
  },
];

const Features = () => {
  return (
    <section id="features" className="section-panel">
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Features"
            title="Everything Needed To Run"
            accent="A Modern Student Club"
          >
            Cluvio combines member management, event coordination, communication, and analytics
            into one simple platform.
          </SectionHeading>
        </motion.div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card interactive={false} className="relative h-full overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-line)] to-transparent" />
              <div className="relative z-10">
                <div className="icon-tile h-14 w-14">
                  <Users size={26} />
                </div>
                <h3 className="mt-7 text-2xl font-bold text-white sm:text-3xl">
                  Member Management
                </h3>
                <p className="mt-4 max-w-xl leading-relaxed text-white/62">
                  Organize members, assign leadership roles, track participation, manage
                  committees, and maintain a structured community without spreadsheets or manual
                  processes.
                </p>
                <div className="card-surface mt-8 p-4 sm:p-5">
                  <div className="space-y-3">
                    {["President", "Vice President", "Technical Lead", "Event Coordinator"].map(
                      (role) => (
                        <div
                          key={role}
                          className="flex items-center justify-between gap-4 border-b border-white/5 pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="h-9 w-9 shrink-0 rounded-xl border border-white/10 bg-[var(--accent-soft)]" />
                            <span className="truncate text-white">{role}</span>
                          </div>
                          <span className="rounded-full bg-[rgba(117,199,161,0.12)] px-2.5 py-1 text-xs font-medium text-[var(--success)]">
                            Active
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {features.slice(1).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card className="group h-full p-6">
                    <div className="icon-tile">
                      <Icon size={21} />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/62">
                      {feature.description}
                    </p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[var(--accent)]">
                      Learn More
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-3xl text-center text-lg leading-relaxed text-white/60">
          Cluvio replaces fragmented tools with a single platform that helps student organizations
          stay organized, connected, and productive.
        </p>
      </div>
    </section>
  );
};

export default Features;
