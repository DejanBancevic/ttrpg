import prisma from '../../../../lib/prisma';
import { getSession } from "../../../actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const session = await getSession();
    const body = await request.json();
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    

    let post = await prisma.post.findFirst({
        where: {
            id: body.postId,
            author: { email: session.user.email },
        },
        select: {
            skills: {
                include: {
                    skillInstance: true,
                }
            }
        },
       
    });

    //console.log(JSON.stringify(post, null, 2));
    return NextResponse.json({ data: post?.skills?.skillInstance ?? [] });
}