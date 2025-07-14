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
        await prisma.itemInstance.update({
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

        console.log("Received body:", JSON.stringify(body, null, 2));

        const boosts = Array.isArray(body.boosts) ? body.boosts : [];
        if (boosts.length > 0) {

            console.log("Updating itemInstance boosts: AHHAHAHA", body.boosts);

            await prisma.itemBoost.deleteMany({
                where: { boosterId: itemInstanceData.id },
            });

            const boostData = body.boosts.map((boost: { targetField: any; targetType: any; boostAmount: any; targetTag: any; boostedById: any; }) => ({
                boosterId: itemInstanceData.id,
                targetField: boost.targetField!,
                targetType: boost.targetType!,
                boostAmount: boost.boostAmount ?? 0,
                targetTag: boost.targetTag ?? null,
                boostedById: boost.boostedById ?? null,
            }));

            await prisma.itemBoost.createMany({
                data: boostData,
            });
        }
        
        console.log("psotle boosts", body.boosts);

        const fullItem = await prisma.itemInstance.findUnique({
           
            where: { id: body.id },
            include: {
                booster: true,
                bagInstance: true,
            },
        });

        console.log("Updadasdasdasds: AHHAHAHA", body.boosts);

        return NextResponse.json({ data: fullItem });
    } catch (error) {
        console.error("❌ itemInstance update error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}