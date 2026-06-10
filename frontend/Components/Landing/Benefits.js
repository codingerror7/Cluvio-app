"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Clock3,
  Users,
  Zap,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Benefits = () => {
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

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2
            w-[700px]
            h-[350px]
            bg-violet-600/10
            blur-[160px]
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Header */}
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
              px-4
              py-2
              rounded-full
              border
              border-violet-500/20
              bg-violet-500/10
              text-violet-300
              text-sm
            "
          >
            Why Clubs Choose Cluvio
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
            Focus On Building Communities,
            <span className="block text-violet-400">
              Not Managing Tools
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
            Cluvio helps student organizations reduce operational
            overhead, improve collaboration, and create a better
            experience for every member.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="mt-20 grid lg:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.title}
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
                  delay: index * 0.1,
                }}
                className="
                  group
                  rounded-3xl
                  border
                  border-white/10
                  bg-gradient-to-br
                  from-white/[0.04]
                  to-white/[0.02]
                  p-8
                  hover:border-violet-500/20
                  transition-all
                  duration-300
                "
              >
                <div
                  className="
                    flex
                    items-start
                    justify-between
                  "
                >
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
                    <Icon
                      size={26}
                      className="text-violet-400"
                    />
                  </div>

                  <ArrowRight
                    size={18}
                    className="
                      text-white/20
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />
                </div>

                <h3
                  className="
                    mt-8
                    text-2xl
                    font-semibold
                    text-white
                  "
                >
                  {benefit.title}
                </h3>

                <p
                  className="
                    mt-4
                    text-white/60
                    leading-relaxed
                  "
                >
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Section */}
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
            rounded-[32px]
            border
            border-white/10
            bg-gradient-to-b
            from-white/[0.05]
            to-transparent
            p-8
            md:p-12
          "
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div>
              <span
                className="
                  text-sm
                  font-medium
                  text-violet-400
                "
              >
                The Bigger Picture
              </span>

              <h3
                className="
                  mt-3
                  text-3xl
                  md:text-4xl
                  font-bold
                  text-white
                  leading-tight
                "
              >
                A Better Experience For
                Every Member Of Your Club
              </h3>

              <p
                className="
                  mt-5
                  text-white/60
                  leading-relaxed
                "
              >
                Whether you're a president managing hundreds of
                members or a student attending your first event,
                Cluvio creates a seamless experience that keeps
                everyone connected and informed.
              </p>
            </div>

            {/* Right Benefits */}
            <div className="space-y-5">

              {[
                "Centralized club operations",
                "Better event participation",
                "Improved communication",
                "Simplified administration",
                "Scalable club management",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.03]
                    p-4
                  "
                >
                  <CheckCircle2
                    size={20}
                    className="text-violet-400 shrink-0"
                  />

                  <span className="text-white/80">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </div>
        </motion.div>

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
          className="
            mt-20
            text-center
            max-w-3xl
            mx-auto
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
            Less Administration. More Impact.
          </h3>

          <p
            className="
              mt-4
              text-white/60
              leading-relaxed
            "
          >
            Cluvio gives student organizations the tools they need
            to stay organized, engage members, and create meaningful
            experiences across campus.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Benefits;