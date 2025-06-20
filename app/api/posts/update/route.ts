import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const session = await getSession();
    const body = await request.json();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //UPDATE existing post by ID (required for multiple posts)
    if (!body.postId) {
        return NextResponse.json({ error: "Missing postId for update." }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { health: true, basics: true, skills: true },
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
        
        },
        include: {
            health: true,
            basics: true,
          
        },
    });

    return NextResponse.json({ data: updatedPost });
}
