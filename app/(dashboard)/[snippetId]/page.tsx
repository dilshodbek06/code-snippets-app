import prisma from "@/lib/db";
import Header from "../_components/header";
import { auth } from "@clerk/nextjs/server";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Heart, Pencil, Trash } from "lucide-react";
import { formatDateShort } from "@/utils/date-format";
import Badge from "../_components/badge";
import MyCodeBlock from "../_components/code-block";

const SnippetIdPage = async ({
  params: { snippetId },
}: {
  params: { snippetId: string };
}) => {
  const { userId } = auth();

  const currentSnippet = await prisma.snippet.findFirst({
    where: {
      user: {
        clerkId: userId!,
      },
      id: snippetId,
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
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-[96.2vh]">
      <div>
        <Header isInputVisible={false} />
      </div>
      <div className="mt-5 min-h-[30rem] flex justify-center">
        <Card className="dark:bg-slate-800 border-none max-w-[42rem] w-full p-1 sm:p-3 h-max">
          <CardHeader className="flex gap-x-4 justify-between">
            <div>
              <CardTitle className="text-lg break-all hover:text-sky-500">
                {currentSnippet?.title}
              </CardTitle>
            </div>
            <Heart
              className={`w-7 h-7  cursor-pointer transition hover:text-red-600`}
            />
          </CardHeader>
          <CardContent>
            <div className="flex gap-x-1 whitespace-nowrap overflow-x-auto scrollbar-hide">
              {currentSnippet?.tags.map(({ tag }) => (
                <Badge key={tag.id} name={tag.name} />
              ))}
            </div>

            <div className="mt-4">
              <MyCodeBlock
                code={currentSnippet?.content ?? ""}
                language={currentSnippet?.language ?? "javascript"}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between mt-2">
            <p className="flex items-center gap-x-1">
              <Clock className="w-4 h-4 " />
              <span className="text-sm">
                {formatDateShort(currentSnippet?.createdAt!)}
              </span>
            </p>
            <div className="flex gap-x-3 items-center">
              <Pencil className="cursor-pointer w-5 h-5 hover:text-sky-600 transition" />
              <Trash className="cursor-pointer w-5 h-5 hover:text-red-600 transition" />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SnippetIdPage;
