"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, Heart, Pencil, Trash } from "lucide-react";
import Badge from "./badge";
import MyCodeBlock from "./code-block";
import { formatDateShort } from "@/utils/date-format";
import { Tag } from "@prisma/client";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SpinnerLoading from "@/components/loading/spinner-loading";

interface SnipCardProps {
  content: string;
  id: string;
  title: string;
  tags: { tag: Tag }[];
  language: string;
  createdAt: Date;
  isLiked?: boolean;
}

const SnipCard = ({
  content,
  createdAt,
  id,
  language,
  tags,
  title,
  isLiked,
}: SnipCardProps) => {
  //

  const router = useRouter();

  const [likedLoading, setLikedLoading] = useState(false);
  const [trashedLoading, setTrashedLoading] = useState(false);

  const handleLike = async (id: string) => {
    try {
      setLikedLoading(true);
      await axios.post("/api/snippets/like", { id });
      router.refresh();
      setLikedLoading(false);
      toast.success("Successfully added");
    } catch (error) {
      toast.error("Something went wrong");
      setLikedLoading(false);
    }
  };
  const handleTrash = async (id: string) => {
    try {
      setTrashedLoading(true);
      await axios.post("/api/snippets/trash", { id });
      router.refresh();
      toast.success("Successfully removed");
      setTrashedLoading(false);
    } catch (error) {
      toast.error("Something went wrong");
      setTrashedLoading(false);
    }
  };

  return (
    <Card className="dark:bg-slate-800 border-none">
      <CardHeader className="flex gap-x-4 justify-between">
        <div>
          <Link href={`/${id}`}>
            <CardTitle className="text-md break-words line-clamp-1 hover:text-sky-500">
              {title}
            </CardTitle>
          </Link>
        </div>
        {likedLoading ? (
          <SpinnerLoading />
        ) : (
          <Heart
            onClick={() => handleLike(id)}
            className={`w-9 h-7 md:w-7  cursor-pointer transition hover:text-red-600  ${
              isLiked && "fill-red-600 text-red-600"
            }  `}
          />
        )}
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
          {trashedLoading ? (
            <SpinnerLoading />
          ) : (
            <Trash
              onClick={() => handleTrash(id)}
              className="cursor-pointer w-5 h-5 hover:text-red-600 transition"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SnipCard;
