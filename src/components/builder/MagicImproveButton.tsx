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

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.error || "Optimization failed");
            }

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
                "btn-brutal w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed",
                isLoading && "opacity-80"
            )}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Sparkles className="w-4 h-4" />
            )}
            {isLoading ? "Optimizing..." : <><span className="hidden sm:inline">Magic Improve</span><span className="inline sm:hidden">Magic</span></>}
        </button>
    );
}
