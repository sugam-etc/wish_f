import { FaClock, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config/backend";

export default function AdventureCard({ adventure }) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg flex flex-col h-full min-h-[450px]">
      {/* Image Section */}
      <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
        <img
          src={
            adventure.image.startsWith("http")
              ? adventure.image
              : `${BACKEND_URL}${adventure.image}`
          }
          alt={adventure.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Title & Rating */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
              {adventure.name}
            </h3>
            <div className="flex items-center text-amber-500 text-sm sm:text-base">
              <FaStar className="mr-1" />
              <span>{adventure.rating}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 text-sm sm:text-base truncate">
            {adventure.shortDescription}
          </p>

          {/* Location */}
          <div className="flex items-center text-gray-500 text-sm sm:text-base mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <span className="truncate">{adventure.location}</span>
          </div>

          {/* Time */}
          <div className="flex items-center text-gray-500 text-sm sm:text-base mb-4">
            <FaClock className="mr-2" />
            <span>{adventure.hours}</span>
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/adventures/${adventure._id}`}
          className="mt-auto inline-block px-4 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm sm:text-base font-medium rounded-lg text-center transition"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}
