"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tag } from "@prisma/client";
import { useRouter } from "next/navigation";
import Badge from "../../_components/badge";
import MyCodeBlock from "../../_components/code-block";
import { formatDateShort } from "@/utils/date-format";
import { Clock, Pencil, RotateCcw, Trash } from "lucide-react";
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
  deletedAt: Date;
}

const TrashedCard = ({
  content,
  createdAt,
  language,
  tags,
  title,
  deletedAt,
  id,
}: SnipCardProps) => {
  const router = useRouter();

  const [trashedLoading, setTrashedLoading] = useState(false);

  const handleReset = async (id: string) => {
    try {
      setTrashedLoading(true);
      await axios.post("/api/snippets/reset", { id });
      router.refresh();
      toast.success("Successfully reset");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setTrashedLoading(false);
    }
  };

  return (
    <Card className="dark:bg-slate-800 border-none">
      <CardHeader className="flex gap-x-4 justify-between">
        <div>
          <CardTitle className="text-md">{title}</CardTitle>
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
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatDateShort(deletedAt)}</span>
        </p>
        <div className="flex gap-x-3 items-center">
          <Pencil className="cursor-pointer w-5 h-5 hover:text-sky-600 transition" />
          {trashedLoading ? (
            <SpinnerLoading />
          ) : (
            <RotateCcw
              onClick={() => handleReset(id)}
              className="cursor-pointer w-5 h-5 hover:text-red-600 transition"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrashedCard;
