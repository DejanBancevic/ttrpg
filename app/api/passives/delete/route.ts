import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOp";

export async function DELETE(request: NextRequest) {
    try {
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

            const passiveInstance = await prisma.passiveFirstInstance.findUnique({
                where: { id: body.id },
                include: {
                    passives: {
                        include: {
                            post: {
                                select: {
                                    author: { select: { email: true } },
                                },
                            },
                        }
                    }
                },
            })

            if (!passiveInstance || passiveInstance.passives?.post?.author?.email !== session.user.email) {
                return NextResponse.json({ error: "Not authorized to delete this passive" }, { status: 403 });
            }

            await prisma.passiveFirstInstance.delete({
                where: { id: body.id },
            });

            return NextResponse.json({ success: true });

        } else if (body.section === "second") {

            const passiveInstance = await prisma.passiveSecondInstance.findUnique({
                where: { id: body.id },
                include: {
                    passives: {
                        include: {
                            post: {
                                select: {
                                    author: { select: { email: true } },
                                },
                            },
                        }
                    }
                },
            })

            if (!passiveInstance || passiveInstance.passives?.post?.author?.email !== session.user.email) {
                return NextResponse.json({ error: "Not authorized to delete this passive" }, { status: 403 });
            }

            await prisma.passiveSecondInstance.delete({
                where: { id: body.id },
            });

            return NextResponse.json({ success: true });

        } else if (body.section === "third") {

            const passiveInstance = await prisma.passiveThirdInstance.findUnique({
                where: { id: body.id },
                include: {
                    passives: {
                        include: {
                            post: {
                                select: {
                                    author: { select: { email: true } },
                                },
                            },
                        }
                    }
                },
            })

            if (!passiveInstance || passiveInstance.passives?.post?.author?.email !== session.user.email) {
                return NextResponse.json({ error: "Not authorized to delete this passive" }, { status: 403 });
            }

            await prisma.passiveThirdInstance.delete({
                where: { id: body.id },
            });

            return NextResponse.json({ success: true });


        } else {
            return NextResponse.json({ error: "This section doesnt exist" }, { status: 404 });
        }

    } catch (err: any) {
        console.error(" DELETE /api/passives error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}