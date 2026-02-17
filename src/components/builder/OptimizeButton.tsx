"use client";

import { useState } from "react";
import { Sparkles, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptimizeButtonProps {
    section: "summary" | "work" | "projects";
    content: any;
    onOptimized: (data: any) => void;
    label?: string;
}

export default function OptimizeButton({
    section,
    content,
    onOptimized,
    label = "Optimize with AI",
}: OptimizeButtonProps) {
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [error, setError] = useState("");

    const handleOptimize = async () => {
        setIsOptimizing(true);
        setError("");
        setIsDone(false);

        try {
            const res = await fetch("/api/resume-optimizer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ section, content }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Optimization failed");
            }

            const result = await res.json();

            if (result.success && result.data) {
                onOptimized(result.data);
                setIsDone(true);
                setTimeout(() => setIsDone(false), 2000);
            } else {
                throw new Error("No optimized data returned");
            }
        } catch (err: any) {
            console.error("[OPTIMIZE]", err);
            setError(err.message || "Failed to optimize");
            setTimeout(() => setError(""), 3000);
        } finally {
            setIsOptimizing(false);
        }
    };

    return (
        <div className="inline-flex items-center gap-2">
            <button
                onClick={handleOptimize}
                disabled={isOptimizing}
                className={cn(
                    "glass-btn inline-flex items-center gap-2 px-3 py-1.5 text-xs font-bold transition-all duration-300",
                    isDone
                        ? "border-emerald-500/50 text-emerald-300 bg-emerald-500/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                        : error
                            ? "border-rose-500/50 text-rose-300 bg-rose-500/10"
                            : "hover:bg-white/10 hover:border-white/20 active:scale-95",
                    isOptimizing && "opacity-80 cursor-wait"
                )}
            >
                {isOptimizing ? (
                    <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Optimizing...</span>
                    </>
                ) : isDone ? (
                    <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Done!</span>
                    </>
                ) : error ? (
                    <span>{error}</span>
                ) : (
                    <>
                        <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                        <span className="gradient-text bg-gradient-to-r from-violet-200 to-pink-200">{label}</span>
                    </>
                )}
            </button>
        </div>
    );
}
