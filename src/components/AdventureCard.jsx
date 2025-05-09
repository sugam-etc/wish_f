import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";
import { BACKEND_URL } from "../App";
export default function AdventureCard({ adventure }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img
          src={`${BACKEND_URL}${adventure.image}`}
          alt={adventure.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{adventure.name}</h3>
          <div className="flex items-center text-amber-500">
            <FaStar className="mr-1" />
            <span>{adventure.rating}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">{adventure.shortDescription}</p>

        <div className="flex items-center text-gray-500 mb-2">
          <FaMapMarkerAlt className="mr-2" />
          <span>{adventure.location}</span>
        </div>

        <div className="flex items-center text-gray-500 mb-4">
          <FaClock className="mr-2" />
          <span>{adventure.hours}</span>
        </div>

        <Link
          to={`/adventures/${adventure._id}`} // Fix: Use _id instead of id
          className="inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium rounded transition"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
