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
    <div className="bg-background text-foreground min-h-screen relative font-sans antialiased selection:bg-brand-primary/20 selection:text-white">
      {/* Dynamic Global Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.002)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.002)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Floating Navbar */}
      <Navbar />

      {/* Main Core Layout */}
      <main className="relative">
        <Hero />
        <ClubShowcase />
        <HowItWorks />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
