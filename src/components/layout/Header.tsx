"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            layout
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`fixed z-50 flex items-center justify-between bg-white/95 backdrop-blur-sm transition-all duration-300 ${isScrolled
                ? "top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl rounded-full border-2 border-black px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "top-0 left-0 w-full border-b-4 border-black px-6 py-4 lg:px-12"
                }`}
        >
            <div className="flex items-center gap-2">
                <Link href="/" className={`flex items-center justify-center border-2 border-black p-1 bg-black text-white transition-transform duration-300 ${isScrolled ? "scale-90" : ""}`}>
                    <FileText className="w-6 h-6" />
                </Link>
                <AnimatePresence mode="wait">
                    {!isScrolled ? (
                        <motion.h2
                            key="full"
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="text-2xl font-black uppercase tracking-tighter whitespace-nowrap overflow-hidden"
                        >
                            Resu<span className="italic">mate</span>
                        </motion.h2>
                    ) : (
                        <motion.h2
                            key="short"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-xl font-black uppercase tracking-tighter"
                        >
                            RM
                        </motion.h2>
                    )}
                </AnimatePresence>
            </div>

            <div className={`hidden md:flex flex-1 justify-center gap-8 ${isScrolled ? "text-xs" : "text-sm"} transition-all duration-300`}>
                <Link className="text-black font-bold uppercase hover:underline decoration-2 underline-offset-4" href="/#frameworks">Templates</Link>
                <Link className="text-black font-bold uppercase hover:underline decoration-2 underline-offset-4" href="/#process">Process</Link>
                <Link className="text-black font-bold uppercase hover:underline decoration-2 underline-offset-4" href="/pricing">Pricing</Link>
            </div>

            <div className="flex items-center gap-4">
                <SignedOut>
                    <Link href="/sign-in" className="hidden sm:block text-black text-sm font-bold uppercase hover:underline decoration-2 underline-offset-4">
                        Log In
                    </Link>
                    <Link
                        href="/sign-up"
                        className={`flex items-center justify-center border-2 border-black bg-black px-6 text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-200 ${isScrolled ? "py-2 rounded-full" : "py-2"
                            }`}
                    >
                        Get Started
                    </Link>
                </SignedOut>

                <SignedIn>
                    <Link
                        href="/dashboard"
                        className={`flex items-center gap-2 border-2 border-black bg-black px-6 text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-colors duration-200 ${isScrolled ? "py-2 rounded-full" : "py-2"
                            }`}
                    >
                        Dashboard
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <div className="hidden sm:block">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 border-2 border-black rounded-none"
                                }
                            }}
                        />
                    </div>
                </SignedIn>
            </div>
        </motion.header>
    );
}
