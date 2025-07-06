import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, color }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`${color} text-white p-6 rounded-xl shadow-lg`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </motion.div>
  );
};

export default StatCard;
