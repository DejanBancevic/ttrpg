import prisma from '../../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const session = await getSession();
    const body = await request.json();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body.id) {
        return NextResponse.json({ error: "Missing spellSlotInstance id" }, { status: 400 });
    }

    const newSpellSlotInstance = await prisma.spellSlotInstance.create({
        data: {
            spellSlotBoxLabel: "",
            spellSlotLabel: "Slots",
            spellSlotCurrent: "0",
            spellSlotMax: "0",
            spellNameLabel: "Name",
            spellLabel1: "Time",
            spellLabel2: "Conc",
            spellLabel3: "Range",
            spellLabel4: "Hit",
            spellInstance: {
                create:[],
            },
            spells: {
                connect: { id: body.id },
            },

        },
        include: {
            spells: true,
        }
    },);

    return NextResponse.json({ body: newSpellSlotInstance });
}