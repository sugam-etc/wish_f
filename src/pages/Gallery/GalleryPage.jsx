import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Search } from "lucide-react";
import { getAlbums, getAlbumById } from "../../api/albumService";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../../config/backend";
import img4 from "../../assets/BackgroundImages/img4.jpg";
const GalleryPage = () => {
  const [albums, setAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const data = await getAlbums();
        // Sort albums by date in descending order (newest first)
        const sortedAlbums = [...data].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setAlbums(sortedAlbums);
        setFilteredAlbums(sortedAlbums);
      } catch (err) {
        setError(err.message || "Failed to load albums");
        setAlbums([]);
        setFilteredAlbums([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = albums.filter((album) =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAlbums(filtered);
    } else {
      setFilteredAlbums(albums);
    }
  }, [searchQuery, albums]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const openAlbum = async (albumId) => {
    try {
      setLoading(true);
      const album = await getAlbumById(albumId);
      if (album) {
        setSelectedAlbum(album);
        setCurrentImageIndex(0);
        window.scrollTo(0, 0);
      } else {
        setError("Album not found");
      }
    } catch (err) {
      setError(err.message || "Failed to load album");
    } finally {
      setLoading(false);
    }
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    setError(null);
  };

  const openImageViewer = (index) => {
    setCurrentImageIndex(index);
    setIsViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedAlbum.images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) =>
      prev === selectedAlbum.images.length - 1 ? 0 : prev + 1
    );
  };

  if (loading && !selectedAlbum) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading albums...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased bg-white text-gray-900 min-h-screen">
      <header className="relative bg-gray-900 text-white py-16 md:py-24 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={img4} // Replace with your image path
            alt="Gallery background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
          {/* Dark overlay */}
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-light mb-4">
            <span className="font-bold">Wish</span> Gallery
          </h1>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Memories from our unforgettable events
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 md:py-16">
        {!selectedAlbum && (
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search albums..."
                value={searchQuery}
                onChange={handleSearch}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchParams({});
                  }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
        )}

        {!selectedAlbum ? (
          <>
            {searchQuery && filteredAlbums.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg">
                  No albums found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchParams({})}
                  className="mt-4 text-black underline hover:text-gray-700"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredAlbums.map((album) => (
                  <div
                    key={album._id}
                    className="group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => openAlbum(album._id)}
                  >
                    {console.log(`${BACKEND_URL}${album.coverImage.path}`)}
                    <div className="relative overflow-hidden rounded-lg aspect-square">
                      <img
                        src={`${BACKEND_URL}${album.coverImage.path}`}
                        alt={album.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-6">
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {album.title}
                          </h3>
                          <p className="text-gray-200">
                            {new Date(album.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-gray-300 mt-1">
                            {album.images.length} photos
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={closeAlbum}
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <ChevronLeft className="mr-1" size={20} />
                Back to Albums
              </button>
              <div className="text-right">
                <h2 className="text-3xl font-light">{selectedAlbum.title}</h2>
                <p className="text-gray-600">
                  {new Date(selectedAlbum.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedAlbum.images.map((image, index) => (
                <div
                  key={image._id || index}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                  onClick={() => openImageViewer(index)}
                >
                  <img
                    src={`${BACKEND_URL}${image.path}`}
                    alt={`${selectedAlbum.title} - ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {isViewerOpen && selectedAlbum && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeImageViewer}
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-6 text-white hover:text-gray-300 transition-colors p-2"
          >
            <ChevronLeft size={40} />
          </button>

          <div className="max-w-4xl mx-auto">
            <img
              src={`${BACKEND_URL}${selectedAlbum.images[currentImageIndex].path}`}
              alt={`${selectedAlbum.title} - ${currentImageIndex + 1}`}
              className="max-h-[80vh] w-auto mx-auto object-contain"
            />
          </div>

          <button
            onClick={goToNext}
            className="absolute right-6 text-white hover:text-gray-300 transition-colors p-2"
          >
            <ChevronRight size={40} />
          </button>

          <div className="absolute bottom-6 left-0 right-0 text-center text-white">
            {currentImageIndex + 1} / {selectedAlbum.images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
