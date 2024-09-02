import prisma from "@/lib/db";
import Header from "../_components/header";
import TrashedSnippetsList from "./_components/trashed-snippets-list";
import { auth } from "@clerk/nextjs/server";

const TrashPage = async () => {
  const { userId } = auth();

  const trashedSnippets = await prisma.trash.findMany({
    where: {
      user: {
        clerkId: userId!,
      },
    },
    select: {
      deletedAt: true,
      snippet: {
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
        },
      },
    },

    orderBy: {
      deletedAt: "desc",
    },
  });

  // Transforming the data to match the expected type
  const transformedSnippets = trashedSnippets.map((trash) => ({
    id: trash.snippet.id,
    title: trash.snippet.title,
    language: trash.snippet.language,
    content: trash.snippet.content,
    createdAt: trash.snippet.createdAt,
    tags: trash.snippet.tags,
    deletedAt: trash.deletedAt,
  }));

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mt-4">
        <TrashedSnippetsList items={transformedSnippets ?? []} />
      </div>
    </div>
  );
};

export default TrashPage;
