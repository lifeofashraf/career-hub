import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { optimizeResumeGlobal } from "@/lib/ai";
import { db } from "@/lib/db";

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

        // Check user credits
        const user = await db.user.findUnique({
            where: { id: userId },
            select: { credits: true }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        if (user.credits <= 0) {
            return NextResponse.json(
                { error: "Insufficient credits" },
                { status: 403 }
            );
        }

        const result = await optimizeResumeGlobal(data);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || "Global optimization failed" },
                { status: 500 }
            );
        }

        // Deduct 1 credit
        const updatedUser = await db.user.update({
            where: { id: userId },
            data: { credits: { decrement: 1 } },
            select: { credits: true }
        });

        return NextResponse.json({
            success: true,
            data: result.data,
            credits: updatedUser.credits
        });
    } catch (error: any) {
        console.error("[GLOBAL_OPTIMIZER]", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
