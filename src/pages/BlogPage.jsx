import React, { useState, useEffect } from "react";
import axios from "axios";

// Adventure-themed Button component
import { Button } from "../BlogComponents/Button";
// Input with adventure styling
import { Input } from "../BlogComponents/Input";

// Adventure Activity Card
import { AdventureCard } from "../BlogComponents/AdventureCard";

// Activity Category Filter
import { ActivityCategoryFilter } from "../BlogComponents/ActivityFilter";

// Activity Detail Popup
import { ActivityPopup } from "../BlogComponents/ActivityPopup";
import { BACKEND_URL } from "../App";
const AdventureBlogPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    document.body.style.overflow = "hidden";
  };

  const handleClosePopup = () => {
    setSelectedActivity(null);
    document.body.style.overflow = "";
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
                    onActivityClick={handleActivityClick}
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
          <div className="mt-16 bg-white rounded-lg p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
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
                  placeholder="Your email address"
                  className="flex-grow"
                />
                <Button className="whitespace-nowrap">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedActivity && (
        <ActivityPopup activity={selectedActivity} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default AdventureBlogPage;
