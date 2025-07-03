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

    if (!body.id) {
        return NextResponse.json({ error: "Missing passives id" }, { status: 400 });
    }

    if (!body.section) {
        return NextResponse.json({ error: "Missing passive section string" }, { status: 400 });
    }

    if (body.section === "first") {
        const passiveInstance = await prisma.passiveFirstInstance.create({
            data: {
                passiveName: "Passive",
                passiveValue: "0",
                passives: {
                    connect: { id: body.id },
                },
            },
            include: {
                passives: true,
            }
        },);

        return NextResponse.json({ body: passiveInstance });

    } else if (body.section === "second") {
        const passiveInstance = await prisma.passiveSecondInstance.create({
            data: {
                passiveName: "Passive",
                passiveValue: "0",
                passives: {
                    connect: { id: body.id },
                },
            },
            include: {
                passives: true,
            }
        },);

        return NextResponse.json({ body: passiveInstance });

    } else if (body.section === "third") {
        const passiveInstance = await prisma.passiveThirdInstance.create({
            data: {
                passiveName: "Passive",
                passiveValue: "0",
                passives: {
                    connect: { id: body.id },
                },
            },
            include: {
                passives: true,
            }
        },);

        return NextResponse.json({ body: passiveInstance });

    } else {
        return NextResponse.json({ error: "This section doesnt exist" }, { status: 404 });
    }
}