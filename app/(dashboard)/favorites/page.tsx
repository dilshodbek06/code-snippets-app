import Header from "../_components/header";
import TagsList from "../_components/tags-list";
import CodeBlock from "../_components/code-block";

const FavoritesPage = () => {
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
};

export default FavoritesPage;
