import prisma from "@/lib/db";
import Sidebar from "./_components/sidebar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();
  const user = await currentUser();
  if (!userId) {
    return redirect("/sign-in");
  }
  // Check if the user exists in the database
  const currentUserDb = await prisma.user.findFirst({
    where: { clerkId: userId! },
  });

  // Create the user if not found in the database
  if (!currentUserDb && userId) {
    const email = user?.emailAddresses[0]?.emailAddress ?? "";
    const username = user?.username ?? "User";

    await prisma.user.create({
      data: { clerkId: userId, email, username },
    });
  }

  return (
    <div className="flex transition-all">
      <div className="w-[20rem] hidden md:block border-r dark:border-0 min-h-screen dark:bg-slate-800">
        <Sidebar />
      </div>
      <div className="p-3 bg-slate-100 w-full dark:bg-slate-700">
        {children}
      </div>
    </div>
  );
}
