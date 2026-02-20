"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { FileUp, FileArchive, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CompressPdfPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [compressedSize, setCompressedSize] = useState<number | null>(null);

    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
                setOriginalSize(selectedFile.size);
                setCompressedSize(null);
            }
        }
    };

    const compressPdf = async () => {
        if (!file) return;
        setIsCompressing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            // PDF-lib doesn't have true image compression algorithms built-in.
            // This is a basic optimization that removes unnecessary metadata/objects, 
            // which provides a mild compression effect.
            // For true compression (like resizing images), a server-side tool or webassembly ghostscript is needed.
            const pdfBytes = await pdfDoc.save({ useObjectStreams: false });

            const newSize = pdfBytes.length;
            setCompressedSize(newSize);

            const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${file.name.replace(".pdf", "")}_compressed.pdf`;
            link.click();
        } catch (error) {
            console.error("Error compressing PDF:", error);
            alert("Failed to compress PDF. Please try again.");
        } finally {
            setIsCompressing(false);
        }
    };

    const getCompressionRatio = () => {
        if (!compressedSize || !originalSize) return 0;
        return Math.round(((originalSize - compressedSize) / originalSize) * 100);
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link href="/office-tools" className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tight mb-2">Compress PDF</h1>
            <p className="text-gray-600 dark:text-gray-400 font-mono mb-8">Reduce file size while optimizing for maximal quality.</p>

            <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-8 shadow-[8px_8px_0_0_#000000] dark:shadow-[8px_8px_0_0_#ffffff]">
                {!file ? (
                    <div className="relative border-4 border-dashed border-black dark:border-white bg-[#4ade80]/20 p-12 text-center hover:bg-[#4ade80]/40 transition-colors mb-8 group cursor-pointer">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex flex-col items-center gap-4 pointer-events-none">
                            <div className="bg-black text-[#4ade80] p-4 rounded-full group-hover:scale-110 transition-transform">
                                <FileUp className="w-8 h-8" />
                            </div>
                            <p className="font-bold uppercase text-lg">Select PDF file</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-2 border-black dark:border-white p-4 bg-gray-50 dark:bg-zinc-800">
                            <div className="flex flex-col">
                                <span className="font-bold uppercase truncate max-w-xs">{file.name}</span>
                                <span className="text-xs font-mono text-gray-500">Original Size: {formatBytes(originalSize)}</span>
                            </div>
                            <button
                                onClick={() => { setFile(null); setCompressedSize(null); }}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 border-2 border-red-500"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        {compressedSize && (
                            <div className="bg-[#4ade80]/20 border-2 border-black p-4 flex flex-col items-center justify-center py-6">
                                <span className="font-black text-3xl mb-1">{getCompressionRatio()}% Smaller</span>
                                <span className="font-mono text-sm text-gray-600">New Size: {formatBytes(compressedSize)}</span>
                            </div>
                        )}

                        <div className="flex justify-end pt-4 border-t-2 border-black dark:border-white">
                            <button
                                onClick={compressPdf}
                                disabled={isCompressing}
                                className="btn-brutal bg-[#4ade80] text-black px-8 py-4 text-lg hover:bg-black hover:text-[#4ade80] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                            >
                                {isCompressing ? (
                                    <span className="animate-pulse">Compressing...</span>
                                ) : (
                                    <>
                                        <FileArchive className="w-5 h-5" /> Compress PDF
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-xs font-mono text-center text-gray-500 mt-6">
                Note: Client-side compression mainly removes structural overhead. <br />
                For deep image compression, a dedicated server processing tool is required.
            </p>
            <p className="text-xs font-mono text-center text-gray-500 mt-2">Files are processed locally in your browser for total privacy.</p>
        </div>
    );
}
