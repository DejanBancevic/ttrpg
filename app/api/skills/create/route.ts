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
        return NextResponse.json({ error: "Missing skillsId" }, { status: 400 });
    }

    const newSkillInstance = await prisma.skillInstance.create({
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