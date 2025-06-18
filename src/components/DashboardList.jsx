import React from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config/backend";

const DashboardList = ({ data = [], onDelete, type }) => {
  const items = Array.isArray(data) ? data : [];

  const getImageUrl = (item) => {
    switch (type) {
      case "blog":
        return `${BACKEND_URL}${item.images[0]}` || null;
      case "adventure":
        return `${BACKEND_URL}${item.image}` || null;
      case "event":
        return `${BACKEND_URL}${item.image}` || null;
      case "album":
        if (typeof item.coverImage === "string") {
          return `${BACKEND_URL}${item.coverImage.path}`;
        } else if (item.coverImage?.url) {
          return `${BACKEND_URL}${item.coverImage.path}`;
        } else if (item.coverImage?.path) {
          return `${BACKEND_URL}${item.coverImage.path}`;
        } else if (item.images?.[0]?.path) {
          return `${BACKEND_URL}${item.coverImage.path}`;
        }
        return null;
      default:
        return null;
    }
  };

  const getEditLink = (id) => {
    switch (type) {
      case "blog":
        return `/blogform/${id}`;
      case "event":
        return `/eventform/${id}`;
      case "adventure":
        return `/adventureform/${id}`;
      case "info":
        return `/admin`;
      default:
        return `/${type}form/${id}`;
    }
  };

  return (
    <div className="overflow-x-auto">
      {/* Mobile view (cards) */}
      <div className="md:hidden space-y-4">
        {items.length > 0 ? (
          items.map((item) => {
            const imageUrl = getImageUrl(item);
            return (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 h-12 w-12">
                    {imageUrl ? (
                      <img
                        className="h-12 w-12 rounded-full object-cover"
                        src={imageUrl}
                        alt={item.title || item.name || "Untitled"}
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.title || item.name || "Untitled"}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    {type !== "info" && (
                      <Link
                        to={getEditLink(item._id)}
                        className="text-amber-600 hover:text-amber-900 text-sm"
                      >
                        Edit
                      </Link>
                    )}
                    <button
                      onClick={() => onDelete(item._id, type)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center p-4 text-sm text-gray-500">
            No {type}s found
          </div>
        )}
      </div>

      {/* Desktop view (table) */}
      <table className="hidden md:table min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
              Image
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.length > 0 ? (
            items.map((item) => {
              const imageUrl = getImageUrl(item);
              return (
                <tr key={item._id}>
                  <td className="px-4 py-4 whitespace-nowrap w-16">
                    <div className="flex-shrink-0 h-10 w-10">
                      {imageUrl ? (
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={imageUrl}
                          alt={item.title || item.name || "Untitled"}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xs">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {item.title || item.name || "Untitled"}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right w-32">
                    <div className="flex justify-end space-x-4">
                      <Link
                        to={getEditLink(item._id)}
                        className="text-amber-600 hover:text-amber-900 text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => onDelete(item._id, type)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan="3"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                No {type}s found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardList;
