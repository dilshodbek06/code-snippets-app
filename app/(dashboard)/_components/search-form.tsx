import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchForm = () => {
  return (
    <div className="flex items-center gap-x-1 md:gap-x-2">
      <Input
        className="w-full max-w-[40rem] dark:bg-slate-700 dark:placeholder-white"
        placeholder="search a snippet..."
      />
      <Button className="hidden md:block">
        <Search />
      </Button>
    </div>
  );
};

export default SearchForm;
