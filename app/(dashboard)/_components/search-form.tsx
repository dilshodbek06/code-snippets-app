"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SearchForm = () => {
  const [term, setTerm] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(term === "" ? `/` : `/?search=${term}`);
  };

  return (
    <div className="flex items-center gap-x-1 md:gap-x-2">
      <Input
        className="w-full max-w-[40rem] dark:bg-slate-700 dark:placeholder-white"
        placeholder="search a snippet..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <Button onClick={handleSearch} className="hidden md:block">
        <Search />
      </Button>
    </div>
  );
};

export default SearchForm;
