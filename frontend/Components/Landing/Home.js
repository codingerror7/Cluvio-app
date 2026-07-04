"use client";

import React from "react";
import Sidebar from "./Sidebar.js";
import Topbar from "./Topbar.js";
import Hero from "./Hero.js";
import Steps from "./Steps.js";
import Faq from "./Faq.js";
import Footer from "./Footer.js";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="flex min-h-screen">
        <div className="fixed inset-y-0 left-0 z-40 hidden w-72 md:flex">
          <Sidebar />
        </div>

        <div className="flex-1 md:ml-72">
          <div className="sticky top-0 z-30 border-b border-white/10 bg-[#0B1120]/95 backdrop-blur-xl">
            <Topbar />
          </div>

          <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <Hero />
            <Steps />
            <Faq />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
