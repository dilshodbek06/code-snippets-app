import { Tag } from "@prisma/client";
import SnipCard from "./card";
import EmptyState from "./empty-state";

type SnippetWithTags = {
  id: string;
  title: string;
  language: string;
  content: string;
  createdAt: Date;
  tags: { tag: Tag }[];
};

interface SnippetsListProps {
  items: SnippetWithTags[];
}
const SnippetsList = ({ items }: SnippetsListProps) => {
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items.length === 0 && (
        <div className="h-full mx-auto flex items-center justify-center col-span-full">
          <EmptyState />
        </div>
      )}
      {items?.map((item) => (
        <SnipCard
          key={item.id}
          title={item.title}
          createdAt={item.createdAt}
          content={item.content}
          tags={item.tags}
          language={item.language}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default SnippetsList;
