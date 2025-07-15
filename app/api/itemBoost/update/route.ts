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

    if (!body.boosts) {
        return NextResponse.json({ error: "Missing boosts payload" }, { status: 400 });
    }

    if (!body.id) {
        return NextResponse.json({ error: "Missing boosts id" }, { status: 400 });
    }

    const itemBoostData = body.boosts;

    try {
        const updatedItemBoost = await prisma.itemBoost.update({
            where: { id: body.id },
            data: {
                targetField: itemBoostData.targetField ?? undefined,
                targetTag: itemBoostData.targetTag ?? undefined,
                targetType: itemBoostData.targetType ?? undefined,
                boostAmount:
                    itemBoostData.boostAmount !== undefined &&
                        itemBoostData.boostAmount !== "" &&
                        !isNaN(Number(itemBoostData.boostAmount))
                        ? Number(itemBoostData.boostAmount)
                        : undefined,
                boostedById: itemBoostData.boostedById ?? undefined,
            },
        });

       // console.log(JSON.stringify(updatedItemBoost, null, 2));
        return NextResponse.json({ data: updatedItemBoost });
    } catch (error) {
        console.error("❌ boosts update error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}