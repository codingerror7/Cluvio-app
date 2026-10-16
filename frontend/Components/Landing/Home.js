"use client";

import React from "react";
import StairsPreloader from "@/Components/ui/StairsPreloader";
import LandingNavbar from "./LandingNavbar.js";
import Hero from "./Hero.js";
import About from "./About.js";
import LoginCTA from "./LoginCTA.js";
import Faq from "./Faq.js";
import Feedback from "./Feedback.js";
import Footer from "./Footer.js";

export default function Home() {
  return (
    <div className="landing-wrapper min-h-screen bg-[#070709] text-neutral-100 selection:bg-white selection:text-black relative overflow-x-hidden font-sans transition-colors duration-300">
      {/* Skipper UI Feature 1: Stairs Preloader */}
      <StairsPreloader />

      {/* 1. Floating Glassmorphic Navbar (Includes Skipper UI Feature 2: ThemeToggle) */}
      <LandingNavbar />

      {/* Main Content Area */}
      <main className="relative flex flex-col w-full">
        {/* 2. High-Impact Hero (Includes Skipper UI Feature 3: RollingText on 'Next-Gen OS') */}
        <Hero />

        {/* 3. About / How BroClubs Works (3 connected conceptual steps) */}
        <About />

        {/* 4. CTA + Login Options (Student vs President Glass Panels) */}
        <LoginCTA />

        {/* 5. 5-Question FAQ Section */}
        <Faq />

        {/* 6. Feedback Section (Help Us Build Better Campus Communities) */}
        <Feedback />
      </main>

      {/* 7. Minimal Professional Footer */}
      <Footer />
    </div>
  );
}
