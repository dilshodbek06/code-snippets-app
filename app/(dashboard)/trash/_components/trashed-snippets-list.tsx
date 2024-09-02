import { Tag } from "@prisma/client";
import EmptyState from "../../_components/empty-state";
import TrashedCard from "./trashed-card";

type SnippetWithTags = {
  id: string;
  title: string;
  language: string;
  content: string;
  createdAt: Date;
  deletedAt: Date;
  tags: { tag: Tag }[];
};

interface SnippetsListProps {
  items: SnippetWithTags[];
}
const TrashedSnippetsList = ({ items }: SnippetsListProps) => {
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {items.length === 0 && (
        <div className="h-full mx-auto flex items-center justify-center col-span-full">
          <EmptyState />
        </div>
      )}
      {items?.map((item) => (
        <TrashedCard
          key={item.id}
          title={item.title}
          createdAt={item.createdAt}
          deletedAt={item.deletedAt}
          content={item.content}
          tags={item.tags}
          language={item.language}
          id={item.id}
        />
      ))}
    </div>
  );
};

export default TrashedSnippetsList;
