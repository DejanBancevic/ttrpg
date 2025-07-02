import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../actions/getCurrentUser";

export async function DELETE(request: NextRequest) {
    try {
        const session = await getSession();

        if (session?.user?.email === "dejanbancevic@gmail.com" || "alies22222@gmail.com") {
            const deleted = await prisma.$transaction(async (tx) => {
                // lets you execute multiple database operations as a single atomic unit
                // meaning either all of them succeed, or none of them do.

                // 1. Delete the post first
                const deletedPost = await tx.post.deleteMany();

                // 2. Then delete the related records 
                await tx.health.deleteMany();
                await tx.basics.deleteMany(); 4
                await tx.skills.deleteMany();
                await tx.attributes.deleteMany();
                await tx.feats.deleteMany();
                await tx.spells.deleteMany();

                return deletedPost;
            });

            if (!deleted || typeof deleted !== "object") {
                console.error("Transaction returned unexpected value:", deleted);
                return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
            }

            return NextResponse.json("All posts deleted"); // success
        }
       
    } catch (err: any) {
        console.error("DELETE /api/post error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
