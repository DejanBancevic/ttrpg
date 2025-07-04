import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOp";

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);

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
            feats: {
                create: {
                    featsLabel: "Features & Traits",
                    featInstance: {
                        create: [
                            {
                                featName: "Feat Name",
                                featChargeLabel: "Charges",
                                featChargeCurrent: "0",
                                featChargeMax: "0",
                                featText: "Feat Description",
                            },
                        ],
                    },
                },
            },
            spells: {
                create: {
                    spellsLabel: "Spells",
                    spellsModifierLabel: "Modifier",
                    spellsAttackLabel: "Spell Attack",
                    spellsSaveLabel: "Save DC",
                    spellsModifier: "0",
                    spellsAttack: "0",
                    spellsSave: "0",
                    spellSlotInstance: {
                        create: [
                            {
                                spellSlotBoxLabel: "",
                                spellSlotLabel: "Slots",
                                spellSlotCurrent: "0",
                                spellSlotMax: "0",
                                spellNameLabel: "Name",
                                spellLabel1: "Time",
                                spellLabel2: "Conc",
                                spellLabel3: "Range",
                                spellLabel4: "Hit",
                                spellInstance: {
                                    create: [
                                        {
                                            spellNameValue: "Spell Name",
                                            spellValue1: "0",
                                            spellValue2: "0",
                                            spellValue3: "0",
                                            spellValue4: "0",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
            },
            passives: {
                create: {
                    passiveLabel: "Passives & Proficiencies",
                    passiveFirstInstance: {
                        create: [
                            {
                                passiveName: "Passive",
                                passiveValue: "0",
                            },
                        ],
                    },
                    passiveSecondInstance: {
                        create: [
                            {
                                passiveName: "Passive",
                                passiveValue: "0",
                            },
                        ],
                    },
                    passiveThirdInstance: {
                        create: [
                            {
                                passiveName: "Passive",
                                passiveValue: "0",
                            },
                        ],
                    },
                },
            },
            inventory: {
                create: {
                    invLabel: "Inventory",
                    invWeightLabel: "Weight",
                    invWeightCurrent: "0",
                    invWeightMax: "0",
                    invWeightUnit: "kg",
                    invCurrenyLabel: "Currency",
                    invBagAllLabel: "All",
                    currencyInstance: {
                        create: [
                            {
                                currenyValue: "0",
                                currenyLabel: "x",
                            },
                        ],
                    },
                    bagInstance: {
                        create: [
                            {
                                bagLabel: "Bag",
                                itemNameLabel: "Name",
                                itemLabel1: "Hit",
                                itemLabel2: "Dmg",
                                itemLabel3: "Range",
                                itemLabel4: "Value",
                                itemLabel5: "#",
                                itemInstance: {
                                    create: [
                                        {
                                            itemName: "Item",
                                            itemValue1: "0",
                                            itemValue2: "0",
                                            itemValue3: "0",
                                            itemValue4: "0",
                                            itemValue5: "0",
                                        },
                                    ],
                                },
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
            feats: {
                include: {
                    featInstance: true,
                },
            },
            spells: {
                include: {
                    spellSlotInstance: {
                        include: {
                            spellInstance: true,
                        }
                    }
                },
            },
            passives: {
                include: {
                    passiveFirstInstance: true,
                    passiveSecondInstance: true,
                    passiveThirdInstance: true,
                },
            },
            inventory: {
                include: {
                    currencyInstance: true,
                    bagInstance: {
                        include: {
                            itemInstance: true,
                        },
                    },
                },
            },
        },
    });

    return NextResponse.json({ data: newPost });

}