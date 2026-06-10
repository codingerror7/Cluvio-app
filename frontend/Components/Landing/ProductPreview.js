"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Quote,
  Star,
  Users,
  CalendarDays,
  BellRing,
  TrendingUp,
} from "lucide-react";

const ProductReviews = () => {
  const reviews = [
    {
      name: "Aarav Sharma",
      role: "President, Coding Club",
      review:
        "Managing events and member communication became significantly easier after moving everything into a single platform.",
    },
    {
      name: "Priya Verma",
      role: "Event Coordinator",
      review:
        "The event registration workflow saved us hours of manual work during our annual technical fest.",
    },
    {
      name: "Rahul Mehta",
      role: "Club Administrator",
      review:
        "The platform gives us a clear view of participation, announcements, and club operations without juggling multiple tools.",
    },
    {
      name: "Sneha Kapoor",
      role: "Student Chapter Lead",
      review:
        "Simple enough for members to use daily while still powerful enough for organizers.",
    },
  ];

  const metrics = [
    {
      icon: Users,
      value: "500+",
      label: "Members Managed",
    },
    {
      icon: CalendarDays,
      value: "50+",
      label: "Events Organized",
    },
    {
      icon: BellRing,
      value: "1000+",
      label: "Announcements Delivered",
    },
    {
      icon: TrendingUp,
      value: "3x",
      label: "Higher Engagement",
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            right-0
            top-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-600/10
            blur-[160px]
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
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
            Product Impact
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
            Built To Improve
            <span className="block text-violet-400">
              Club Operations
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
            Cluvio helps student organizations spend less time
            managing tools and more time building meaningful communities.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10 items-start">

          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-br
              from-white/[0.05]
              to-white/[0.02]
              p-8
            "
          >
            <span className="text-violet-400 text-sm font-medium">
              Platform Performance
            </span>

            <h3
              className="
                mt-3
                text-3xl
                font-bold
                text-white
              "
            >
              Everything You Need In One Workspace
            </h3>

            <p
              className="
                mt-4
                text-white/60
                leading-relaxed
              "
            >
              From member onboarding to event execution,
              Cluvio centralizes every aspect of club management
              into one intuitive platform.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {metrics.map((metric) => {
                const Icon = metric.icon;

                return (
                  <div
                    key={metric.label}
                    className="
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.03]
                      p-5
                    "
                  >
                    <Icon
                      size={20}
                      className="text-violet-400 mb-3"
                    />

                    <div className="text-3xl font-bold text-white">
                      {metric.value}
                    </div>

                    <div className="text-sm text-white/50 mt-1">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Side Reviews */}
          <div className="space-y-5">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
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
                  delay: index * 0.1,
                }}
                className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
              >
                <div className="flex justify-between items-start">

                  <div>
                    <h4
                      className="
                        text-white
                        font-semibold
                      "
                    >
                      {review.name}
                    </h4>

                    <p
                      className="
                        text-sm
                        text-white/50
                        mt-1
                      "
                    >
                      {review.role}
                    </p>
                  </div>

                  <Quote
                    size={18}
                    className="text-violet-400"
                  />
                </div>

                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="currentColor"
                      className="text-violet-400"
                    />
                  ))}
                </div>

                <p
                  className="
                    mt-4
                    text-white/65
                    leading-relaxed
                  "
                >
                  {review.review}
                </p>
              </motion.div>
            ))}
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
            Designed For Growth, Not Complexity
          </h3>

          <p
            className="
              mt-4
              text-white/60
              leading-relaxed
            "
          >
            Cluvio removes operational friction so clubs can
            focus on what truly matters — building communities,
            organizing impactful events, and creating opportunities
            for students.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductReviews;