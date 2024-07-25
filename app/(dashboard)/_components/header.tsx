import { UserButton } from "@clerk/nextjs";
import DarkMode from "./dark-mode";
import MobileSidebar from "./mobile-sidebar";
import SearchForm from "./search-form";
import { auth } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const { userId } = auth();

  return (
    <div className="bg-white shadow-sm rounded-lg min-h-[60px] flex justify-between items-center gap-x-3 md:gap-x-1 py-2 px-2 md:px-4">
      <div>
        <div className="hidden md:block">
          <DarkMode />
        </div>
        <div className="md:hidden">
          <MobileSidebar />
        </div>
      </div>

      <div className="max-w-[20rem] md:max-w-[30rem] w-full">
        <SearchForm />
      </div>
      <div>
        {userId ? (
          <UserButton />
        ) : (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default Header;
