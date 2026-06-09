"use client";

import React from "react";
import { motion } from "framer-motion";
import { PlusCircle, CalendarDays, Rocket } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Create Your Club",
      description: "Set up your workspace in under 2 minutes. Import your existing roster, customize your branding, and configure roles for your executive committee.",
      icon: <PlusCircle className="w-5 h-5 text-indigo-400" />
    },
    {
      number: "02",
      title: "Manage Activities",
      description: "Schedule meetings, create events, and broadcast announcements. Everything is linked, meaning members are auto-notified when schedules change.",
      icon: <CalendarDays className="w-5 h-5 text-purple-400" />
    },
    {
      number: "03",
      title: "Grow Your Community",
      description: "Track engagement, gather feedback, and welcome new members. Cultivate an active community where running things feels effortless.",
      icon: <Rocket className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-black/90">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-glow-radial opacity-20 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 relative">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-20">
          <Badge variant="primary" className="mb-4">
            Workflow
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Effortless setup. Complete control.
          </h2>
          <p className="text-sm text-text-muted">
            Getting your club up and running on Cluvio is simple. We've streamlined the setup process so you can focus on what matters: your community.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-16">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[50px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-brand-primary/20 via-brand-secondary/35 to-emerald-500/20 z-0" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative z-10 group"
            >
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                {/* Step Circle Indicator */}
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-border-custom flex items-center justify-center mb-6 group-hover:border-brand-primary/50 group-hover:bg-neutral-950 transition-all duration-300 shadow-md">
                  {step.icon}
                </div>

                {/* Step Content Card */}
                <Card glow className="w-full p-6 text-left border-white/[0.04] bg-neutral-950/40 hover:bg-neutral-900/60 transition-all duration-300">
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-sm font-semibold text-brand-primary tracking-wider uppercase">
                      Step {step.number}
                    </span>
                    <span className="text-3xl font-light text-white/10 select-none font-mono">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
