import prisma from "@/lib/db";
import Header from "../_components/header";
import TagsData from "./_components/tags-data";
import TagsForm from "./_components/tags-form";
import { auth } from "@clerk/nextjs/server";

const TagsPage = async () => {
  const { userId } = auth();

  const tags = await prisma.tag.findMany({
    where: {
      user: {
        clerkId: userId!,
      },
    },
  });
  return (
    <div className="min-h-[96.2vh]">
      <div>
        <Header isInputVisible={false} />
      </div>
      <TagsForm initialData={{ name: "" }} />
      <TagsData items={tags || []} />
    </div>
  );
};

export default TagsPage;
