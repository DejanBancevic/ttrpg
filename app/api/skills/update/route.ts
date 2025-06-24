import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const session = await getSession();
    const body = await request.json();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body.postId || !body.skills) {
        return NextResponse.json({ error: "Missing postId or skills payload" }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { skills: true },
    });

    if (!existingPost || !existingPost.skills?.id) {
        return NextResponse.json({ error: "Post or skills group not found" }, { status: 404 });
    }

    const skillData = body.skills;

    // Update labels
    if (skillData.skillsLabel || skillData.profsLabel) {
        await prisma.skills.update({
            where: { id: existingPost.skills.id },
            data: {
                ...(skillData.skillsLabel && { skillsLabel: skillData.skillsLabel }),
                ...(skillData.profsLabel && { profsLabel: skillData.profsLabel }),
            },
        });
    }

    // Update or create instances
    if (Array.isArray(skillData.skillInstance)) {
        for (const skill of skillData.skillInstance) {

            if (skill.id) {
                await prisma.skillInstance.update({
                    where: { id: skill.id },
                    data: {
                        skillName: skill.skillName,
                        skillValue: skill.skillValue,
                        skillProf: skill.skillProf,
                    },
                });

            } else {
                await prisma.skillInstance.create({
                    data: {
                        skillName: skill.skillName,
                        skillValue: skill.skillValue,
                        skillProf: skill.skillProf,
                        skills: { connect: { id: existingPost.skills.id } },
                    },
                });
            }
        }
    }

    const updatedSkills = await prisma.skills.findUnique({
        where: { id: existingPost.skills.id },
        include: {
            skillInstance: {
                orderBy: {
                    skillName: 'asc',
                },
            },
        },
    });

    return NextResponse.json({ data: updatedSkills });
}