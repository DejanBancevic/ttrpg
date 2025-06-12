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

    const existing = await prisma.health.findFirst({
        where: {
            author: {
                email: session.user.email,
            }
        }
    });

    let result;

    if (existing) {
        result = await prisma.health.update({
            where: { id: existing.id },
            data: body, 
        });
    } else {
        result = await prisma.health.create({
            data: {
                ...body,
                author: { connect: { email: session.user.email } },
            },
        });
    }

    return NextResponse.json({ data: result });
}

export async function GET(request: NextRequest) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let existing = await prisma.health.findFirst({
        where: {
            author: { email: session.user.email },
        },
    });

    // Create default if it doesn't exist
    if (!existing) {
        existing = await prisma.health.create({
            data: {
                hpCurrent: "0",
                hpMax: "0",
                hpTemp: "0",
                ac: "0",
                stressCurrent: "0",
                stressMax: "0",
                hpLabel: "HP",
                hpTempLabel: "Temp",
                acLabel: "AC",
                stressLabel: "Stress",
                author: { connect: { email: session.user.email } },
            },
        });
    }

    return NextResponse.json({ data: existing });
}
