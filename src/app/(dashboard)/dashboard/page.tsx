"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    LayoutGrid,
    List,
    Search,
    Plus,
    ChevronDown,
    MoreHorizontal,
    FileText,
    CheckCircle2,
    FileEdit,
    Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { formatDate, generateId } from "@/lib/utils";
import { EXAMPLE_RESUME_DATA, EMPTY_RESUME_DATA } from "@/lib/example-data";

interface Resume {
    id: string;
    title: string;
    updatedAt: string;
    isPublic: boolean;
    status?: "completed" | "draft"; // Mock status for UI
}

export default function DashboardPage() {
    const router = useRouter();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await fetch("/api/resumes");
                if (res.ok) {
                    const data = await res.json();
                    // Mock add status for demo
                    const enrichedData = data.map((r: any) => ({
                        ...r,
                        status: Math.random() > 0.5 ? "completed" : "draft"
                    }));
                    setResumes(enrichedData);
                }
            } catch (error) {
                console.error("Failed to fetch resumes", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchResumes();
    }, []);

    const handleCreateResume = async () => {
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
        } catch (error) {
            console.error("Failed to create resume", error);
        }
    };

    const handleDeleteResume = async (e: React.MouseEvent, resumeId: string) => {
        e.stopPropagation(); // Prevent card click
        if (!confirm("Are you sure you want to delete this resume? This action cannot be undone.")) return;

        try {
            const res = await fetch(`/api/resumes/${resumeId}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setResumes(prev => prev.filter(r => r.id !== resumeId));
                toast.success("Resume deleted");
            } else {
                toast.error("Failed to delete resume");
            }
        } catch (error) {
            console.error("Failed to delete resume", error);
            toast.error("Error deleting resume");
        }
    };

    const stats = {
        total: resumes.length,
        completed: resumes.filter(r => r.status === "completed").length,
        drafts: resumes.filter(r => r.status === "draft").length
    };

    const filteredResumes = resumes.filter(r =>
        r.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#F5F5F5] font-sans text-black p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6 border-b-2 border-black pb-6">
                <h1 className="text-3xl font-black uppercase tracking-tighter">My Resumes</h1>

                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    <div className="relative border-2 border-black bg-white group hover:shadow-[2px_2px_0_0_#000000] transition-shadow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                        <input
                            type="text"
                            placeholder="SEARCH ARCHIVES..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 w-full md:w-64 bg-transparent outline-none font-mono text-xs uppercase placeholder:text-gray-400"
                        />
                    </div>

                    <button
                        onClick={handleCreateResume}
                        className="flex items-center gap-2 bg-black text-white px-5 py-2 border-2 border-black hover:bg-white hover:text-black hover:shadow-[2px_2px_0_0_#000000] transition-all font-bold uppercase tracking-wider text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Create New
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {/* Total Documents */}
                <div className="bg-white border-4 border-black p-4 relative shadow-[4px_4px_0_0_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000000] transition-all">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Total Documents</span>
                        <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-4xl font-black tracking-tighter">{stats.total.toString().padStart(2, '0')}</span>
                </div>

                {/* Completed */}
                <div className="bg-black text-white border-4 border-black p-4 relative shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,0.2)] transition-all">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider">Completed</span>
                        <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <span className="text-4xl font-black tracking-tighter">{stats.completed.toString().padStart(2, '0')}</span>
                </div>

                {/* Drafts */}
                <div className="bg-white border-4 border-black p-4 relative shadow-[4px_4px_0_0_#000000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000000] transition-all">
                    <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Drafts</span>
                        <FileEdit className="w-4 h-4" />
                    </div>
                    <span className="text-4xl font-black tracking-tighter">{stats.drafts.toString().padStart(2, '0')}</span>
                </div>
            </div>

            {/* Controls Row */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4 border-t-2 border-black pt-6">
                <h2 className="text-xl font-black uppercase tracking-tight">Recent Documents</h2>

                <div className="flex items-center gap-3">
                    <div className="flex border-2 border-black bg-white">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1.5 transition-colors ${viewMode === "grid" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <div className="w-[2px] bg-black"></div>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-1.5 transition-colors ${viewMode === "list" ? "bg-black text-white" : "hover:bg-gray-100"}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>

                    <button className="flex items-center gap-2 px-3 py-1.5 border-2 border-black bg-white font-bold uppercase text-xs hover:shadow-[2px_2px_0_0_#000000] transition-shadow">
                        Last Modified
                        <ChevronDown className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Content Grid */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" : "flex flex-col gap-3"}>

                {/* Create New Card */}
                {viewMode === "grid" && (
                    <button
                        onClick={handleCreateResume}
                        className="group flex flex-col items-center justify-center aspect-[3/4] border-4 border-black bg-white relative overflow-hidden hover:shadow-[4px_4px_0_0_#000000] transition-all cursor-pointer"
                    >
                        {/* Dotted Pattern Background */}
                        <div
                            className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}
                        />

                        <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Plus className="w-6 h-6" />
                            </div>
                            <div className="text-center">
                                <span className="block text-lg font-black uppercase tracking-wide mb-1">Create New</span>
                                <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest">Start From Scratch</span>
                            </div>
                        </div>
                    </button>
                )}

                {/* Resume Cards */}
                <AnimatePresence>
                    {filteredResumes.map((resume) => (
                        viewMode === "grid" ? (
                            <motion.div
                                key={resume.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => router.push(`/builder/${resume.id}`)}
                                className="group flex flex-col border-4 border-black bg-white hover:translate-y-[-2px] hover:shadow-[4px_4px_0_0_#000000] transition-all cursor-pointer"
                            >
                                {/* Preview Area */}
                                <div className="aspect-[3/4] bg-gray-100 border-b-4 border-black relative p-4 flex items-center justify-center overflow-hidden">
                                    {/* Mock Document Preview */}
                                    <div className="w-full h-full bg-white shadow-sm flex flex-col p-3 text-[3px] leading-tight text-gray-300 select-none overflow-hidden relative transform group-hover:scale-105 transition-transform duration-500">
                                        <div className="w-1/3 h-1.5 bg-black mb-2 opacity-20"></div>
                                        <div className="w-2/3 h-1 bg-black mb-1 opacity-10"></div>
                                        <div className="w-full h-1 bg-black mb-1 opacity-10"></div>
                                        <div className="w-full h-1 bg-black mb-3 opacity-10"></div>

                                        <div className="w-1/4 h-1.5 bg-black mb-2 opacity-20"></div>
                                        <div className="space-y-1">
                                            {[...Array(10)].map((_, i) => (
                                                <div key={i} className="w-full h-0.5 bg-black opacity-10"></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Edit Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                        <div className="bg-black text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                            Edit Resume
                                        </div>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="p-3 flex flex-col justify-between flex-1 bg-white">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-1.5 py-0.5 border border-black text-[9px] font-bold uppercase tracking-wider ${resume.status === 'completed'
                                            ? 'bg-black text-white'
                                            : 'bg-white text-black'
                                            }`}>
                                            {resume.status || 'Draft'}
                                        </span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="p-1 hover:bg-gray-100 rounded-sm" onClick={(e) => e.stopPropagation()}>
                                                    <MoreHorizontal className="w-3 h-3" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={(e: React.MouseEvent) => handleDeleteResume(e, resume.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    <div>
                                        <h3 className="font-black text-base uppercase leading-tight mb-1 line-clamp-2">
                                            {resume.title}
                                        </h3>
                                        <p className="text-[9px] font-mono text-gray-500 uppercase tracking-wide border-t border-dashed border-gray-300 pt-2">
                                            Edited {formatDate(resume.updatedAt)}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={resume.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => router.push(`/builder/${resume.id}`)}
                                className="flex items-center justify-between border-2 border-black bg-white p-3 hover:shadow-[2px_2px_0_0_#000000] transition-all cursor-pointer group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 border-2 border-black flex items-center justify-center bg-gray-50 text-black">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-black uppercase text-base group-hover:underline decoration-2 underline-offset-2">
                                            {resume.title}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-[9px] font-bold uppercase px-1 border border-black ${resume.status === 'completed' ? 'bg-black text-white' : 'bg-white text-black'
                                                }`}>
                                                {resume.status || 'Draft'}
                                            </span>
                                            <span className="text-[10px] font-mono text-gray-500 uppercase">
                                                Edited {formatDate(resume.updatedAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black">
                                        <FileEdit className="w-3.5 h-3.5" />
                                    </button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="p-1.5 hover:bg-black hover:text-white transition-colors border border-transparent hover:border-black" onClick={(e) => e.stopPropagation()}>
                                                <MoreHorizontal className="w-3.5 h-3.5" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={(e: React.MouseEvent) => handleDeleteResume(e, resume.id)} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
