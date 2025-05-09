import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser"; // Import EmailJS

// Initialize EmailJS with your user ID (move this outside the component for better practice)
const YOUR_EMAILJS_SERVICE_ID = "service_8wv9zqt"; // Replace with your Service ID
const YOUR_EMAILJS_TEMPLATE_ID = "template_nfoprae"; // Replace with your Template ID
const YOUR_EMAILJS_PUBLIC_KEY = "6tKSU1g8oXO0ZWGqV"; // Replace with your Public Key

emailjs.init(YOUR_EMAILJS_PUBLIC_KEY);

// Main component for the climbing adventure booking form
const ClimbingAdventureForm = () => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "", // Added Phone field
    "Climbing Activity": "",
    "Group Size": "",
    "Visit Date": "",
    Message: "",
  });

  // State to track form submission status
  const [submitted, setSubmitted] = useState(false);
  // State to track if the form is currently submitting
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State to hold any error message during submission
  const [submissionError, setSubmissionError] = useState("");

  // Available climbing activities
  const climbingActivities = [
    "Top Rope Climbing",
    "Bouldering",
    "Outdoor Rock Climbing",
  ];

  // Handles changes in form inputs and updates the state
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Map form field names to the keys used in the formData state
    const stateKey =
      {
        name: "Name",
        email: "Email",
        phone: "Phone", // Added mapping for phone
        climbingActivity: "Climbing Activity",
        groupSize: "Group Size",
        visitDate: "Visit Date",
        details: "Message",
      }[name] || name; // Fallback to the input's name if no mapping found

    setFormData((prev) => ({ ...prev, [stateKey]: value }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsSubmitting(true); // Indicate submission is in progress
    setSubmissionError(""); // Clear any previous error

    try {
      const response = await emailjs.send(
        YOUR_EMAILJS_SERVICE_ID,
        YOUR_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.Name,
          from_email: formData.Email,
          phone: formData.Phone,
          climbing_activity: formData["Climbing Activity"],
          group_size: formData["Group Size"],
          visit_date: formData["Visit Date"],
          message: formData.Message,
        }
      );

      if (response.status === 200) {
        setSubmitted(true); // Mark form as submitted successfully
        // Reset form fields
        setFormData({
          Name: "",
          Email: "",
          Phone: "", // Reset Phone field
          "Climbing Activity": "",
          "Group Size": "",
          "Visit Date": "",
          Message: "",
        });
      } else {
        console.error("EmailJS error:", response);
        setSubmissionError("Failed to send your request. Please try again.");
      }
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmissionError(
        "An unexpected error occurred. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false); // Mark submission process as finished
    }
  };

  // Display a thank you message after successful submission
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center p-8 bg-gray-800 rounded-lg border border-amber-500/30 max-w-lg mx-auto" // Added max-width and centering
      >
        <h3 className="text-2xl font-bold mb-2 text-amber-400">Thank You!</h3>
        <p className="text-gray-300">
          Your climbing adventure request has been submitted. We'll contact you
          shortly!
        </p>
        <button
          onClick={() => setSubmitted(false)} // Allow submitting another request
          className="mt-4 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition"
        >
          Book Another Adventure
        </button>
      </motion.div>
    );
  }

  // Render the form
  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }} // Added subtle slide-in animation
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-800/50 p-6 md:p-8 rounded-xl border border-gray-700 max-w-lg mx-auto" // Added max-width and centering
    >
      <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">
        Climbing Adventure Booking
      </h3>{" "}
      {submissionError && (
        <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{submissionError}</span>
        </div>
      )}
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          name="name" // Used in handleChange mapping
          value={formData.Name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-500 transition"
          placeholder="Your full name"
        />
      </div>
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email" // Used in handleChange mapping
          value={formData.Email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-500 transition"
          placeholder="your.email@example.com"
        />
      </div>
      {/* Phone Field (Added) */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          Phone Number (Optional)
        </label>
        <input
          type="tel" // Use type="tel" for phone numbers
          id="phone"
          name="phone" // Used in handleChange mapping
          value={formData.Phone}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-500 transition"
          placeholder="e.g., 98XXXXXXXX"
        />
      </div>
      {/* Climbing Activity Selection (Radio Buttons) */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-300">
          Climbing Activity *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {" "}
          {/* Adjusted grid for potentially 3 items */}
          {climbingActivities.map((activity) => (
            <label
              key={activity}
              className={`flex items-center p-3 bg-gray-800 rounded-lg border ${
                formData["Climbing Activity"] === activity
                  ? "border-amber-500 ring-1 ring-amber-500"
                  : "border-gray-700"
              } hover:border-amber-400 cursor-pointer transition`}
            >
              <input
                type="radio"
                name="climbingActivity" // Use this name for the group, maps via handleChange
                value={activity}
                checked={formData["Climbing Activity"] === activity}
                onChange={handleChange}
                className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-gray-600 bg-gray-700" // Tailwind form plugin classes
                required
              />
              <span className="ml-3 text-sm text-gray-300">{activity}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Group Size Dropdown */}
      <div>
        <label
          htmlFor="groupSize"
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          Group Size *
        </label>
        <select
          id="groupSize"
          name="groupSize" // Used in handleChange mapping
          value={formData["Group Size"]}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white appearance-none" // Added appearance-none for custom arrow styling if needed
        >
          <option value="">Select number of participants</option>
          <option value="1 person">1 person</option>
          <option value="2 people">2 people</option>
          <option value="3-5 people">3-5 people</option>
          <option value="6-10 people">6-10 people</option>
          <option value="10+ people">10+ people</option>
          {/* Add more options if needed */}
        </select>
      </div>
      {/* Visit Date Input */}
      <div>
        <label
          htmlFor="visitDate"
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          Preferred Visit Date *
        </label>
        <input
          type="date"
          id="visitDate"
          name="visitDate" // Used in handleChange mapping
          value={formData["Visit Date"]}
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white"
          // Style the date picker indicator for better visibility in dark mode
          style={{ colorScheme: "dark" }}
        />
      </div>
      {/* Additional Details Textarea */}
      <div>
        <label
          htmlFor="details"
          className="block text-sm font-medium mb-1 text-gray-300"
        >
          Additional Information (Optional)
        </label>
        <textarea
          id="details"
          name="details" // Used in handleChange mapping
          rows="4"
          value={formData.Message}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-500 transition"
          placeholder="e.g., climbing experience level, specific requests, dietary restrictions..." // Updated placeholder
        ></textarea>
      </div>
      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting} // Disable button while submitting
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold rounded-lg transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center" // Added flex for spinner alignment
      >
        {isSubmitting ? (
          <>
            {/* Loading spinner */}
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            <span>Processing...</span>
          </>
        ) : (
          "Book Your Climbing Adventure" // Updated button text
        )}
      </motion.button>
    </motion.form>
  );
};

export default ClimbingAdventureForm; // Export the component for use in your app
