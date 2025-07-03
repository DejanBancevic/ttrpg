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

    if (!body.postId || !body.attributes) {
        return NextResponse.json({ error: "Missing postId or attributes payload" }, { status: 400 });
    }

    const existingPost = await prisma.post.findUnique({
        where: { id: body.postId },
        include: { attributes: true },
    });

    if (!existingPost || !existingPost.attributes?.id) {
        return NextResponse.json({ error: "Post or attributes group not found" }, { status: 404 });
    }

    const attributesData = body.attributes;

    // Update or create instances
    if (Array.isArray(attributesData.attributeInstance)) {
        for (const attribute of attributesData.attributeInstance) {

            if (attribute.id) {
                await prisma.attributeInstance.update({
                    where: { id: attribute.id },
                    data: {
                        attributeName: attribute.attributeName,
                        attributeValue: attribute.attributeValue,
                        attributeMod: attribute.attributeMod,
                        attributeSave: attribute.attributeSave,
                        attributeColor: attribute.attributeColor,
                    },
                });

            } else {
                await prisma.attributeInstance.create({
                    data: {
                        attributeName: attribute.attributeName,
                        attributeValue: attribute.attributeValue,
                        attributeMod: attribute.attributeMod,
                        attributeSave: attribute.attributeSave,
                        attributeColor: attribute.attributeColor,
                        attributes: { connect: { id: existingPost.attributes.id } },
                    },
                });
            }
        }
    }

    const updatedAttributes = await prisma.attributes.findUnique({
        where: { id: existingPost.attributes.id },
        include: {
            attributeInstance: {
                orderBy: {
                    attributeName: 'asc',
                },
            },
        },
    });

    return NextResponse.json({ data: updatedAttributes });
}