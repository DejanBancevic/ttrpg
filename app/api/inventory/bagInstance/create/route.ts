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
        return NextResponse.json({ error: "Missing bagInstance id" }, { status: 400 });
    }

    const newBagInstance = await prisma.bagInstance.create({
        data: {
            bagLabel: "Bag",
            itemNameLabel: "Name",
            itemLabel1: "Hit",
            itemLabel2: "Dmg",
            itemLabel3: "Range",
            itemLabel4: "Value",
            itemLabel5: "#",
            itemInstance: {
                create: [
                    {
                        itemName: "Item",
                        itemValue1: "0",
                        itemValue2: "0",
                        itemValue3: "0",
                        itemValue4: "0",
                        itemValue5: "0",
                    }
                ],
            },
            inventory: {
                connect: { id: body.id },
            },

        },
        include: {
            inventory: true,
        }
    },);

    return NextResponse.json({ body: newBagInstance });
}