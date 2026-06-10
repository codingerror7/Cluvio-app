"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Rocket,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Building2,
      step: "01",
      title: "Create Your Club Workspace",
      description:
        "Set up your club in minutes. Customize roles, committees, and structure according to your organization's needs.",
      points: [
        "Create club profile",
        "Assign leadership roles",
        "Configure permissions",
      ],
    },
    {
      icon: Users,
      step: "02",
      title: "Invite & Organize Members",
      description:
        "Build your community by inviting members, managing teams, and keeping everyone connected in one place.",
      points: [
        "Invite members instantly",
        "Create committees",
        "Manage participation",
      ],
    },
    {
      icon: Rocket,
      step: "03",
      title: "Run Events & Operations",
      description:
        "Manage events, announcements, registrations, attendance, and club activities from a centralized dashboard.",
      points: [
        "Launch events",
        "Track attendance",
        "Share announcements",
      ],
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            left-1/2
            top-20
            -translate-x-1/2
            h-[450px]
            w-[450px]
            rounded-full
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
            How It Works
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
            From Setup To
            <span className="block text-violet-400">
              Successful Club Management
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
            Cluvio simplifies every stage of club management,
            allowing student organizations to focus on growth,
            engagement, and impact.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-24">

          {/* Desktop Connector */}
          <div
            className="
              hidden
              lg:block
              absolute
              top-20
              left-0
              right-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
            "
          />

          <div className="grid lg:grid-cols-3 gap-8">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.step}
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                  }}
                  className="relative"
                >
                  {/* Step Number */}
                  <div
                    className="
                      mb-8
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <div
                      className="
                        relative
                        z-10
                        w-16
                        h-16
                        rounded-2xl
                        bg-violet-600
                        flex
                        items-center
                        justify-center
                        shadow-lg
                        shadow-violet-600/20
                      "
                    >
                      <Icon
                        size={28}
                        className="text-white"
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="
                      h-full
                      rounded-3xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      backdrop-blur-sm
                      p-8
                    "
                  >
                    <span
                      className="
                        text-sm
                        font-medium
                        text-violet-400
                      "
                    >
                      STEP {step.step}
                    </span>

                    <h3
                      className="
                        mt-3
                        text-2xl
                        font-semibold
                        text-white
                      "
                    >
                      {step.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        text-white/60
                        leading-relaxed
                      "
                    >
                      {step.description}
                    </p>

                    {/* Points */}
                    <div className="mt-8 space-y-4">
                      {step.points.map((point) => (
                        <div
                          key={point}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle2
                            size={18}
                            className="text-violet-400 shrink-0"
                          />

                          <span className="text-white/80">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  {index !== steps.length - 1 && (
                    <div
                      className="
                        hidden
                        lg:flex
                        absolute
                        top-8
                        -right-6
                        z-20
                        items-center
                        justify-center
                      "
                    >
                      <ArrowRight
                        className="text-white/20"
                        size={28}
                      />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Showcase */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
          }}
          className="
            mt-24
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-b
            from-white/[0.04]
            to-transparent
            p-8
            md:p-10
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-8
            "
          >
            <div>
              <span
                className="
                  text-sm
                  font-medium
                  text-violet-400
                "
              >
                Unified Workflow
              </span>

              <h3
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-white
                "
              >
                Everything Connected In One Place
              </h3>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-white/60
                  leading-relaxed
                "
              >
                No spreadsheets, scattered chats, or disconnected tools.
                Cluvio brings every aspect of club management together
                into a single, streamlined platform.
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-3
                flex-wrap
              "
            >
              <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white/80">
                Members
              </div>

              <ArrowRight
                className="text-white/30"
                size={18}
              />

              <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white/80">
                Events
              </div>

              <ArrowRight
                className="text-white/30"
                size={18}
              />

              <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white/80">
                Communication
              </div>

              <ArrowRight
                className="text-white/30"
                size={18}
              />

              <div className="px-4 py-2 rounded-xl bg-violet-600 text-white">
                Growth
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HowItWorks;