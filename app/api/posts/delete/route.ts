import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../actions/getCurrentUser";

export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession();
        const body = await request.json();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!body.postId) {
            return NextResponse.json({ error: "Missing postId for deletion." }, { status: 400 });
        }

        const existing = await prisma.post.findUnique({
            where: { id: body.postId },
        });

        if (!existing) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const deleted = await prisma.$transaction(async (tx) => {
            // lets you execute multiple database operations as a single atomic unit
            // meaning either all of them succeed, or none of them do.
            
            // 1. Delete the post first
            const deletedPost = await tx.post.delete({ where: { id: body.postId } });

            // 2. Then delete the related records 
            await tx.health.delete({ where: { id: existing.healthId } });
            await tx.basics.delete({ where: { id: existing.basicsId } });
            await tx.skills.delete({ where: { id: existing.skillsId } });
            await tx.attributes.delete({ where: { id: existing.attributesId } });
            await tx.feats.delete({ where: { id: existing.featsId } });

            return deletedPost;
        });

        if (!deleted || typeof deleted !== "object") {
            console.error("Transaction returned unexpected value:", deleted);
            return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
        }

        return NextResponse.json({ id: deleted.id }); // success

    } catch (err: any) {
        console.error("DELETE /api/post error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
