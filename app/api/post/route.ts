import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const body = await request.json()
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json(
            { error: "Unauthorized: No valid session or user email found." },
            { status: 401 }
        );
    }

    const post = await prisma.post.findFirst({
        where: {
            author: {
                email: session.user.email,
            },
        },
        include: {
            health: true, // because Prisma doesn’t automatically fetch related models unless you explicitly ask for them.
            basics: true,
        },
    });

    if (!post) {
        return NextResponse.json({ error: "Post record not found" }, { status: 404 });
    }

    const data: any = {};

    if (body.health) {
        data.health = {
            update: body.health,
        };
    }

    if (body.basics) {
        data.basics = {
            update: body.basics,
        };
    }

    const updatedPost = await prisma.post.update({
        where: { id: post.id },
        data: data,
        include: {
            health: true,
            basics: true,
        },
        
    });


    return NextResponse.json({ data: updatedPost });
}

export async function GET(request: NextRequest) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    let post = await prisma.post.findFirst({
        where: {
            author: { email: userEmail },
        },
        include: { health: true, basics: true },
    });

    // Create default if it doesn't exist
    if (!post) {
        post = await prisma.post.create({
            data: {
                author: { connect: { email: session.user.email } },
                health: {
                    create: {
                        hpCurrent: "0",
                        hpMax: "0",
                        hpTemp: "0",
                        ac: "0",
                        stressCurrent: "0",
                        stressMax: "0",
                        hpLabel: "HP",
                        hpTempLabel: "Temp",
                        acLabel: "AC",
                        stressLabel: "Addons",
                        author: { connect: { email: session.user.email } },
                    }
                },
                basics: {
                    create: {
                        imageUrl: "https://ik-minis.com/cdn/shop/products/bk-square.jpg",
                        name: "0",
                        desc: "0",
                        level: "0",
                        xp: "0",
                        levelLabel: "Level",
                        xpLabel: "XP",
                        author: { connect: { email: session.user.email } },
                    }
                },
            },
            include: { health: true, basics: true },
        });
    }

    return NextResponse.json({ data: post });
}
