import { motion } from "framer-motion";

const ServiceCard = ({ icon, title, description, onLearnMore }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col"
    >
      <div className="text-4xl text-amber-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <button
        onClick={onLearnMore}
        className="mt-auto px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition self-start"
      >
        Learn More
      </button>
    </motion.div>
  );
};

export default ServiceCard;
