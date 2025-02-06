import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex">
            <div className="fixed">
            <Sidebar />
            </div>
            <div className="h-full w-full">
              {children}
            </div>
        </div>
    );
  }
  