"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, Users, CalendarDays, BellRing, TrendingUp } from "lucide-react";
import Card from "../UI/Card";
import SectionHeading from "../UI/SectionHeading";

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
    review: "Simple enough for members to use daily while still powerful enough for organizers.",
  },
];

const metrics = [
  { icon: Users, value: "500+", label: "Members Managed" },
  { icon: CalendarDays, value: "50+", label: "Events Organized" },
  { icon: BellRing, value: "1000+", label: "Announcements Delivered" },
  { icon: TrendingUp, value: "3x", label: "Higher Engagement" },
];

const ProductPreview = () => {
  return (
    <section className="section-panel">
      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <SectionHeading eyebrow="Product Impact" title="Built To Improve" accent="Club Operations">
            Cluvio helps student organizations spend less time managing tools and more time
            building meaningful communities.
          </SectionHeading>
        </motion.div>

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card interactive={false} className="p-7 sm:p-8">
              <span className="text-sm font-semibold text-[var(--accent)]">Platform Performance</span>
              <h3 className="mt-3 text-3xl font-bold text-white">Everything You Need In One Workspace</h3>
              <p className="mt-4 leading-relaxed text-white/62">
                From member onboarding to event execution, Cluvio centralizes every aspect of club
                management into one intuitive platform.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {metrics.map((metric) => {
                  const Icon = metric.icon;
                  return (
                    <div key={metric.label} className="card-surface p-5">
                      <Icon size={20} className="mb-3 text-[var(--accent)]" />
                      <div className="metric-value">{metric.value}</div>
                      <div className="mt-2 text-sm text-white/50">{metric.label}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>

          <div className="grid gap-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-white">{review.name}</h4>
                      <p className="mt-1 text-sm text-white/50">{review.role}</p>
                    </div>
                    <Quote size={18} className="shrink-0 text-[var(--accent)]" />
                  </div>
                  <div className="mt-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" className="text-[var(--warning)]" />
                    ))}
                  </div>
                  <p className="mt-4 leading-relaxed text-white/66">{review.review}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <h3 className="text-2xl font-bold text-white md:text-3xl">
            Designed For Growth, Not Complexity
          </h3>
          <p className="mt-4 leading-relaxed text-white/62">
            Cluvio removes operational friction so clubs can focus on what truly matters: building
            communities, organizing impactful events, and creating opportunities for students.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
