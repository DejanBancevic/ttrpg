import prisma from '../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../actions/getCurrentUser";

export async function POST(request: NextRequest) {
    const session = await getSession();
    const body = await request.json();

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. CREATE a new post if `body.createNew === true`
    if (body.createNew) {
        const newPost = await prisma.post.create({
            data: {
                author: { connect: { email: session.user.email } },
                health: {
                    create: body.health ?? {
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
                    create: body.basics ?? {
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
                    create: Array.isArray(body.skills) && body.skills.length > 0 ? body.skills :
                        [
                            {
                                skillName: "Add Skill Name",
                                skillValue: "0",
                                skillProf: "0",
                                skillsLabel: "Skills",
                                profsLabel: "Profs",
                            },
                        ],
                },
            },
            include: { health: true, basics: true, skills: true },
        });

        return NextResponse.json({ data: newPost });
    }

    // 2. UPDATE existing post by ID (required for multiple posts)
    if (!body.postId) {
        return NextResponse.json({ error: "Missing postId for update." }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { health: true, basics: true, skills: true },
    });

    if (!existingPost) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
        where: { id: body.postId },
        data: {
            ...(body.health && { // proveravas da li se request iz body slaze sa tim iz 
                health: { update: body.health },
            }),
            ...(body.basics && {
                basics: { update: body.basics },
            }),
        },
        include: { health: true, basics: true },
    });

    // Optional: Update individual skills
    if (Array.isArray(body.skills) && body.skills.length > 0) {
        for (const skill of body.skills) {
            if (skill.id) {
                // Update existing skill
                await prisma.skill.update({
                    where: { id: skill.id },
                    data: {
                        skillName: skill.skillName,
                        skillValue: skill.skillValue,
                        skillProf: skill.skillProf,
                    },
                });
            } else {
                // Create new skill and connect to post
                await prisma.skill.create({
                    data: {
                        skillName: skill.skillName,
                        skillValue: skill.skillValue,
                        skillProf: skill.skillProf,
                        skillsLabel: skill.skillsLabel,
                        profsLabel: skill.profsLabel,
                        post: { connect: { id: body.postId } },
                    },
                });
            }
        }
    }

    return NextResponse.json({ data: updatedPost });
}

export async function DELETE(request: NextRequest) { 
    try {
        const session = await getSession();
        const body = await request.json();

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (!body.postId) {
            return NextResponse.json({ error: "Missing postId for deletion." }, { status: 400 });
        }

        const existing = await prisma.post.findUnique({
            where: { id: body.postId },
        });

        if (!existing) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const deleted = await prisma.$transaction(async (tx) => {
            // 1. Delete the post first
            const deletedPost = await tx.post.delete({ where: { id: body.postId } });

            // 2. Then delete the related records 
            await tx.health.delete({ where: { id: existing.healthId } });
            await tx.basics.delete({ where: { id: existing.basicsId } });
            await tx.skill.deleteMany({ where: { postId: body.postId } });

            return deletedPost;
        });

        // ✅ SAFETY CHECK
        if (!deleted || typeof deleted !== "object") {
            console.error("❌ Transaction returned unexpected value:", deleted);
            return NextResponse.json({ error: "Deletion failed" }, { status: 500 });
        }

        return NextResponse.json({ id: deleted.id }); // success

    } catch (err: any) {
        console.error("🔥 DELETE /api/post error:", err?.message ?? err);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    const session = await getSession();

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let posts = await prisma.post.findMany({
        where: {
            author: { email: session.user.email },
        },
        include: { health: true, basics: true, skills: true },
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
                        [
                            {
                                skillName: "Add Skill Name",
                                skillValue: "0",
                                skillProf: "0",
                                skillsLabel: "Skills",
                                profsLabel: "Profs",
                            },
                        ],
                },
            },
            include: { health: true, basics: true, skills: true },
        });

        posts = [createdPost];
    }

    return NextResponse.json({ data: posts });
}
