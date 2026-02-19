
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const footprint = await db.footprintCheck.findUnique({
            where: { userId },
        });

        return NextResponse.json(footprint || { completedItems: [], score: 0 });
    } catch (error) {
        console.error("[FOOTPRINT_GET]", error);
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
        const { category, checkId, isChecked } = json;
        // Construct a unique item ID from category and checkId
        const itemId = `${category}:${checkId}`;

        // Get existing record to update the list
        const existing = await db.footprintCheck.findUnique({
            where: { userId },
        });

        let completedItems = existing?.completedItems || [];

        if (isChecked) {
            if (!completedItems.includes(itemId)) {
                completedItems.push(itemId);
            }
        } else {
            completedItems = completedItems.filter((id) => id !== itemId);
        }

        const check = await db.footprintCheck.upsert({
            where: {
                userId,
            },
            create: {
                userId,
                completedItems,
                lastCheckedAt: new Date(),
            },
            update: {
                completedItems,
                lastCheckedAt: new Date(),
            },
        });

        return NextResponse.json(check);
    } catch (error) {
        console.error("[FOOTPRINT_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

