import SnipCard from "./card";

const SnippetsList = () => {
  const arr = [
    {
      id: 1,
    },
    {
      id: 1,
    },
    {
      id: 1,
    },
  ];
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {arr.map((item) => (
        <SnipCard key={item.id} />
      ))}
    </div>
  );
};

export default SnippetsList;
