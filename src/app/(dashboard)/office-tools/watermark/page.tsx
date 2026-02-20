"use client";

import { useState } from "react";
import { FileUp, Type, Settings, Download, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";

export default function WatermarkPage() {
    const [file, setFile] = useState<File | null>(null);
    const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
    const [opacity, setOpacity] = useState(0.3);
    const [fontSize, setFontSize] = useState(50);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const addWatermark = async () => {
        if (!file) return;
        setIsProcessing(true);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
            const pages = pdfDoc.getPages();

            for (const page of pages) {
                const { width, height } = page.getSize();

                page.drawText(watermarkText, {
                    x: width / 4,
                    y: height / 4,
                    size: fontSize,
                    font: font,
                    color: rgb(0.5, 0.5, 0.5),
                    opacity: opacity,
                    rotate: degrees(45), // Using degrees helper for simplicity and type safety
                });
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `watermarked_${file.name}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error adding watermark:", error);
            alert("Failed to add watermark. Please try another file.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <Link href="/office-tools" className="inline-flex items-center gap-2 mb-6 text-sm font-bold uppercase hover:underline">
                <ArrowLeft className="w-4 h-4" /> Back to Tools
            </Link>

            <h1 className="text-3xl font-black text-black dark:text-white uppercase tracking-tight mb-2">Add Watermark</h1>
            <p className="text-gray-600 dark:text-gray-400 font-mono mb-8">Protect your documents with a custom text watermark.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-8 shadow-[8px_8px_0_0_#000000] dark:shadow-[8px_8px_0_0_#ffffff] min-h-[300px] flex flex-col justify-center">
                        {!file ? (
                            <div className="relative border-4 border-dashed border-black dark:border-white bg-teal-500/10 p-12 text-center hover:bg-teal-500/20 transition-colors group cursor-pointer">
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="flex flex-col items-center gap-4 pointer-events-none">
                                    <FileUp className="w-12 h-12 text-teal-500 group-hover:scale-110 transition-transform" />
                                    <p className="font-bold uppercase">Click or Drag PDF to Watermark</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center">
                                <div className="border-2 border-black dark:border-white p-6 bg-gray-50 dark:bg-zinc-800 inline-block w-full mb-6">
                                    <Type className="w-12 h-12 mx-auto mb-4 text-teal-500" />
                                    <p className="font-bold uppercase truncate">{file.name}</p>
                                    <p className="text-xs font-mono text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                                <button
                                    onClick={() => setFile(null)}
                                    className="text-xs font-bold uppercase text-red-500 hover:underline"
                                >
                                    Remove File
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-6 shadow-[4px_4px_0_0_#000000] dark:shadow-[4px_4px_0_0_#ffffff]">
                        <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                            <Settings className="w-4 h-4" /> Settings
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Watermark Text</label>
                                <input
                                    type="text"
                                    value={watermarkText}
                                    onChange={(e) => setWatermarkText(e.target.value)}
                                    className="w-full border-2 border-black p-2 font-mono text-sm focus:outline-none focus:shadow-[2px_2px_0_0_#000000]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Opacity: {opacity}</label>
                                <input
                                    type="range"
                                    min="0.1"
                                    max="1"
                                    step="0.1"
                                    value={opacity}
                                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                    className="w-full accent-teal-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase mb-1">Font Size: {fontSize}</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="150"
                                    value={fontSize}
                                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                                    className="w-full accent-teal-500"
                                />
                            </div>
                        </div>

                        <button
                            onClick={addWatermark}
                            disabled={!file || isProcessing}
                            className="w-full mt-6 btn-brutal bg-teal-500 text-white py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {isProcessing ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <Download className="w-5 h-5" /> Download
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <p className="text-xs font-mono text-center text-gray-500 mt-8">
                Processing is done entirely in your browser. Your files never leave your device.
            </p>
        </div>
    );
}
