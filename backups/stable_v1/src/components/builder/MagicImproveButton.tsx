"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function MagicImproveButton() {
    const { data, setResume, id, title, slug, isPublic, metadata } = useResumeStore();
    const [isLoading, setIsLoading] = useState(false);

    const handleOptimize = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/resume-optimizer/global", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data }),
            });

            if (!res.ok) throw new Error("Optimization failed");

            const result = await res.json();

            if (result.success && result.data) {
                // Update specific fields carefully to preserve metadata/IDs if possible
                // But global optimization might change structure slightly, so we do a full merge of data
                setResume({
                    id,
                    title,
                    slug,
                    isPublic,
                    metadata,
                    data: result.data
                });
                toast.success("Resume optimized successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to optimize resume. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleOptimize}
            disabled={isLoading}
            className={cn(
                "glass-btn-primary group relative overflow-hidden px-4 py-2 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed",
                isLoading && "animate-pulse"
            )}
        >
            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative flex items-center gap-2 font-bold text-xs tracking-wide uppercase text-white">
                {isLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                    <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse-soft" />
                )}
                {isLoading ? "Optimizing..." : "Magic Improve"}
            </div>
        </button>
    );
}
