"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar as SidebarIcon, Menu, X, Search, Plus } from "lucide-react";
import Sidebar from "./Sidebar";

// Button, cn removed if not used, or kept if needed. The new code uses plain HTML/Tailwind mostly.
import { cn } from "@/lib/utils";

// sidebarItems removed since Sidebar component handles it

export default function DashboardLayout({
    children,
    userPlan,
}: {
    children: React.ReactNode;
    userPlan: string;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen w-full bg-[#f4f4f4]">
            {/* Desktop Sidebar - Sticky */}
            <div className="hidden md:flex flex-col flex-shrink-0 relative z-30">
                <div className="sticky top-0 h-screen">
                    <Sidebar userPlan={userPlan} />
                </div>
            </div>

            {/* Mobile Sidebar - Fixed overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 z-50 h-full bg-white lg:hidden border-r-2 border-black"
                        >
                            <Sidebar userPlan={userPlan} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-h-screen relative min-w-0">
                {/* Header */}
                <header className={cn(
                    "sticky top-0 z-20 flex items-center justify-between border-b-2 border-black bg-white px-4 py-4 md:px-8 md:py-6",
                    (pathname === "/dashboard" || pathname.includes("/builder")) && "md:hidden border-b-0"
                )}>
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden border-2 border-black p-1 hover:bg-black hover:text-white transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        {pathname !== "/dashboard" && (
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-black">
                                {pathname === "/tracker" ? "Applications" :
                                    pathname === "/footprint" ? "Digital Footprint" :
                                        pathname.includes("/builder") ? "Editor" :
                                            pathname.split("/").pop()}
                            </h2>
                        )}
                    </div>
                    {pathname !== "/dashboard" && (
                        <div className="flex items-center gap-6">
                            {/* Search Bar - Hidden on mobile */}
                            <div className="relative hidden w-80 md:block">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black font-bold">
                                    <Search size={20} strokeWidth={2.5} />
                                </span>
                                <input
                                    className="w-full border-2 border-black bg-white py-2 pl-10 pr-4 text-sm font-mono text-black placeholder-gray-500 focus:outline-none focus:shadow-[4px_4px_0_0_#000000] transition-all"
                                    placeholder="SEARCH ARCHIVES..."
                                    type="text"
                                />
                            </div>
                            <Link href="/builder" className="hidden md:block">
                                <button className="flex items-center gap-2 btn-brutal border-2 border-black bg-black text-white px-4 py-2 hover:bg-white hover:text-black transition-all shadow-[4px_4px_0_0_#000000] hover:shadow-[2px_2px_0_0_#000000] hover:translate-x-[2px] hover:translate-y-[2px]">
                                    <Plus size={20} strokeWidth={3} />
                                    <span className="font-bold uppercase tracking-wider">CREATE NEW</span>
                                </button>
                            </Link>
                        </div>
                    )}
                </header>

                {/* Page Content */}
                <div className="flex-1 bg-[#f4f4f4]">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full"
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
