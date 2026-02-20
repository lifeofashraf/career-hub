"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import {
    LayoutDashboard,
    FileText,
    FolderOpen,
    Briefcase,
    Settings,
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
        label: "Office Tools",
        href: "/office-tools",
        icon: FolderOpen,
    },
    {
        label: "Settings",
        href: "/settings", // Placeholder or Footprint?
        icon: Settings,
    },
];

export default function Sidebar({ userPlan = "Free" }: { userPlan?: string }) {
    const pathname = usePathname();
    const { sidebarOpen, toggleSidebar } = useUiStore();
    const collapsed = !sidebarOpen;
    const { user } = useUser();

    return (
        <aside
            className={cn(
                "sticky top-0 h-screen flex-shrink-0 flex flex-col border-r-2 border-black bg-white transition-all duration-300 z-30",
                collapsed ? "w-[72px]" : "w-72"
            )}
        >
            <div className="flex flex-col gap-8 p-6 h-full">
                {/* Header / Logo */}
                <div className={cn("flex items-center gap-3 pb-6 border-b-2 border-black", collapsed && "justify-center pb-0 border-b-0")}>
                    {!collapsed ? (
                        <>
                            <div className="flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-white shadow-[2px_2px_0_0_#000000]">
                                <FileText className="w-6 h-6" />
                            </div>
                            <div>
                                <h1 className="text-xl font-black uppercase tracking-tighter leading-none text-black">
                                    RESU<br />MATE
                                </h1>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-black text-white">
                            <FileText className="w-5 h-5" />
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 flex-1">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "group flex items-center gap-3 border-2 px-3 py-3 font-bold uppercase tracking-wide transition-all",
                                    isActive
                                        ? "border-black bg-black text-white shadow-[2px_2px_0_0_#000000]"
                                        : "border-transparent text-black hover:border-black hover:bg-gray-50 hover:shadow-[2px_2px_0_0_#000000] text-gray-500 hover:text-black",
                                    collapsed && "justify-center px-0 border-transparent hover:border-transparent hover:bg-transparent shadow-none hover:shadow-none"
                                )}
                                title={collapsed ? link.label : undefined}
                            >
                                <link.icon className={cn("w-6 h-6", isActive ? "text-white" : "text-current")} />
                                {!collapsed && <span className="text-sm">{link.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile */}
                <div className={cn("border-t-2 border-black pt-6", collapsed && "border-t-0 pt-0")}>
                    {!collapsed ? (
                        <div className="flex items-center gap-3 border-2 border-black bg-white p-3 hover:shadow-[2px_2px_0_0_#000000] transition-all cursor-pointer">
                            <div className="h-10 w-10 overflow-hidden border-2 border-black bg-gray-200">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: "w-full h-full rounded-none",
                                            rootBox: "w-full h-full"
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex flex-1 flex-col overflow-hidden">
                                <span className="truncate text-sm font-bold uppercase text-black">
                                    {user?.fullName || "User"}
                                </span>
                                <span className="truncate text-xs font-mono text-gray-600">{userPlan} PLAN</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8 rounded-none border-2 border-black"
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Toggle Button (Desktop Only logic usually, but here we keep it simple or remove if responsive handles it) */}
                <button
                    onClick={toggleSidebar}
                    className="absolute -right-3 top-20 bg-white border-2 border-black p-1 hover:bg-black hover:text-white transition-colors lg:hidden"
                >
                    {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                </button>
            </div>
        </aside>
    );
}
