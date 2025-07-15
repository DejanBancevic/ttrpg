import prisma from '../../../../lib/prisma';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOp";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body?.id) {
        return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
    }

    let itemBoosts = await prisma.itemBoost.findMany({
        orderBy: {
            targetField: 'asc',
        },
        where: {
            boosterId: body.id,
        },
        include: {
            boostedBy: true,
            booster: true,
          
        },
    });

    //console.log(JSON.stringify(itemBoosts, null, 2));
    return (NextResponse.json({ data: itemBoosts }))

}