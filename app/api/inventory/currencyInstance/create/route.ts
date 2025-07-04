import prisma from '../../../../../lib/prisma';
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
        return NextResponse.json({ error: "Missing currencyInstance id" }, { status: 400 });
    }

    const newCurrencyInstance = await prisma.currencyInstance.create({
        data: {
            currenyValue: "0",
            currenyLabel: "x",
            inventory: {
                connect: { id: body.id },
            },
        },
        include: {
            inventory: true,
        }
    },);

    return NextResponse.json({ body: newCurrencyInstance });
}