import Sidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="w-72 hidden md:block border-r min-h-screen">
        <Sidebar />
      </div>
      <div className="p-3 bg-gray-50 w-full">{children}</div>
    </div>
  );
}
