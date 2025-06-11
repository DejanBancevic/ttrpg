import prisma from '../../../lib/prisma';
import { NextResponse } from "next/server";
import { getSession } from "../../actions/getCurrentUser";



export async function POST(request: { json: () => any; }) {
    const body = await request.json()
    const { name } = body;
    const session = await getSession();
    const result = await prisma.health.create({
        data: {
            hpCurrent: name,
            hpMax: name,
            hpTemp: name,
            ac: name,
            stressCurrent: name,
            stressMax: name,
            hpLabel: name, 
            hpTempLabel: name, 
            acLabel: name, 
            stressLabel: name, 
            author: { connect: { email: session?.user?.email! } },
        },
    });

    return NextResponse.json({
        data: body
    });
}

export async function DELETE(request: { json: () => any; }) {
    const body = await request.json()
    const { name } = body;
    const session = await getSession();
    const postToDelete = await prisma.health.findFirst({
        where: {
            AND: [
                { ac: name },
                { author: { email: session?.user?.email } }
            ]
        }
    });

    if (postToDelete) {
        await prisma.health.delete({
            where: {
                id: postToDelete.id
            }
        });
        return NextResponse.json({ success: true, message: "Post deleted successfully" });
    } else {
        return NextResponse.json({ success: false, message: "Post not found or you don't have permission to delete it" }, { status: 404 });
    }
}