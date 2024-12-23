"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "@prisma/client";
import { Clock, Heart, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import Badge from "../../_components/badge";
import MyCodeBlock from "../../_components/code-block";
import { formatDateShort } from "@/utils/date-format";

import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import SpinnerLoading from "@/components/loading/spinner-loading";

interface SnipCardProps {
  content: string;
  id: string;
  title: string;
  tags: { tag: Tag }[];
  language: string;
  createdAt: Date;
}
const LikedCard = ({
  content,
  createdAt,
  id,
  language,
  tags,
  title,
}: SnipCardProps) => {
  const router = useRouter();
  const [likedLoading, setLikedLoading] = useState(false);

  const handleRemoveLiked = async (id: string) => {
    try {
      setLikedLoading(true);
      await axios.post("/api/snippets/unlike", { id });
      router.refresh();
      toast.success("Successfully removed");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLikedLoading(false);
    }
  };

  return (
    <Card className="dark:bg-slate-800 border-none">
      <CardHeader className="flex gap-x-4 justify-between items-center py-2">
        <div>
          <Link href={`/${id}`}>
            <CardTitle className="text-md break-words line-clamp-1 hover:text-sky-500">
              {title}
            </CardTitle>
          </Link>
        </div>
        <div>
          {likedLoading ? (
            <SpinnerLoading />
          ) : (
            <Heart
              onClick={() => handleRemoveLiked(id)}
              className={`w-6 h-6 cursor-pointer transition fill-red-600 text-red-600`}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-x-1 whitespace-nowrap overflow-x-auto scrollbar-hide">
          {tags.map(({ tag }) => (
            <Badge key={tag.id} name={tag.name} />
          ))}
        </div>
        <MyCodeBlock code={content} language={language} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="flex items-center gap-x-1">
          <Clock className="w-4 h-4 " />
          <span className="text-sm">{formatDateShort(createdAt)}</span>
        </p>
        <div className="flex gap-x-3 items-center">
          <Pencil className="cursor-pointer w-5 h-5 hover:text-sky-600 transition" />
          <Trash className="cursor-pointer w-5 h-5 hover:text-red-600 transition" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default LikedCard;
