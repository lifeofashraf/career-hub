import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Merge PDF | Resumate Office Tools",
    description: "Combine multiple PDF files into a single, unified document instantly in your browser. 100% free and private.",
    keywords: ["merge pdf", "combine pdf", "join pdf", "free merge tool", "local pdf editor"],
};

export default function MergePdfLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
