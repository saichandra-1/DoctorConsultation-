"use client"
import React, { useState } from "react";
import Avatar  from "@mui/material/Avatar";
import { motion } from "framer-motion";

const Profile = ({ name = "jhon deo", email = "jhondeo@gmail.com", password = "password" }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const getInitial = (text:string) => (text ? text.charAt(0).toUpperCase() : "N");

  return (
    <div className="fixed top-4 right-4 flex flex-col items-end">
      <motion.div whileHover={{ scale: 1.1 }}>
        <Avatar 
          className="cursor-pointer bg-blue-500 text-white" 
          onClick={toggleDetails}
        >
          {getInitial(name || email)}
        </Avatar>
      </motion.div>
      {showDetails && (
        <Card className="mt-2 w-64 shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold">{name || "Unknown"}</h2>
            <p className="text-gray-600">{email || "No email provided"}</p>
            <p className="text-gray-400">{password ? "******" : "No password set"}</p>
            <Button className="mt-2 w-full" onClick={toggleDetails}>Close</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
interface children{
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

 const Card = ({ children, className = "" }:children) => {
    return (
      <div className={`bg-white rounded-2xl shadow-md p-4 ${className}`}>
        {children}
      </div>
    );
  };

   const CardContent = ({ children }:children) => {
    return <div className="p-2">{children}</div>;
  };

   const Button = ({ children, onClick, className = "" }:children) => {
    return (
      <button
        onClick={onClick}
        className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition ${className}`}
      >
        {children}
      </button>
    );
  };
  

export default Profile;
