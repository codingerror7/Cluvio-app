"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock3, Users, Zap, TrendingUp, ArrowRight, CheckCircle2 } from "lucide-react";
import Card from "../UI/Card";
import SectionHeading from "../UI/SectionHeading";

const benefits = [
  {
    icon: Clock3,
    title: "Save Hours Every Week",
    description:
      "Replace spreadsheets, scattered chats, and manual coordination with a single streamlined workflow.",
  },
  {
    icon: Users,
    title: "Increase Member Engagement",
    description:
      "Keep members informed, involved, and connected through centralized communication and events.",
  },
  {
    icon: Zap,
    title: "Operate More Efficiently",
    description:
      "Manage registrations, attendance, announcements, and teams without switching between multiple tools.",
  },
  {
    icon: TrendingUp,
    title: "Scale Your Club With Confidence",
    description:
      "As your community grows, Cluvio helps maintain structure, visibility, and operational control.",
  },
];

const checklist = [
  "Centralized club operations",
  "Better event participation",
  "Improved communication",
  "Simplified administration",
  "Scalable club management",
];

const Benefits = () => {
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
            eyebrow="Why Clubs Choose Cluvio"
            title="Focus On Building Communities,"
            accent="Not Managing Tools"
          >
            Cluvio helps student organizations reduce operational overhead, improve collaboration,
            and create a better experience for every member.
          </SectionHeading>
        </motion.div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="group h-full p-7 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div className="icon-tile h-14 w-14">
                      <Icon size={25} />
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-white/24 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                  <h3 className="mt-7 text-2xl font-semibold text-white">{benefit.title}</h3>
                  <p className="mt-4 leading-relaxed text-white/62">{benefit.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card interactive={false} className="mt-16 p-8 md:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="text-sm font-semibold text-[var(--accent)]">The Bigger Picture</span>
                <h3 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
                  A Better Experience For Every Member Of Your Club
                </h3>
                <p className="mt-5 leading-relaxed text-white/62">
                  Whether you're a president managing hundreds of members or a student attending
                  your first event, Cluvio creates a seamless experience that keeps everyone
                  connected and informed.
                </p>
              </div>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item} className="card-surface flex items-center gap-4 p-4">
                    <CheckCircle2 size={20} className="shrink-0 text-[var(--accent)]" />
                    <span className="text-white/82">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <h3 className="text-2xl font-bold text-white md:text-3xl">
            Less Administration. More Impact.
          </h3>
          <p className="mt-4 leading-relaxed text-white/62">
            Cluvio gives student organizations the tools they need to stay organized, engage
            members, and create meaningful experiences across campus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
