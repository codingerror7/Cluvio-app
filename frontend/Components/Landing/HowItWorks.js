"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Users, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";
import Card from "../UI/Card";
import SectionHeading from "../UI/SectionHeading";

const steps = [
  {
    icon: Building2,
    step: "01",
    title: "Create Your Club Workspace",
    description:
      "Set up your club in minutes. Customize roles, committees, and structure according to your organization's needs.",
    points: ["Create club profile", "Assign leadership roles", "Configure permissions"],
  },
  {
    icon: Users,
    step: "02",
    title: "Invite & Organize Members",
    description:
      "Build your community by inviting members, managing teams, and keeping everyone connected in one place.",
    points: ["Invite members instantly", "Create committees", "Manage participation"],
  },
  {
    icon: Rocket,
    step: "03",
    title: "Run Events & Operations",
    description:
      "Manage events, announcements, registrations, attendance, and club activities from a centralized dashboard.",
    points: ["Launch events", "Track attendance", "Share announcements"],
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section-panel section-muted">
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow="How It Works"
            title="From Setup To"
            accent="Successful Club Management"
          >
            Cluvio simplifies every stage of club management, allowing student organizations to
            focus on growth, engagement, and impact.
          </SectionHeading>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-white/12 to-transparent lg:block" />
          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="relative"
                >
                  <div className="mb-6 flex justify-center">
                    <div className="brand-mark relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl">
                      <Icon size={26} className="text-white" />
                    </div>
                  </div>
                  <Card className="h-full p-7">
                    <span className="text-sm font-semibold text-[var(--accent)]">STEP {step.step}</span>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-4 leading-relaxed text-white/62">{step.description}</p>
                    <div className="mt-7 space-y-3">
                      {step.points.map((point) => (
                        <div key={point} className="flex items-center gap-3">
                          <CheckCircle2 size={18} className="shrink-0 text-[var(--accent)]" />
                          <span className="text-white/80">{point}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  {index !== steps.length - 1 && (
                    <ArrowRight
                      className="absolute right-[-1rem] top-5 z-20 hidden text-white/24 lg:block"
                      size={26}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card interactive={false} className="mt-16 p-8 md:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="text-sm font-semibold text-[var(--accent)]">Unified Workflow</span>
                <h3 className="mt-2 text-3xl font-bold text-white">Everything Connected In One Place</h3>
                <p className="mt-4 max-w-2xl leading-relaxed text-white/62">
                  No spreadsheets, scattered chats, or disconnected tools. Cluvio brings every
                  aspect of club management together into a single, streamlined platform.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {["Members", "Events", "Communication"].map((item) => (
                  <React.Fragment key={item}>
                    <span className="chip rounded-xl">{item}</span>
                    <ArrowRight className="hidden text-white/30 sm:block" size={18} />
                  </React.Fragment>
                ))}
                <span className="chip rounded-xl border-[var(--accent-line)] bg-[var(--accent-soft)] text-white">
                  Growth
                </span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
