"use client";

import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from "./Hero.js";
import TrustSection from "./TrustSection.js";
import Features from "./Features.js";
import HowItworks from "./HowItWorks.js";
import ProductPreview from "./ProductPreview.js";
import Benefits from "./Benefits.js";
import Faq from "./Faq.js";
import Cta from "./Cta.js";
import Footer from "./Footer.js";
import CluvioDashboard from "../Dashboard/CluvioDashboard.js";

const Home = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) {
    return <CluvioDashboard onSignOut={() => setShowDashboard(false)} />;
  }

  return (
    <main className="app-shell">
      <Navbar onEnterDashboard={() => setShowDashboard(true)} />
      <Hero onEnterDashboard={() => setShowDashboard(true)} />
      <TrustSection />
      <Features />
      <HowItworks />
      <ProductPreview />
      <Benefits />
      <Faq />
      <Cta onEnterDashboard={() => setShowDashboard(true)} />
      <Footer />
    </main>
  );
};

export default Home;
