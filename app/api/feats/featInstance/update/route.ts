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

    if (!body.id || !body.featInstance) {
        return NextResponse.json({ error: "Missing featInstanceId or featInstance payload" }, { status: 400 });
    }

    const featData = body.featInstance;

    try {
        const updated = await prisma.featInstance.update({
            where: { id: body.id },
            data: {
                featName: featData.featName,
                featChargeLabel: featData.featChargeLabel,
                featChargeCurrent: featData.featChargeCurrent,
                featChargeMax: featData.featChargeMax,
                featText: featData.featText,
            },
        });

        return NextResponse.json({ data: updated });
    } catch (error) {
        console.error("❌ FeatInstance update error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}