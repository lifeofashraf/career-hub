"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    X,
    GripVertical,
    ExternalLink,
    Building2,
    MoreHorizontal,
    Trash2,
    Edit3,
    Loader2,
    Sparkles,
    GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

// ============================================
// Types
// ============================================

interface JobApplication {
    id: string;
    company: string;
    position: string;
    url: string;
    status: string;
    notes: string;
    salary: string;
    appliedAt: string;
}

const statuses = [
    { id: "wishlist", label: "Wishlist", color: "border-zinc-500", bg: "bg-zinc-500/10", dot: "bg-zinc-400" },
    { id: "applied", label: "Applied", color: "border-blue-500", bg: "bg-blue-500/10", dot: "bg-blue-400" },
    { id: "interviewing", label: "Interviewing", color: "border-amber-500", bg: "bg-amber-500/10", dot: "bg-amber-400" },
    { id: "offer", label: "Offer", color: "border-emerald-500", bg: "bg-emerald-500/10", dot: "bg-emerald-400" },
    { id: "accepted", label: "Accepted", color: "border-violet-500", bg: "bg-violet-500/10", dot: "bg-violet-400" },
    { id: "rejected", label: "Rejected", color: "border-red-500", bg: "bg-red-500/10", dot: "bg-red-400" },
];

// ============================================
// Add Job Modal
// ============================================

function AddJobModal({
    isOpen,
    onClose,
    onAdd,
    isSubmitting
}: {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (job: Partial<JobApplication>) => void;
    isSubmitting: boolean;
}) {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("wishlist");
    const [salary, setSalary] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!company || !position) return;

        onAdd({
            company,
            position,
            url,
            status,
            salary,
            appliedAt: status !== "wishlist" ? new Date().toISOString() : "",
        });

        setCompany("");
        setPosition("");
        setUrl("");
        setStatus("wishlist");
        setSalary("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl"
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Add Application</h2>
                    <button onClick={onClose} className="p-1 hover:bg-card-hover rounded-lg transition-colors">
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Company *</label>
                        <input
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                            placeholder="Google, Stripe, etc."
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Position *</label>
                        <input
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                            placeholder="Software Engineer"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Job URL</label>
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                            placeholder="https://..."
                            type="url"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                            >
                                {statuses.map((s) => (
                                    <option key={s.id} value={s.id}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">Salary</label>
                            <input
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                                placeholder="$120k"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        Add Application
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

// ============================================
// Job Card
// ============================================

function JobCard({
    job,
    onDelete,
    onMove,
}: {
    job: JobApplication;
    onDelete: (id: string) => void;
    onMove: (id: string, status: string) => void;
}) {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="group p-4 bg-card rounded-xl border border-border hover:border-border/80 transition-all cursor-grab"
        >
            <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-card-hover flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold leading-tight">{job.position}</h4>
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1 opacity-0 group-hover:opacity-100 hover:bg-card-hover rounded-lg transition-all"
                    >
                        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-8 z-20 w-48 bg-card border border-border rounded-xl shadow-2xl py-1">
                            {statuses.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => { onMove(job.id, s.id); setShowMenu(false); }}
                                    className="w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-card-hover hover:text-foreground flex items-center gap-2"
                                >
                                    <div className={cn("w-2 h-2 rounded-full", s.dot)} />
                                    Move to {s.label}
                                </button>
                            ))}
                            <div className="border-t border-border my-1" />
                            <button
                                onClick={() => { onDelete(job.id); setShowMenu(false); }}
                                className="w-full px-4 py-2 text-left text-sm text-danger hover:bg-danger/10 flex items-center gap-2"
                            >
                                <Trash2 className="w-3 h-3" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {job.salary && (
                <span className="inline-block text-xs text-muted-foreground bg-card-hover px-2 py-0.5 rounded-md mb-2">
                    {job.salary}
                </span>
            )}

            {job.url && (
                <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-accent hover:underline"
                >
                    <ExternalLink className="w-3 h-3" /> View Listing
                </a>
            )}
        </motion.div>
    );
}

// ============================================
// Kanban Column
// ============================================

