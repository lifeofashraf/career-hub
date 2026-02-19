"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FileText, Loader2, Calendar, Trash2, Upload } from "lucide-react";
import { formatDate, generateId } from "@/lib/utils";
import { motion } from "framer-motion";
import ResumeUploader from "@/components/builder/ResumeUploader";
import { EXAMPLE_RESUME_DATA, EMPTY_RESUME_DATA } from "@/lib/example-data";

interface Resume {
    id: string;
    title: string;
    slug: string;
    updatedAt: string;
    isPublic: boolean;
}

export default function BuilderListPage() {
    const router = useRouter();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [showUploader, setShowUploader] = useState(false);

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const res = await fetch("/api/resumes");
            if (res.ok) {
                const data = await res.json();
                setResumes(data);
            }
        } catch (error) {
            console.error("Failed to fetch resumes", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateResume = async () => {
        setIsCreating(true);
        try {
            const res = await fetch("/api/resumes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: "Untitled Resume",
                    data: EMPTY_RESUME_DATA
                }),
            });

            if (res.ok) {
                const newResume = await res.json();
                router.push(`/builder/${newResume.id}`);
            }
        } catch (error: any) {
            console.error("Failed to create resume", error);
            alert(`Failed to create resume: ${error.message || "Unknown error"}`);
            setIsCreating(false);
        }
    };

    const handleDeleteResume = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this resume?")) return;

        try {
            const res = await fetch(`/api/resumes/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setResumes(resumes.filter((r) => r.id !== id));
            }
        } catch (error) {
            console.error("Failed to delete resume", error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading your resumes...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-foreground tracking-tight">My Resumes</h1>
                    <p className="text-muted-foreground mt-1">Create, import, and manage your CVs</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowUploader(!showUploader)}
                        className="neo-btn px-4 py-2.5 bg-card text-foreground text-sm font-bold flex items-center gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        Import PDF
                    </button>
                    <button
                        onClick={handleCreateResume}
                        disabled={isCreating}
                        className="neo-btn neo-btn-accent px-4 py-2.5 bg-primary text-primary-foreground text-sm font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCreating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        Create New
                    </button>
                </div>
            </div>

            {/* Resume Uploader (collapsible) */}
            <motion.div
                initial={false}
                animate={{
                    height: showUploader ? "auto" : 0,
                    opacity: showUploader ? 1 : 0,
                    marginBottom: showUploader ? 24 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
            >
                <ResumeUploader />
            </motion.div>

            {/* Resume Grid */}
            {resumes.length === 0 ? (
                <div className="text-center py-20 neo-card">
                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">No resumes yet</h3>
                    <p className="text-muted-foreground mb-6">Create a new resume or import an existing PDF</p>
                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() => setShowUploader(true)}
                            className="neo-btn px-6 py-2.5 bg-card text-foreground font-bold flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4" />
                            Import PDF
                        </button>
                        <button
                            onClick={handleCreateResume}
                            disabled={isCreating}
                            className="neo-btn neo-btn-accent px-6 py-2.5 bg-primary text-primary-foreground font-bold"
                        >
                            Create Resume
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resumes.map((resume) => (
                        <motion.div
                            key={resume.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group neo-card overflow-hidden cursor-pointer hover:translate-y-[-2px] hover:shadow-[6px_6px_0_theme(colors.border)] transition-all"
                            onClick={() => router.push(`/builder/${resume.id}`)}
                        >
                            {/* Preview Placeholder */}
                            <div className="h-40 bg-secondary/50 flex items-center justify-center border-b-2 border-border group-hover:bg-secondary/80 transition-colors">
                                <FileText className="w-10 h-10 text-muted-foreground/20" />
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-foreground truncate pr-4">
                                        {resume.title}
                                    </h3>
                                    <button
                                        onClick={(e) => handleDeleteResume(e, resume.id)}
                                        className="text-muted-foreground hover:text-destructive p-1.5 rounded-lg border-2 border-transparent hover:border-destructive/30 transition-all opacity-0 group-hover:opacity-100"
                                        title="Delete Resume"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(resume.updatedAt)}
                                    </span>
                                    {resume.isPublic && (
                                        <span className="neo-badge bg-neo-teal/10 border-neo-teal/30 text-neo-teal text-[10px] py-0.5 px-2">
                                            Public
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
