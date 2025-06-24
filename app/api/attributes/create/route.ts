import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const session = await getSession();
    const body = await request.json();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body.id) {
        return NextResponse.json({ error: "Missing Attributes Id" }, { status: 400 });
    }

    const newAttributeInsatance = await prisma.attributeInstance.create(
        {
            data: {
                attributeName: "Attribute",
                attributeValue: "0",
                attributeMod: "0",
                attributeSave: "0",
                attributeColor: "0",
                attributes: {
                    connect: {
                        id: body.id,
                    },
                },
            },
            include: {
                attributes: true,
            },
        },
    );

    return NextResponse.json({ body: newAttributeInsatance });
}