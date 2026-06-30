"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  BellRing,
  ShieldCheck,
  GraduationCap,
  Trophy,
} from "lucide-react";
import Card from "../UI/Card";
import SectionHeading from "../UI/SectionHeading";

const pillars = [
  {
    icon: Users,
    title: "Member Management",
    description: "Organize members, roles, committees, and participation from one place.",
  },
  {
    icon: CalendarDays,
    title: "Event Operations",
    description: "Plan, manage, and track events with streamlined workflows.",
  },
  {
    icon: BellRing,
    title: "Communication",
    description: "Keep everyone informed through centralized announcements.",
  },
  {
    icon: ShieldCheck,
    title: "Administrative Control",
    description: "Manage permissions, leadership teams, and club operations securely.",
  },
];

const clubTypes = [
  { icon: Trophy, label: "Technical Clubs" },
  { icon: GraduationCap, label: "Student Chapters" },
  { icon: Users, label: "Cultural Societies" },
  { icon: CalendarDays, label: "Campus Communities" },
];

const TrustSection = () => {
  return (
    <section className="section-panel section-muted">
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="Built For Campus Communities"
            title="Everything a Club Needs."
            accent="Nothing It Doesn't."
          >
            Cluvio helps student organizations simplify operations, coordinate members, manage
            events, and create a better club experience without the complexity of traditional
            systems.
          </SectionHeading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {clubTypes.map((club) => {
            const Icon = club.icon;
            return (
              <div key={club.label} className="chip">
                <Icon size={17} className="text-[var(--accent)]" />
                <span>{club.label}</span>
              </div>
            );
          })}
        </motion.div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full p-6">
                  <div className="icon-tile mb-5">
                    <Icon size={21} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/62">{item.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Card interactive={false} className="mt-16 p-8 text-center md:p-10">
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              Designed Around How Clubs Actually Work
            </h3>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-white/62">
              From onboarding new members to managing large-scale campus events, Cluvio provides a
              unified workspace that keeps every aspect of club operations organized, accessible,
              and efficient.
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
