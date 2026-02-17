
"use client";

import React from "react";

export default function Features() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-36">
            <div className="text-center mb-28">
                <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
                    Everything <span className="text-gradient-stitch">You Need</span>
                </h2>
                <p className="mt-8 max-w-4xl mx-auto text-2xl text-gray-400 leading-relaxed font-light">
                    Comprehensive tools to forge your career path with precision and style.
                </p>
            </div>
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">
                {/* Card 01: Resume Builder */}
                <div className="glass-card-stitch rounded-[2.5rem] p-14 relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]">
                    <span className="absolute top-8 left-10 text-8xl font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors">01</span>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="mb-8">
                            <div className="h-16 w-16 rounded-3xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 mb-8 backdrop-blur-md shadow-lg shadow-purple-500/10">
                                <svg className="h-9 w-9 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Resume Builder</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Create ATS-friendly resumes in minutes with our drag-and-drop editor tailored for modern job markets.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Card 02: Job Tracker */}
                <div className="glass-card-stitch rounded-[2.5rem] p-14 relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]">
                    <span className="absolute top-8 left-10 text-8xl font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors">02</span>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="mb-8">
                            <div className="h-16 w-16 rounded-3xl bg-pink-500/10 flex items-center justify-center border border-pink-500/20 mb-8 backdrop-blur-md shadow-lg shadow-pink-500/10">
                                <svg className="h-9 w-9 text-brand-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Job Tracker</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Keep track of every application, interview, and offer in one centralized dashboard. Never miss a follow-up.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Card 03: Digital Footprint */}
                <div className="glass-card-stitch rounded-[2.5rem] p-14 relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]">
                    <span className="absolute top-8 left-10 text-8xl font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors">03</span>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="mb-8">
                            <div className="h-16 w-16 rounded-3xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 mb-8 backdrop-blur-md shadow-lg shadow-blue-500/10">
                                <svg className="h-9 w-9 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Digital Footprint</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Analyze and optimize your online presence to ensure you look your best when recruiters Google you.
                            </p>
                        </div>
                    </div>
                </div>
                {/* Card 04: Resume Parser */}
                <div className="glass-card-stitch rounded-[2.5rem] p-14 relative overflow-hidden group transition-all duration-500 hover:scale-[1.02]">
                    <span className="absolute top-8 left-10 text-8xl font-black text-white/5 select-none pointer-events-none group-hover:text-white/10 transition-colors">04</span>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="mb-8">
                            <div className="h-16 w-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-8 backdrop-blur-md shadow-lg shadow-indigo-500/10">
                                <svg className="h-9 w-9 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">Resume Parser</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Automatically extract data from your existing documents to populate your profile instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
