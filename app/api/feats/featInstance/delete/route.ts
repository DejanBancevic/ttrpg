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
            return NextResponse.json({ error: "Missing featInstanceId" }, { status: 400 });
        }

        const featInstance = await prisma.featInstance.findUnique({
            where: { id: body.id },
            include: {
                featSlotInstance: {
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
                },
            },
        })

        if (!featInstance || featInstance.featSlotInstance?.feats?.post?.author?.email !== session.user.email) {
            return NextResponse.json({ error: "Not authorized to delete this feat" }, { status: 403 });
        }

        await prisma.featInstance.delete({
            where: { id: body.id },
        });

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error(" DELETE /api/feats error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}