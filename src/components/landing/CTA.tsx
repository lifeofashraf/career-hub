
"use client";

import React from "react";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-36 px-4 text-center">
            <div className="max-w-6xl mx-auto glass-card-stitch rounded-[4rem] p-20 md:p-28 border border-white/10 relative overflow-hidden">
                {/* Decorative Glow within Card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-purple-500/20 blur-[130px] pointer-events-none"></div>
                <div className="relative z-10">
                    <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-14 leading-tight">
                        Start Building <span className="text-gradient-stitch">Today</span>
                    </h2>
                    <Link href="/dashboard" className="px-14 py-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-2xl shadow-xl hover:shadow-purple-500/50 hover:-translate-y-2 transition-all duration-300 inline-block">
                        Get Started Now
                    </Link>
                </div>
            </div>
        </section>
    );
}
