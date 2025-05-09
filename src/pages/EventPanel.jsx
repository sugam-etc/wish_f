// src/components/EventsAdminPanel.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../App";

const EventsAdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    time: "",
    description: "",
    url: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const API_URL = `${BACKEND_URL}/api/events`;
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("image", imageFile);

    try {
      await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({
        title: "",
        date: "",
        location: "",
        time: "",
        description: "",
        url: "",
      });
      setImageFile(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchEvents();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Events</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border p-4 rounded shadow"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="time"
          placeholder="Time (e.g. 5PM - 7PM)"
          value={formData.time}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          rows={3}
          required
        />
        <input
          type="url"
          name="url"
          placeholder="Event URL"
          value={formData.url}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event) => (
          <div key={event._id} className="border rounded shadow p-4">
            <img
              src={`http://localhost:5000${event.image}`}
              alt={event.title}
              className="w-full h-48 object-cover rounded mb-2"
            />
            <h2 className="font-bold">{event.title}</h2>
            <p className="text-sm text-gray-600">
              {event.location} | {event.date} | {event.time}
            </p>
            <p className="text-sm mt-1">{event.description}</p>
            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                Visit Event
              </a>
            )}
            <button
              onClick={() => handleDelete(event._id)}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsAdminPanel;
