import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOp";

export async function DELETE(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (session?.user?.email === "dejanbancevic@gmail.com") {

            const deleted = await prisma.$transaction(async (tx) => {
                const deletedPost = await tx.post.deleteMany();

                await tx.health.deleteMany();
                await tx.basics.deleteMany(); 4
                await tx.skills.deleteMany();
                await tx.attributes.deleteMany();
                await tx.feats.deleteMany();
                await tx.spells.deleteMany();
                await tx.passives.deleteMany();
                await tx.inventory.deleteMany();

                return deletedPost;
            });

            if (!deleted || typeof deleted !== "object") {
                console.error("Transaction returned unexpected value:", deleted);
                return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
            }

            return NextResponse.json("All posts deleted");
        }

    } catch (err: any) {
        console.error("DELETE /api/post error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
