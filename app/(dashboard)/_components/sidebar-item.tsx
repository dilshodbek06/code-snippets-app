"use client";

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

interface SidebarItemProps {
  label: string;
  url: string;
  icon: LucideIcon;
}

const SidebarItem = ({ icon: Icon, label, url }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === url;
  return (
    <Button
      onClick={() => router.push(url)}
      variant={isActive ? "default" : "outline"}
      className={`w-full flex justify-start gap-2 border-0 ${
        !isActive && "hover:bg-inherit hover:text-orange-500 dark:bg-inherit"
      } `}
    >
      <Icon className="mr-2 w-5 h-5" />
      {label}
    </Button>
  );
};

export default SidebarItem;
