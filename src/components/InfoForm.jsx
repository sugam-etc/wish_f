import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/backend";

const InfoForm = ({ refreshInfos }) => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/infos`, { title });
      setSuccess("Info created successfully!");
      setTitle("");
      if (refreshInfos) refreshInfos();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create info");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Create New Info</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
            maxLength="100"
          />
          <p className="mt-1 text-xs text-gray-500">Max 100 characters</p>
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded-md text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-md text-white ${
            isSubmitting ? "bg-amber-400" : "bg-amber-500 hover:bg-amber-600"
          } transition-colors`}
        >
          {isSubmitting ? "Creating..." : "Create Info"}
        </button>
      </form>
    </div>
  );
};

export default InfoForm;
