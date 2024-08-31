import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
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

    const tag = await prisma.tag.create({
      data: {
        name,
        userId: user?.id,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[CREATE_TAG]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
