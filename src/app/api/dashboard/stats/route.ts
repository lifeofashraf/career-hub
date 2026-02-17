import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Run queries in parallel for performance
        const [resumeCount, activeJobsCount, footprintCheck] = await Promise.all([
            db.resume.count({ where: { userId } }),
            db.jobApplication.count({
                where: {
                    userId,
                    status: { notIn: ["rejected"] }, // Count active jobs only
                },
            }),
            db.footprintCheck.findUnique({
                where: { userId },
            }),
        ]);

        return NextResponse.json({
            resumeCount,
            activeJobsCount,
            footprintScore: footprintCheck?.score || 0,
        });
    } catch (error) {
        console.error("[DASHBOARD_STATS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
