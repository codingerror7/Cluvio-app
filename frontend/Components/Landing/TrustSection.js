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

const TrustSection = () => {
  const pillars = [
    {
      icon: Users,
      title: "Member Management",
      description:
        "Organize members, roles, committees, and participation from one place.",
    },
    {
      icon: CalendarDays,
      title: "Event Operations",
      description:
        "Plan, manage, and track events with streamlined workflows.",
    },
    {
      icon: BellRing,
      title: "Communication",
      description:
        "Keep everyone informed through centralized announcements.",
    },
    {
      icon: ShieldCheck,
      title: "Administrative Control",
      description:
        "Manage permissions, leadership teams, and club operations securely.",
    },
  ];

  const clubTypes = [
    {
      icon: Trophy,
      label: "Technical Clubs",
    },
    {
      icon: GraduationCap,
      label: "Student Chapters",
    },
    {
      icon: Users,
      label: "Cultural Societies",
    },
    {
      icon: CalendarDays,
      label: "Campus Communities",
    },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[300px]
            bg-violet-600/10
            blur-[140px]
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span
            className="
              inline-flex
              items-center
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
            Built For Campus Communities
          </span>

          <h2
            className="
              mt-6
              text-4xl
              md:text-5xl
              font-bold
              tracking-tight
              text-white
            "
          >
            Everything a Club Needs.
            <span className="block text-violet-400">
              Nothing It Doesn't.
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              leading-relaxed
              text-white/60
            "
          >
            Cluvio helps student organizations simplify operations,
            coordinate members, manage events, and create a better
            club experience without the complexity of traditional systems.
          </p>
        </motion.div>

        {/* Club Types */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="
            mt-14
            flex
            flex-wrap
            justify-center
            gap-4
          "
        >
          {clubTypes.map((club) => {
            const Icon = club.icon;

            return (
              <div
                key={club.label}
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                "
              >
                <Icon
                  size={18}
                  className="text-violet-400"
                />

                <span className="text-white/80 text-sm">
                  {club.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* Main Trust Grid */}
        <div
          className="
            mt-20
            grid
            md:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >
          {pillars.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                }}
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                  hover:border-violet-500/30
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-violet-500/10
                    flex
                    items-center
                    justify-center
                    mb-5
                  "
                >
                  <Icon
                    size={22}
                    className="text-violet-400"
                  />
                </div>

                <h3
                  className="
                    text-lg
                    font-semibold
                    text-white
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-relaxed
                    text-white/60
                  "
                >
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="
            mt-20
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-b
            from-white/[0.04]
            to-transparent
            p-8
            md:p-10
            text-center
          "
        >
          <h3
            className="
              text-2xl
              md:text-3xl
              font-bold
              text-white
            "
          >
            Designed Around How Clubs Actually Work
          </h3>

          <p
            className="
              mt-4
              max-w-2xl
              mx-auto
              text-white/60
              leading-relaxed
            "
          >
            From onboarding new members to managing large-scale
            campus events, Cluvio provides a unified workspace
            that keeps every aspect of club operations organized,
            accessible, and efficient.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default TrustSection;