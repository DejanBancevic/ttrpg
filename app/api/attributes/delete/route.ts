import prisma from '../../../../lib/prisma';
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
            return NextResponse.json({ error: "Missing attribute instance id" }, { status: 400 });
        }

        const attributeInstance = await prisma.attributeInstance.findUnique({
            where: { id: body.id },
            include: {
                attributes: {
                    include: {
                        post: {
                            select: {
                                author: { select: { email: true } },
                            },
                        },
                    }
                }
            },
        })

        if (!attributeInstance || attributeInstance.attributes?.post?.author?.email !== session.user.email) {
            return NextResponse.json({ error: "Not authorized to delete this attribute" }, { status: 403 });
        }

        await prisma.attributeInstance.delete({
            where: { id: body.id },
        });

        return NextResponse.json({ success: true });

    } catch (err: any) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}