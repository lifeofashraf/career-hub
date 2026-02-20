import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Split PDF | Resumate Office Tools",
    description: "Extract individual pages or split an entire PDF into smaller documents locally in your browser. Free, secure, and fast.",
    keywords: ["split pdf", "extract pages pdf", "divide pdf", "pdf separator", "free document split"],
};

export default function SplitPdfLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
