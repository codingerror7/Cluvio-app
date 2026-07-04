"use client";

import React from "react";
import {
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const benefits = [
  "Member Management",
  "Events",
  "Announcements",
  "Role-Based Access",
];

const CTA = ({ onEnterDashboard }) => {
  return (
    <section
      id="contact"
      className="py-24"
    >
      <div className="container-page">

        <div className="rounded-[32px] border border-white/10 bg-white/[0.03] px-8 py-16 text-center md:px-16 md:py-20">

          {/* Badge */}

          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--accent)]">
            Start Managing Smarter
          </span>

          {/* Heading */}

          <h2 className="mx-auto mt-8 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Give Your Club
            <span className="block text-[var(--accent)]">
              a Better Operating System
            </span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Bring members, events, announcements, and club operations together
            in one platform designed specifically for student organizations.
          </p>

          {/* Benefits */}

          <div className="mt-10 flex flex-wrap justify-center gap-3">

            {benefits.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80"
              >

                <HiOutlineCheckCircle className="text-[var(--accent)]" />

                <span>{item}</span>

              </div>
            ))}

          </div>

          {/* CTA Buttons */}

          <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">

            <button
              onClick={onEnterDashboard}
              className="flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-7 py-3.5 font-medium text-black transition hover:opacity-90"
            >
              Get Started

              <HiOutlineArrowRight className="text-lg" />
            </button>

            <button
              onClick={onEnterDashboard}
              className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 font-medium text-white transition hover:bg-white/10"
            >
              Schedule Demo
            </button>

          </div>

          {/* Footer */}

          <p className="mt-10 text-sm text-white/45">
            Built for student clubs, technical societies, campus communities,
            and university organizations.
          </p>

        </div>

      </div>
    </section>
  );
};

export default CTA;