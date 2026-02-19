
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { generateLatex, compileLatexToPdf } from "@/lib/latex-bridge";
import { UTApi } from "uploadthing/server";
import { checkSubscription } from "@/lib/subscription";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    console.log("[RESUME_EXPORT_LATEX] Starting export for:", id);
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const isPro = await checkSubscription();

        // 1. Fetch Resume Data
        const resume = await db.resume.findUnique({
            where: { id, userId },
        });

        if (!resume) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }

        // 2. Generate LaTeX Code
        const resumeData = resume.data as any;
        let latexCode = generateLatex(resumeData);

        // INJECT WATERMARK IF NOT PRO
        if (!isPro) {
            console.log("[RESUME_EXPORT] User is FREE tier. Injecting watermark.");
            const watermarkCode = `
\\\\usepackage{draftwatermark}
\\\\SetWatermarkText{CAREER HUB FREE}
\\\\SetWatermarkScale{0.8}
\\\\SetWatermarkColor[gray]{0.95}
`;
            // Insert after documentclass
            latexCode = latexCode.replace(
                "\\\\documentclass[letterpaper,11pt]{article}",
                "\\\\documentclass[letterpaper,11pt]{article}" + watermarkCode
            );
        }

        console.log("[RESUME_EXPORT] Generated LaTeX length:", latexCode.length);

        // 3. Compile to PDF
        const pdfBuffer = await compileLatexToPdf(latexCode);
        console.log("[RESUME_EXPORT] PDF Compiled. Size:", pdfBuffer.byteLength);

        // 4. Upload to UploadThing
        const utapi = new UTApi();
        const filename = isPro ? `resume-${resume.slug}.pdf` : `resume-${resume.slug}-watermarked.pdf`;
        const file = new File([pdfBuffer], filename, { type: "application/pdf" });

        const response = await utapi.uploadFiles([file]);

        if (response[0].error) {
            throw new Error("UploadThing Error: " + response[0].error.message);
        }

        const fileUrl = response[0].data?.url;
        console.log("[RESUME_EXPORT] File uploaded to:", fileUrl);

        return NextResponse.json({
            success: true,
            url: fileUrl,
            latex: latexCode
        });

    } catch (error: any) {
        console.error("[RESUME_EXPORT_ERROR]", error);
        return NextResponse.json({ error: `Export Failed: ${error.message}` }, { status: 500 });
    }
}
