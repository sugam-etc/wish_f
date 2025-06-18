import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/backend";
import { useParams, useNavigate } from "react-router-dom";
import { formatDateForInput } from "../utils/dateUtils";

// Enhanced Toast component with animations and icons
const Toast = ({ message, type, onClose }) => (
  <div
    className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-white flex items-center justify-between min-w-[300px] transform transition-all duration-300 ${
      type === "success" ? "bg-emerald-500" : "bg-rose-500"
    }`}
  >
    <div className="flex items-center">
      {type === "success" ? (
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
      {message}
    </div>
    <button
      onClick={onClose}
      className="ml-4 font-bold hover:opacity-80 transition-opacity"
      aria-label="Close notification"
    >
      &times;
    </button>
  </div>
);

export const EventForm = ({ refreshEvents }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    time: "",
    description: "",
    url: "",
  });
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [toast, setToast] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load event if in edit mode
  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const response = await axios.get(`${BACKEND_URL}/api/events/${id}`);
          const eventData = response.data;

          setFormData({
            ...eventData,
            date: formatDateForInput(eventData.date),
          });

          if (eventData.image) {
            setExistingImage(`${BACKEND_URL}${eventData.image}`);
          }
          setIsEditMode(true);
        } catch (error) {
          showToast(
            `Error: ${error.response?.data?.error || error.message}`,
            "error"
          );
        }
      };
      fetchEvent();
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
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const removeImage = () => {
    setImage(null);
  };

  const removeExistingImage = () => {
    setExistingImage(null);
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    const requiredFields = [
      "title",
      "date",
      "location",
      "time",
      "description",
      "url",
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
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formDataToSend.append(key, value);
      }
    });

    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      if (isEditMode) {
        await axios.put(`${BACKEND_URL}/api/events/${id}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Event updated successfully!");
        navigate("/"); // or wherever you want to redirect
      } else {
        const response = await axios.post(
          `${BACKEND_URL}/api/events`,
          formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        showToast("Event created successfully!");
        resetForm(); // Clear the form for new entries
      }
      refreshEvents && refreshEvents();
    } catch (error) {
      console.error("Error saving event:", error);
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
        date: "",
        location: "",
        time: "",
        description: "",
        url: "",
      });
      setImage(null);
      setExistingImage(null);
    }
  };

  const closeToast = () => setToast(null);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        {isEditMode ? "Edit Event" : "Create New Event"}
      </h2>

      {toast && <Toast {...toast} onClose={closeToast} />}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Event Title*
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Annual Conference"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Date*
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Location*
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Convention Center, New York"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Time*
            </label>
            <input
              type="text"
              name="time"
              value={formData.time}
              onChange={handleChange}
              placeholder="e.g. 9:00 AM - 5:00 PM"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description*
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Detailed description of the event"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Event URL*
          </label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com/event"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Event Image{!isEditMode && "*"}
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
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                required={!isEditMode && !existingImage}
              />
            </label>
            {(image || existingImage) && (
              <button
                type="button"
                onClick={existingImage ? removeExistingImage : removeImage}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {existingImage && (
              <div className="relative">
                <img
                  src={existingImage}
                  alt="Existing event"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              </div>
            )}
            {image && (
              <div className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt="New event"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

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
              "Update Event"
            ) : (
              "Create Event"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
