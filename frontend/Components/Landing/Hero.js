"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Users,
  CalendarDays,
  Bell,
  Activity,
  CheckCircle2,
} from "lucide-react";
import Badge from "../UI/Badge";
import Button from "../UI/Button";
import Card from "../UI/Card";

const stats = [
  ["10+", "Student Clubs"],
  ["500+", "Members Managed"],
  ["100%", "Cloud Based"],
];

const Hero = ({ onEnterDashboard }) => {
  return (
    <section id="home" className="section-panel relative overflow-hidden pt-32 sm:pt-36">
      

      <div className="container-page relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.92fr] xl:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge>
                <CheckCircle2 size={14} />
                Built for Modern Student Clubs
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8 text-[clamp(2.75rem,7vw,5.75rem)] font-[780] leading-[1.02] text-white"
            >
              The Operating System
              <span className="block text-accent">For Student Clubs</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-white/68 sm:text-lg"
            >
              Manage members, events, announcements, attendance, and club operations from one
              beautifully designed workspace built for campus communities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Button size="lg" onClick={onEnterDashboard}>
                Get Started
                <ArrowRight size={16} />
              </Button>
              <Button variant="secondary" size="lg" onClick={onEnterDashboard}>
                <Play size={16} />
                Watch Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 grid max-w-xl grid-cols-3 gap-3 sm:gap-4"
            >
              {stats.map(([value, label]) => (
                <div key={label} className="card-surface p-4">
                  <h3 className="metric-value">{value}</h3>
                  <p className="mt-2 text-xs text-white/50 sm:text-sm">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <Card interactive={true} onClick={onEnterDashboard} className="relative p-4 shadow-glow sm:p-6 cursor-pointer hover:border-[var(--accent)] hover:scale-[1.01] transition-all">
              <div className="mb-7 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-white">Cluvio Dashboard</h3>
                  <p className="mt-1 text-sm text-white/50">Club Management Workspace</p>
                </div>
                <div className="flex gap-2" aria-hidden="true">
                  <div className="h-3 w-3 rounded-full bg-[var(--danger)]" />
                  <div className="h-3 w-3 rounded-full bg-[var(--warning)]" />
                  <div className="h-3 w-3 rounded-full bg-[var(--success)]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="card-surface p-5">
                  <Users size={20} className="mb-3 text-[var(--accent)]" />
                  <h3 className="text-2xl font-bold text-white">482</h3>
                  <p className="mt-1 text-sm text-white/50">Active Members</p>
                </div>
                <div className="card-surface p-5">
                  <CalendarDays size={20} className="mb-3 text-[var(--warning)]" />
                  <h3 className="text-2xl font-bold text-white">12</h3>
                  <p className="mt-1 text-sm text-white/50">Upcoming Events</p>
                </div>
              </div>

              <div className="card-surface mt-5 p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Activity size={16} className="text-[var(--accent)]" />
                  <span className="font-medium text-white">Recent Activity</span>
                </div>
                <div className="space-y-3">
                  {[
                    ["New member joined", "2m ago"],
                    ["Event registration approved", "15m ago"],
                    ["Announcement published", "1h ago"],
                  ].map(([label, time]) => (
                    <div key={label} className="flex justify-between gap-4 text-sm">
                      <span className="text-white/62">{label}</span>
                      <span className="shrink-0 text-white/80">{time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="card-surface absolute -left-8 bottom-12 hidden p-4 md:block"
            >
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-[var(--accent)]" />
                <div>
                  <p className="text-sm font-medium text-white">New Event Created</p>
                  <p className="text-xs text-white/50">AI Workshop - Tomorrow</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
