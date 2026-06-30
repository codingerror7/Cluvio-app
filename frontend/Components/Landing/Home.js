import React from 'react'
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

const Home = () => {
  return (
    <main className="app-shell">
      <Navbar />
      <Hero />
      <TrustSection />
      <Features />
      <HowItworks />
      <ProductPreview />
      <Benefits />
      <Faq />
      <Cta />
      <Footer />
    </main>
  )
}

export default Home
