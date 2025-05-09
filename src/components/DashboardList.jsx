import {
  FaTrash,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaImage,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const DashboardList = ({ title, data, onDelete, type }) => {
  const backendURL = "http://localhost:5000";

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
        {title}
      </h3>

      {data.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
          No items found. Add some to see them listed here.
        </div>
      ) : (
        <ul className="space-y-4">
          {data.map((item) => (
            <li
              key={item._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <div className="flex items-start gap-4 w-full md:w-auto">
                {item.image ? (
                  <img
                    src={`${backendURL}${item.image}`}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80' fill='none' stroke='%23e5e7eb'%3E%3Crect width='80' height='80' rx='8' fill='%23f9fafb'/%3E%3Cpath d='M30 25L25 30M50 55L55 50M25 55L20 50V30L25 25H55L60 30V50L55 55H25Z' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M40 45C42.7614 45 45 42.7614 45 40C45 37.2386 42.7614 35 40 35C37.2386 35 35 37.2386 35 40C35 42.7614 37.2386 45 40 45Z' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                    <FaImage size={24} />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-semibold text-gray-800 truncate">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                    {item.excerpt || item.shortDescription || item.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                    {type === "event" && (
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-gray-400" />
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    )}
                    {type === "adventure" && item.location && (
                      <span className="flex items-center gap-1">
                        <FaMapMarkerAlt className="text-gray-400" />
                        {item.location}
                      </span>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <FiExternalLink />
                        Visit Link
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => onDelete(item._id, type)}
                className="mt-4 md:mt-0 flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-2 px-4 rounded-lg transition-colors duration-200 self-end md:self-auto"
                aria-label={`Delete ${item.title}`}
              >
                <FaTrash />
                <span className="hidden sm:inline">Delete</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardList;
