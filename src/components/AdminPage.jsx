import { useEffect, useState } from "react";
import axios from "axios";
import { BlogForm } from "./BlogForm";
import AdventureForm from "./AdventureForm";
import { EventForm } from "./EventForm";
import AlbumForm from "../pages/Gallery/AlbumForm";
import DashboardList from "./DashboardList";
import { BACKEND_URL } from "../config/backend";
import InfoForm from "./InfoForm";

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [adventures, setAdventures] = useState([]);
  const [events, setEvents] = useState([]);
  const [infos, setInfos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [toast, setToast] = useState(null);
  const [activeContentTab, setActiveContentTab] = useState("blog");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("create"); // 'create' or 'view'

  const Toast = ({ message, type, onClose }) => (
    <div
      className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl text-white flex items-center justify-between min-w-[300px] transform transition-all duration-300 ${
        type === "success" ? "bg-emerald-600" : "bg-rose-600"
      }`}
    >
      <div className="flex items-center">
        {type === "success" ? (
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span className="font-medium">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="ml-4 text-xl font-bold hover:opacity-80 transition-opacity"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [
        blogsResponse,
        adventuresResponse,
        eventsResponse,
        albumsResponse,
        infosResponse,
      ] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/blogs`),
        axios.get(`${BACKEND_URL}/api/adventures`),
        axios.get(`${BACKEND_URL}/api/events`),
        axios.get(`${BACKEND_URL}/api/albums`),
        axios.get(`${BACKEND_URL}/api/infos`),
      ]);
      setBlogs(blogsResponse.data);
      setAdventures(adventuresResponse.data);
      setEvents(eventsResponse.data);
      setAlbums(albumsResponse.data.data);
      setInfos(infosResponse.data);
      console.log(infosResponse.data);
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
      } else if (type === "album") {
        setAlbums(albums.filter((album) => album._id !== id));
      } else if (type === "info") {
        setInfos(infos.filter((info) => info._id !== id));
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

  const renderContentForm = () => {
    switch (activeContentTab) {
      case "blog":
        return <BlogForm refreshBlogs={setBlogs} />;
      case "adventure":
        return <AdventureForm refreshAdventures={setAdventures} />;
      case "event":
        return <EventForm refreshEvents={setEvents} />;
      case "album":
        return <AlbumForm refreshAlbums={setAlbums} />;
      case "info":
        return <InfoForm refreshInfos={setInfos} />;
      default:
        return <BlogForm refreshBlogs={setBlogs} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode("create")}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === "create"
                    ? "bg-amber-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Create Content
              </button>
              <button
                onClick={() => setViewMode("view")}
                className={`px-4 py-2 rounded-lg ${
                  viewMode === "view"
                    ? "bg-amber-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                View Content
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {toast && <Toast {...toast} onClose={closeToast} />}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <>
            {/* Create Content Section */}
            {viewMode === "create" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setActiveContentTab("blog")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeContentTab === "blog"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Blog
                    </button>
                    <button
                      onClick={() => setActiveContentTab("adventure")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeContentTab === "adventure"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Adventure
                    </button>
                    <button
                      onClick={() => setActiveContentTab("event")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeContentTab === "event"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Event
                    </button>
                    <button
                      onClick={() => setActiveContentTab("album")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeContentTab === "album"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Album
                    </button>
                    <button
                      onClick={() => setActiveContentTab("info")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeContentTab === "info"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Info
                    </button>
                  </nav>
                </div>
                <div className="p-6">{renderContentForm()}</div>
              </div>
            )}

            {/* View Content Section */}
            {viewMode === "view" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Blog Posts
                    </h2>
                    <button
                      onClick={() => {
                        setViewMode("create");
                        setActiveContentTab("blog");
                      }}
                      className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm"
                    >
                      Add New
                    </button>
                  </div>
                  <div className="p-6">
                    <DashboardList
                      data={blogs}
                      onDelete={handleDelete}
                      type="blog"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Adventures
                    </h2>
                    <button
                      onClick={() => {
                        setViewMode("create");
                        setActiveContentTab("adventure");
                      }}
                      className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm"
                    >
                      Add New
                    </button>
                  </div>
                  <div className="p-6">
                    <DashboardList
                      data={adventures}
                      onDelete={handleDelete}
                      type="adventure"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Events
                    </h2>
                    <button
                      onClick={() => {
                        setViewMode("create");
                        setActiveContentTab("event");
                      }}
                      className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm"
                    >
                      Add New
                    </button>
                  </div>
                  <div className="p-6">
                    <DashboardList
                      data={events}
                      onDelete={handleDelete}
                      type="event"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Albums
                    </h2>
                    <button
                      onClick={() => {
                        setViewMode("create");
                        setActiveContentTab("album");
                      }}
                      className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm"
                    >
                      Add New
                    </button>
                  </div>
                  <div className="p-6">
                    <DashboardList
                      data={albums}
                      onDelete={handleDelete}
                      type="album"
                    />
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Infos
                    </h2>
                    <button
                      onClick={() => {
                        setViewMode("create");
                        setActiveContentTab("info");
                      }}
                      className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm"
                    >
                      Add New
                    </button>
                  </div>
                  <div className="p-6">
                    <DashboardList
                      data={infos}
                      onDelete={handleDelete}
                      type="info"
                    />
                  </div>
                  {console.log("iinfo", infos)}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
