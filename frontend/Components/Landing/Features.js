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

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Member Management",
      description:
        "Manage members, leadership teams, committees, and participation from one centralized workspace.",
      featured: true,
    },
    {
      icon: CalendarDays,
      title: "Event Management",
      description:
        "Create events, track registrations, and coordinate activities effortlessly.",
    },
    {
      icon: BellRing,
      title: "Announcements",
      description:
        "Keep members informed through real-time updates and club-wide communication.",
    },
    {
      icon: BarChart3,
      title: "Insights & Analytics",
      description:
        "Understand participation trends, event performance, and member engagement.",
    },
    {
      icon: ShieldCheck,
      title: "Role-Based Access",
      description:
        "Securely manage permissions for admins, coordinators, and members.",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-28 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            top-20
            right-0
            w-[500px]
            h-[500px]
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
          className="max-w-3xl mx-auto text-center"
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
            Features
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
            Everything Needed To Run
            <span className="block text-violet-400">
              A Modern Student Club
            </span>
          </h2>

          <p
            className="
              mt-6
              text-lg
              text-white/60
              leading-relaxed
            "
          >
            Cluvio combines member management, event coordination,
            communication, and analytics into one simple platform.
          </p>
        </motion.div>

        {/* Feature Layout */}
        <div className="mt-20 grid lg:grid-cols-3 gap-6">

          {/* Featured Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className="
              lg:col-span-2
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-br
              from-white/[0.05]
              to-white/[0.02]
              p-8
              overflow-hidden
              relative
            "
          >
            <div
              className="
                absolute
                top-0
                right-0
                w-72
                h-72
                bg-violet-600/10
                blur-[120px]
              "
            />

            <div className="relative z-10">

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-violet-500/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Users
                  size={28}
                  className="text-violet-400"
                />
              </div>

              <h3
                className="
                  mt-8
                  text-3xl
                  font-bold
                  text-white
                "
              >
                Member Management
              </h3>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-white/60
                  leading-relaxed
                "
              >
                Organize members, assign leadership roles,
                track participation, manage committees, and
                maintain a structured community without
                spreadsheets or manual processes.
              </p>

              {/* Mini UI Preview */}
              <div
                className="
                  mt-10
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#111827]
                  p-5
                "
              >
                <div className="space-y-4">

                  {[
                    "President",
                    "Vice President",
                    "Technical Lead",
                    "Event Coordinator",
                  ].map((role) => (
                    <div
                      key={role}
                      className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-white/5
                        pb-3
                        last:border-0
                        last:pb-0
                      "
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            w-9
                            h-9
                            rounded-full
                            bg-violet-500/20
                          "
                        />

                        <span className="text-white">
                          {role}
                        </span>
                      </div>

                      <span className="text-sm text-white/50">
                        Active
                      </span>
                    </div>
                  ))}

                </div>
              </div>

            </div>
          </motion.div>

          {/* Side Features */}
          <div className="space-y-6">
            {features.slice(1).map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="
                    group
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-6
                    hover:border-violet-500/20
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
                    "
                  >
                    <Icon
                      size={22}
                      className="text-violet-400"
                    />
                  </div>

                  <h3
                    className="
                      mt-5
                      text-lg
                      font-semibold
                      text-white
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-relaxed
                      text-white/60
                    "
                  >
                    {feature.description}
                  </p>

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      text-violet-400
                      text-sm
                      font-medium
                    "
                  >
                    Learn More

                    <ArrowRight
                      size={15}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

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
          transition={{ delay: 0.2 }}
          className="
            mt-20
            text-center
            max-w-3xl
            mx-auto
          "
        >
          <p
            className="
              text-lg
              text-white/60
              leading-relaxed
            "
          >
            Cluvio replaces fragmented tools with a single
            platform that helps student organizations stay
            organized, connected, and productive.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Features;