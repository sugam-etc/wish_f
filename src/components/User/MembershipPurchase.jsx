import React, { useState } from "react";
import userService from "../../api/userService";
import { useUserAuth } from "../../../UserAuth/UserAuthContext";
import { useNavigate } from "react-router-dom";
import qr from "../../assets/qr.png";
import { toast } from "react-toastify";

const MembershipPurchaseForm = () => {
  const { user } = useUserAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "Exclusive",
    duration: "1 month",
    price: 4000,
    paymentMethod: "credit_card",
    transactionId: "",
    transactionProof: null,
    autoRenew: false,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: e.target.files[0],
      }));
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Update price based on selection
    if (name === "name" || name === "duration") {
      let newPrice = 0;
      if (name === "name") {
        if (value === "Exclusive") {
          newPrice =
            e.target.form.duration.value === "1 month"
              ? 4000
              : e.target.form.duration.value === "6 months"
              ? 12000
              : 18000;
        } else if (value === "Inclusive") {
          newPrice =
            e.target.form.duration.value === "1 month"
              ? 5000
              : e.target.form.duration.value === "3 months"
              ? 12000
              : 18000;
        }
      } else if (name === "duration") {
        if (e.target.form.name.value === "Exclusive") {
          newPrice =
            value === "1 month" ? 4000 : value === "6 months" ? 12000 : 18000;
        } else if (e.target.form.name.value === "Inclusive") {
          newPrice =
            value === "1 month" ? 5000 : value === "3 months" ? 12000 : 18000;
        }
      }
      setFormData((prevData) => ({ ...prevData, price: newPrice }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in and not an admin
    if (!user || !user.token) {
      toast.error("Please login to purchase membership");
      navigate("/login", { state: { from: "/membership" } });
      return;
    }

    if (user.role === "admin") {
      toast.error("Admins cannot purchase memberships");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("duration", formData.duration);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("paymentMethod", formData.paymentMethod);
      formDataToSend.append("transactionId", formData.transactionId);
      formDataToSend.append("autoRenew", formData.autoRenew);
      if (formData.transactionProof) {
        formDataToSend.append("transactionProof", formData.transactionProof);
      }

      const response = await userService.purchaseMembership(
        formDataToSend,
        user.token
      );

      setMessage(
        "Membership purchased successfully! Pending admin verification."
      );
      setFormData({
        name: "Exclusive",
        duration: "1 month",
        price: 4000,
        paymentMethod: "credit_card",
        transactionId: "",
        transactionProof: null,
        autoRenew: false,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to purchase membership."
      );
    } finally {
      setLoading(false);
    }
  };

  // Main form render - visible to all users
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative inline-block">
            <span className="relative z-10">Join Our Climbing Community</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-amber-300 z-0 opacity-70"></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect membership plan to start your climbing journey
          </p>
        </div>

        {/* Pricing Section */}
        <section className="mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Exclusive Membership */}
              <div
                className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  formData.name === "Exclusive"
                    ? "ring-4 ring-amber-400"
                    : "ring-1 ring-amber-200"
                }`}
              >
                {formData.name === "Exclusive" && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                    SELECTED
                  </div>
                )}
                <div className="bg-gradient-to-br from-white to-amber-50 p-8 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Exclusive Membership
                    </h3>
                    <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Perfect for climbers with their own gear
                  </p>

                  <div className="space-y-4 mb-8">
                    <div
                      className={`flex justify-between items-center p-4 rounded-lg transition-all ${
                        formData.name === "Exclusive" &&
                        formData.duration === "1 month"
                          ? "bg-amber-100 border-amber-300 border-2"
                          : "bg-white border border-amber-100"
                      }`}
                    >
                      <div>
                        <span className="block text-gray-700 font-medium">
                          1 Month
                        </span>
                        <span className="text-sm text-gray-500">
                          Wall access only
                        </span>
                      </div>
                      <span className="font-bold text-lg">Rs. 4,000</span>
                    </div>

                    <div
                      className={`flex justify-between items-center p-4 rounded-lg transition-all ${
                        formData.name === "Exclusive" &&
                        formData.duration === "6 months"
                          ? "bg-amber-100 border-amber-300 border-2"
                          : "bg-white border border-amber-100"
                      }`}
                    >
                      <div>
                        <span className="block text-gray-700 font-medium">
                          6 Months
                        </span>
                        <span className="text-sm text-gray-500">
                          Save Rs. 12,000
                        </span>
                      </div>
                      <span className="font-bold text-lg">Rs. 12,000</span>
                    </div>

                    <div
                      className={`flex justify-between items-center p-4 rounded-lg transition-all ${
                        formData.name === "Exclusive" &&
                        formData.duration === "12 months"
                          ? "bg-amber-100 border-amber-300 border-2"
                          : "bg-white border border-amber-100"
                      }`}
                    >
                      <div>
                        <span className="block text-gray-700 font-medium">
                          12 Months
                        </span>
                        <span className="text-sm text-gray-500">
                          Best value (Save Rs. 30,000)
                        </span>
                      </div>
                      <span className="font-bold text-lg">Rs. 18,000</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        name: "Exclusive",
                        duration: "1 month",
                        price: 4000,
                      }));
                    }}
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                      formData.name === "Exclusive"
                        ? "bg-amber-600 text-white shadow-lg"
                        : "bg-white text-amber-600 border-2 border-amber-400 hover:bg-amber-50"
                    }`}
                  >
                    {formData.name === "Exclusive"
                      ? "Currently Selected"
                      : "Select This Plan"}
                  </button>
                </div>
              </div>

              {/* Inclusive Membership */}
              <div
                className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  formData.name === "Inclusive"
                    ? "ring-4 ring-amber-400"
                    : "ring-1 ring-amber-200"
                }`}
              >
                {formData.name === "Inclusive" && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                    SELECTED
                  </div>
                )}
                <div className="bg-gradient-to-br from-white to-amber-50 p-8 h-full">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">
                    Inclusive Membership
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Includes gear rentals - perfect for beginners
                  </p>

                  <div className="space-y-4 mb-8">
                    <div
                      className={`flex justify-between items-center p-4 rounded-lg transition-all ${
                        formData.name === "Inclusive" &&
                        formData.duration === "1 month"
                          ? "bg-amber-100 border-amber-300 border-2"
                          : "bg-white border border-amber-100"
                      }`}
                    >
                      <div>
                        <span className="block text-gray-700 font-medium">
                          1 Month
                        </span>
                        <span className="text-sm text-gray-500">
                          Includes gear
                        </span>
                      </div>
                      <span className="font-bold text-lg">Rs. 5,000</span>
                    </div>

                    <div
                      className={`flex justify-between items-center p-4 rounded-lg transition-all ${
                        formData.name === "Inclusive" &&
                        formData.duration === "3 months"
                          ? "bg-amber-100 border-amber-300 border-2"
                          : "bg-white border border-amber-100"
                      }`}
                    >
                      <div>
                        <span className="block text-gray-700 font-medium">
                          3 Months
                        </span>
                        <span className="text-sm text-gray-500">
                          Save Rs. 3,000
                        </span>
                      </div>
                      <span className="font-bold text-lg">Rs. 12,000</span>
                    </div>

                    <div
                      className={`flex justify-between items-center p-4 rounded-lg transition-all ${
                        formData.name === "Inclusive" &&
                        formData.duration === "6 months"
                          ? "bg-amber-100 border-amber-300 border-2"
                          : "bg-white border border-amber-100"
                      }`}
                    >
                      <div>
                        <span className="block text-gray-700 font-medium">
                          6 Months
                        </span>
                        <span className="text-sm text-gray-500">
                          Best value (Save Rs. 12,000)
                        </span>
                      </div>
                      <span className="font-bold text-lg">Rs. 18,000</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        name: "Inclusive",
                        duration: "1 month",
                        price: 5000,
                      }));
                    }}
                    className={`w-full py-3 px-6 rounded-lg font-bold transition-all ${
                      formData.name === "Inclusive"
                        ? "bg-amber-600 text-white shadow-lg"
                        : "bg-white text-amber-600 border-2 border-amber-400 hover:bg-amber-50"
                    }`}
                  >
                    {formData.name === "Inclusive"
                      ? "Currently Selected"
                      : "Select This Plan"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Purchase Form Section */}
        <section className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
              <h2 className="text-2xl font-bold">Complete Your Membership</h2>
              <p className="opacity-90">
                Selected Plan: {formData.name} ({formData.duration})
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm">Total Amount:</span>
                <span className="text-3xl font-bold">
                  Rs. {formData.price.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Form Content */}
            <form
              onSubmit={handleSubmit}
              className="p-6 md:p-8"
              encType="multipart/form-data"
            >
              {message && (
                <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
                  <p className="font-medium">{message}</p>
                </div>
              )}
              {error && (
                <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
                  <p className="font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                {/* Plan Selection */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Membership Plan
                    </label>
                    <select
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      required
                    >
                      <option value="Exclusive">
                        Exclusive (Wall access only)
                      </option>
                      <option value="Inclusive">
                        Inclusive (Includes gear rentals)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Duration
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      required
                    >
                      {formData.name === "Exclusive" ? (
                        <>
                          <option value="1 month">1 Month</option>
                          <option value="6 months">6 Months</option>
                          <option value="12 months">12 Months</option>
                        </>
                      ) : (
                        <>
                          <option value="1 month">1 Month</option>
                          <option value="3 months">3 Months</option>
                          <option value="6 months">6 Months</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-amber-50 p-6 rounded-xl">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Payment Information
                  </h3>

                  {/* QR Code Container - Added here */}
                  <div className="mb-6 p-4 bg-white rounded-lg border border-amber-200 flex flex-col items-center">
                    <h4 className="text-md font-semibold text-gray-700 mb-2">
                      Scan to Pay
                    </h4>
                    <div className="w-48 h-48 bg-gray-100 flex items-center justify-center mb-2">
                      {/* Placeholder for QR code image */}
                      {/* <span className="text-gray-400">QR Code Image</span> */}
                      <img src={qr} />
                    </div>
                    <p className="text-sm text-gray-600 text-center">
                      West Indoor Sport Hub Pvt. Ltd.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Payment Method
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        required
                      >
                        {/* <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option> */}
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="e-wallet">
                          Esewa/Khalti/OtherWallets
                        </option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                        placeholder="Enter transaction ID"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Transaction Proof
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-amber-400 hover:bg-amber-50 rounded-lg cursor-pointer transition-all">
                        <div className="p-6 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="text-sm text-gray-600">
                            {formData.transactionProof ? (
                              <span className="font-medium text-amber-600">
                                {formData.transactionProof.name}
                              </span>
                            ) : (
                              <>
                                <span className="font-medium">
                                  Upload proof of payment
                                </span>
                                <br />
                                (PDF, JPG, PNG up to 5MB)
                              </>
                            )}
                          </p>
                        </div>
                        <input
                          type="file"
                          name="transactionProof"
                          onChange={handleChange}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-4 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg shadow-md transition-all transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                    loading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
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
                      Processing...
                    </span>
                  ) : (
                    "Complete Purchase"
                  )}
                </button>

                {/* Help Text */}
                <p className="text-center text-sm text-gray-500">
                  Need help? Contact our support team at support@climbinggym.com
                </p>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MembershipPurchaseForm;
