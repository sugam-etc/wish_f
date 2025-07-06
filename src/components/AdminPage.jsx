import { useEffect, useState } from "react";
import axios from "axios";
import { BlogForm } from "./BlogForm";
import AdventureForm from "./AdventureForm";
import { EventForm } from "./EventForm";
import AlbumForm from "../pages/Gallery/AlbumForm";
import DashboardList from "./DashboardList";
import { BACKEND_URL } from "../config/backend";
import InfoForm from "./InfoForm";
import UserAdmin from "./User/UserAdmin";
import UserDetail from "./User/UserDetail";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import MembershipManagement from "../pages/Admin/MembershipManagement";
import AdminPurchaseDashboard from "../pages/Purchase/PurchaseDashboard";

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [adventures, setAdventures] = useState([]);
  const [events, setEvents] = useState([]);
  const [infos, setInfos] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [items, setItems] = useState([]); // New state for store items
  const [toast, setToast] = useState(null);
  const [activeContentTab, setActiveContentTab] = useState("blog");
  const [activeViewTab, setActiveViewTab] = useState("blog");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("create");
  const navigate = useNavigate();
  const params = useParams();

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
        itemsResponse,
      ] = await Promise.all([
        axios.get(`${BACKEND_URL}/api/blogs`),
        axios.get(`${BACKEND_URL}/api/adventures`),
        axios.get(`${BACKEND_URL}/api/events`),
        axios.get(`${BACKEND_URL}/api/albums`),
        axios.get(`${BACKEND_URL}/api/infos`),
        axios.get(`${BACKEND_URL}/api/items`), // Fetch store items
      ]);
      setBlogs(blogsResponse.data);
      setAdventures(adventuresResponse.data);
      setEvents(eventsResponse.data);
      setAlbums(albumsResponse.data.data);
      setInfos(infosResponse.data);
      setItems(itemsResponse.data.data);
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
      } else if (type === "item") {
        setItems(items.filter((item) => item._id !== id));
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
      case "item":
        return <ItemForm refreshItems={setItems} />;
      // case "membership":
      //   return <MembershipManagement />;
      // case "order":
      //   return <AdminPurchaseDashboard />;
      default:
        return <BlogForm refreshBlogs={setBlogs} />;
    }
  };

  const renderViewContent = () => {
    switch (activeViewTab) {
      case "blog":
        return (
          <DashboardList data={blogs} onDelete={handleDelete} type="blog" />
        );
      case "adventure":
        return (
          <DashboardList
            data={adventures}
            onDelete={handleDelete}
            type="adventure"
          />
        );
      case "event":
        return (
          <DashboardList data={events} onDelete={handleDelete} type="event" />
        );
      case "album":
        return (
          <DashboardList data={albums} onDelete={handleDelete} type="album" />
        );
      case "info":
        return (
          <DashboardList data={infos} onDelete={handleDelete} type="info" />
        );
      case "item":
        return (
          <DashboardList data={items} onDelete={handleDelete} type="item" />
        );
      case "users":
        return <UserAdmin />;
      case "membership":
        return <MembershipManagement />;
      case "order":
        return <AdminPurchaseDashboard />;
      default:
        return (
          <DashboardList data={blogs} onDelete={handleDelete} type="blog" />
        );
    }
  };

  if (params.userId) {
    return (
      <div className="min-h-screen bg-gray-50">
        {toast && <Toast {...toast} onClose={closeToast} />}
        <UserDetail />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                    <button
                      onClick={() => setActiveContentTab("item")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeContentTab === "item"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Store Item
                    </button>
                    {/* <button
                      onClick={() => setActiveContentTab("membership")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeContentTab === "membership"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Membership
                    </button> */}
                    {/* <button
                      onClick={() => setActiveContentTab("order")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeContentTab === "order"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Order
                    </button> */}
                  </nav>
                </div>
                <div className="p-6">{renderContentForm()}</div>
              </div>
            )}

            {viewMode === "view" && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setActiveViewTab("blog")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeViewTab === "blog"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Blog Posts
                    </button>
                    <button
                      onClick={() => setActiveViewTab("adventure")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeViewTab === "adventure"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Adventures
                    </button>
                    <button
                      onClick={() => setActiveViewTab("event")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeViewTab === "event"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Events
                    </button>
                    <button
                      onClick={() => setActiveViewTab("album")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeViewTab === "album"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Albums
                    </button>
                    <button
                      onClick={() => setActiveViewTab("info")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeViewTab === "info"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Infos
                    </button>
                    <button
                      onClick={() => setActiveViewTab("item")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeViewTab === "item"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Store Items
                    </button>
                    <button
                      onClick={() => setActiveViewTab("users")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeViewTab === "users"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Users
                    </button>
                    <button
                      onClick={() => setActiveViewTab("membership")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeViewTab === "membership"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Memberships
                    </button>
                    <button
                      onClick={() => setActiveViewTab("order")}
                      className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                        activeViewTab === "order"
                          ? "border-amber-500 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Order
                    </button>
                  </nav>
                </div>
                <div className="p-6">
                  <div className="flex justify-end mb-4">
                    <button
                      onClick={() => {
                        setViewMode("create");
                        setActiveContentTab(activeViewTab);
                      }}
                      className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm"
                    >
                      Add New
                    </button>
                  </div>
                  {renderViewContent()}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

const ItemForm = ({ item = null, refreshItems }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: item?.name || "",
    price: item?.price || 0,
    description: item?.description || "",
    category: item?.category || "art",
    stock: item?.stock || 0,
    featured: item?.featured || false,
    image: null,
  });
  const [previewImage, setPreviewImage] = useState(item?.imageUrl || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "featured" ? e.target.checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (!formData.name || !formData.price || !formData.description) {
        throw new Error("Please fill all required fields");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("featured", formData.featured);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      let response;
      if (item) {
        response = await axios.put(
          `${BACKEND_URL}/api/items/${item._id}`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuccessMessage("Item updated successfully!");
      } else {
        if (!formData.image) {
          throw new Error("Image is required");
        }
        response = await axios.post(
          `${BACKEND_URL}/api/items`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSuccessMessage("Item created successfully!");
      }

      // Refresh items list
      const itemsResponse = await axios.get(`${BACKEND_URL}/api/items`);
      if (refreshItems) {
        refreshItems(itemsResponse.data);
      }

      if (!item) {
        setTimeout(() => navigate("/admin"), 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {item ? "Edit Store Item" : "Create New Store Item"}
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
          <p>{successMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price ($) *
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
                className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="art">Art</option>
              <option value="book">Book</option>
              <option value="merchandise">Merchandise</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Stock *
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
            />
            <label className="block text-sm font-medium text-gray-700">
              Featured Item
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Image {!item && " *"}
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all">
                  <div className="flex flex-col items-center justify-center pt-7">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      {formData.image ? formData.image.name : "Select an image"}
                    </p>
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required={!item}
                    className="opacity-0"
                  />
                </label>
              </div>
            </div>
            {previewImage && (
              <div className="flex-shrink-0">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
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
                {item ? "Updating..." : "Creating..."}
              </span>
            ) : item ? (
              "Update Item"
            ) : (
              "Create Item"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPage;
