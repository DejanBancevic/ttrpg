import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const session = await getSession();
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
            feats: {
                connect: { id: body.id },
            },
        },
        include: {
            feats: true, 
        }
    },);

    return NextResponse.json({ body: newFeatInstance });
}