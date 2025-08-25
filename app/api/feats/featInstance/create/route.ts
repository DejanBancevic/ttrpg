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
        return NextResponse.json({ error: "Missing feat id" }, { status: 400 });
    }

    const newFeatInstance = await prisma.featInstance.create({
        data: {
            featName: "Feat Name",
            featChargeLabel: "Charges",
            featChargeCurrent: "0",
            featChargeMax: "0",
            featText: "Feat Description",
            featSlotInstance: {
                connect: { id: body.id },
            },
        },
        include: {
            featSlotInstance: true,
        }
    },);

    return NextResponse.json({ body: newFeatInstance });
}