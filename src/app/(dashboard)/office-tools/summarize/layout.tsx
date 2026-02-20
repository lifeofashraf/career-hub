import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Document Summarizer | Resumate Office Tools",
    description: "Get instant, professional summaries of long PDFs, Word documents, and text files using advanced AI. Save time and extract key insights instantly.",
    keywords: ["ai summarizer", "pdf summary", "document summary ai", "summarize word doc", "extract insights from pdf"],
};

export default function SummarizerLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
