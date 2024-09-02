"use client";

import { Button } from "@/components/ui/button";
import useTagStore from "@/store/useTagStore";
import { Tag } from "@prisma/client";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TagsList = ({ items }: { items: Tag[] }) => {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tagId = searchParams.get("tagId") || "all";
    setSelectedTag(tagId);
  }, [searchParams]);

  const handleTagClick = (tagId: string) => {
    setSelectedTag(tagId);
    router.push(tagId === "all" ? `/` : `/?tagId=${tagId}`);
  };

  return (
    <div className="min-h-[60px] bg-white dark:bg-slate-800 rounded-md py-2 px-2 md:px-4 flex justify-between items-center">
      <div className="scrollbar-hide flex items-center gap-2 w-full max-w-[61rem]  py-2 overflow-x-auto">
        <div
          onClick={() => handleTagClick("all")}
          className={`px-4 py-2 text-sm md:text-base whitespace-nowrap rounded-md font-medium text-gray-600 dark:text-gray-200 hover:text-orange-500 cursor-pointer transition duration-200 ${
            selectedTag === "all"
              ? "bg-orange-500 hover:bg-orange-400 text-white hover:text-white"
              : "bg-gray-50 dark:bg-inherit dark:hover:text-orange-500"
          }`}
        >
          All
        </div>
        {items?.map((tag) => (
          <div
            onClick={() => handleTagClick(tag.id)}
            key={tag.id}
            className={`px-4 py-2 text-sm md:text-base whitespace-nowrap rounded-md font-medium text-gray-600 dark:text-gray-200 hover:text-orange-500 cursor-pointer transition duration-200 ${
              selectedTag === tag.id
                ? "bg-orange-500 hover:bg-orange-400 text-white hover:text-white"
                : "bg-gray-50 dark:bg-inherit dark:hover:text-orange-500"
            }`}
          >
            {tag.name}
          </div>
        ))}
      </div>
      <div>
        <Link href={"/tags"}>
          <Button className="shadow-md">
            <Plus className="w-5 h-5 mr-2" /> Tag
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TagsList;
