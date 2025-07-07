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

    if (!body.postId || !body.inventory) {
        return NextResponse.json({ error: "Missing postId or inventory payload" }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { inventory: true },
    });

    if (!existingPost || !existingPost.inventory?.id) {
        return NextResponse.json({ error: "Post or inventory group not found" }, { status: 404 });
    }

    const inventoryData = body.inventory;

    if (inventoryData.invLabel || inventoryData.invWeightLabel ||
        inventoryData.invWeightCurrent || inventoryData.invWeightMax ||
        inventoryData.invWeightUnit || inventoryData.invCurrenyLabel ||
        inventoryData.invBagAllLabel) {
        await prisma.inventory.update({
            where: { id: existingPost.inventory.id },
            data: {
                ...(inventoryData.invLabel && { invLabel: inventoryData.invLabel }),
                ...(inventoryData.invWeightLabel && { invWeightLabel: inventoryData.invWeightLabel }),
                ...(inventoryData.invWeightCurrent && { invWeightCurrent: inventoryData.invWeightCurrent }),
                ...(inventoryData.invWeightMax && { invWeightMax: inventoryData.invWeightMax }),
                ...(inventoryData.invWeightUnit && { invWeightUnit: inventoryData.invWeightUnit }),
                ...(inventoryData.invCurrenyLabel && { invCurrenyLabel: inventoryData.invCurrenyLabel }),
                ...(inventoryData.invBagAllLabel && { invBagAllLabel: inventoryData.invBagAllLabel }),
            },
        });
    }

    const updatedInventory = await prisma.inventory.findUnique({
        where: { id: existingPost.inventory.id },
        include: {
            currencyInstance: {
                orderBy: {
                    currenyLabel: 'asc',
                },
            },
            bagInstance: {
                orderBy: {
                    bagLabel: 'asc',
                },
                include: {
                    itemInstance: {
                        orderBy: {
                            itemName: "asc",
                        },
                    },
                },
            },
        },
    });

    if (!updatedInventory) {
        console.error("❌ Could not load updatedInventory for id:", existingPost.inventory.id);
        return NextResponse.json({ error: "Failed to fetch updatedInventory data" }, { status: 500 });
    }

    return NextResponse.json({ data: updatedInventory });
}