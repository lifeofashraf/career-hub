
"use client";

import React from "react";

export default function HowItWorks() {
    return (
        <section className="relative py-40 overflow-hidden">
            {/* Background element */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-36">
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                        How It <span className="text-gradient-stitch">Works</span>
                    </h2>
                </div>
                {/* Timeline Container */}
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -translate-y-16 z-0"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20 text-center">
                        {/* Step 1 */}
                        <div className="relative flex flex-col items-center group">
                            <span className="absolute -top-20 text-[10rem] font-black text-white/[0.03] select-none z-[-1] transition-transform group-hover:scale-110 duration-500 step-number">01</span>
                            <div className="w-20 h-20 mb-10 text-brand-purple bg-[#0a0e17] rounded-full flex items-center justify-center border border-white/10 z-10 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Import or Create</h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8 px-4 h-16">
                                Upload your existing CV or start from scratch using our intelligent wizard.
                            </p>
                            <button className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/30 hover:border-purple-400 hover:from-purple-800 hover:to-purple-700 transition-all shadow-lg shadow-purple-900/20 hover:scale-105">
                                Import or Create
                            </button>
                        </div>
                        {/* Step 2 */}
                        <div className="relative flex flex-col items-center group">
                            <span className="absolute -top-20 text-[10rem] font-black text-white/[0.03] select-none z-[-1] transition-transform group-hover:scale-110 duration-500 step-number">02</span>
                            <div className="w-20 h-20 mb-10 text-brand-purple bg-[#0a0e17] rounded-full flex items-center justify-center border border-white/10 z-10 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Customize & Optimize</h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8 px-4 h-16">
                                Use AI suggestions to tailor your content for specific job descriptions.
                            </p>
                            <button className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/30 hover:border-purple-400 hover:from-purple-800 hover:to-purple-700 transition-all shadow-lg shadow-purple-900/20 hover:scale-105">
                                Customize & Optimize
                            </button>
                        </div>
                        {/* Step 3 */}
                        <div className="relative flex flex-col items-center group">
                            <span className="absolute -top-20 text-[10rem] font-black text-white/[0.03] select-none z-[-1] transition-transform group-hover:scale-110 duration-500 step-number">03</span>
                            <div className="w-20 h-20 mb-10 text-brand-purple bg-[#0a0e17] rounded-full flex items-center justify-center border border-white/10 z-10 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Export & Apply</h3>
                            <p className="text-gray-400 text-lg leading-relaxed mb-8 px-4 h-16">
                                Download your polished resume and track your application progress.
                            </p>
                            <button className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-purple-900/50 to-purple-800/50 border border-purple-500/30 hover:border-purple-400 hover:from-purple-800 hover:to-purple-700 transition-all shadow-lg shadow-purple-900/20 hover:scale-105">
                                Export & Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
