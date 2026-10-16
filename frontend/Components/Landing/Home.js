"use client";

import React from "react";
import LandingNavbar from "./LandingNavbar.js";
import Hero from "./Hero.js";
import About from "./About.js";
import LoginCTA from "./LoginCTA.js";
import Faq from "./Faq.js";
import Feedback from "./Feedback.js";
import Footer from "./Footer.js";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 selection:bg-white selection:text-black relative overflow-x-hidden font-sans">
      {/* 1. Floating Glassmorphic Navbar */}
      <LandingNavbar />

      {/* Main Content Area */}
      <main className="relative flex flex-col w-full">
        {/* 2. High-Impact Hero with Stylized Product Visualization */}
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
