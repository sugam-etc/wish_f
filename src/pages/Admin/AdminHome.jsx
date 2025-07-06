import React from "react";
import { FiUsers, FiFileText, FiCalendar } from "react-icons/fi";
import StatCard from "../../components/Addons/StatCard";
const AdminHome = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value="1,234"
          icon={<FiUsers />}
          color="bg-blue-500"
        />
        <StatCard
          title="Blog Posts"
          value="56"
          icon={<FiFileText />}
          color="bg-green-500"
        />
        <StatCard
          title="Upcoming Events"
          value="12"
          icon={<FiCalendar />}
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default AdminHome;
