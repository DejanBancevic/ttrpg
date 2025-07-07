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

    if (!body.currencyInstance) {
        return NextResponse.json({ error: "Missing currencyInstance payload" }, { status: 400 });
    }

    if (!body.id) {
        return NextResponse.json({ error: "Missing currencyInstance id" }, { status: 400 });
    }

    const currencyInstanceData = body.currencyInstance;

    try {
        const updated = await prisma.currencyInstance.update({
            where: { id: body.id },
            data: {
                currenyLabel: currencyInstanceData.currenyLabel,
                currenyValue: currencyInstanceData.currenyValue,
            },
        });

        return NextResponse.json({ data: updated });
    } catch (error) {
        console.error("❌ currencyInstance update error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}