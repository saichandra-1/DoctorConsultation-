import Sidebar from "@/components/Sidebar";
import { div } from "framer-motion/client";

export default function ({
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
  