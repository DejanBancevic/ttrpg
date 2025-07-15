import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOp";

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const body = await request.json();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!body.id) {
            return NextResponse.json({ error: "Missing itemBoostInstance Id" }, { status: 400 });
        }

        const itemBoostInstance = await prisma.itemBoost.findUnique({
            where: { id: body.id },
        })

        if (!itemBoostInstance ) {
            return NextResponse.json({ error: "Not authorized to delete this itemBoostInstance" }, { status: 403 });
        }

        await prisma.itemBoost.delete({
            where: { id: body.id },
        });

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error(" DELETE /api/itemBoost/ error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}