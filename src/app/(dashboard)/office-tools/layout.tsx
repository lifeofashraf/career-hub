import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Office Tools | Resumate",
    description: "A brutalist suite of free PDF utilities. Merge, split, compress, and convert documents directly in your browser without subscriptions or data tracking.",
    keywords: ["pdf tools", "office suite", "merge pdf", "split pdf", "free pdf utilities", "resumate tools"],
};

export default function OfficeToolsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
