
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { generateId, slugify } from "@/lib/utils"; // We might need a better slug generator

export async function POST(req: Request) {
    console.log("[RESUMES_POST] Starting request...");
    try {
        const { userId } = await auth();
        console.log("[RESUMES_POST] Auth userId:", userId);

        if (!userId) {
            console.error("[RESUMES_POST] No userId found");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user exists in DB, if not create them (sync with Clerk)
        let user = await db.user.findUnique({ where: { id: userId } });
        console.log("[RESUMES_POST] User found in DB?", !!user);

        if (!user) {
            console.log("[RESUMES_POST] User not found, fetching from Clerk...");
            const { currentUser } = await import("@clerk/nextjs/server");
            const clerkUser = await currentUser();
            console.log("[RESUMES_POST] Clerk user fetched:", clerkUser?.id);

            if (clerkUser) {
                console.log("[RESUMES_POST] Creating user in DB...");
                user = await db.user.create({
                    data: {
                        id: userId,
                        email: clerkUser.emailAddresses[0].emailAddress,
                        name: `${clerkUser.firstName} ${clerkUser.lastName}`.trim(),
                        avatarUrl: clerkUser.imageUrl,
                    },
                });
                console.log("[RESUMES_POST] User created");
            } else {
                console.error("[RESUMES_POST] Clerk user not found");
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
        }

        const json = await req.json();
        console.log("[RESUMES_POST] Request JSON received", Object.keys(json));

        const title = json.title || "Untitled Resume";
        const slug = `${slugify(title)}-${generateId()}`;

        console.log("[RESUMES_POST] Creating resume record...");
        const resume = await db.resume.create({
            data: {
                userId,
                title,
                slug,
                data: json.data || {},
                metadata: json.metadata || {},
            },
        });
        console.log("[RESUMES_POST] Resume created:", resume.id);

        // Return parsed object to maintain API contract
        return NextResponse.json({
            ...resume,
            data: resume.data,
            metadata: resume.metadata || {},
        });
    } catch (error: any) {
        console.error("[RESUMES_POST] CRITICAL ERROR:", error);
        return NextResponse.json({ error: `Internal Error: ${error.message}` }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const resumes = await db.resume.findMany({
            where: { userId },
            orderBy: { updatedAt: "desc" },
        });

        // Parse JSON strings back to objects
        // Postgres returns Json objects natively, so no JSON.parse needed
        const parsedResumes = resumes.map((r: any) => ({
            ...r,
            data: r.data, // No parse needed
            metadata: r.metadata || {}, // No parse needed
        }));

        return NextResponse.json(parsedResumes);
    } catch (error) {
        console.error("[RESUMES_GET]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
