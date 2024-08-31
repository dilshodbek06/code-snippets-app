// https://gist.github.com/enesien/03ba5340f628c6c812b306da5fedd1a4

import prisma from "@/lib/db";
import SnippetsForm from "./_components/Snippets-form";
import { auth } from "@clerk/nextjs/server";

const SnippetCreatePage = async () => {
  const { userId } = auth();

  const tags = await prisma.tag.findMany({
    where: {
      user: {
        clerkId: userId!,
      },
    },
  });

  return (
    <div className="min-h-[96vh] py-4 px-1 sm:p-4">
      <h2 className="text-2xl font-medium text-gray-700 dark:text-gray-200">
        Create a new Snippet
      </h2>
      <div className="mt-6">
        <SnippetsForm
          initialData={{
            title: "",
            content: "",
            tags: tags.map((tag) => ({ label: tag.name, value: tag.id })) ?? [],
          }}
        />
      </div>
    </div>
  );
};

export default SnippetCreatePage;
