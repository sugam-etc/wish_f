import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useUserAuth } from "../../../UserAuth/UserAuthContext";
import { BACKEND_URL } from "../../config/backend";
import qr from "../../assets/qr.png";
const PurchaseForm = () => {
  const { user, isAuthenticated } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get item details from location state (passed from ItemDetail page)
  const { item, quantity: itemQuantity = 1 } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    transactionId: "",
    paymentProof: null,
    quantity: itemQuantity || 1,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (!item) {
      navigate("/store");
      return;
    }

    // Pre-fill user details if available
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.email || "",
        contact: user.phone || "",
      }));
    }
  }, [user, isAuthenticated, navigate, item, location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      paymentProof: e.target.files[0],
    });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, formData.quantity + change);
    if (newQuantity <= (item?.stock || 1)) {
      setFormData({
        ...formData,
        quantity: newQuantity,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!isAuthenticated) {
      setError("Please login to complete your purchase");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", user._id);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("contact", formData.contact);
      formDataToSend.append("transactionId", formData.transactionId);
      formDataToSend.append(
        "totalAmount",
        (item.price * formData.quantity).toFixed(2)
      );

      // Stringify the items array before appending
      const items = JSON.stringify([
        {
          itemId: item._id,
          name: item.name,
          price: item.price,
          quantity: formData.quantity,
        },
      ]);
      formDataToSend.append("items", items);

      if (formData.paymentProof) {
        formDataToSend.append("paymentProof", formData.paymentProof);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${BACKEND_URL}/api/purchases`,
        formDataToSend,
        config
      );

      setSuccess("Purchase submitted successfully!");
      setTimeout(() => {
        navigate("/userprofile");
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to submit purchase";
      setError(errorMessage);
      console.error("Purchase error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md bg-white rounded-lg shadow-md">
          <div className="text-amber-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No Item Selected
          </h3>
          <p className="text-gray-600 mb-6">
            Please select an item from the store to purchase.
          </p>
          <button
            onClick={() => navigate("/store")}
            className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Item
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Complete Your Purchase
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}

        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Purchasing:
          </h3>
          <div className="flex items-start">
            <div className="w-20 h-20 bg-gray-200 rounded-md overflow-hidden mr-4">
              {item.image ? (
                <img
                  src={`${item.image}`}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-amber-600 font-medium">
                ${item.price?.toFixed(2)}
              </p>
              <div className="flex items-center mt-2">
                <div className="flex items-center border border-gray-300 rounded-md mr-4">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={formData.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-2 py-1">{formData.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    disabled={formData.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {item.stock} available
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="font-medium">
              Total: ${(item.price * formData.quantity).toFixed(2)}
            </p>
          </div>
        </div>

        {/* QR Code Payment Option - Added Section */}
        <div className="mb-6 p-4 bg-indigo-50 rounded-md border border-indigo-100">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Quick Payment via QR Code
          </h3>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48 bg-white p-3 rounded-md border border-gray-200 flex items-center justify-center">
              {/* QR Code Placeholder - Replace with actual QR code */}
              <div className="text-center text-gray-400">
                <img src={qr} />
                <span className="text-xs">Scan to Pay</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-700 mb-2">
                Payment Instructions:
              </h4>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Open your mobile payment app</li>
                <li>Select 'Scan QR Code' option</li>
                <li>Point your camera at this code</li>
                <li>
                  Enter the amount: $
                  {(item.price * formData.quantity).toFixed(2)}
                </li>
                <li>Complete the payment</li>
              </ol>
              <p className="mt-3 text-xs text-gray-500">
                After payment, please upload the transaction proof below.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Transaction ID
            </label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your payment transaction ID"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Payment Proof (Screenshot/Receipt)
            </label>
            <input
              type="file"
              name="paymentProof"
              onChange={handleFileChange}
              accept="image/*,.pdf"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload a screenshot or photo of your payment confirmation
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Complete Purchase"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PurchaseForm;
