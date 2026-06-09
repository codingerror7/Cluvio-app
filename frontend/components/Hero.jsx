"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, Calendar, Users, Bell } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export const Hero = () => {
  // Floating animation configs for each card to give subtle depth
  const floatAnimation = (delay = 0, duration = 6) => ({
    y: [0, -12, 0],
    transition: {
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay
    }
  });

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-glow-radial opacity-75 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-glow-radial-secondary opacity-50 pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10">
        
        {/* Left Side: Copy & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-6 py-1 px-3 w-fit">
              <Sparkles className="w-3.5 h-3.5 mr-1" />
              Introducing Cluvio 1.0
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6"
          >
            Manage Your Entire Club <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">
              From One Workspace
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-muted mb-8 leading-relaxed max-w-lg"
          >
            Events. Members. Announcements. Registrations. <br className="hidden sm:inline" />
            All managed effortlessly. Run your community on autopilot.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <Button variant="primary" size="lg" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border-t border-border-custom pt-8 grid grid-cols-3 gap-4"
          >
            <div>
              <div className="text-2xl font-bold text-white mb-1">500+</div>
              <div className="text-xs text-text-muted">Members Managed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">10k+</div>
              <div className="text-xs text-text-muted">Event RSVP</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">Instant</div>
              <div className="text-xs text-text-muted">Announcements</div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Creative Visual Composition of Floating Elements */}
        <div className="lg:col-span-6 relative h-[450px] sm:h-[550px] w-full flex items-center justify-center">
          
          {/* Main Workspace Frame Backdrop */}
          <div className="absolute inset-0 bg-white/[0.01] border border-white/[0.04] rounded-3xl pointer-events-none" />

          {/* 1. Analytics Widget */}
          <motion.div
            animate={floatAnimation(0, 7)}
            className="absolute top-[8%] left-[5%] w-[260px] sm:w-[280px] z-20 cursor-grab active:cursor-grabbing"
          >
            <Card glow className="p-4 sm:p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-text-muted font-medium uppercase tracking-wider">Analytics</span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4%
                </span>
              </div>
              <h4 className="text-2xl font-bold text-white tracking-tight">482 Members</h4>
              <p className="text-xs text-text-muted mt-1 mb-4">Active registrations this semester</p>
              
              {/* Fake Micro-Chart Bars */}
              <div className="flex items-end justify-between gap-1.5 h-16 pt-2">
                {[40, 55, 35, 60, 80, 50, 75, 95, 70, 85].map((height, i) => (
                  <div key={i} className="flex-1 rounded-t-sm bg-neutral-800 relative overflow-hidden group h-full">
                    <div 
                      style={{ height: `${height}%` }} 
                      className={`absolute bottom-0 w-full transition-all duration-500 rounded-t-sm ${
                        i === 7 ? "bg-brand-primary" : "bg-neutral-600 hover:bg-neutral-500"
                      }`} 
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* 2. Member Card Widget */}
          <motion.div
            animate={floatAnimation(1.5, 6.5)}
            className="absolute bottom-[10%] left-[8%] w-[240px] z-30 cursor-grab active:cursor-grabbing"
          >
            <Card className="p-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-secondary to-pink-500 flex items-center justify-center font-bold text-white text-sm">
                  AR
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card-elevated bg-emerald-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-sm font-semibold text-white truncate">Alex Rivera</h5>
                <p className="text-xs text-text-muted truncate">Computer Science Society</p>
              </div>
              <Badge variant="primary" className="text-[10px] py-0.5 px-1.5">
                President
              </Badge>
            </Card>
          </motion.div>

          {/* 3. Event Card Widget */}
          <motion.div
            animate={floatAnimation(0.8, 8)}
            className="absolute top-[28%] right-[5%] w-[280px] sm:w-[300px] z-25 cursor-grab active:cursor-grabbing"
          >
            <Card glow className="p-5 border-brand-primary/20">
              <div className="flex items-center gap-2 text-brand-primary mb-3">
                <Calendar className="w-4 h-4" />
                <span className="text-xs font-semibold tracking-wider uppercase">Featured Event</span>
              </div>
              <h4 className="text-base font-semibold text-white mb-2 leading-tight">
                Global Hackathon 2026
              </h4>
              <p className="text-xs text-text-muted mb-4 line-clamp-2">
                Join over 200 developers, designers, and creators to build the future of AI.
              </p>
              
              <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div 
                      key={num} 
                      className="w-6 h-6 rounded-full border border-card bg-neutral-700 flex items-center justify-center text-[10px] font-medium text-white"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-${1500000000000 + num * 1000}?auto=format&fit=crop&w=32&h=32&q=80')`,
                        backgroundSize: "cover"
                      }}
                    />
                  ))}
                  <div className="w-6 h-6 rounded-full border border-card bg-neutral-800 flex items-center justify-center text-[8px] font-bold text-text-muted">
                    +48
                  </div>
                </div>
                <span className="text-xs text-text-muted font-medium">182 Going</span>
              </div>
            </Card>
          </motion.div>

          {/* 4. Notification Alert Widget */}
          <motion.div
            animate={floatAnimation(2.2, 5.5)}
            className="absolute bottom-[18%] right-[10%] w-[230px] z-30 cursor-grab active:cursor-grabbing"
          >
            <Card className="p-3 bg-neutral-900/95 border-brand-secondary/30 flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-brand-secondary/15 flex items-center justify-center text-brand-secondary shrink-0">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-white">Announcement</div>
                <div className="text-[10px] text-text-muted truncate">New schedule published</div>
              </div>
              <span className="text-[9px] text-text-muted shrink-0">2m ago</span>
            </Card>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Hero;
