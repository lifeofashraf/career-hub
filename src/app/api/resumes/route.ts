import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { generateId, slugify } from "@/lib/utils"; // We might need a better slug generator

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Check if user exists in DB, if not create them (sync with Clerk)
        // In a real app, webhook is better, but this is a fail-safe
        let user = await db.user.findUnique({ where: { id: userId } });
        if (!user) {
            // We don't have email/name here easily without currentUser() async fetch
            // For MVP, we presume the webhook syncs, or we lazy create with just ID
            // Let's fetch currentUser just in case for the first sync
            const { currentUser } = await import("@clerk/nextjs/server");
            const clerkUser = await currentUser();

            if (clerkUser) {
                user = await db.user.create({
                    data: {
                        id: userId,
                        email: clerkUser.emailAddresses[0].emailAddress,
                        name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
                        avatarUrl: clerkUser.imageUrl,
                    },
                });
            } else {
                return new NextResponse("User not found", { status: 404 });
            }
        }

        const json = await req.json();
        const title = json.title || "Untitled Resume";
        const slug = `${slugify(title)}-${generateId()}`;

        const resume = await db.resume.create({
            data: {
                userId,
                title,
                slug,
                data: json.data || {},
                metadata: json.metadata || {},
            },
        });

        return NextResponse.json(resume);
    } catch (error: any) {
        console.error("[RESUMES_POST]", error);
        return new NextResponse(`Internal Error: ${error.message}`, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const resumes = await db.resume.findMany({
            where: { userId },
            orderBy: { updatedAt: "desc" },
        });

        return NextResponse.json(resumes);
    } catch (error) {
        console.error("[RESUMES_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
