import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../UserAuth/UserAuthContext";
import userService from "../../api/userService";
import membershipService from "../../api/membershipService";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiAward,
  FiCreditCard,
  FiCalendar,
  FiDollarSign,
  FiTrash2,
  FiEdit2,
  FiArrowLeft,
  FiAlertTriangle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { BACKEND_URL } from "../../config/backend";

const UserDetail = () => {
  const { userId } = useParams();
  const { user: currentUser, token } = useUserAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rewardName, setRewardName] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [rejectModal, setRejectModal] = useState({
    open: false,
    membershipId: null,
    reason: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (currentUser?.role !== "admin") {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await userService.getUser(userId, token);
        if (!userData) throw new Error("User data not received");
        setUser(userData);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, token, currentUser, navigate]);

  const handleAddReward = async (e) => {
    e.preventDefault();
    try {
      const rewardData = {
        userId,
        name: rewardName,
        description: rewardDescription,
      };
      const response = await userService.addReward(rewardData, token);

      setUser((prev) => ({
        ...prev,
        rewards: [...(prev.rewards || []), response],
      }));

      setRewardName("");
      setRewardDescription("");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to add reward");
    }
  };

  const handleRemoveReward = async (rewardId) => {
    if (!window.confirm("Are you sure you want to remove this reward?")) return;

    try {
      await userService.removeReward(userId, rewardId, token);
      setUser((prev) => ({
        ...prev,
        rewards: prev.rewards.filter((reward) => reward._id !== rewardId),
      }));
    } catch (error) {
      setError(error.response?.data?.message || "Failed to remove reward");
    }
  };
  const handleVerify = async (membershipId) => {
    if (!window.confirm("Are you sure you want to verify this membership?"))
      return;

    setIsProcessing(true);
    try {
      await membershipService.verifyMembership(membershipId, "", token);
      // Refresh user data
      const updatedUser = await userService.getUser(userId, token);
      setUser(updatedUser);
      alert("Membership verified successfully");
    } catch (error) {
      console.error("Verification failed:", error);
      alert(error.response?.data?.message || "Failed to verify membership");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    if (!rejectModal.reason) {
      alert("Please enter a rejection reason");
      return;
    }

    setIsProcessing(true);
    try {
      await membershipService.rejectMembership(
        rejectModal.membershipId,
        rejectModal.reason,
        token
      );
      // Refresh user data
      const updatedUser = await userService.getUser(userId, token);
      setUser(updatedUser);
      setRejectModal({ open: false, membershipId: null, reason: "" });
      alert("Membership rejected successfully");
    } catch (error) {
      console.error("Rejection failed:", error);
      alert(error.response?.data?.message || "Failed to reject membership");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = async (membershipId) => {
    if (!window.confirm("Are you sure you want to cancel this membership?"))
      return;

    setIsProcessing(true);
    try {
      await membershipService.cancelMembership(membershipId, token);
      // Refresh user data
      const updatedUser = await userService.getUser(userId, token);
      setUser(updatedUser);
      alert("Membership cancelled successfully");
    } catch (error) {
      console.error("Cancellation failed:", error);
      alert(error.response?.data?.message || "Failed to cancel membership");
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await userService.getUser(userId, token);
      return userData;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  };
  console.log(userId);
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md">
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <p className="text-xl mb-4">User not found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
        >
          <FiArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-50 transition flex items-center"
      >
        <FiArrowLeft className="mr-2" /> Back to Users
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* User Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-4 md:mb-0 md:mr-6">
              {user.profileImage ? (
                <img
                  src={`${BACKEND_URL}${user.profileImage}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-blue-500">
                  <FiUser size={48} />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user.fullName}</h1>
              <p className="flex items-center mt-2">
                <FiMail className="mr-2" /> {user.email}
              </p>
              <p className="flex items-center">
                <FiPhone className="mr-2" /> {user.contactNo || "Not provided"}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === "profile"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("membership")}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === "membership"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Membership
            </button>
            <button
              onClick={() => setActiveTab("rewards")}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === "rewards"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Rewards
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === "history"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Purchase History
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FiUser className="mr-2" /> Basic Info
                  </h3>
                  <p>
                    <span className="font-medium">Full Name:</span>{" "}
                    {user.fullName}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-medium">Contact:</span>{" "}
                    {user.contactNo || "Not provided"}
                  </p>
                  <p>
                    <span className="font-medium">Nationality:</span>{" "}
                    {user.nationality || "Not provided"}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <FiMapPin className="mr-2" /> Address
                  </h3>
                  {user.address ? (
                    <>
                      <p>{user.address.street}</p>
                      <p>
                        {user.address.city}, {user.address.state}
                      </p>
                      <p>{user.address.postalCode}</p>
                      <p>{user.address.country}</p>
                    </>
                  ) : (
                    <p>No address information available</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Membership Tab */}
          {activeTab === "membership" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Membership Details</h2>
              {user.membership ? (
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Membership Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Basic Info */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FiCreditCard className="text-blue-600" size={18} />
                        </div>
                        <h3 className="font-semibold text-gray-700">
                          Membership
                        </h3>
                      </div>
                      <p className="text-lg font-bold">
                        {user.membership.name}
                      </p>
                      <div className="mt-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.membership.status === "active"
                              ? "bg-green-100 text-green-800"
                              : user.membership.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.membership.status.toUpperCase()}
                        </span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FiCalendar className="text-blue-600" size={18} />
                        </div>
                        <h3 className="font-semibold text-gray-700">Dates</h3>
                      </div>
                      <div className="space-y-1">
                        <p>
                          <span className="text-gray-600">Purchased: </span>
                          <span className="font-medium">
                            {new Date(
                              user.membership.purchaseDate
                            ).toLocaleDateString()}
                          </span>
                        </p>
                        <p>
                          <span className="text-gray-600">Expires: </span>
                          <span className="font-medium">
                            {new Date(
                              user.membership.expiryDate
                            ).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Payment */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FiDollarSign className="text-blue-600" size={18} />
                        </div>
                        <h3 className="font-semibold text-gray-700">Payment</h3>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-lg">
                          NPR {user.membership.price}
                        </p>
                        <p className="text-sm text-gray-600">
                          Method: {user.membership.paymentMethod}
                        </p>
                        {user.membership.transactionId && (
                          <p className="text-sm text-gray-600">
                            Transaction: {user.membership.transactionId}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-blue-50 p-4 rounded-lg md:col-span-2 lg:col-span-1">
                      <div className="flex items-center mb-3">
                        <div className="bg-blue-100 p-2 rounded-full mr-3">
                          <FiInfo className="text-blue-600" size={18} />
                        </div>
                        <h3 className="font-semibold text-gray-700">
                          Additional Info
                        </h3>
                      </div>
                      <div className="space-y-1">
                        <p>
                          <span className="text-gray-600">Auto-renew: </span>
                          <span className="font-medium">
                            {user.membership.autoRenew ? "Yes" : "No"}
                          </span>
                        </p>
                        {user.membership.verificationNotes && (
                          <p>
                            <span className="text-gray-600">Notes: </span>
                            <span className="font-medium">
                              {user.membership.verificationNotes}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons (for admin) */}
                    {
                      <div className="bg-blue-50 p-4 rounded-lg md:col-span-2 lg:col-span-3">
                        <div className="flex flex-wrap gap-3">
                          {user.membership.status === "pending" && (
                            <>
                              <button
                                className={`px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ${
                                  isProcessing
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleVerify(user.membership._id)
                                }
                                disabled={isProcessing}
                              >
                                {isProcessing
                                  ? "Processing..."
                                  : "Approve Membership"}
                              </button>
                              <button
                                className={`px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 ${
                                  isProcessing
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                                }`}
                                onClick={() =>
                                  setRejectModal({
                                    open: true,
                                    membershipId: user.membership._id,
                                    reason: "",
                                  })
                                }
                                disabled={isProcessing}
                              >
                                Reject Membership
                              </button>
                            </>
                          )}

                          <button
                            className={`px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ${
                              isProcessing
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            onClick={() => handleCancel(user.membership._id)}
                            disabled={isProcessing}
                          >
                            {isProcessing
                              ? "Processing..."
                              : "Cancel Membership"}
                          </button>
                        </div>
                      </div>
                    }

                    {/* <div className="mt-4 md:col-span-2 lg:col-span-3 border-t pt-4">
                      <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
                        <div className="flex items-center">
                          <FiXCircle className="text-red-500 mr-3" size={20} />
                          <div>
                            <h3 className="font-medium">Cancel Membership</h3>
                            <p className="text-sm text-gray-600">
                              This will immediately terminate your membership
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={async () => {
                            if (
                              window.confirm(
                                "Are you sure you want to cancel your membership?"
                              )
                            ) {
                              try {
                                const token = localStorage.getItem("token");
                                await membershipService.cancelMembership(
                                  user.membership._id,
                                  token
                                );
                                // Refresh user data
                                const updatedUser = await fetchUserData();
                                setUser(updatedUser);
                                alert("Membership cancelled successfully");
                              } catch (error) {
                                console.error(
                                  "Failed to cancel membership:",
                                  error
                                );
                                alert(
                                  error.response?.data?.message ||
                                    "Failed to cancel membership"
                                );
                              }
                            }
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Cancel Membership
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                  <div className="flex flex-col items-center text-center">
                    <FiAlertTriangle
                      className="text-yellow-500 mb-2"
                      size={24}
                    />
                    <h3 className="text-lg font-medium text-yellow-800 mb-1">
                      No Active Membership
                    </h3>
                    <p className="text-yellow-700">
                      This user doesn't have an active membership plan
                    </p>
                    {user.role === "admin" && (
                      <button
                        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => navigate("/admin/memberships/new")}
                      >
                        Create Membership
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Rewards Tab */}
          {activeTab === "rewards" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Rewards</h2>
                <button
                  onClick={() =>
                    document.getElementById("reward-modal").showModal()
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded flex items-center"
                >
                  <FiAward className="mr-2" /> Add Reward
                </button>
              </div>

              {user.rewards?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {user.rewards.map((reward, index) => (
                    <div
                      key={reward._id || index}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{reward.name}</h3>
                          <p className="text-gray-600 text-sm">
                            {reward.description}
                          </p>
                          <p className="text-gray-400 text-xs mt-2">
                            Awarded:{" "}
                            {new Date(reward.dateEarned).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveReward(reward._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Remove Reward"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 p-8 text-center rounded-lg">
                  <FiAward className="mx-auto text-gray-400" size={48} />
                  <p className="mt-4 text-gray-500">No rewards yet</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Purchase History Tab */}
          {activeTab === "history" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">Purchase History</h2>
              {user.purchaseHistory?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Item
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.purchaseHistory.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.itemName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.itemType}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            ${item.price}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(item.purchaseDate).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 p-8 text-center rounded-lg">
                  <p className="text-gray-500">No purchase history available</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Add Reward Modal */}
      <dialog id="reward-modal" className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          {/* Modal content */}
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Add New Reward
                  </h3>
                  <form onSubmit={handleAddReward} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reward Name
                      </label>
                      <input
                        type="text"
                        value={rewardName}
                        onChange={(e) => setRewardName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={rewardDescription}
                        onChange={(e) => setRewardDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        required
                      ></textarea>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="submit"
                        onClick={() =>
                          document.getElementById("reward-modal").close()
                        }
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                      >
                        Add Reward
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={() => document.getElementById("reward-modal").close()}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UserDetail;
