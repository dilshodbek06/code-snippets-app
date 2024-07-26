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

const SnipCard = () => {
  return (
    <Card className="dark:bg-slate-800 border-none">
      <CardHeader className="flex gap-x-4 justify-between">
        <div>
          <CardTitle className="text-md break-all">
            Card Title Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </CardTitle>
        </div>
        <Heart
          className={`w-12 h-12 cursor-pointer transition hover:text-red-600`}
        />
      </CardHeader>
      <CardContent>
        <div className="flex gap-x-1 whitespace-nowrap overflow-x-auto scrollbar-hide">
          <Badge />
          <Badge />
          <Badge />
        </div>
        <MyCodeBlock code="" language="javascript" />
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="flex items-center gap-x-1">
          <Clock className="w-4 h-4 " />
          <span className="text-sm">{formatDateShort(new Date())}</span>
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
