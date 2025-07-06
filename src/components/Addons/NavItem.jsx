import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NavItem = ({ icon, text, to, sidebarOpen }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(to)}
      className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors ${
        window.location.pathname === to ? "bg-gray-700" : ""
      }`}
    >
      <div className="text-xl">{icon}</div>
      {sidebarOpen && <span className="ml-3">{text}</span>}
    </motion.div>
  );
};

export default NavItem;
