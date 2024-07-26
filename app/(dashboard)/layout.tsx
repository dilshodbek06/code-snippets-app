import Sidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="w-[20rem] hidden md:block border-r dark:border-0 min-h-screen dark:bg-slate-800">
        <Sidebar />
      </div>
      <div className="p-3 bg-slate-100 w-full dark:bg-slate-700">
        {children}
      </div>
    </div>
  );
}
