"use client";

import { useState } from "react";
import { FileUp, Zap, ArrowLeft, Loader2, Copy, Check, FileText } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SummarizePage() {
    const [file, setFile] = useState<File | null>(null);
    const [isExtracting, setIsExtracting] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setSummary(null);
        }
    };

    const handleSummarize = async () => {
        if (!file) return;

        setIsExtracting(true);
        try {
            // 1. Extract Text
            const formData = new FormData();
            formData.append("file", file);

            const extractRes = await fetch("/api/office/extract-text", {
                method: "POST",
                body: formData,
            });

            if (!extractRes.ok) throw new Error("Failed to extract text from document.");
            const { text } = await extractRes.json();

            if (!text || text.trim().length < 50) {
                throw new Error("Document contains too little text to summarize.");
            }

            // 2. Summarize
            setIsExtracting(false);
            setIsSummarizing(true);

            const summarizeRes = await fetch("/api/office/summarize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: text }),
            });

            if (!summarizeRes.ok) throw new Error("AI summarization failed.");
            const { data } = await summarizeRes.json();

            setSummary(data);
            toast.success("Summary generated successfully!");
        } catch (error: any) {
            console.error("Summarize error:", error);
            toast.error(error.message || "An unexpected error occurred.");
        } finally {
            setIsExtracting(false);
            setIsSummarizing(false);
        }
    };

    const copyToClipboard = () => {
        if (!summary) return;
        navigator.clipboard.writeText(summary);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        toast.info("Copied to clipboard");
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link href="/office-tools" className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tight mb-2">AI Summarizer</h1>
            <p className="text-gray-600 dark:text-gray-400 font-mono mb-8">Transform long documents into clear, actionable insights in seconds.</p>

            <div className="grid grid-cols-1 gap-8">
                <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-8 shadow-[8px_8px_0_0_#000000] dark:shadow-[8px_8px_0_0_#ffffff]">
                    {!file ? (
                        <div className="relative border-4 border-dashed border-black dark:border-white bg-purple-500/10 p-12 text-center hover:bg-purple-500/20 transition-colors group cursor-pointer">
                            <input
                                type="file"
                                accept=".pdf,.docx,.txt"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-4 pointer-events-none">
                                <FileUp className="w-12 h-12 text-purple-600 group-hover:scale-110 transition-transform" />
                                <p className="font-bold uppercase">Click or Drag Document (PDF, DOCX, TXT)</p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-purple-100 dark:bg-zinc-800 border-2 border-black">
                                    <FileText className="w-8 h-8 text-purple-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-bold uppercase truncate max-w-[250px]">{file.name}</p>
                                    <p className="text-xs font-mono text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setFile(null)}
                                    className="px-4 py-2 text-xs font-bold uppercase border-2 border-black hover:bg-black hover:text-white transition-colors"
                                >
                                    Change File
                                </button>
                                <button
                                    onClick={handleSummarize}
                                    disabled={isExtracting || isSummarizing}
                                    className="btn-brutal bg-purple-600 text-white px-8 py-3 flex items-center gap-2"
                                >
                                    {isExtracting || isSummarizing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            {isExtracting ? "Extracting..." : "AI Thinking..."}
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-5 h-5 fill-white" /> Summarize Now
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {summary && (
                    <div className="border-4 border-black dark:border-white bg-[#a6ff00] p-8 shadow-[12px_12px_0_0_#000000] dark:shadow-[12px_12px_0_0_#ffffff] relative animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black uppercase italic tracking-tighter flex items-center gap-2">
                                <Zap className="w-6 h-6 fill-black" /> Magic Insights
                            </h2>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 bg-black text-white px-4 py-2 text-xs font-bold uppercase border-2 border-black hover:bg-white hover:text-black transition-all"
                            >
                                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? "Copied" : "Copy Summary"}
                            </button>
                        </div>

                        <div className="prose prose-zinc max-w-none font-medium text-black bg-white/50 p-6 border-2 border-black whitespace-pre-wrap leading-relaxed">
                            {summary}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <p className="text-[10px] uppercase font-black tracking-widest bg-black text-white px-2 py-1">
                                Generated by Resumate AI Engine v2.0
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-xs font-mono text-center text-gray-500 mt-12">
                Documents are processed securely and results are never stored on our servers.
            </p>
        </div>
    );
}
