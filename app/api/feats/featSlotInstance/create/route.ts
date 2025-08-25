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
        return NextResponse.json({ error: "Missing featSlotInstance id" }, { status: 400 });
    }

    const newFeatSlotInstance = await prisma.featSlotInstance.create({
        data: {
            featSlotLabel: "Feats",
            featInstance: {
                create: [],
            },
            feats: {
                connect: { id: body.id },
            },

        },
        include: {
            feats: true,
        }
    },);

    return NextResponse.json({ body: newFeatSlotInstance });
}