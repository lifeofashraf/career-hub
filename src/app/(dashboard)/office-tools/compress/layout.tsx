import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compress PDF | Resumate Office Tools",
    description: "Reduce PDF file sizes safely. Strip out bloat, metadata, and overhead without uploading to a server.",
    keywords: ["compress pdf", "shrink pdf size", "reduce pdf", "optimize pdf", "fast pdf compression"],
};

export default function CompressPdfLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
