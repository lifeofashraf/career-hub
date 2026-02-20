import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { summarizeDocument } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { content } = body;

        if (!content) {
            return NextResponse.json(
                { error: "Missing required field: content" },
                { status: 400 }
            );
        }

        const result = await summarizeDocument(content);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "AI summarization failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: result.data,
        });
    } catch (error: any) {
        console.error("[OFFICE_SUMMARIZE]", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
