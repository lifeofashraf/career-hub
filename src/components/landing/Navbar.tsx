"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/95 backdrop-blur-md border-b-2 border-border shadow-[0_4px_0_theme(colors.border)]"
                : "bg-transparent border-b-2 border-transparent"
                }`}
        >
            <div className="w-full max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="bg-primary p-2 rounded-xl border-2 border-primary/80 shadow-[2px_2px_0_theme(colors.primary/0.5)] group-hover:shadow-[3px_3px_0_theme(colors.primary/0.5)] transition-all">
                        <Sparkles className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-extrabold tracking-tight">
                        CareerForge
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-card-hover"
                        >
                            {link.label}
                        </a>
                    ))}

                    <SignedOut>
                        <Link
                            href="/sign-in"
                            className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/sign-up"
                            className="neo-btn neo-btn-accent px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold flex items-center gap-2"
                        >
                            <span>Get Started</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </SignedOut>

                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="neo-btn neo-btn-accent px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold"
                        >
                            Dashboard
                        </Link>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-9 h-9 rounded-xl border-2 border-border",
                                },
                            }}
                        />
                    </SignedIn>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden neo-btn p-2.5 bg-card"
                >
                    {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden bg-card border-t-2 border-border"
                >
                    <div className="px-6 py-8 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors py-2"
                            >
                                {link.label}
                            </a>
                        ))}
                        <SignedOut>
                            <Link href="/sign-in" className="block text-sm font-semibold text-muted-foreground hover:text-foreground py-2">
                                Log In
                            </Link>
                            <Link
                                href="/sign-up"
                                className="block w-full text-center neo-btn neo-btn-accent px-5 py-3 bg-primary text-primary-foreground font-bold"
                            >
                                Get Started Free
                            </Link>
                        </SignedOut>
                        <SignedIn>
                            <Link href="/dashboard" className="block text-sm font-semibold text-muted-foreground hover:text-foreground py-2">
                                Go to Dashboard
                            </Link>
                        </SignedIn>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}
