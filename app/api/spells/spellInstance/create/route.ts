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
        return NextResponse.json({ error: "Missing spell id" }, { status: 400 });
    }

    const newSpellInstance = await prisma.spellInstance.create({
        data: {
            skillName: "Add Skill Name",
            skillValue: "0",
            skillProf: "0",
            skills: {
                connect: { id: body.id },
            },

        },
        include: {
            skills: true,
        }
    },);

    return NextResponse.json({ body: newSkillInstance });
}