import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { generateLatex } from "@/lib/latexTemplates";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;

        const resume = await db.resume.findUnique({
            where: { id },
        });

        if (!resume || resume.userId !== userId) {
            return new NextResponse("Resume not found", { status: 404 });
        }

        const data = resume.data as any;
        const metadata = resume.metadata as any;
        const templateId = metadata?.template || resume.template || "jake";

        const latex = generateLatex(templateId, data);

        // Return as downloadable .tex file
        const filename = `${resume.title?.replace(/\s+/g, "_") || "resume"}.tex`;

        return new NextResponse(latex, {
            headers: {
                "Content-Type": "application/x-tex",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error("[RESUME_LATEX_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
