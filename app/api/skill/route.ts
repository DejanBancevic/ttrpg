import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../actions/getCurrentUser";

export async function DELETE(request: NextRequest) { 
    try {
        const session = await getSession();
        const body = await request.json();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!body.skillId) {
            return NextResponse.json({ error: "Missing skillId" }, { status: 400 });
        }

        const skill = await prisma.skill.findUnique({
            where: { id: body.skillId },
            include: {
                post: {
                    select: {
                        author: { select: { email: true } },
                    },
                },
            },
        })

        if (!skill || skill.post?.author?.email !== session.user.email) {
            return NextResponse.json({ error: "Not authorized to delete this skill" }, { status: 403 });
        }

        await prisma.skill.delete({
            where: { id: body.skillId },
        });

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error("❌ DELETE /api/skill error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}