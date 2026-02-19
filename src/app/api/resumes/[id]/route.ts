
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { slugify, generateId } from "@/lib/utils";

// Helper to verify ownership
async function verifyResumeOwnership(resumeId: string, userId: string) {
    const resume = await db.resume.findUnique({
        where: { id: resumeId },
    });

    if (!resume || resume.userId !== userId) {
        return null;
    }

    return resume;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params; // Next.js 15 params are async

        const resume = await verifyResumeOwnership(id, userId);
        if (!resume) {
            return new NextResponse("Resume not found", { status: 404 });
        }

        return NextResponse.json(resume);
    } catch (error) {
        console.error("[RESUME_GET]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { id } = await params;

        const existingResume = await verifyResumeOwnership(id, userId);
        if (!existingResume) {
            return new NextResponse("Resume not found", { status: 404 });
        }

        const json = await req.json();
        const { title, data, metadata, template, isPublic } = json;

        // Build update object only with provided fields
        const updateData: any = {};
        if (title) {
            updateData.title = title;
            // Optionally update slug if title changes, but might break links.
            // Let's decide NOT to auto-update slug on title change for stability unless requested.
            // But if title is empty, maybe don't update.
        }
        if (data) updateData.data = data;
        if (metadata) updateData.metadata = metadata;
        if (template) updateData.template = template;
        if (typeof isPublic === "boolean") updateData.isPublic = isPublic;

        const updatedResume = await db.resume.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedResume);
    } catch (error) {
        console.error("[RESUME_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;

        const existingResume = await verifyResumeOwnership(id, userId);
        if (!existingResume) {
            return NextResponse.json({ error: "Resume not found" }, { status: 404 });
        }

        await db.resume.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Resume deleted" });
    } catch (error) {
        console.error("[RESUME_DELETE]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
