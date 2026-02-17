"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Kanban, Shield, Plus, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        resumeCount: 0,
        activeJobsCount: 0,
        footprintScore: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/dashboard/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const tools = [
        {
            title: "Resume Builder",
            description: "Create and edit stunning resumes with our drag & drop builder.",
            href: "/builder",
            icon: FileText,
            color: "border-neo-coral text-neo-coral bg-neo-coral/10",
            shadow: "shadow-[4px_4px_0_theme(colors.neo-coral/0.3)]",
            hoverShadow: "hover:shadow-[6px_6px_0_theme(colors.neo-coral/0.3)]",
            stats: `${stats.resumeCount} resume${stats.resumeCount !== 1 ? 's' : ''}`,
        },
        {
            title: "Job Tracker",
            description: "Track every application from wishlist to offer in one board.",
            href: "/tracker",
            icon: Kanban,
            color: "border-neo-teal text-neo-teal bg-neo-teal/10",
            shadow: "shadow-[4px_4px_0_theme(colors.neo-teal/0.3)]",
            hoverShadow: "hover:shadow-[6px_6px_0_theme(colors.neo-teal/0.3)]",
            stats: `${stats.activeJobsCount} active application${stats.activeJobsCount !== 1 ? 's' : ''}`,
        },
        {
            title: "Digital Footprint",
            description: "Check what recruiters and hackers can find about you online.",
            href: "/footprint",
            icon: Shield,
            color: "border-neo-lavender text-neo-lavender bg-neo-lavender/10",
            shadow: "shadow-[4px_4px_0_theme(colors.neo-lavender/0.3)]",
            hoverShadow: "hover:shadow-[6px_6px_0_theme(colors.neo-lavender/0.3)]",
            stats: `Score: ${stats.footprintScore}/100`,
        },
    ];

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
    };

    return (
        <div className="p-8 md:p-12 w-full max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10 text-center"
            >
                <h1 className="text-3xl font-black mb-2 tracking-tight">
                    Welcome to <span className="gradient-text">CareerForge</span>
                </h1>
                <p className="text-muted-foreground">
                    Your privacy-first career toolkit. Pick a tool to get started.
                </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-wrap justify-center gap-4 mb-10"
            >
                <Link
                    href="/builder"
                    className="neo-btn neo-btn-accent px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Resume
                </Link>
                <Link
                    href="/tracker"
                    className="neo-btn px-5 py-2.5 bg-card text-foreground text-sm font-bold flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add Application
                </Link>
            </motion.div>

            {/* Tool Cards */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full border-2 border-primary/20" />
                        <Loader2 className="w-12 h-12 animate-spin text-primary absolute inset-0" />
                    </div>
                </div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {tools.map((tool) => (
                        <motion.div key={tool.title} variants={cardVariants}>
                            <Link
                                href={tool.href}
                                className={`group block neo-card p-6 h-full flex flex-col hover:translate-x-[-2px] hover:translate-y-[-2px] ${tool.hoverShadow}`}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Icon */}
                                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl border-2 ${tool.color} ${tool.shadow} mb-5`}>
                                        <tool.icon className="w-6 h-6" />
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                                        {tool.title}
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                                    </h3>
                                    <p className="text-sm text-muted-foreground mb-5 flex-grow">
                                        {tool.description}
                                    </p>

                                    {/* Stats */}
                                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider pt-4 border-t-2 border-border/50">
                                        {tool.stats}
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
