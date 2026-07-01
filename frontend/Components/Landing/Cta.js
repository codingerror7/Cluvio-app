"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Badge from "../UI/Badge";
import Button from "../UI/Button";
import Card from "../UI/Card";

const benefits = ["Member Management", "Event Operations", "Announcements", "Role-Based Access"];

const CTA = ({ onEnterDashboard }) => {
  return (
    <section id="contact" className="section-panel section-muted">
      <div className="container-page relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card
            interactive={false}
            className="relative overflow-hidden rounded-[28px] p-8 text-center sm:p-12 lg:p-16"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-line)] to-transparent" />
            <div className="relative">
              <Badge>Start Managing Smarter</Badge>
              <h2 className="mx-auto mt-7 max-w-4xl text-[clamp(2.25rem,5.8vw,5rem)] font-[780] leading-[1.05] text-white">
                Give Your Club
                <span className="block text-accent">A Better Operating System</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/62">
                Bring members, events, announcements, and operations into one organized workspace
                built specifically for student communities.
              </p>

              <div className="mt-9 flex flex-wrap justify-center gap-3">
                {benefits.map((item) => (
                  <div key={item} className="chip">
                    <CheckCircle2 size={16} className="text-[var(--accent)]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="sm:w-auto" onClick={onEnterDashboard}>
                  Get Started
                  <ArrowRight size={16} />
                </Button>
                <Button variant="secondary" size="lg" className="sm:w-auto" onClick={onEnterDashboard}>
                  Schedule Demo
                </Button>
              </div>

              <div className="subtle-divider mt-10" />
              <p className="mt-7 text-sm text-white/50">
                Built for student clubs, campus communities, technical societies, and university
                organizations.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
