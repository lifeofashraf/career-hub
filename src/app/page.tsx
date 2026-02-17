"use client";

import React from "react";
import Navbar from "@/components/redesign/Navbar";
import Features from "@/components/redesign/Features";
import HowItWorks from "@/components/redesign/HowItWorks";
import Footer from "@/components/redesign/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen selection:bg-brand-purple/30">
      {/* Background Glow Blobs */}
      <div className="glow-blob blob-1"></div>
      <div className="glow-blob blob-2"></div>
      <div className="glow-blob blob-3"></div>

      <Navbar />

      <main className="pt-24 pb-20">
        {/* Dynamic Hero Text Adaptation */}
        <section className="max-w-[1400px] mx-auto px-6 pt-20 pb-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] text-white mb-8">
              CAREER TOOLS <br />
              <span className="text-gradient">FOR THE MODERN ERA.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              Open-source, privacy-first tools to build your resume, track applications, and secure your digital footprint. No tracking. No ads. Just value.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/dashboard" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                Launch Dashboard
              </a>
              <a href="https://github.com/lifeofashraf/career-hub" target="_blank" rel="noopener noreferrer" className="btn-glass text-lg px-8 py-4">
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        <Features />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
}
