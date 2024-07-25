import Header from "./_components/header";
import TagsList from "./_components/tags-list";

export default function Home() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mt-4">
        <TagsList />
      </div>
    </div>
  );
}
