"use client";
import { useState } from "react";
import { FiHome, FiCalendar, FiFileText, FiLogOut, FiLogIn } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/react";

interface ChildrenProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: ChildrenProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession(); 

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen flex flex-col justify-between bg-gray-900 text-white p-4 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div>
          <button onClick={() => setIsOpen(!isOpen)} className="mb-4 text-2xl">
            ☰
          </button>
          <ul>
            <li className="flex items-center p-3 gap-3 hover:bg-gray-800 rounded-md">
              <FiHome />
              <span className={`${isOpen ? "block" : "hidden"} whitespace-nowrap`}>Home</span>
            </li>
            <li className="flex items-center p-3 gap-3 hover:bg-gray-800 rounded-md">
              <FiCalendar />
              <span className={`${isOpen ? "block" : "hidden"} whitespace-nowrap`}>Appointments</span>
            </li>
            <li className="flex items-center p-3 gap-3 hover:bg-gray-800 rounded-md">
              <FiFileText />
              <span className={`${isOpen ? "block" : "hidden"} whitespace-nowrap`}>Invoices</span>
            </li>
          </ul>
        </div>
        <div className="hover:bg-gray-800 p-3 rounded-md">
          {session ? (
            <button onClick={() => signOut()} className="text-red-500 flex items-center gap-3 w-full">
              <FiLogOut />
              <span className={`${isOpen ? "block" : "hidden"} whitespace-nowrap`}>Logout</span>
            </button>
          ) : (
            <button onClick={() => signIn()} className="text-green-500 flex items-center gap-3 w-full">
              <FiLogIn />
              <span className={`${isOpen ? "block" : "hidden"} whitespace-nowrap`}>Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`p-4 transition-all duration-300 w-full ${isOpen ? "ml-64" : "ml-20"}`}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
