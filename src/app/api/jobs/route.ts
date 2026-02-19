
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const jobs = await db.jobApplication.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(jobs);
    } catch (error) {
        console.error("[JOBS_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const json = await req.json();
        const { company, position, url, status, salary, appliedAt } = json;

        const job = await db.jobApplication.create({
            data: {
                userId,
                company,
                position,
                url,
                status: status || "wishlist",
                salary,
                appliedAt: appliedAt ? new Date(appliedAt) : null,
            },
        });

        return NextResponse.json(job);
    } catch (error) {
        console.error("[JOBS_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
