"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import TextReveal from "@/components/ui/TextReveal";

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

    return (
        <section ref={ref} className="relative min-h-[100dvh] pt-36 pb-24 flex flex-col justify-center items-center border-b-2 border-border">
            {/* Dot Grid Background */}
            <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />

            {/* Top gradient fade */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

            {/* Decorative floating shapes */}
            <div className="absolute top-32 right-16 w-20 h-20 rounded-2xl border-2 border-neo-gold/20 rotate-12 animate-float hidden lg:block" />
            <div className="absolute bottom-40 left-20 w-14 h-14 rounded-full border-2 border-neo-coral/20 animate-float hidden lg:block" style={{ animationDelay: "2s" }} />
            <div className="absolute top-60 left-[10%] w-10 h-10 rounded-xl bg-neo-teal/5 border-2 border-neo-teal/15 rotate-45 animate-float hidden lg:block" style={{ animationDelay: "4s" }} />

            <motion.div
                style={{ opacity, scale, y }}
                className="relative z-10 w-full max-w-5xl mx-auto px-8 md:px-12 flex flex-col items-center text-center"
            >
                {/* Status Badge */}
                <div className="mb-8 flex items-center justify-center">
                    <div className="neo-badge bg-primary/10 border-primary/30 text-primary">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2" />
                        <span className="text-xs font-bold tracking-wider">100% Free & Open Source</span>
                    </div>
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[0.95] mb-6">
                    <TextReveal
                        as="span"
                        staggerSpeed={0.04}
                        delay={0.2}
                    >
                        Your Career.
                    </TextReveal>
                    <br />
                    <TextReveal
                        as="span"
                        className="text-gradient"
                        staggerSpeed={0.04}
                        delay={0.6}
                    >
                        Supercharged.
                    </TextReveal>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
                >
                    Build stunning resumes, track every job application, and protect your digital footprint — all in one beautiful, privacy-first toolkit.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        href="/sign-up"
                        className="neo-btn neo-btn-accent px-8 py-4 bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-3"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Get Started Free</span>
                    </Link>
                    <Link
                        href="#features"
                        className="neo-btn px-8 py-4 bg-card text-foreground font-bold text-base flex items-center justify-center gap-2 group"
                    >
                        <span>See Features</span>
                        <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </motion.div>

            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
}
