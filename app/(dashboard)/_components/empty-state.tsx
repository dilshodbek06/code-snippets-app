import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmptyState = () => {
  return (
    <div className="p-4 flex justify-center flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide lucide-file-x-2 w-14 h-14 mb-4"
      >
        <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="m8 12.5-5 5" />
        <path d="m3 12.5 5 5" />
      </svg>

      <h2 className="text-md opacity-90 font-semibold mb-2 break-words text-center">
        you don`t have a snippet yet
      </h2>
      <Link href={"/create"}>
        <Button className="mt-2">+ Create</Button>
      </Link>
    </div>
  );
};

export default EmptyState;
