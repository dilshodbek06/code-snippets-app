import prisma from "@/lib/db";
import Header from "./_components/header";
import SnippetsList from "./_components/snippets-list";
import TagsList from "./_components/tags-list";
import { auth } from "@clerk/nextjs/server";

interface HomeProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Home({ searchParams }: HomeProps) {
  const { userId } = auth();
  const selectedTagId = searchParams?.tagId || null;

  const tags = await prisma.tag.findMany({
    where: {
      user: {
        clerkId: userId!,
      },
    },
  });

  const snippets = await prisma.snippet.findMany({
    where: {
      user: {
        clerkId: userId!,
      },
      trash: null,
      ...(selectedTagId
        ? {
            tags: {
              some: {
                tagId: selectedTagId,
              },
            },
          }
        : {}),
    },
    select: {
      content: true,
      createdAt: true,
      id: true,
      language: true,
      title: true,
      tags: {
        select: {
          tag: true,
        },
      },
      favorites: {
        select: {
          snippetId: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-[96.2vh]">
      <div>
        <Header isInputVisible />
      </div>
      <div className="mt-4">
        <TagsList items={tags || []} />
      </div>
      <div className="mt-4">
        <SnippetsList items={snippets} />
      </div>
    </div>
  );
}
