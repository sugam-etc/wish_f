import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import outdoor from "../assets/Images/outdoor.jpeg";
import bouldering from "../assets/Images/bouldering.jpg";
import multipitch from "../assets/Images/multipitch.jpg";
import toperope from "../assets/Images/toprope.jpg";
import slack from "../assets/Images/stacklining.jpg";
const ServiceModal = ({ service, onClose }) => {
  const serviceImages = {
    "Indoor Bouldering": bouldering,
    "Top Rope Climbing": toperope,
    "Outdoor Rock Climbing": outdoor,
    "Multi-pitch Climbing": multipitch,
    Slacklining: slack,
    "Climbing Camps":
      "https://images.squarespace-cdn.com/content/v1/63e5726a64ff2b111e3fc2af/eb1dadbc-5345-492c-ba37-5d2de76597d0/TeenCamp09.jpg",
  };

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={24} />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="h-64 md:h-full">
                <img
                  src={
                    serviceImages[service.title] ||
                    "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  }
                  alt={service.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="text-3xl mb-4 text-amber-500">
                  {service.icon}
                </div>
                <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                <p className="text-gray-700 mb-6">{service.description}</p>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">What's Included:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Professional instruction and guidance</li>
                    <li>All necessary safety equipment</li>
                    <li>Small group sizes for personalized attention</li>
                    <li>Progress tracking and feedback</li>
                  </ul>
                </div>

                <button className="mt-6 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition">
                  Book This Service
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;
