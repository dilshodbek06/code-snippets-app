import { currentUser } from "@clerk/nextjs/server";

const TrashPage = async () => {
  const user = await currentUser();

  console.log(user?.emailAddresses[0].emailAddress);
  // firstname, emailAddresses[0].emailAddress

  return <div></div>;
};

export default TrashPage;
