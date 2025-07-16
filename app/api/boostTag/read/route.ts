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
        return NextResponse.json({ error: "Missing entity ID" }, { status: 400 });
    }

    let boostTags = await prisma.boostTag.findMany({
        orderBy: {
            tagValue: 'asc',
        },
        where: {
            itemInstance: {
                some: {
                    id: body.id,
                },
            },
        },
        include: {
            itemInstance: true, 
          },
    });

    //console.log(JSON.stringify(boostTags, null, 2));
    return (NextResponse.json({ data: boostTags }))

}