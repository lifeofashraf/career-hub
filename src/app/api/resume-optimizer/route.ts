import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { optimizeSection } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { section, content, jobDescription } = body;

        if (!section || !content) {
            return NextResponse.json(
                { error: "Missing required fields: section, content" },
                { status: 400 }
            );
        }

        const validSections = ["summary", "work", "projects"];
        if (!validSections.includes(section)) {
            return NextResponse.json(
                { error: `Invalid section. Must be one of: ${validSections.join(", ")}` },
                { status: 400 }
            );
        }

        const result = await optimizeSection(section, content, jobDescription);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "AI optimization failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: result.data,
        });
    } catch (error: any) {
        console.error("[RESUME_OPTIMIZER]", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
