import prisma from '../../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../actions/getCurrentUser";

export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession();
        const body = await request.json();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!body.id) {
            return NextResponse.json({ error: "Missing spellSlotInstanceId" }, { status: 400 });
        }

        const spellSlotInstance = await prisma.spellSlotInstance.findUnique({
            where: { id: body.id },
            include: {
                spells: {
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

        if (!spellSlotInstance || spellSlotInstance.spells?.post?.author?.email !== session.user.email) {
            return NextResponse.json({ error: "Not authorized to delete this spellSlotInstance" }, { status: 403 });
        }

        await prisma.spellSlotInstance.delete({
            where: { id: body.id },
        });

        return NextResponse.json({ success: true });

    } catch (err: any) {
        console.error(" DELETE /api/spells/spellSlotInstance error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}