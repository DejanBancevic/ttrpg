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
            return NextResponse.json({ error: "Missing skillInstanceId" }, { status: 400 });
        }

        const skillInstance = await prisma.skillInstance.findUnique({
            where: { id: body.id },
            include: {
                skills: {
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

        if (!skillInstance || skillInstance.skills?.post?.author?.email !== session.user.email) {
            return NextResponse.json({ error: "Not authorized to delete this skill" }, { status: 403 });
        }

        await prisma.skillInstance.delete({
            where: { id: body.id },
        });

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error(" DELETE /api/skill error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}