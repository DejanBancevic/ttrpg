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

    if (!body.id) {
        return NextResponse.json({ error: "Missing itemInstance id" }, { status: 400 });
    }

    const newItemInstance = await prisma.itemInstance.create({
        data: {
            itemName: "Item",
            itemValue1: "0",
            itemValue2: "0",
            itemValue3: "0",
            itemValue4: "0",
            itemValue5: "0",
            notes: "Write notes here...",
            bagInstance: {
                connect: { id: body.id },
            },

        },
        include: {
            bagInstance: true,
        }
    },);

    return NextResponse.json({ body: newItemInstance });
}