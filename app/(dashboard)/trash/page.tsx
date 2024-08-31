import Header from "../_components/header";
import TagsList from "../_components/tags-list";

const TrashPage = async () => {
  // const user = await currentUser();

  // console.log(user?.emailAddresses[0].emailAddress);
  // firstname, emailAddresses[0].emailAddress

  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="mt-4">
        <TagsList items={[]} />
      </div>
    </div>
  );
};

export default TrashPage;
