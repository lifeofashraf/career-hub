import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add Watermark to PDF | Resumate Office Tools",
    description: "Secure your documents by adding custom text watermarks to your PDFs locally in your browser. Free, private, and customizable.",
    keywords: ["pdf watermark", "add text to pdf", "watermark pdf online", "secure pdf", "confidential stamp pdf"],
};

export default function WatermarkLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
