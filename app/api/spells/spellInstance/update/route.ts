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

    if (!body.spellInstance) {
        return NextResponse.json({ error: "Missing spellInstance payload" }, { status: 400 });
    }

    if (!body.id) {
        return NextResponse.json({ error: "Missing spellInstance id" }, { status: 400 });
    }

    const spellsData = body.spellInstance;

    try {
        const updated = await prisma.spellInstance.update({
            where: { id: body.id },
            data: {
                spellNameValue: spellsData.spellNameValue,
                spellValue1: spellsData.spellValue1,
                spellValue2: spellsData.spellValue2,
                spellValue3: spellsData.spellValue3,
                spellValue4: spellsData.spellValue4,
            },
        });

        return NextResponse.json({ data: updated });
    } catch (error) {
        console.error("❌ SpellInstance update error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}