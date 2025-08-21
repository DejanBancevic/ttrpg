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

    if (!body.boostTag) {
        return NextResponse.json({ error: "Missing boostTag payload" }, { status: 400 });
    }

    if (!body.id) {
        return NextResponse.json({ error: "Missing boostTag id" }, { status: 400 });
    }

    const boostTagData = body.boostTag;

    try {
        const updatedBoostTag = await prisma.boostTag.update({
            where: { id: body.id },
            data: {
                tagValue: boostTagData.tagValue ?? undefined,
            },
            include: { itemInstance: true },
        });

        //console.log(JSON.stringify(updatedBoostTag, null, 2));
        return NextResponse.json({ data: updatedBoostTag });
    } catch (error) {
        console.error("❌ boostTags update error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}