"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  PlusCircle,
  CalendarDays,
  Rocket,
  ArrowRight
} from "lucide-react";

import Badge from "../ui/Badge";

const steps = [
  {
    number: "01",
    title: "Create Your Club",
    icon: PlusCircle,
    description:
      "Launch your workspace in minutes. Import members, define leadership roles, and personalize your club identity."
  },
  {
    number: "02",
    title: "Manage Activities",
    icon: CalendarDays,
    description:
      "Organize events, meetings, registrations, and announcements from one centralized workspace."
  },
  {
    number: "03",
    title: "Grow Your Community",
    icon: Rocket,
    description:
      "Track engagement, welcome new members, and build a thriving club ecosystem that scales effortlessly."
  }
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-32 overflow-hidden"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-brand-primary/10 blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-24"
        >
          <Badge
            variant="primary"
            className="mb-6"
          >
            How Cluvio Works
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            From Club Setup
            <span className="block text-brand-primary">
              to Community Growth
            </span>
          </h2>

          <p className="text-lg text-text-muted leading-relaxed">
            Everything your club needs, connected into a single
            streamlined workflow.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop Connection */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-px">
            <div className="w-full h-full bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />
          </div>

          <div className="grid lg:grid-cols-3 gap-10">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.15
                  }}
                  className="relative group"
                >
                  {/* Number */}
                  <div className="absolute -top-8 right-0 text-[90px] font-bold text-white/[0.03] select-none">
                    {step.number}
                  </div>

                  {/* Main Card */}
                  <div
                    className="
                    relative
                    h-full
                    rounded-3xl
                    border
                    border-white/[0.06]
                    bg-white/[0.02]
                    backdrop-blur-sm
                    p-8
                    transition-all
                    duration-500
                    hover:border-brand-primary/30
                    hover:-translate-y-2
                  "
                  >
                    {/* Icon */}
                    <div
                      className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-white/[0.03]
                      border
                      border-white/[0.08]
                      flex
                      items-center
                      justify-center
                      mb-8
                    "
                    >
                      <Icon className="w-7 h-7 text-brand-primary" />
                    </div>

                    {/* Step Label */}
                    <div className="text-sm uppercase tracking-[0.2em] text-brand-primary mb-4">
                      Step {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-muted leading-relaxed mb-8">
                      {step.description}
                    </p>

                    {/* Bottom Link */}
                    <div className="flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition-colors">
                      Learn More

                      <ArrowRight
                        className="
                          w-4 h-4
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}