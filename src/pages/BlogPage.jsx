import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../BlogComponents/Button";
import { Input } from "../BlogComponents/Input";
import { AdventureCard } from "../BlogComponents/AdventureCard";
import { ActivityCategoryFilter } from "../BlogComponents/ActivityFilter";
import { BACKEND_URL } from "../config/backend";
import { createEmail } from "../api/emailService";

const AdventureBlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ text: "Please enter your email", type: "error" });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await createEmail({ title: email });
      setMessage({
        text: "Thank you for subscribing!",
        type: "success",
      });
      setEmail("");
    } catch (error) {
      setMessage({
        text: error.message || "Subscription service is currently unavailable",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}/api/blogs`);
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const categories = [
    "All",
    ...new Set(activities.map((activity) => activity.category)),
  ];

  const filteredActivities = activities
    .filter(
      (activity) =>
        activeCategory === "All" || activity.category === activeCategory
    )
    .filter(
      (activity) =>
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleActivityClick = (activityId) => {
    navigate(`/blog/${activityId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Adventure Hero Section with Nepal theme */}
      <div className="relative bg-amber-500 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=1000')] bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Wish Adventure Nepal
          </h1>
          <p className="text-xl text-white mb-8">
            Discover the thrill of Nepal's most exciting adventures and day
            trips
          </p>
          <div className="relative max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search adventures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10"
            />
            <svg
              className="absolute left-3 top-3 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Popular Activities Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Our Activity Blog Page
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From thrilling treks to relaxing day tours, explore Nepal's most
              beautiful landscapes
            </p>
          </div>

          <ActivityCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
              <p className="mt-2 text-gray-600">Loading adventures...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActivities.length > 0 ? (
                filteredActivities.map((activity) => (
                  <AdventureCard
                    key={activity.id}
                    activity={activity}
                    onActivityClick={() => handleActivityClick(activity._id)}
                  />
                ))
              ) : (
                <div className="text-center text-gray-500 col-span-full py-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="mt-2">No matching adventures found</p>
                </div>
              )}
            </div>
          )}

          {/* Newsletter with Adventure Theme */}
          <form
            onSubmit={handleEmailSubmit}
            className="mt-16 bg-white rounded-lg p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Get Adventure Updates
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Join our newsletter for new trekking routes and special offers
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-grow"
                />
                <button
                  type="submit"
                  className={`bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-md transition duration-300 ${
                    loading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  disabled={loadingEmail}
                  aria-label="Subscribe to newsletter"
                >
                  {loading ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
            </div>
            {message.text && (
              <p
                className={`mt-2 text-sm ${
                  message.type === "error" ? "text-red-400" : "text-green-400"
                }`}
              >
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdventureBlogPage;
