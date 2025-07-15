import prisma from '../../../../lib/prisma';
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
        return NextResponse.json({ error: "Missing itemBoost id" }, { status: 400 });
    }

    const newItemBoostInstance = await prisma.itemBoost.create({
        data: {
            targetField: "",
            boostAmount: 0,
            targetTag: "",
            targetType: "",
            booster: {
                connect: { id: body.id },
            },
        },
        include: {
            booster: true, 
            boostedBy: true, 
        }
    },);

    return NextResponse.json({ body: newItemBoostInstance });
}