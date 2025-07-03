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

    const featData = body.feats;

    // Update labels
    if (featData.featsLabel) {
        await prisma.feats.update({
            where: { id: existingPost.feats.id },
            data: {
                ...(featData.featsLabel && { featsLabel: featData.featsLabel }),
            },
        });
    }

    // Update or create instances
    if (Array.isArray(featData.featInstance)) {
        for (const feat of featData.featInstance) {

            if (feat.id) {
                await prisma.featInstance.update({
                    where: { id: feat.id },
                    data: {
                        featName: feat.featName,
                        featChargeLabel: feat.featChargeLabel,
                        featChargeCurrent: feat.featChargeCurrent,
                        featChargeMax: feat.featChargeMax,
                        featText: feat.featText,
                    },
                });

            } else {
                await prisma.featInstance.create({
                    data: {
                        featName: feat.featName,
                        featChargeLabel: feat.featChargeLabel,
                        featChargeCurrent: feat.featChargeCurrent,
                        featChargeMax: feat.featChargeMax,
                        featText: feat.featText,
                        feats: { connect: { id: existingPost.feats.id } },
                    },
                });
            }
        }
    }

    const updatedFeats = await prisma.feats.findUnique({
        where: { id: existingPost.feats.id },
        include: {
            featInstance: {
                orderBy: {
                    featName: 'asc',
                },
            },
        },
    });

    return NextResponse.json({ data: updatedFeats });
}