"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    FileText,
    Briefcase,
    Shield,
    Menu,
    X,
    ChevronRight,
    Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarItems = [
    {
        icon: LayoutDashboard,
        label: "Overview",
        href: "/dashboard",
    },
    {
        icon: FileText,
        label: "Resume Builder",
        href: "/builder",
    },
    {
        icon: Briefcase,
        label: "Job Tracker",
        href: "/tracker",
    },
    {
        icon: Shield,
        label: "Digital Footprint",
        href: "/footprint",
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-card border-r-2 border-border">
            <div className="h-16 flex items-center px-6 border-b-2 border-border">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-1.5 rounded-lg border-2 border-primary/80 shadow-[2px_2px_0_theme(colors.primary/0.4)]">
                        <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="text-base font-extrabold gradient-text">
                        CareerForge
                    </span>
                </Link>
            </div>

            <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link key={item.href} href={item.href} className="block">
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-3 relative overflow-hidden",
                                    isActive
                                        ? "bg-primary/10 text-primary hover:bg-primary/20 border-2 border-primary/30 shadow-[3px_3px_0_theme(colors.primary/0.15)]"
                                        : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute inset-0 bg-primary/5 z-0"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon className="size-4 relative z-10" />
                                <span className="relative z-10">{item.label}</span>
                            </Button>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t-2 border-border">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-secondary border-2 border-border">
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-8 h-8 rounded-xl border-2 border-border",
                            }
                        }}
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">My Account</span>
                        <span className="text-xs text-muted-foreground">Manage profile</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-screen w-full bg-background overflow-hidden">
            {/* Desktop Sidebar - Static flex item */}
            <aside className="hidden lg:flex w-64 flex-col shrink-0 z-50">
                <SidebarContent />
            </aside>

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
                            className="fixed top-0 left-0 z-50 h-full w-64 lg:hidden"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden relative">
                {/* Header */}
                <header className="h-16 flex-none sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b-2 border-border px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </Button>

                        <nav className="hidden md:flex items-center text-sm text-muted-foreground font-semibold">
                            <Link href="/dashboard" className="hover:text-foreground transition-colors">
                                Dashboard
                            </Link>
                            {pathname !== "/dashboard" && (
                                <>
                                    <ChevronRight className="size-4 mx-2" />
                                    <span className="text-foreground font-bold capitalize">
                                        {pathname.split("/").pop()}
                                    </span>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <main className={cn(
                    "flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent",
                    pathname?.startsWith("/builder")
                        ? "p-0"
                        : "p-6 lg:p-10"
                )}>
                    <div className={cn(
                        "h-full w-full flex flex-col items-center",
                        !pathname?.startsWith("/builder") && "max-w-6xl mx-auto"
                    )}>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="h-full w-full"
                        >
                            {children}
                        </motion.div>
                    </div>
                </main>
            </div>
        </div>
    );
}
