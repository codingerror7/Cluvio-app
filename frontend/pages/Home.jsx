"use client";

import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ClubShowcase from "../components/ClubShowcase";
import HowItWorks from "../components/HowItWorks";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

export const Home = () => {
  return (
    <div
      className="
        relative
        min-h-screen
        bg-background
        text-foreground
        font-sans
        antialiased
        overflow-x-hidden
        selection:bg-brand-primary/20
        selection:text-white
      "
    >
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        
        {/* Top Glow */}
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[900px]
            h-[500px]
            rounded-full
            bg-brand-primary/5
            blur-[140px]
          "
        />

        {/* Bottom Glow */}
        <div
          className="
            absolute
            bottom-0
            right-0
            w-[600px]
            h-[600px]
            rounded-full
            bg-brand-secondary/5
            blur-[160px]
          "
        />
      </div>

      <Navbar />

      <main className="relative">
        <Hero />

        <ClubShowcase />

        <HowItWorks />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;