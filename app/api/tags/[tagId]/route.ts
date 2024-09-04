import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { log } from "console";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    const result = await prisma.tag.delete({
      where: {
        id: params.tagId,
        userId: user?.id,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.log("[DELETE_TAG]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export default async function PUT(
  req: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const { name } = await req.json();

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    const result = await prisma.tag.update({
      where: {
        id: params.tagId,
        userId: user?.id,
      },
      data: {
        name: name,
      },
    });
  } catch (error) {
    console.log("UPDATE_TAG");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
