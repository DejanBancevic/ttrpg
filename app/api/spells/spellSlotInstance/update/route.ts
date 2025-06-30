import prisma from '../../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "../../../../actions/getCurrentUser";

interface spellInstanceData {
    id: string;
    spellNameValue: string;
    spellValue1: string;
    spellValue2: string;
    spellValue3: string;
    spellValue4: string;
}


export async function POST(request: NextRequest) {
    const session = await getSession();
    const body = await request.json(); 
    

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!body.postId || !body.spells) {
        return NextResponse.json({ error: "Missing postId or spells payload" }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { spells: true },
    });

    if (!existingPost || !existingPost.spells?.id) {
        return NextResponse.json({ error: "Post or spells group not found" }, { status: 404 });
    }
    
    const spellsData = body.spells;

    // Update or create spell slot instances
    if (Array.isArray(spellsData.spellSlotInstance)) {
        for (const spellSlot of spellsData.spellSlotInstance) {

            if (spellSlot.id) {
                await prisma.spellSlotInstance.update({
                    where: { id: spellSlot.id },
                    data: {
                        spellSlotBoxLabel: spellSlot.spellSlotBoxLabel,
                        spellSlotLabel: spellSlot.spellSlotLabel,
                        spellSlotCurrent: spellSlot.spellSlotCurrent,
                        spellSlotMax: spellSlot.spellSlotMax,
                        spellNameLabel: spellSlot.spellNameLabel,
                        spellLabel1: spellSlot.spellLabel1,
                        spellLabel2: spellSlot.spellLabel2,
                        spellLabel3: spellSlot.spellLabel3,
                        spellLabel4: spellSlot.spellLabel4,
                    },
                });
                console.log("UPDATED BABY")
            } else {
                const data: any = {
                    spellSlotBoxLabel: spellSlot.spellSlotBoxLabel,
                    spellSlotLabel: spellSlot.spellSlotLabel,
                    spellSlotCurrent: spellSlot.spellSlotCurrent,
                    spellSlotMax: spellSlot.spellSlotMax,
                    spellNameLabel: spellSlot.spellNameLabel,
                    spellLabel1: spellSlot.spellLabel1,
                    spellLabel2: spellSlot.spellLabel2,
                    spellLabel3: spellSlot.spellLabel3,
                    spellLabel4: spellSlot.spellLabel4,
                    spells: { connect: { id: existingPost.spells.id } },
                };

                if (Array.isArray(spellSlot.spellInstance)) {
                    data.spellInstance = {
                        create: spellSlot.spellInstance.map((instance: Partial<spellInstanceData>)  => ({
                            spellNameValue: instance.spellNameValue ?? '',
                            spellValue1: instance.spellValue1 ?? '',
                            spellValue2: instance.spellValue2 ?? '',
                            spellValue3: instance.spellValue3 ?? '',
                            spellValue4: instance.spellValue4 ?? '',
                        })),
                    };
                }

                await prisma.spellSlotInstance.create({ data });
            }
        }
    } else {  // Update labels & non-nested
        await prisma.spells.update({
            where: { id: existingPost.spells.id },
            data: {
                ...(spellsData.spellsLabel && { spellsLabel: spellsData.spellsLabel }),
                ...(spellsData.spellsModifierLabel && { spellsModifierLabel: spellsData.spellsModifierLabel }),
                ...(spellsData.spellsAttackLabel && { spellsAttackLabel: spellsData.spellsAttackLabel }),
                ...(spellsData.spellsSaveLabel && { spellsSaveLabel: spellsData.spellsSaveLabel }),
                ...(spellsData.spellsModifier && { spellsModifier: spellsData.spellsModifier }),
                ...(spellsData.spellsAttack && { spellsAttack: spellsData.spellsAttack }),
                ...(spellsData.spellsSave && { spellsSave: spellsData.spellsSave }),
            },
        });
    }

    const updatedSpells = await prisma.spells.findUnique({
        where: { id: existingPost.spells.id },
        include: {
            spellSlotInstance: {
                orderBy: {
                    spellSlotBoxLabel: 'asc',
                },
                include: {
                    spellInstance: {
                        orderBy: {
                            spellNameValue:"asc",
                        },
                    },
                },
            },
        },
    });

    if (!updatedSpells) {
        console.error("❌ Could not load updatedSpells for id:", existingPost.spells.id);
        return NextResponse.json({ error: "Failed to fetch updated spell data" }, { status: 500 });
    }

    return NextResponse.json({ data: updatedSpells });
}