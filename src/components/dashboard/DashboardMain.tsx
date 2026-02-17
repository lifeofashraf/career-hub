"use client";

import { cn } from "@/lib/utils";

export default function DashboardMain({ children }: { children: React.ReactNode }) {
    return (
        <main
            className={cn(
                "flex-1 min-w-0 min-h-screen transition-all duration-300 flex flex-col bg-background/50",
            )}
        >
            {children}
        </main>
    );
}
