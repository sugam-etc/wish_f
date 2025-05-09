import { useState, useEffect } from "react";
import AdventureCard from "../components/AdventureCard.jsx";
import { FaSearch, FaFilter, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

import { BACKEND_URL } from "../App.jsx";
export default function Adventures() {
  // States
  const [adventures, setAdventures] = useState([]);
  const [filteredAdventures, setFilteredAdventures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activityFilter, setActivityFilter] = useState("All Activities");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch adventures from backend
  useEffect(() => {
    const fetchAdventures = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/adventures`);
        setAdventures(res.data);
        setFilteredAdventures(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load adventures");
        setLoading(false);
      }
    };

    fetchAdventures();
  }, []);

  // Unique values for filters
  const adventureTypes = [
    "All Activities",
    ...Array.from(new Set(adventures.map((a) => a.type))),
  ];
  const locations = [
    "All Locations",
    ...Array.from(new Set(adventures.map((a) => a.location))),
  ];

  // Filter logic (optimized to avoid unnecessary re-renders)
  useEffect(() => {
    const result = adventures.filter((adventure) => {
      const matchesSearch =
        !searchTerm ||
        adventure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adventure.shortDescription
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesActivity =
        activityFilter === "All Activities" ||
        adventure.type === activityFilter;

      const matchesLocation =
        locationFilter === "All Locations" ||
        adventure.location === locationFilter;

      return matchesSearch && matchesActivity && matchesLocation;
    });

    setFilteredAdventures(result);
  }, [searchTerm, activityFilter, locationFilter, adventures]);

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
  };

  const resetFilters = () => {
    setSearchTerm("");
    setActivityFilter("All Activities");
    setLocationFilter("All Locations");
    setFilteredAdventures(adventures); // Reset to original adventures
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="sticky bg-gray-900 text-white h-64 md:h-96 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1470&q=80"
            alt="Nepal Adventures"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Adventure Awaits
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Discover Nepal's most exciting adventure experiences
          </p>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <form
              onSubmit={handleSearch}
              className="flex flex-col md:flex-row gap-4"
            >
              {/* Search input */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Search adventures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Activity filter */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 appearance-none"
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                >
                  {adventureTypes.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location filter */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 appearance-none"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  {locations.map((loc, i) => (
                    <option key={i} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-6 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium rounded-lg transition"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Main Adventures Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {loading ? (
              <h1 className="text-3xl font-bold">Loading Adventures...</h1>
            ) : error ? (
              <h1 className="text-3xl font-bold text-red-600">{error}</h1>
            ) : (
              <>
                <h1 className="text-4xl font-bold mb-4">
                  {filteredAdventures.length > 0
                    ? "Featured Adventures"
                    : "No Adventures Found"}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {filteredAdventures.length > 0
                    ? "Curated selection of Nepal's most thrilling experiences"
                    : "Try adjusting your search criteria or reset filters"}
                </p>
              </>
            )}
          </div>

          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredAdventures.map((adventure) => (
                <div key={adventure._id}>
                  <AdventureCard adventure={adventure} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
