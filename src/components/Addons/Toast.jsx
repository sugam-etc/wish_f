import React from "react";
import { motion } from "framer-motion";

const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-white flex items-center justify-between min-w-[300px] ${
      type === "success" ? "bg-emerald-500" : "bg-rose-500"
    }`}
  >
    <div className="flex items-center">
      {type === "success" ? (
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      {message}
    </div>
    <button
      onClick={onClose}
      className="ml-4 font-bold hover:opacity-80 transition-opacity"
    >
      &times;
    </button>
  </motion.div>
);

export default Toast;
