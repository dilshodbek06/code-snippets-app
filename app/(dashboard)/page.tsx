import Header from "./_components/header";
import SnippetsList from "./_components/snippets-list";
import TagsList from "./_components/tags-list";

export default function Home() {
  return (
    <div className="min-h-[96.2vh]">
      <div>
        <Header />
      </div>
      <div className="mt-4">
        <TagsList />
      </div>
      <div className="mt-4">
        <SnippetsList />
      </div>
    </div>
  );
}
