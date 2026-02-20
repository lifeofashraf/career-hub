"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FileUp, FileDown, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import JSZip from "jszip";

export default function SplitPdfPage() {
    const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState(0);
    const [isSplitting, setIsSplitting] = useState(false);
    const [pageRanges, setPageRanges] = useState<Record<number, boolean>>({});

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
                const arrayBuffer = await selectedFile.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer);
                const count = pdf.getPageCount();
                setPageCount(count);

                // Select all by default
                const initialRanges: Record<number, boolean> = {};
                for (let i = 0; i < count; i++) {
                    initialRanges[i] = true;
                }
                setPageRanges(initialRanges);
            }
        }
    };

    const togglePage = (index: number) => {
        setPageRanges(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const splitPdf = async () => {
        if (!file) return;
        setIsSplitting(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const sourcePdf = await PDFDocument.load(arrayBuffer);

            const zip = new JSZip();
            const selectedPages = Object.entries(pageRanges)
                .filter(([_, isSelected]) => isSelected)
                .map(([idx]) => parseInt(idx));

            if (selectedPages.length === 0) {
                alert("Please select at least one page to extract.");
                setIsSplitting(false);
                return;
            }

            for (const pageIndex of selectedPages) {
                const newPdf = await PDFDocument.create();
                const [copiedPage] = await newPdf.copyPages(sourcePdf, [pageIndex]);
                newPdf.addPage(copiedPage);

                const pdfBytes = await newPdf.save();
                zip.file(`page_${pageIndex + 1}.pdf`, pdfBytes);
            }

            // Generate zip file string
            const content = await zip.generateAsync({ type: "blob" });

            // Trigger download
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = `${file.name.replace(".pdf", "")}_extracted.zip`;
            link.click();
        } catch (error) {
            console.error("Error splitting PDF:", error);
            alert("Failed to split PDF. Please try again.");
        } finally {
            setIsSplitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link href="/office-tools" className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tight mb-2">Split PDF</h1>
            <p className="text-gray-600 dark:text-gray-400 font-mono mb-8">Extract pages from your PDF file into individual documents.</p>

            <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-8 shadow-[8px_8px_0_0_#000000] dark:shadow-[8px_8px_0_0_#ffffff]">
                {!file ? (
                    <div className="relative border-4 border-dashed border-black dark:border-white bg-[#ff6b6b]/20 p-12 text-center hover:bg-[#ff6b6b]/40 transition-colors mb-8 group cursor-pointer">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-4 pointer-events-none">
                            <div className="bg-black text-[#ff6b6b] p-4 rounded-full group-hover:scale-110 transition-transform">
                                <FileUp className="w-8 h-8" />
                            </div>
                            <p className="font-bold uppercase text-lg">Select PDF file</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-2 border-black dark:border-white p-4 bg-gray-50 dark:bg-zinc-800">
                            <div className="flex flex-col">
                                <span className="font-bold uppercase">{file.name}</span>
                                <span className="text-xs font-mono text-gray-500">{pageCount} pages</span>
                            </div>
                            <button
                                onClick={() => setFile(null)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 border-2 border-red-500"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold uppercase text-sm">Select Pages to Extract</h3>
                                <button
                                    onClick={() => {
                                        const newRanges: Record<number, boolean> = {};
                                        for (let i = 0; i < pageCount; i++) newRanges[i] = true;
                                        setPageRanges(newRanges);
                                    }}
                                    className="text-xs font-bold uppercase underline"
                                >
                                    Select All
                                </button>
                            </div>

                            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                                {Array.from({ length: pageCount }).map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => togglePage(i)}
                                        className={`h-12 border-2 text-sm font-bold flex items-center justify-center transition-colors ${pageRanges[i]
                                                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                : "border-gray-300 text-gray-400 hover:border-black"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t-2 border-black dark:border-white">
                            <button
                                onClick={splitPdf}
                                disabled={isSplitting || Object.values(pageRanges).every(v => !v)}
                                className="btn-brutal bg-[#ff6b6b] text-black px-8 py-4 text-lg hover:bg-black hover:text-[#ff6b6b] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                            >
                                {isSplitting ? (
                                    <span className="animate-pulse">Extracting...</span>
                                ) : (
                                    <>
                                        <FileDown className="w-5 h-5" /> Download ZIP
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-xs font-mono text-center text-gray-500 mt-6">Files are processed locally in your browser for total privacy.</p>
        </div>
    );
}
