import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/backend";
import { useParams, useNavigate } from "react-router-dom";
import { formatDateForInput, parseInputDate } from "../utils/dateUtils";

export const BlogForm = ({ refreshBlogs }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    date: "",
    readTime: "",
    content: "",
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load blog if in edit mode
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/blogs/${id}`);
          const blogData = response.data;

          // Format the date for the input field
          setFormData({
            ...blogData,
            date: formatDateForInput(blogData.date),
          });

          if (blogData.images && blogData.images.length > 0) {
            setExistingImages(
              blogData.images.map((img) => `${BACKEND_URL}${img}`)
            );
          }
          setIsEditMode(true);
        } catch (error) {
          showToast(
            `Error: ${error.response?.data?.error || error.message}`,
            "error"
          );
        }
      };
      fetchBlog();
    }
  }, [id]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "date" ? parseInputDate(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = [
      "title",
      "excerpt",
      "category",
      "date",
      "readTime",
      "content",
    ];
    const missingField = requiredFields.find((field) => !formData[field]);

    if (
      missingField ||
      (images.length === 0 && existingImages.length === 0 && !isEditMode)
    ) {
      showToast(
        `Please fill out all required fields${
          images.length === 0 && existingImages.length === 0
            ? " and select at least one image"
            : ""
        }`,
        "error"
      );
      setIsSubmitting(false);
      return;
    }
    const formattedContent = formData.content.replace(/\n/g, "<br>");
    const apiData = {
      ...formData,
      content: formattedContent,
      date: formData.date ? new Date(formData.date).toISOString() : null,
    };

    const formDataToSend = new FormData();
    Object.entries(apiData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });

    images.forEach((image) => {
      formDataToSend.append("images", image);
    });

    try {
      if (isEditMode) {
        await axios.put(`${BACKEND_URL}/api/blogs/${id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Blog updated successfully!");
        navigate("/blogs"); // or wherever you want to redirect
      } else {
        const response = await axios.post(
          `${BACKEND_URL}/api/blogs`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        showToast("Blog created successfully!");
        // navigate(`/blogform/${response.data._id}`);
        resetForm(); // Clear the form for new entries
      }
      refreshBlogs && refreshBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
      showToast(
        `Error: ${error.response?.data?.error || error.message}`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    if (!isEditMode) {
      setFormData({
        title: "",
        excerpt: "",
        category: "",
        date: "",
        readTime: "",
        content: "",
      });
      setImages([]);
      setExistingImages([]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
      </h2>

      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-white flex items-center justify-between min-w-[300px] ${
            toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          <div className="flex items-center">
            {toast.type === "success" ? (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            {toast.message}
          </div>
          <button
            onClick={() => setToast(null)}
            className="ml-4 font-bold hover:opacity-80"
          >
            &times;
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category*
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Technology, Lifestyle"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Publish Date*
            </label>
            <input
              type="date"
              name="date"
              value={formData.date ? formatDateForInput(formData.date) : ""}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Read Time*
            </label>
            <input
              type="text"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="e.g. 5 min read"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Excerpt*
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Short description of your blog"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Featured Images{!isEditMode && "*"}
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-500 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
              <svg
                className="w-8 h-8 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">
                {images.length > 0
                  ? `${images.length} image(s) selected`
                  : "Choose images"}
              </span>
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                multiple
                required={!isEditMode && existingImages.length === 0}
              />
            </label>
            {(images.length > 0 || existingImages.length > 0) && (
              <button
                type="button"
                onClick={() => {
                  setImages([]);
                  if (isEditMode) {
                    setExistingImages([]);
                  }
                }}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove All
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {existingImages.map((img, index) => (
              <div key={`existing-${index}`} className="relative">
                <img
                  src={img}
                  alt={`Existing blog ${index + 1}`}
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            {images.map((img, index) => (
              <div key={`new-${index}`} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`New blog ${index + 1}`}
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Content*
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            rows="8"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Reset
          </button>
          <button
            type="submit"
            className={`px-6 py-2 rounded-lg text-white ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors flex items-center`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
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
                {isEditMode ? "Updating..." : "Publishing..."}
              </>
            ) : isEditMode ? (
              "Update Blog"
            ) : (
              "Publish Blog"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
