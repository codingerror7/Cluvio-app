"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const CTA = () => {
  const benefits = [
    "Member Management",
    "Event Operations",
    "Announcements",
    "Role-Based Access",
  ];

  return (
    <section
      id="contact"
      className="relative py-32 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[700px]
            h-[400px]
            bg-violet-600/15
            blur-[160px]
          "
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">

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
          transition={{
            duration: 0.5,
          }}
          className="
            relative
            overflow-hidden
            rounded-[40px]
            border
            border-white/10
            bg-gradient-to-b
            from-white/[0.05]
            to-white/[0.02]
            p-8
            md:p-12
            lg:p-16
            text-center
          "
        >
          {/* Decorative Glow */}
          <div
            className="
              absolute
              top-0
              left-1/2
              -translate-x-1/2
              h-64
              w-64
              rounded-full
              bg-violet-500/10
              blur-[100px]
            "
          />

          {/* Badge */}
          <div
            className="
              relative
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
            Start Managing Smarter
          </div>

          {/* Heading */}
          <h2
            className="
              relative
              mt-8
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              tracking-tight
              text-white
              leading-tight
            "
          >
            Give Your Club
            <span className="block text-violet-400">
              A Better Operating System
            </span>
          </h2>

          {/* Description */}
          <p
            className="
              relative
              mt-6
              max-w-2xl
              mx-auto
              text-lg
              leading-relaxed
              text-white/60
            "
          >
            Bring members, events, announcements, and
            operations into one organized workspace built
            specifically for student communities.
          </p>

          {/* Benefits */}
          <div
            className="
              relative
              mt-10
              flex
              flex-wrap
              justify-center
              gap-4
            "
          >
            {benefits.map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-4
                  py-2
                "
              >
                <CheckCircle2
                  size={16}
                  className="text-violet-400"
                />

                <span
                  className="
                    text-sm
                    text-white/80
                  "
                >
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className="
              relative
              mt-12
              flex
              flex-col
              sm:flex-row
              justify-center
              gap-4
            "
          >
            <button
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-violet-600
                hover:bg-violet-500
                px-7
                py-3.5
                text-white
                font-medium
                transition-all
                duration-300
              "
            >
              Get Started

              <ArrowRight
                size={16}
              />
            </button>

            <button
              className="
                rounded-xl
                border
                border-white/10
                bg-white/[0.03]
                hover:bg-white/[0.05]
                px-7
                py-3.5
                text-white
                font-medium
                transition-all
                duration-300
              "
            >
              Schedule Demo
            </button>
          </div>

          {/* Trust Line */}
          <div
            className="
              relative
              mt-12
              pt-8
              border-t
              border-white/10
            "
          >
            <p
              className="
                text-sm
                text-white/50
              "
            >
              Built for student clubs, campus communities,
              technical societies, and university organizations.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CTA;