import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOp";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    const body = await request.json();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body.postId) {
        return NextResponse.json({ error: "Missing postId for update." }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { health: true, basics: true, },
    });

    if (!existingPost) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
        where: { id: body.postId },
        data: {
            ...(body.health && { // proveravas da li se request iz body slaze sa tim iz 
                health: { update: body.health },
            }),
            ...(body.basics && {
                basics: { update: body.basics },
            }),
            ...(body.notes && {
                notes: body.notes,
            }),
        },
        include: {
            health: true,
            basics: true,
        },
    });

    return NextResponse.json({ data: updatedPost });
}
