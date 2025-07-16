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
        return NextResponse.json({ error: "Missing boostTag id" }, { status: 400 });
    }

    const newBoostTagInstance = await prisma.boostTag.create({
        data: {
            tagValue: "",
            itemInstance: {
                connect: [{ id: body.id }],
            },
        },
    },);

    return NextResponse.json({ body: newBoostTagInstance });
}