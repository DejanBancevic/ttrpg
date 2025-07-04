import prisma from '../../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOp";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body.bagInstance) {
        return NextResponse.json({ error: "Missing bagInstance payload" }, { status: 400 });
    }

    if (!body.id) {
        return NextResponse.json({ error: "Missing bagInstance id" }, { status: 400 });
    }

    const bagInstanceData = body.bagInstance;

    try {
        const updated = await prisma.bagInstance.update({
            where: { id: body.id },
            data: {
                bagLabel: bagInstanceData.bagLabel,
                itemNameLabel: bagInstanceData.itemNameLabel,
                itemLabel1: bagInstanceData.itemLabel1,
                itemLabel2: bagInstanceData.itemLabel2,
                itemLabel3: bagInstanceData.itemLabel3,
                itemLabel4: bagInstanceData.itemLabel4,
                itemLabel5: bagInstanceData.itemLabel5,
            },
        });

        return NextResponse.json({ data: updated });
    } catch (error) {
        console.error("❌ bagInstance update error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}