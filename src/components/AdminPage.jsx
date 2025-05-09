import { useEffect, useState } from "react";
import axios from "axios";
import { BlogForm } from "./BlogForm";
import { AdventureForm } from "./AdventureForm";
import { EventForm } from "./EventForm";
import DashboardList from "./DashboardList";
import { BACKEND_URL } from "../App";
const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [adventures, setAdventures] = useState([]);
  const [events, setEvents] = useState([]);
  const [toast, setToast] = useState(null);
  const [activeTab, setActiveTab] = useState("forms"); // 'forms' or 'lists'
  const [isLoading, setIsLoading] = useState(true);

  // const BACKEND_URL = "http://localhost:5000";

  // Toast component
  const Toast = ({ message, type, onClose }) => (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg text-white flex items-center ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } animate-fade-in`}
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 font-bold hover:text-gray-200 transition-colors"
      >
        &times;
      </button>
    </div>
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [blogsResponse, adventuresResponse, eventsResponse] =
        await Promise.all([
          axios.get(`${BACKEND_URL}/api/blogs`),
          axios.get(`${BACKEND_URL}/api/adventures`),
          axios.get(`${BACKEND_URL}/api/events`),
        ]);
      setBlogs(blogsResponse.data);
      setAdventures(adventuresResponse.data);
      setEvents(eventsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setToast({ message: "Error fetching data from server.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/${type}s/${id}`);

      if (type === "blog") {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else if (type === "adventure") {
        setAdventures(adventures.filter((adventure) => adventure._id !== id));
      } else if (type === "event") {
        setEvents(events.filter((event) => event._id !== id));
      }

      setToast({
        message: `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } deleted successfully!`,
        type: "success",
      });
    } catch (error) {
      console.error("Error deleting item:", error);
      setToast({
        message: `Error deleting ${type}: ${
          error.response?.data?.error || error.message
        }`,
        type: "error",
      });
    }
  };

  const closeToast = () => setToast(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Admin Dashboard
        </h1>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-white shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveTab("forms")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg transition-colors ${
                activeTab === "forms"
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Manage Content
            </button>
            <button
              onClick={() => setActiveTab("lists")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg transition-colors ${
                activeTab === "lists"
                  ? "bg-amber-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              View All Items
            </button>
          </div>
        </div>

        {toast && <Toast {...toast} onClose={closeToast} />}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <>
            {/* Forms Section */}
            {activeTab === "forms" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                    Add New Blog
                  </h2>
                  <BlogForm refreshBlogs={setBlogs} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                    Add New Adventure
                  </h2>
                  <AdventureForm refreshAdventures={setAdventures} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                    Add New Event
                  </h2>
                  <EventForm refreshEvents={setEvents} />
                </div>
              </div>
            )}

            {/* Lists Section */}
            {activeTab === "lists" && (
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                    Blog Posts
                  </h2>
                  <DashboardList
                    data={blogs}
                    onDelete={handleDelete}
                    type="blog"
                  />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                    Adventures
                  </h2>
                  <DashboardList
                    data={adventures}
                    onDelete={handleDelete}
                    type="adventure"
                  />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                    Events
                  </h2>
                  <DashboardList
                    data={events}
                    onDelete={handleDelete}
                    type="event"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add some animations to the page */}
      {/* <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style> */}
    </div>
  );
};

export default AdminPage;
