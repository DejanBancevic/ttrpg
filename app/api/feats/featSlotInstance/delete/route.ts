import prisma from '../../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOp";

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        const body = await request.json();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!body.id) {
            return NextResponse.json({ error: "Missing featSlotInstanceId" }, { status: 400 });
        }

        const featSlotInstance = await prisma.featSlotInstance.findUnique({
            where: { id: body.id },
            include: {
                feats: {
                    include: {
                        post: {
                            select: {
                                author: { select: { email: true } },
                            },
                        },
                    },
                },
            },
        })

        if (!featSlotInstance || featSlotInstance.feats?.post?.author?.email !== session.user.email) {
            return NextResponse.json({ error: "Not authorized to delete this featSlotInstance" }, { status: 403 });
        }

        await prisma.featSlotInstance.delete({
            where: { id: body.id },
        });

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error(" DELETE /api/feats/featSlotInstance error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}