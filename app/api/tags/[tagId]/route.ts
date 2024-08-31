import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
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
