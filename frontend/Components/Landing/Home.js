"use client";

import React from "react";
import LandingNavbar from "./LandingNavbar.js";
import HeroShowcase from "./HeroShowcase.js";
import FeaturesGrid from "./FeaturesGrid.js";
import BroCodesSpotlight from "./BroCodesSpotlight.js";
import RoleShowcase from "./RoleShowcase.js";
import ClubsGrid from "./Hero.js";
import Steps from "./Steps.js";
import Faq from "./Faq.js";
import CtaBanner from "./CtaBanner.js";
import Footer from "./Footer.js";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Top Navbar with BroCodes Technologies banner & Login/Register buttons */}
      <LandingNavbar />

      {/* Main Landing Page Content */}
      <main className="relative flex flex-col w-full">
        {/* 1. Hero Showcase Section */}
        <HeroShowcase />

        <div className="w-full max-w-[1560px] mx-auto flex flex-col px-3 sm:px-6 lg:px-8 space-y-12">
          {/* 2. Core Features Grid */}
          <FeaturesGrid />

          {/* 3. BroCodes Technologies Dedicated Spotlight */}
          <BroCodesSpotlight />

          {/* 4. 3-Role Architecture & Access Tiers */}
          <RoleShowcase />

          {/* 5. Live Active Clubs Showcase */}
          <ClubsGrid />

          {/* 6. How Cluvio Works (3 Steps) */}
          <Steps />

          {/* 7. FAQ */}
          <Faq />

          {/* 8. Conversion CTA Banner with Login & Register */}
          <CtaBanner />

          {/* 9. Full Footer with BroCodes Technologies details */}
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Home;
