"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    FileText,
    Kanban,
    Shield,
    ChevronLeft,
    ChevronRight,
    Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/stores/uiStore";

const sidebarLinks = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Resume Builder",
        href: "/builder",
        icon: FileText,
    },
    {
        label: "Job Tracker",
        href: "/tracker",
        icon: Kanban,
    },
    {
        label: "Digital Footprint",
        href: "/footprint",
        icon: Shield,
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { sidebarOpen, toggleSidebar } = useUiStore();
    const collapsed = !sidebarOpen;

    return (
        <aside
            className={cn(
                "sticky top-0 h-screen flex-shrink-0 flex flex-col border-r-2 border-border bg-card transition-all duration-300 z-30",
                collapsed ? "w-[72px]" : "w-64"
            )}
        >
            {/* Logo */}
            <div className="flex items-center justify-between px-4 h-16 border-b-2 border-border">
                {!collapsed && (
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary p-1.5 rounded-lg border-2 border-primary/80 shadow-[2px_2px_0_theme(colors.primary/0.4)]">
                            <Sparkles className="w-3 h-3 text-primary-foreground" />
                        </div>
                        <span className="text-base font-extrabold gradient-text">
                            CareerForge
                        </span>
                    </Link>
                )}
                <button
                    onClick={toggleSidebar}
                    className={cn(
                        "neo-btn p-2 bg-card text-muted-foreground",
                        collapsed && "mx-auto"
                    )}
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <ChevronLeft className="w-4 h-4" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1.5">
                {sidebarLinks.map((link) => {
                    const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary border-2 border-primary/30 shadow-[3px_3px_0_theme(colors.primary/0.15)]"
                                    : "text-muted-foreground hover:bg-card-hover hover:text-foreground border-2 border-transparent"
                            )}
                        >
                            <link.icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-primary")} />
                            {!collapsed && <span>{link.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* User section */}
            <div className="px-3 py-4 border-t-2 border-border">
                <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: "w-9 h-9 rounded-xl border-2 border-border",
                            },
                        }}
                    />
                    {!collapsed && (
                        <span className="text-sm text-muted-foreground font-medium">Account</span>
                    )}
                </div>
            </div>
        </aside>
    );
}
