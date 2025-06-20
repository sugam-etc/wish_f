import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/backend";
import { useParams, useNavigate } from "react-router-dom";

const AdventureForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    shortDescription: "",
    location: "",
    duration: "",
    priceRange: "",
    hours: "",
    contact: {
      phone: "",
      email: "",
      website: "",
    },
    rating: 0,
    about: "",
  });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load adventure if in edit mode
  useEffect(() => {
    if (id) {
      const fetchAdventure = async () => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/api/adventures/${id}`
          );
          setFormData(response.data);
          if (response.data.image) {
            setExistingImage(`${BACKEND_URL}${response.data.image}`);
          }
          setIsEditMode(true);
        } catch (error) {
          showToast(
            `Error: ${error.response?.data?.error || error.message}`,
            "error"
          );
        }
      };
      fetchAdventure();
    }
  }, [id]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [name]: value },
    }));
  };

  const handleRatingChange = (newRating) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
  };
  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      shortDescription: "",
      location: "",
      duration: "",
      priceRange: "",
      hours: "",
      contact: { phone: "", email: "", website: "" },
      rating: 0,
      about: "",
    });
    setImage(null);
    setExistingImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = [
      "name",
      "type",
      "shortDescription",
      "location",
      "duration",
      "priceRange",
      "hours",
    ];
    const missingField = requiredFields.find((field) => !formData[field]);

    if (missingField || (!image && !existingImage && !isEditMode)) {
      showToast(
        `Please fill out all required fields${
          !image && !existingImage ? " and select an image" : ""
        }`,
        "error"
      );
      setIsSubmitting(false);
      return;
    }

    const formDataToSend = new FormData();

    // Append all simple fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "contact" && key !== "image") {
        formDataToSend.append(key, value);
      }
    });

    // Append contact as JSON string
    formDataToSend.append("contact", JSON.stringify(formData.contact));

    if (image) formDataToSend.append("image", image);

    try {
      if (isEditMode) {
        await axios.put(`${BACKEND_URL}/api/adventures/${id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Adventure updated successfully!");
        // For edit mode, you might want to navigate away or refresh the data
        navigate("/adventures"); // or wherever you want to redirect
      } else {
        await axios.post(`${BACKEND_URL}/api/adventures`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Adventure created successfully!");
        resetForm(); // Clear the form for new entries
      }
    } catch (error) {
      console.error("Error saving adventure:", error);
      showToast(
        `Error: ${error.response?.data?.error || error.message}`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? "Edit Adventure" : "Create New Adventure"}
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
          {/* Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Adventure Name*
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Jungle Safari"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Type*
            </label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="e.g. Hiking, Water Sports"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Location*
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Bali, Indonesia"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Duration*
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              placeholder="e.g. 2 hours, Full day"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Price Range*
            </label>
            <input
              type="text"
              name="priceRange"
              value={formData.priceRange}
              onChange={handleChange}
              placeholder="e.g. $50-$100, €30-€60"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Hours */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Operating Hours*
            </label>
            <input
              type="text"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              placeholder="e.g. 9AM-5PM, 24/7"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Short Description*
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="Brief description of the adventure"
            rows="3"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* About */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            About this adventure
          </label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            placeholder="Detailed description of the adventure"
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.contact.phone}
                onChange={handleContactChange}
                placeholder="Phone number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.contact.email}
                onChange={handleContactChange}
                placeholder="Email address"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={formData.contact.website}
                onChange={handleContactChange}
                placeholder="Website URL"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  star <= formData.rating
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {star}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Featured Image{!isEditMode && "*"}
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
                {image ? image.name : "Choose an image"}
              </span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
                accept="image/*"
                required={!isEditMode}
              />
            </label>
            {existingImage && !image && (
              <div className="relative">
                <img
                  src={existingImage}
                  alt="Current adventure"
                  className="h-20 w-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setExistingImage("");
                    setFormData((prev) => ({ ...prev, image: "" }));
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            )}
            {(image || existingImage) && (
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  if (isEditMode) {
                    setExistingImage("");
                  }
                }}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
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
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : isEditMode ? (
              "Update Adventure"
            ) : (
              "Create Adventure"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdventureForm;
