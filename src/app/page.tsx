"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Layout, FileText, Globe, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen">

      {/* 1. Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-black font-bold">
              C
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">CareerForge</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#about" className="hover:text-white transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-medium text-zinc-300 hover:text-white transition-colors">
              Log in
            </Link>
            <Link href="/dashboard" className="btn-primary text-sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tight leading-[0.9] text-white mb-8">
              CAREER TOOLS <br />
              <span className="text-zinc-600">FOR THE MODERN ERA.</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
              Open-source, privacy-first tools to build your resume, track applications, and secure your digital footprint. No tracking. No ads. Just value.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/dashboard" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                Launch Dashboard <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="#" className="btn-glass text-lg px-8 py-4">
                View on GitHub
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Bento Grid Features */}
      <section className="px-6 pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1: Resume Builder */}
            <div className="capslock-card p-8 md:col-span-2 group relative overflow-hidden h-[400px] flex flex-col justify-between">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-zinc-900/50 flex items-center justify-center border border-white/5 mb-6 text-emerald-500">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Resume Builder</h3>
                <p className="text-zinc-400 max-w-md">Create ATS-proof resumes with a drag-and-drop builder. Export to JSON or PDF instantly.</p>
              </div>

              {/* Abstract Visual */}
              <div className="absolute right-0 bottom-0 w-2/3 h-full bg-gradient-to-l from-emerald-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="absolute right-[-50px] bottom-[-50px] w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full" />
            </div>

            {/* Card 2: Application Tracker */}
            <div className="capslock-card p-8 group relative overflow-hidden h-[400px] flex flex-col justify-between">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-zinc-900/50 flex items-center justify-center border border-white/5 mb-6 text-blue-500">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Job Tracker</h3>
                <p className="text-zinc-400">Kanban-style board to manage your applications. Never lose a lead again.</p>
              </div>
              <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-blue-500/20 blur-[80px] rounded-full" />
            </div>

            {/* Card 3: Digital Footprint */}
            <div className="capslock-card p-8 group relative overflow-hidden h-[300px] flex flex-col justify-between">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-zinc-900/50 flex items-center justify-center border border-white/5 mb-6 text-amber-500">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Footprint Shield</h3>
                <p className="text-zinc-400">Scan and clean your public data.</p>
              </div>
            </div>

            {/* Card 4: Open Source */}
            <div className="capslock-card p-8 md:col-span-2 group relative overflow-hidden h-[300px] flex items-center">
              <div className="relative z-10 w-full flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Open Source & Free</h3>
                  <p className="text-zinc-400 max-w-md">No hidden fees. No data selling. Just pure utility.</p>
                </div>
                <Globe className="w-32 h-32 text-zinc-800 group-hover:text-zinc-700 transition-colors" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#020617] py-12 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-sm">© 2026 CareerForge. Open Source.</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
