"use client";
import { useState } from "react";
import { FiHome, FiCalendar, FiFileText, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`h-screen flex flex-col justify-between bg-gray-900 text-white p-4 ${isOpen ? "w-64" : "w-20"} transition-all`}>
        <div>
        <button onClick={() => setIsOpen(!isOpen)} className="mb-4 text-2xl">☰</button>
        <ul>
            <li className="flex items-center p-3"><FiHome /> {isOpen && "Home"}</li>
            <li className="flex items-center p-3"><FiCalendar /> {isOpen && "Appointments"}</li>
            <li className="flex items-center p-3"><FiFileText /> {isOpen && "Invoices"}</li>
        </ul>
        </div>
      <div>
        <ul>
          <button className="w-full hover:bg-gray-800 rounded-md ">
            <li className="flex items-center p-3"><FiLogOut /> {isOpen && "Logout"}</li>
          </button>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
