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

    if (!body.itemInstance) {
        return NextResponse.json({ error: "Missing itemInstance payload" }, { status: 400 });
    }

    if (!body.id) {
        return NextResponse.json({ error: "Missing itemInstance id" }, { status: 400 });
    }

    const itemInstanceData = body.itemInstance;

    try {
        const updatedItem = await prisma.itemInstance.update({
            where: { id: body.id },
            data: {
                itemName: itemInstanceData.itemName,
                itemValue1: itemInstanceData.itemValue1,
                itemValue2: itemInstanceData.itemValue2,
                itemValue3: itemInstanceData.itemValue3,
                itemValue4: itemInstanceData.itemValue4,
                itemValue5: itemInstanceData.itemValue5,
            },
        });
     
        return NextResponse.json({ data: updatedItem });
    } catch (error) {
        console.error("❌ itemInstance update error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}