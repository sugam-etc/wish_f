import { BACKEND_URL } from "../config/backend";

export const AdventureCard = ({ activity, onActivityClick }) => {
  // Get the first image from the images array, fallback to a default image if necessary
  const imageUrl = activity.images?.[0]?.startsWith("http")
    ? activity.images[0]
    : `${BACKEND_URL}${activity.images?.[0] || "/default-image.jpg"}`;

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 group"
      onClick={() => onActivityClick(activity._id)}
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={imageUrl}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-xs font-medium px-2 py-1 bg-amber-500 text-white rounded-full">
            {activity.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800">
            {activity.title}
          </h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {activity.time}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {activity.excerpt}
        </p>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">{activity.readTime}</span>
          <span className="text-amber-500 font-medium flex items-center">
            Explore <span className="ml-1">→</span>
          </span>
        </div>
      </div>
    </div>
  );
};
