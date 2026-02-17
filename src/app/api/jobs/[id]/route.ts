import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// Helper to verify ownership
async function verifyJobOwnership(jobId: string, userId: string) {
    const job = await db.jobApplication.findUnique({
        where: { id: jobId },
    });

    if (!job || job.userId !== userId) {
        return null;
    }

    return job;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { id } = await params;

        const existingJob = await verifyJobOwnership(id, userId);
        if (!existingJob) {
            return new NextResponse("Job not found", { status: 404 });
        }

        const json = await req.json();
        const { company, position, url, status, salary, notes, appliedAt } = json;

        const updateData: any = {};
        if (company) updateData.company = company;
        if (position) updateData.position = position;
        if (url !== undefined) updateData.url = url;
        if (status) updateData.status = status;
        if (salary !== undefined) updateData.salary = salary;
        if (notes !== undefined) updateData.notes = notes;
        if (appliedAt !== undefined) updateData.appliedAt = appliedAt ? new Date(appliedAt) : null;

        const updatedJob = await db.jobApplication.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(updatedJob);
    } catch (error) {
        console.error("[JOB_PATCH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { id } = await params;

        const existingJob = await verifyJobOwnership(id, userId);
        if (!existingJob) {
            return new NextResponse("Job not found", { status: 404 });
        }

        await db.jobApplication.delete({
            where: { id },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("[JOB_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
