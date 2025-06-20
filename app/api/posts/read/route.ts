import prisma from '../../../../lib/prisma';
import { getSession } from "../../../actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let posts = await prisma.post.findMany({
        where: {
            author: { email: session.user.email },
        },
        include: {
            health: true,
            basics: true,
            skills: {
                include: {
                    skillInstance: true,
                },
            },
        },
    });

    // Create default if it doesn't exist
    if (posts.length === 0) {
        const createdPost = await prisma.post.create({
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
                    },
                },
                basics: {
                    create: {
                        imageUrl: "https://ik-minis.com/cdn/shop/products/bk-square.jpg",
                        name: "John Doe",
                        desc: "No description",
                        level: "0",
                        xp: "0",
                        levelLabel: "Level",
                        xpLabel: "XP",
                    },
                },
                skills: {
                    create:
                    {
                        skillsLabel: "Skills",
                        profsLabel: "Profs",
                        skillInstance: {
                            create: [
                                {
                                    id: "0",
                                    skillName: "Add Skill Name",
                                    skillValue: "0",
                                    skillProf: "0",
                                },
                            ],
                        },
                    },
                },
            },
            include: {
                health: true,
                basics: true,
                skills: {
                    include: {
                        skillInstance: true,
                    },
                },
            },
        });

        posts = [createdPost];
    }
    
    //console.log(JSON.stringify(posts, null, 2));
    return (NextResponse.json({ data: posts }))
    
}