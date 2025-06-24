import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const session = await getSession();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const newPost = await prisma.post.create({
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
                                skillName: "Add Skill Name",
                                skillValue: "0",
                                skillProf: "0",
                            },
                        ],
                    },
                },
            },
            attributes: {
                create: {
                    attributeInstance: {
                        create: [
                            {
                                attributeName: "Attribute",
                                attributeValue: "0",
                                attributeMod: "0",
                                attributeSave: "0",
                                attributeColor: "0",
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
            attributes: {
                include: {
                    attributeInstance: true,
                },
            },
        },
    });

    return NextResponse.json({ data: newPost });

}