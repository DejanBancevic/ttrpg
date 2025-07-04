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
            return NextResponse.json({ error: "Missing itemInstance Id" }, { status: 400 });
        }

        const itemInstance = await prisma.itemInstance.findUnique({
            where: { id: body.id },
            include: {
                bagInstance: {
                    include: {
                        inventory: {
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

        if (!itemInstance || itemInstance.bagInstance?.inventory?.post?.author?.email !== session.user.email) {
            return NextResponse.json({ error: "Not authorized to delete this itemInstance" }, { status: 403 });
        }

        await prisma.itemInstance.delete({
            where: { id: body.id },
        });

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error(" DELETE /api/inventory/itemInstance error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}