"use client";

import { CircleFadingPlus, Heart, LogOut, Table, Trash2 } from "lucide-react";
import Logo from "./logo";
import SidebarItem from "./sidebar-item";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const routes = [
    {
      id: 1,
      label: "All Snippets",
      url: "/",
      icon: Table,
    },
    {
      id: 2,
      label: "Favorites",
      url: "/favorites",
      icon: Heart,
    },
    {
      id: 3,
      label: "Trash",
      url: "/trash",
      icon: Trash2,
    },
    {
      id: 4,
      label: "Tags",
      url: "/tags",
      icon: CircleFadingPlus,
    },
  ];

  function handleLogout() {
    // log out in here
  }

  return (
    <div className="p-3">
      <div className="flex justify-center mt-3">
        <Logo />
      </div>
      <div className="mt-16">
        <h2 className="font-bold text-sm text-gray-400 hover:text-gray-500">
          Quick links
        </h2>
        <div className="flex flex-col gap-2 justify-center items-center mt-4">
          {routes.map((route) => (
            <SidebarItem
              key={route.id}
              label={route.label}
              url={route.url}
              icon={route.icon}
            />
          ))}
        </div>
      </div>
      <div className="mt-7">
        <Button
          onClick={handleLogout}
          variant={"outline"}
          className="w-full flex justify-start gap-2 border-0 hover:bg-inherit hover:text-orange-500"
        >
          <LogOut className="mr-2 w-5 h-5" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
