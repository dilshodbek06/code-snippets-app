import prisma from "@/lib/db";
import Header from "../_components/header";
import LikedSnippetsList from "./_components/liked-snippets-list";
import { auth } from "@clerk/nextjs/server";

const FavoritesPage = async () => {
  const { userId } = auth();

  const likedSnippets = await prisma.favorite.findMany({
    where: {
      user: {
        clerkId: userId!,
      },
    },
    select: {
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
      createdAt: "desc",
    },
  });

  // Transforming the data to match the expected type
  const transformedSnippets = likedSnippets.map((favorite) => ({
    id: favorite.snippet.id,
    title: favorite.snippet.title,
    language: favorite.snippet.language,
    content: favorite.snippet.content,
    createdAt: favorite.snippet.createdAt,
    tags: favorite.snippet.tags,
  }));

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mt-4">
        <LikedSnippetsList items={transformedSnippets ?? []} />
      </div>
    </div>
  );
};

export default FavoritesPage;
