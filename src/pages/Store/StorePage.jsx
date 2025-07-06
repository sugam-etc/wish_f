import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import itemService from "../../api/itemService";
import { BACKEND_URL } from "../../config/backend";
import store from "../../assets/BackgroundImages/store.jpg";
const StorePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("featured");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await itemService.getItems();
        // Process items to ensure proper image URLs
        const processedItems =
          data?.data?.map((item) => ({
            ...item,
            imageUrl: formatImageUrl(item.image),
          })) || [];
        setItems(processedItems);
      } catch (err) {
        setError(err.message);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Helper function to properly format image URLs
  const formatImageUrl = (imagePath) => {
    if (!imagePath) return null;
    // Remove any leading slashes that might cause double slashes in URL
    const cleanedPath = imagePath.replace(/^\/+/, "");
    return `${BACKEND_URL}/${cleanedPath}`;
  };

  const handleItemClick = (itemId) => {
    navigate(`/store/${itemId}`);
  };

  const sortedItems = [...items].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      default:
        return 0;
    }
  });

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading our collection...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Error
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-20 container mx-auto px-4 sm:px-6 py-24 md:py-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-light mb-4"
          >
            West Indoor Sport Hub Store
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl font-light max-w-2xl"
          >
            Premium climbing gear and accessories for your adventures
          </motion.p>
        </div>
        <img
          src={store}
          alt="Climbing gear background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {sortedItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M20 7h-4V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v3H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
              />
            </svg>
            <h3 className="text-xl sm:text-2xl font-light text-gray-700 mb-2">
              Our Store is Currently Empty
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              New products are coming soon. Check back later or contact us for
              special requests.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <h2 className="text-xl sm:text-2xl font-serif font-light text-gray-800">
                {sortedItems.length}{" "}
                {sortedItems.length === 1 ? "Item" : "Items"} Available
              </h2>
              <div className="relative w-full sm:w-48">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none w-full bg-white pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-sm"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleItemClick(item._id)}
                >
                  <div className="relative aspect-square">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://via.placeholder.com/400?text=Image+Not+Available";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">
                          No Image Available
                        </span>
                      </div>
                    )}
                    {item.featured && (
                      <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 text-xs font-medium tracking-wider rounded">
                        FEATURED
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-amber-600 font-medium">
                        $ {item.price?.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 mb-3 capitalize">
                      {item.category}
                    </p>
                    <div className="flex justify-between items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.stock > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        disabled={item.stock <= 0}
                        className={`px-3 py-1 text-xs rounded ${
                          item.stock > 0
                            ? "bg-gray-900 text-white hover:bg-gray-800"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {item.stock > 0 ? "ADD TO CART" : "SOLD OUT"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Additional Info Section */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl sm:text-2xl font-serif font-light mb-3">
              Store Information
            </h3>
            <p className="text-gray-600 mb-6">
              All items can be picked up at our location in Pokhara. For
              delivery inquiries, please contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors text-sm font-medium"
              >
                Contact Us
              </a>
              <a
                href="/login"
                className="px-6 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Login to Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
