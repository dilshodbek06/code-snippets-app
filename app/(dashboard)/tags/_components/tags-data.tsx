"use client";

import { Tag } from "@prisma/client";
import axios from "axios";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface TagsDataProps {
  items: Tag[];
}

const TagsData = ({ items }: TagsDataProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/api/tags/" + id);
      toast.success("Tag deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-3 mt-2 bg-white dark:bg-slate-800 rounded-md flex flex-wrap items-center justify-between sm:justify-normal gap-2 gap-y-3 sm:gap-4">
      {items?.map((tag) => (
        <div
          key={tag.id}
          className="flex h-full animate-background-shine items-center justify-center rounded-full gap-x-1 dark:bg-[linear-gradient(110deg,#3b4655,45%,#475569,55%,#3b4655)] bg-[length:250%_100%] px-3 sm:px-4 py-2 text-xs font-medium dark:text-gray-300 text-gray-800 bg-[linear-gradient(110deg,#f1f5f9,45%,#d6d6d6,55%,#f1f5f9)] "
        >
          {tag.name}
          <div className="flex gap-x-1 ml-2">
            <X
              onClick={() => handleDelete(tag.id)}
              className="w-5 h-5 cursor-pointer hover:text-red-600 transition"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TagsData;
