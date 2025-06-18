import React, { useState, useRef, useEffect } from "react";
import { createAlbum, getAlbums, deleteAlbum } from "../../api/albumService";
import { BACKEND_URL } from "../../config/backend";

const AlbumForm = () => {
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Albums list state
  const [albums, setAlbums] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  // Refs
  const coverInputRef = useRef(null);
  const imagesInputRef = useRef(null);

  // Fetch existing albums on mount
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getAlbums();
        setAlbums(data);
      } catch (err) {
        console.error("Error fetching albums:", err);
      }
    };
    fetchAlbums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !date || !coverImage || albumImages.length === 0) {
      setError("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("coverImage", coverImage);
    albumImages.forEach((file) => formData.append("albumImages", file));

    setLoading(true);
    try {
      await createAlbum(formData);
      // Refresh albums list after creation
      const updatedAlbums = await getAlbums();
      setAlbums(updatedAlbums);

      // Reset form
      setTitle("");
      setDescription("");
      setDate("");
      setCoverImage(null);
      setAlbumImages([]);
      coverInputRef.current.value = "";
      imagesInputRef.current.value = "";
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create album");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlbum = async (id) => {
    if (!window.confirm("Are you sure you want to delete this album?")) return;

    setIsDeleting(true);
    try {
      await deleteAlbum(id);
      setAlbums(albums.filter((album) => album._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete album");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Album Creation Form */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create New Album
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Album Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Summer Vacation 2023"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Tell us about this album..."
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Event Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Cover Image <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <label className="flex-1 cursor-pointer">
                  <div className="px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      ref={coverInputRef}
                      onChange={(e) => setCoverImage(e.target.files[0])}
                      accept="image/*"
                      className="hidden"
                      required
                    />
                    <p className="text-center text-gray-500 truncate">
                      {coverImage ? coverImage.name : "Select cover image"}
                    </p>
                  </div>
                </label>
                {coverImage && (
                  <button
                    type="button"
                    onClick={() => {
                      setCoverImage(null);
                      coverInputRef.current.value = "";
                    }}
                    className="px-2 py-1 text-sm text-red-500 hover:text-red-700"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Album Images (Up to 100) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-2">
                <label className="flex-1 cursor-pointer">
                  <div className="px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      ref={imagesInputRef}
                      onChange={(e) => setAlbumImages([...e.target.files])}
                      accept="image/*"
                      multiple
                      className="hidden"
                      required
                    />
                    <p className="text-center text-gray-500 truncate">
                      {albumImages.length > 0
                        ? `${albumImages.length} file(s) selected`
                        : "Select album images"}
                    </p>
                  </div>
                </label>
                {albumImages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setAlbumImages([]);
                      imagesInputRef.current.value = "";
                    }}
                    className="px-2 py-1 text-sm text-red-500 hover:text-red-700"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 transition-colors"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
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
                    Creating...
                  </span>
                ) : (
                  "Create Album"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Albums List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Existing Albums
          </h2>

          {albums.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No albums found</p>
          ) : (
            <div className="space-y-4">
              {albums.map((album) => (
                <div
                  key={album._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={`${BACKEND_URL}${album.coverImage.path}`}
                        alt={album.title}
                        className="h-16 w-16 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-800 truncate">
                        {album.title}
                      </h3>
                      <p className="text-sm text-gray-500 truncate">
                        {album.description || "No description"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(album.date).toLocaleDateString()} •{" "}
                        {album.images.length} photos
                      </p>
                    </div>
                    <div>
                      <button
                        onClick={() => handleDeleteAlbum(album._id)}
                        disabled={isDeleting}
                        className="p-2 text-red-500 hover:text-red-700 disabled:opacity-50"
                        title="Delete album"
                      >
                        {isDeleting ? (
                          <svg
                            className="animate-spin h-5 w-5"
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
                        ) : (
                          <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumForm;
