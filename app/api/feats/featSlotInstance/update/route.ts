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

    if (!body.postId || !body.feats) {
        return NextResponse.json({ error: "Missing postId or feats payload" }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { feats: true },
    });

    if (!existingPost || !existingPost.feats?.id) {
        return NextResponse.json({ error: "Post or feats group not found" }, { status: 404 });
    }

    const featsData = body.feats;

    // Update or create feat slot instances
    if (Array.isArray(featsData.featSlotInstance)) {
        for (const featSlot of featsData.featSlotInstance) {

            if (featSlot.id) {
                await prisma.featSlotInstance.update({
                    where: { id: featSlot.id },
                    data: {
                        featSlotLabel: featSlot.featSlotLabel,
                    },
                });
            }
        }
    }

    if (featsData.featsLabel) {
        await prisma.feats.update({
            where: { id: existingPost.feats.id },
            data: {
                ...(featsData.featsLabel && { featsLabel: featsData.featsLabel }),
            },
        });
    }

    const updatedFeats = await prisma.feats.findUnique({
        where: { id: existingPost.feats.id },
        include: {
            featSlotInstance: {
                orderBy: {
                    featSlotLabel: 'asc',
                },
                include: {
                    featInstance: {
                        orderBy: {
                            featName: "asc",
                        },
                    },
                },
            },
        },
    });

    if (!updatedFeats) {
        console.error("❌ Could not load updatedFeats for id:", existingPost.feats.id);
        return NextResponse.json({ error: "Failed to fetch updated feat data" }, { status: 500 });
    }

    return NextResponse.json({ data: updatedFeats });
}