function KanbanColumn({
    status,
    jobs,
    onDelete,
    onMove,
}: {
    status: (typeof statuses)[0];
    jobs: JobApplication[];
    onDelete: (id: string) => void;
    onMove: (id: string, newStatus: string) => void;
}) {
    return (
        <div className="flex-1 min-w-[280px]">
            <div className="flex items-center gap-2 mb-4 px-1">
                <div className={cn("w-2.5 h-2.5 rounded-full", status.dot)} />
                <h3 className="text-sm font-semibold text-foreground">{status.label}</h3>
                <span className="text-xs text-muted bg-card-hover px-2 py-0.5 rounded-full">
                    {jobs.length}
                </span>
            </div>

            <div className={cn("space-y-3 p-3 rounded-2xl min-h-[200px] border border-dashed", status.color, status.bg)}>
                <AnimatePresence>
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} onDelete={onDelete} onMove={onMove} />
                    ))}
                </AnimatePresence>

                {jobs.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground py-8 italic">
                        No applications here yet
                    </p>
                )}
            </div>
        </div>
    );
}

// ============================================
// Main Tracker Page
// ============================================

export default function TrackerPage() {
    const [jobs, setJobs] = useState<JobApplication[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/jobs");
            if (res.ok) {
                const data = await res.json();
                setJobs(data);
            }
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setIsLoading(false);
        }
    };

    const addJob = async (jobData: Partial<JobApplication>) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData),
            });
            if (res.ok) {
                const newJob = await res.json();
                setJobs((prev) => [newJob, ...prev]);
                setShowAddModal(false);
            }
        } catch (error) {
            console.error("Failed to add job", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteJob = async (id: string) => {
        // Optimistic update
        const previousJobs = [...jobs];
        setJobs((prev) => prev.filter((j) => j.id !== id));

        try {
            const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete");
        } catch (error) {
            console.error("Error deleting job", error);
            setJobs(previousJobs); // Revert
            alert("Failed to delete job");
        }
    };

    const moveJob = async (id: string, newStatus: string) => {
        // Optimistic update
        const previousJobs = [...jobs];
        setJobs((prev) =>
            prev.map((j) => (j.id === id ? { ...j, status: newStatus } : j))
        );

        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error("Failed to update status");
        } catch (error) {
            console.error("Error moving job", error);
            setJobs(previousJobs); // Revert
            alert("Failed to move job");
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
                <p className="text-muted-foreground">Loading your job board...</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8">
            {/* Header */}
            <RevealOnScroll>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Job Tracker</h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Track every application from wishlist to offer
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-semibold rounded-xl transition-all duration-300"
                    >
                        <Plus className="w-4 h-4" />
                        Add Application
                    </button>
                </div>
            </RevealOnScroll>

            {/* Kanban Board */}
            <RevealOnScroll delay={0.1} width="100%">
                <div className="flex gap-4 overflow-x-auto pb-4 mb-4">
                    {statuses.map((status) => (
                        <KanbanColumn
                            key={status.id}
                            status={status}
                            jobs={jobs.filter((j) => j.status === status.id)}
                            onDelete={deleteJob}
                            onMove={moveJob}
                        />
                    ))}
                </div>
            </RevealOnScroll>

            {/* Affiliate Banner */}
            <RevealOnScroll delay={0.2} width="100%">
                <div className="mt-8 p-1 rounded-2xl bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-blue-500/20">
                    <div className="bg-card/90 backdrop-blur-sm p-6 rounded-xl flex items-center justify-between gap-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <GraduationCap className="w-32 h-32 -rotate-12" />
                        </div>

                        <div className="flex items-center gap-5 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                                <GraduationCap className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="text-base font-semibold text-foreground mb-1">
                                    Missing a key skill for your dream job?
                                </h4>
                                <p className="text-sm text-muted-foreground max-w-xl">
                                    Don't let a missing requirement hold you back. Earn industry-recognized certificates from top universities and companies on Coursera.
                                </p>
                            </div>
                        </div>
                        <a
                            href="https://coursera.org"
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/20 relative z-10"
                        >
                            Browse Courses <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </RevealOnScroll>

            {/* Add Job Modal */}
            <AddJobModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={addJob}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
