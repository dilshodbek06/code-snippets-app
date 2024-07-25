export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex justify-center items-center bg-slate-100">
      {children}
    </div>
  );
}
