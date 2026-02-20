import React from "react";
import Link from "next/link";
import {
    FileText,
    Image as ImageIcon,
    FileArchive,
    Scissors,
    Merge,
    FileSymlink,
    Type,
    FileDigit,
    Zap
} from "lucide-react";

export default function OfficeToolsPage() {
    const tools = [
        {
            title: "Merge PDF",
            description: "Combine multiple PDFs into one unified document.",
            icon: Merge,
            color: "bg-red-500",
            href: "/office-tools/merge"
        },
        {
            title: "Split PDF",
            description: "Extract pages or split a PDF into smaller files.",
            icon: Scissors,
            color: "bg-orange-500",
            href: "/office-tools/split"
        },
        {
            title: "Compress PDF",
            description: "Reduce file size while optimizing for maximal quality.",
            icon: FileArchive,
            color: "bg-green-500",
            href: "/office-tools/compress"
        },
        {
            title: "PDF to Word",
            description: "Easily convert PDF files to editable DOCX format.",
            icon: FileText,
            color: "bg-blue-500",
            href: "/office-tools/pdf-to-word"
        },
        {
            title: "Word to PDF",
            description: "Convert your DOCX files to PDF format instantly.",
            icon: FileSymlink,
            color: "bg-blue-600",
            href: "#"
        },
        {
            title: "PDF to JPG",
            description: "Extract images or convert each page to a JPG.",
            icon: ImageIcon,
            color: "bg-yellow-500",
            href: "#"
        },
        {
            title: "OCR PDF",
            description: "Convert scanned PDFs to searchable and selectable text.",
            icon: Type,
            color: "bg-purple-500",
            href: "#"
        },
        {
            title: "Add Watermark",
            description: "Stamp an image or text over your PDF files.",
            icon: FileDigit,
            color: "bg-teal-500",
            href: "/office-tools/watermark"
        },
        {
            title: "AI Summarizer",
            description: "Use Magic AI to summarize long documents instantly.",
            icon: Zap,
            color: "bg-black",
            href: "/office-tools/summarize",
            badge: "Free"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight mb-4">
                    Office Tools
                </h1>
                <p className="text-gray-600 font-mono max-w-2xl mx-auto">
                    A suite of brutalist, lightning-fast utilities for all your document needs. No subscription required for basic tools.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool, idx) => (
                    <Link href={tool.href} key={idx} className="group block">
                        <div className="h-full border-4 border-black bg-white p-6 transition-all hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#000000] flex flex-col items-center text-center relative">
                            {tool.badge && (
                                <span className="absolute top-2 right-2 bg-[#a6ff00] text-black text-[10px] font-black uppercase px-2 py-1 border-2 border-black">
                                    {tool.badge}
                                </span>
                            )}
                            <div className={`w-16 h-16 ${tool.color} border-4 border-black flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform shadow-[4px_4px_0_0_#000000]`}>
                                <tool.icon className="w-8 h-8" strokeWidth={2.5} />
                            </div>
                            <h3 className="text-xl font-black uppercase mb-2">{tool.title}</h3>
                            <p className="text-sm text-gray-600 font-mono leading-relaxed">
                                {tool.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-16 border-4 border-black bg-[#a6ff00] p-8 text-center shadow-[8px_8px_0_0_#000000]">
                <h2 className="text-2xl font-black uppercase mb-4">Need more tools?</h2>
                <p className="font-mono mb-6">Let us know what utilities would supercharge your workflow.</p>
                <button className="btn-brutal bg-black text-white px-8 py-4 text-lg hover:bg-white hover:text-black">
                    Request a Tool
                </button>
            </div>
        </div>
    );
}
