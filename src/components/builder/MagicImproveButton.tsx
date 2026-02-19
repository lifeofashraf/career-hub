"use client";

import { useState, useEffect } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { useResumeStore } from "@/stores/resumeStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

export default function MagicImproveButton() {
    const { data, setResume, id, title, slug, isPublic, metadata } = useResumeStore();
    const [isLoading, setIsLoading] = useState(false);
    const [credits, setCredits] = useState<number | null>(null);
    const { isSignedIn } = useAuth();

    useEffect(() => {
        const fetchCredits = async () => {
            if (!isSignedIn) return;
            try {
                const res = await fetch("/api/user/credits");
                if (res.ok) {
                    const data = await res.json();
                    setCredits(data.credits);
                }
            } catch (error) {
                console.error("Failed to fetch credits", error);
            }
        };
        fetchCredits();
    }, [isSignedIn]);

    const handleOptimize = async () => {
        if (credits !== null && credits <= 0) {
            toast.error("You don't have enough credits for Magic Improve.");
            return;
        }

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
                if (result.credits !== undefined) {
                    setCredits(result.credits);
                }
                toast.success("Resume optimized successfully!");
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || "Failed to optimize resume. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const isOutOfCredits = credits !== null && credits <= 0;

    return (
        <button
            onClick={handleOptimize}
            disabled={isLoading || isOutOfCredits}
            className={cn(
                "btn-brutal w-full flex flex-col items-center justify-center gap-1 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all",
                isLoading && "opacity-80"
            )}
        >
            <div className="flex items-center justify-center gap-2">
                {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Sparkles className="w-4 h-4" />
                )}
                <span className="font-medium">
                    {isLoading ? "Optimizing..." : "Magic Improve"}
                </span>
            </div>
            {credits !== null && (
                <span className="text-xs opacity-70 font-medium">
                    {credits} credit{credits !== 1 ? 's' : ''} left
                </span>
            )}
        </button>
    );
}
