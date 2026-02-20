import { Metadata } from "next";

export const metadata: Metadata = {
    title: "PDF to Word Converter | Resumate Office Tools",
    description: "Convert PDF documents to editable Microsoft Word (DOCX) files. Easily extract text and maintain layout.",
    keywords: ["pdf to word", "convert pdf to docx", "pdf text extractor", "edit pdf text", "word format tool"],
};

export default function PdfToWordLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
