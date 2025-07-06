import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../UserAuth/UserAuthContext";
import {
  FiHome,
  FiUsers,
  FiFileText,
  FiGlobe,
  FiCalendar,
  FiImage,
  FiSettings,
} from "react-icons/fi";
import { motion } from "framer-motion";
import NavItem from "../../components/Addons/NavItem";
const AdminLayout = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useUserAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        initial={{ width: sidebarOpen ? 240 : 80 }}
        animate={{ width: sidebarOpen ? 240 : 80 }}
        className={`bg-gray-800 text-white ${
          sidebarOpen ? "w-60" : "w-20"
        } transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          ) : (
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            {sidebarOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          <NavItem
            icon={<FiHome />}
            text="Dashboard"
            to="/admin"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<FiUsers />}
            text="Users"
            to="/admin/users"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<FiFileText />}
            text="Blogs"
            to="/admin/blogs"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<FiGlobe />}
            text="Adventures"
            to="/admin/adventures"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<FiCalendar />}
            text="Events"
            to="/admin/events"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<FiImage />}
            text="Albums"
            to="/admin/albums"
            sidebarOpen={sidebarOpen}
          />
          <NavItem
            icon={<FiSettings />}
            text="Settings"
            to="/admin/settings"
            sidebarOpen={sidebarOpen}
          />
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
