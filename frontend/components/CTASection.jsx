"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import Badge from "../ui/Badge";

export const CTASection = () => {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black flex items-center justify-center">
      {/* Decorative SVG grid pattern backdrop */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-glow-radial opacity-40 pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <Card glow className="p-8 sm:p-12 text-center border-white/[0.08] bg-neutral-950/60 backdrop-blur-xl relative overflow-hidden">
            
            {/* Visual glow line on top of card */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />

            <div className="flex justify-center mb-6">
              <Badge variant="primary" className="py-1 px-3">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                Empower Your Roster Today
              </Badge>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6 max-w-xl mx-auto leading-tight">
              Ready to Modernize Your Club?
            </h2>

            <p className="text-sm sm:text-base text-text-muted mb-10 max-w-lg mx-auto leading-relaxed">
              Join hundreds of student organizers, university administrators, and community leaders who use Cluvio to simplify their daily operations.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Button variant="primary" size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>

            {/* Tiny badges at the bottom */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-3 border-t border-white/[0.04] pt-8">
              {["No credit card required", "Set up in 2 mins", "Free for student organizations"].map((text) => (
                <div key={text} className="text-xs text-text-muted flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  {text}
                </div>
              ))}
            </div>

          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
