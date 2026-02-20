"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FileUp, FileDown, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MergePdfPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [isMerging, setIsMerging] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files).filter((file) => file.type === "application/pdf");
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const moveFile = (index: number, direction: -1 | 1) => {
        if ((direction === -1 && index === 0) || (direction === 1 && index === files.length - 1)) return;
        const newFiles = [...files];
        const temp = newFiles[index];
        newFiles[index] = newFiles[index + direction];
        newFiles[index + direction] = temp;
        setFiles(newFiles);
    };

    const mergePdfs = async () => {
        if (files.length < 2) return;
        setIsMerging(true);

        try {
            const mergedPdf = await PDFDocument.create();

            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach((page) => mergedPdf.addPage(page));
            }

            const pdfBytes = await mergedPdf.save();
            const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "Merged_Document.pdf";
            link.click();
        } catch (error) {
            console.error("Error merging PDFs:", error);
            alert("Failed to merge PDFs. Please try again.");
        } finally {
            setIsMerging(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link href="/office-tools" className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tight mb-2">Merge PDF</h1>
            <p className="text-gray-600 dark:text-gray-400 font-mono mb-8">Combine multiple PDFs into one unified document.</p>

            <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-8 shadow-[8px_8px_0_0_#000000] dark:shadow-[8px_8px_0_0_#ffffff]">
                {/* Upload Area */}
                <div className="relative border-4 border-dashed border-black dark:border-white bg-[#a6ff00]/20 p-12 text-center hover:bg-[#a6ff00]/40 transition-colors mb-8 group cursor-pointer">
                    <input
                        type="file"
                        multiple
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-4 pointer-events-none">
                        <div className="bg-black text-[#a6ff00] p-4 rounded-full group-hover:scale-110 transition-transform">
                            <FileUp className="w-8 h-8" />
                        </div>
                        <p className="font-bold uppercase text-lg hidden sm:block">Select PDF files or drop them here</p>
                        <p className="font-bold uppercase text-lg sm:hidden">Tap to select PDF files</p>
                    </div>
                </div>

                {/* File List */}
                {files.length > 0 && (
                    <div className="space-y-4 mb-8">
                        <h3 className="font-bold uppercase text-sm border-b-2 border-black dark:border-white pb-2">Selected Files ({files.length})</h3>
                        {files.map((file, i) => (
                            <div key={i} className="flex items-center justify-between border-2 border-black dark:border-white p-3 bg-gray-50 dark:bg-zinc-800">
                                <span className="font-mono text-sm truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => moveFile(i, -1)}
                                        disabled={i === 0}
                                        className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-30"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => moveFile(i, 1)}
                                        disabled={i === files.length - 1}
                                        className="p-1 hover:bg-gray-200 dark:hover:bg-zinc-700 disabled:opacity-30"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => removeFile(i)}
                                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 ml-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end">
                    <button
                        onClick={mergePdfs}
                        disabled={files.length < 2 || isMerging}
                        className="btn-brutal bg-[#a6ff00] text-black px-8 py-4 text-lg hover:bg-black hover:text-[#a6ff00] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                    >
                        {isMerging ? (
                            <span className="animate-pulse">Merging...</span>
                        ) : (
                            <>
                                <FileDown className="w-5 h-5" /> Merge PDFs
                            </>
                        )}
                    </button>
                </div>
            </div>

            <p className="text-xs font-mono text-center text-gray-500 mt-6">Files are processed locally in your browser for total privacy.</p>
        </div>
    );
}
