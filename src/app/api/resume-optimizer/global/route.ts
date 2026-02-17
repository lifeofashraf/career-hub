import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { optimizeResumeGlobal } from "@/lib/ai";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await req.json();
        const { data } = body;

        if (!data) {
            return NextResponse.json(
                { error: "Missing resume data" },
                { status: 400 }
            );
        }

        const result = await optimizeResumeGlobal(data);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "Global optimization failed" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: result.data,
        });
    } catch (error: any) {
        console.error("[GLOBAL_OPTIMIZER]", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
