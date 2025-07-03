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

    if (!body.postId || !body.passives) {
        return NextResponse.json({ error: "Missing postId or passives payload" }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { passives: true },
    });

    if (!existingPost || !existingPost.passives?.id) {
        return NextResponse.json({ error: "Post or passives group not found" }, { status: 404 });
    }

    const passiveData = body.passives;

    // Update labels
    if (passiveData.passiveLabel) {
        await prisma.passives.update({
            where: { id: existingPost.passives.id },
            data: {
                ...(passiveData.passiveLabel && { passiveLabel: passiveData.passiveLabel }),
            },
        });
    }

    console.log({
        first: passiveData.passiveFirstInstance,
        second: passiveData.passiveSecondInstance,
        third: passiveData.passiveThirdInstance,
    });

    // Update or create instances
    if (Array.isArray(passiveData.passiveFirstInstance)) {

        console.log("Updating passiveFirstInstance", passiveData.passiveFirstInstance);
        for (const passive of passiveData.passiveFirstInstance) {
            console.log("Updating instance ID:", passive.id, "with data:", passive);
            if (passive.id) {
                await prisma.passiveFirstInstance.update({
                    where: { id: passive.id },
                    data: {
                        ...(passive.passiveName !== undefined && { passiveName: passive.passiveName }),
                        ...(passive.passiveValue !== undefined && { passiveValue: passive.passiveValue }),
                    },
                });

            } else {
                await prisma.passiveFirstInstance.create({
                    data: {
                        passiveName: passive.passiveName,
                        passiveValue: passive.passiveValue,
                        passives: { connect: { id: existingPost.passives.id } },
                    },
                });
            }
        }
    }
    if (Array.isArray(passiveData.passiveSecondInstance)) {

        for (const passive of passiveData.passiveSecondInstance) {

            if (passive.id) {
                await prisma.passiveSecondInstance.update({
                    where: { id: passive.id },
                    data: {
                        passiveName: passive.passiveName,
                        passiveValue: passive.passiveValue,
                    },
                });

            } else {
                await prisma.passiveSecondInstance.create({
                    data: {
                        passiveName: passive.passiveName,
                        passiveValue: passive.passiveValue,
                        passives: { connect: { id: existingPost.passives.id } },
                    },
                });
            }
        }
    }
    if (Array.isArray(passiveData.passiveThirdInstance)) {
        for (const passive of passiveData.passiveThirdInstance) {

            if (passive.id) {
                await prisma.passiveThirdInstance.update({
                    where: { id: passive.id },
                    data: {
                        passiveName: passive.passiveName,
                        passiveValue: passive.passiveValue,
                    },
                });

            } else {
                await prisma.passiveThirdInstance.create({
                    data: {
                        passiveName: passive.passiveName,
                        passiveValue: passive.passiveValue,
                        passives: { connect: { id: existingPost.passives.id } },
                    },
                });
            }
        }
    }

    const updatedPassives = await prisma.passives.findUnique({
        where: { id: existingPost.passives.id },
        include: {
            passiveFirstInstance: {
                orderBy: {
                    passiveName: 'asc',
                },
            },
            passiveSecondInstance: {
                orderBy: {
                    passiveName: 'asc',
                },
            },
            passiveThirdInstance: {
                orderBy: {
                    passiveName: 'asc',
                },
            },
        },
    });

    return NextResponse.json({ data: updatedPassives });
}