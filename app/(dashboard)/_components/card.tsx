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

interface SnipCardProps {
  content: string;
  id: string;
  title: string;
  tags: { tag: Tag }[];
  language: string;
  createdAt: Date;
}

const SnipCard = ({
  content,
  createdAt,
  id,
  language,
  tags,
  title,
}: SnipCardProps) => {
  return (
    <Card className="dark:bg-slate-800 border-none">
      <CardHeader className="flex gap-x-4 justify-between">
        <div>
          <Link href={`/${id}`}>
            <CardTitle className="text-md break-all hover:text-sky-500">
              {title}
            </CardTitle>
          </Link>
        </div>
        <Heart
          className={`w-7 h-7  cursor-pointer transition hover:text-red-600`}
        />
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

export default SnipCard;
