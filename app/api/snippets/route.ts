import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { title, content, tags, language } = await req.json();

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

    // const tagConnections = await Promise.all(
    //   tags.map(async (tag: { value: string }) => {
    //     const existingTag = await prisma.tag.findUnique({
    //       where: {
    //         id: tag.value,
    //       },
    //     });
    //     return existingTag;
    //   })
    // );
    // console.log(tagConnections, "+++");

    // // Create a new snippet with the processed tags
    // const snippet = await prisma.snippet.create({
    //   data: {
    //     title,
    //     content,
    //     language,
    //     userId: user.id,
    //   },
    //   include: {
    //     tags: true,
    //   },
    // });

    const tagIds = tags.map(
      (tag: { label: string; value: string }) => tag.value
    ); // Extract tag IDs

    // 4. Create snippet with proper relationships:
    const snippet = await prisma.snippet.create({
      data: {
        title,
        content,
        language,
        userId: user.id,
        tags: {
          create: tagIds.map((tagId: string) => ({
            tag: {
              connect: { id: tagId },
            },
          })),
        },
      },
      include: { tags: true },
    });

    return NextResponse.json(snippet);
  } catch (error) {
    console.log("[CREATE_SNIPPET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
