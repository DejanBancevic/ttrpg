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
        return NextResponse.json({ error: "Missing SpellInstance id" }, { status: 400 });
    }

    const newSpellInstance = await prisma.spellInstance.create({
        data: {
            spellNameValue: "Spell Name",
            spellValue1: "0",
            spellValue2: "0",
            spellValue3: "0",
            spellValue4: "0",
            spellSlotInstance: {
                connect: { id: body.id },
            },

        },
        include: {
            spellSlotInstance: true,
        }
    },);

    return NextResponse.json({ body: newSpellInstance });
}