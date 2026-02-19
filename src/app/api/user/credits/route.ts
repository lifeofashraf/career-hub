import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const user = await db.user.findUnique({
            where: { id: userId },
            select: { credits: true }
        });

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }

        return NextResponse.json({ credits: user.credits });
    } catch (error) {
        console.error("[USER_CREDITS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
