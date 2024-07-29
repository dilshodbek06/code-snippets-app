import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TagsList = () => {
  const tags = [
    {
      id: 1,
      title: "Javascript",
    },
    {
      id: 2,
      title: "Typescript",
    },
    {
      id: 3,
      title: "React JS",
    },
    {
      id: 4,
      title: "Java",
    },
    {
      id: 5,
      title: "Python",
    },
  ];
  const a = 1;

  return (
    <div className="min-h-[60px] bg-white dark:bg-slate-800 rounded-md py-2 px-2 md:px-4 flex justify-between items-center">
      <div className="scrollbar-hide flex items-center gap-2 w-full max-w-[61rem]  py-2 overflow-x-auto">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`px-4 py-2 text-sm md:text-base whitespace-nowrap rounded-md font-medium text-gray-600 dark:text-gray-200 hover:text-orange-500 cursor-pointer transition duration-200 ${
              a === tag.id
                ? "bg-orange-500 hover:bg-orange-400 text-white hover:text-white"
                : "bg-gray-50 dark:bg-inherit dark:hover:text-orange-500"
            }`}
          >
            {tag.title}
          </div>
        ))}
      </div>
      <div>
        <Button className="shadow-md">
          <Plus className="w-5 h-5 mr-2" /> Tag
        </Button>
      </div>
    </div>
  );
};

export default TagsList;
