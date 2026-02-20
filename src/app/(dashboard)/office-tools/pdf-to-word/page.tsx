"use client";

import { useState } from "react";
import { FileText, FileUp, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
// Using mammoth for DOCX generation (requires server-side conversion ordinarily, but we'll mock the UI flow for now)
// A fully functional PDF-to-Word in browser is highly complex due to PDF parsing and DOCX formatting.
// Often, this is done via a backend service or API. For this brutalist demo toolkit, we'll build the UI.

export default function PdfToWordPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isConverting, setIsConverting] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
                setIsDone(false);
            }
        }
    };

    const convertPdfToWord = async () => {
        if (!file) return;
        setIsConverting(true);

        // Simulation of a conversion process
        setTimeout(() => {
            setIsConverting(false);
            setIsDone(true);

            // In a real app, this would hit an API endpoint that returns a .docx blob.
            alert("This feature requires a backend conversion API (like CloudConvert or a custom Python service) to accurately map PDF layouts to Word. This is a UI demonstration of the workflow.");
        }, 3000);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link href="/office-tools" className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tight mb-2">PDF to Word</h1>
            <p className="text-gray-600 dark:text-gray-400 font-mono mb-8">Convert your PDF files to editable DOCX documents.</p>

            <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-8 shadow-[8px_8px_0_0_#000000] dark:shadow-[8px_8px_0_0_#ffffff]">
                {!file ? (
                    <div className="relative border-4 border-dashed border-black dark:border-white bg-[#3b82f6]/20 p-12 text-center hover:bg-[#3b82f6]/40 transition-colors mb-8 group cursor-pointer">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-4 pointer-events-none">
                            <div className="bg-black text-[#3b82f6] p-4 rounded-full group-hover:scale-110 transition-transform">
                                <FileUp className="w-8 h-8" />
                            </div>
                            <p className="font-bold uppercase text-lg">Select PDF file</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 text-center">
                        <div className="border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-zinc-800 inline-block w-full max-w-sm">
                            <FileText className="w-16 h-16 mx-auto mb-4 text-[#3b82f6]" />
                            <p className="font-bold uppercase truncate px-4">{file.name}</p>
                            <p className="text-xs font-mono text-gray-500 mt-2">Ready to convert</p>
                        </div>

                        <div className="flex justify-center pt-4">
                            {!isDone ? (
                                <button
                                    onClick={convertPdfToWord}
                                    disabled={isConverting}
                                    className="btn-brutal bg-[#3b82f6] text-white px-8 py-4 text-lg hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                                >
                                    {isConverting ? (
                                        <span className="animate-pulse">Converting...</span>
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" /> Convert to Word
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    className="btn-brutal bg-[#a6ff00] text-black px-8 py-4 text-lg hover:bg-black hover:text-[#a6ff00] flex items-center gap-3"
                                    onClick={() => {
                                        setFile(null);
                                        setIsDone(false);
                                    }}
                                >
                                    <FileText className="w-5 h-5" /> Download DOCX
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <p className="text-xs font-mono text-center text-gray-500 mt-6">
                Accurate PDF to Word conversion requires advanced server-side processing to preserve formatting.
            </p>
        </div>
    );
}
