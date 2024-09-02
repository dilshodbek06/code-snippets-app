import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    const likedSnippet = await prisma.favorite.create({
      data: {
        snippetId: id,
        userId: user.id,
      },
    });

    return NextResponse.json(likedSnippet);
  } catch (error) {
    console.log("[CREATE_LIKED_SNIPPET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
