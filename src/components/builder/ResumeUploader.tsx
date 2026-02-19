"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Upload,
    FileText,
    Loader2,
    CheckCircle,
    AlertCircle,
    Sparkles,
    X,
} from "lucide-react";

type UploadState = "idle" | "dragging" | "uploading" | "parsing" | "success" | "error";

const stateConfig = {
    idle: { icon: Upload, text: "Drop your resume PDF here", sub: "or click to browse" },
    dragging: { icon: FileText, text: "Drop it!", sub: "We'll take it from here" },
    uploading: { icon: Loader2, text: "Uploading...", sub: "Sending your resume" },
    parsing: { icon: Sparkles, text: "AI is reading your resume...", sub: "Extracting skills, experience & more" },
    success: { icon: CheckCircle, text: "Parsed successfully!", sub: "Creating your resume..." },
    error: { icon: AlertCircle, text: "Something went wrong", sub: "" },
};

export default function ResumeUploader() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState<UploadState>("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [fileName, setFileName] = useState("");

    const handleFile = useCallback(async (file: File) => {
        if (file.type !== "application/pdf") {
            setState("error");
            setErrorMessage("Only PDF files are supported");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setState("error");
            setErrorMessage("File must be under 5MB");
            return;
        }

        setFileName(file.name);
        setState("uploading");

        try {
            // Step 1: Upload & parse with AI
            const formData = new FormData();
            formData.append("file", file);

            setState("parsing");
            const parseRes = await fetch("/api/resume-parser", {
                method: "POST",
                body: formData,
            });

            if (!parseRes.ok) {
                let errorMsg = "Failed to parse resume";
                try {
                    const err = await parseRes.json();
                    errorMsg = err.error || errorMsg;
                } catch {
                    const text = await parseRes.text();
                    if (text) errorMsg = text;
                }
                throw new Error(errorMsg);
            }

            const parseData = await parseRes.json();

            if (!parseData.success || !parseData.data) {
                throw new Error("AI could not extract resume data");
            }

            // Step 2: Create resume in DB with parsed data
            setState("success");
            const title = parseData.data.basics?.name
                ? `${parseData.data.basics.name}'s Resume`
                : "Imported Resume";

            const createRes = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    data: parseData.data,
                }),
            });

            if (!createRes.ok) {
                let errorMsg = "Failed to create resume";
                try {
                    const err = await createRes.json();
                    errorMsg = err.error || errorMsg;
                } catch {
                    const text = await createRes.text();
                    if (text) errorMsg = text;
                }
                throw new Error(errorMsg);
            }

            const newResume = await createRes.json();

            // Brief pause to show success state
            await new Promise((r) => setTimeout(r, 800));
            router.push(`/builder/${newResume.id}`);
        } catch (err: any) {
            console.error("[RESUME_UPLOAD]", err);
            setState("error");
            setErrorMessage(err.message || "An unexpected error occurred");
        }
    }, [router]);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setState("idle");
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setState("dragging");
    }, []);

    const handleDragLeave = useCallback(() => {
        setState("idle");
    }, []);

    const handleClick = useCallback(() => {
        if (state === "idle" || state === "error") {
            fileInputRef.current?.click();
        }
    }, [state]);

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
        },
        [handleFile]
    );

    const reset = useCallback(() => {
        setState("idle");
        setErrorMessage("");
        setFileName("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    }, []);

    const isProcessing = state === "uploading" || state === "parsing" || state === "success";
    const config = stateConfig[state];
    const Icon = config.icon;

    return (
        <div className="relative">
            <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileInput}
                className="hidden"
            />

            <motion.div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleClick}
                className={`
                    neo-card relative overflow-hidden cursor-pointer
                    transition-all duration-300
                    ${state === "dragging"
                        ? "border-primary shadow-[6px_6px_0_theme(colors.primary/0.3)] scale-[1.01]"
                        : state === "error"
                            ? "border-destructive shadow-[4px_4px_0_theme(colors.destructive/0.3)]"
                            : state === "success"
                                ? "border-neo-teal shadow-[4px_4px_0_theme(colors.neo-teal/0.3)]"
                                : ""
                    }
                    ${isProcessing ? "pointer-events-none" : ""}
                `}
                whileHover={!isProcessing ? { y: -2, boxShadow: "6px 6px 0 var(--color-border)" } : {}}
                whileTap={!isProcessing ? { y: 0, boxShadow: "2px 2px 0 var(--color-border)" } : {}}
            >
                {/* Background gradient for states */}
                <AnimatePresence>
                    {state === "parsing" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-neo-teal/5"
                        />
                    )}
                </AnimatePresence>

                <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center gap-4">
                    {/* Icon */}
                    <div className={`
                        p-4 rounded-2xl border-2 transition-all duration-300
                        ${state === "dragging"
                            ? "bg-primary/15 border-primary/40 text-primary shadow-[3px_3px_0_theme(colors.primary/0.2)]"
                            : state === "error"
                                ? "bg-destructive/15 border-destructive/40 text-destructive"
                                : state === "success"
                                    ? "bg-neo-teal/15 border-neo-teal/40 text-neo-teal shadow-[3px_3px_0_theme(colors.neo-teal/0.2)]"
                                    : "bg-card border-border"
                        }
                    `}>
                        <Icon className={`w-8 h-8 ${isProcessing && state !== "success" ? "animate-spin" : ""}`} />
                    </div>

                    {/* Text */}
                    <div>
                        <p className="text-base font-bold text-foreground mb-1">
                            {config.text}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {state === "error" ? errorMessage : config.sub}
                        </p>
                    </div>

                    {/* File name badge */}
                    {fileName && state !== "idle" && (
                        <div className="neo-badge bg-card border-border text-foreground text-xs">
                            <FileText className="w-3 h-3 mr-1.5" />
                            {fileName}
                        </div>
                    )}

                    {/* Error reset */}
                    {state === "error" && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                reset();
                            }}
                            className="neo-btn px-4 py-2 bg-card text-foreground text-sm font-bold flex items-center gap-2"
                        >
                            <X className="w-3.5 h-3.5" />
                            Try Again
                        </button>
                    )}

                    {/* Idle hint */}
                    {state === "idle" && (
                        <div className="flex items-center gap-3 text-xs text-muted-foreground/60">
                            <span>PDF only</span>
                            <span>•</span>
                            <span>Max 5MB</span>
                            <span>•</span>
                            <span>AI-powered</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
