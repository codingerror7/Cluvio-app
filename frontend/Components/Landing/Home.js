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
    <>
        <div>
            <Navbar />
        </div>
        <div>
            <Hero />
        </div>
        <div>
            <TrustSection />
        </div>
        <div>
            <Features />
        </div>
        <div>
            <HowItworks />
        </div>
        <div>
            <ProductPreview />
        </div>
        <div>
            <Benefits />
        </div>
        <div>
            <Faq />
        </div>
        <div>
            <Cta />
        </div>
        <div>
            <Footer />
        </div>
    </>
  )
}

export default Home