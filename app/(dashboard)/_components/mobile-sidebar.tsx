import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import DarkMode from "./dark-mode";

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="w-7 h-7 mt-1" />
      </SheetTrigger>
      <SheetContent className="dark:bg-slate-800" side={"left"}>
        <div>
          <DarkMode />
        </div>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

//
