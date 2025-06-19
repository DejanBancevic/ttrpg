import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const session = await getSession();
    const body = await request.json();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //UPDATE existing post by ID (required for multiple posts)
    if (!body.postId) {
        return NextResponse.json({ error: "Missing postId for update." }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { health: true, basics: true, skills: true },
    });

    if (!existingPost) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
        where: { id: body.postId },
        data: {
            ...(body.health && { // proveravas da li se request iz body slaze sa tim iz 
                health: { update: body.health },
            }),
            ...(body.basics && {
                basics: { update: body.basics },
            }),
            ...(body.skills && {
                basics: { update: body.skills },
            }),
        },
        include: {
            health: true,
            basics: true,
            skills: {
                include: {
                    skillInstance: true,
                },
            },
        },
    });

    if (body.skills) {
        const skillData = body.skills;

        // update skillsLabel or profsLabel
        if (skillData.skillsLabel || skillData.profsLabel) {
            await prisma.skills.update({
                where: { id: existingPost.skillsId! },
                data: {
                    ...(skillData.skillsLabel && { skillsLabel: skillData.skillsLabel }),
                    ...(skillData.profsLabel && { profsLabel: skillData.profsLabel }),
                }
            });
        }
    }
    // Update individual skills
    if (Array.isArray(body.skills?.skillInstance)) {
        for (const skill of body.skills.skillInstance) {
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
                // Create new skill and connect to post
                await prisma.skillInstance.create({
                    data: {
                        skillName: skill.skillName,
                        skillValue: skill.skillValue,
                        skillProf: skill.skillProf,
                        skills: {
                            connect: { id: existingPost.skills?.id }, // connect to Skills group
                        },
                    },
                });
            }
        }
    }

    return NextResponse.json({ data: updatedPost });
}
