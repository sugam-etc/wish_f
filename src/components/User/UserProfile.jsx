import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../api/userService";
import { BACKEND_URL } from "../../config/backend";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("user")).token;
        const profile = await userService.getProfile(token);
        setUser(profile);
        if (profile.profileImage) {
          setImagePreview(profile.profileImage);
        }
      } catch (err) {
        setError("Failed to load profile");
        navigate("/userlogin");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await userService.uploadProfileImage(file, token);

      // Update user state with new image
      setUser((prev) => ({
        ...prev,
        profileImage: response.profileImage,
      }));
    } catch (err) {
      setError("Failed to upload image");
      setImagePreview(user?.profileImage || null); // Revert to previous image
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm text-center">
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex justify-center">
              <div>
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/userlogin")}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extralight text-gray-900">
              My Profile
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage your account information
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate(`/userprofile/edit/:${user._id}`)}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Profile
            </button>{" "}
            <button
              onClick={() => {
                return userService.logout(), navigate("/");
              }}
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="flex items-start space-x-8 mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
              {imagePreview ? (
                <img
                  src={`${BACKEND_URL}${imagePreview}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <label className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </label>
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {user.fullName}
            </h3>
            <p className="text-gray-600 mb-1">{user.email}</p>
            <p className="text-gray-600">{user.contactNo}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Contact</p>
                <p className="font-medium">{user.contactNo}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nationality</p>
                <p className="font-medium">{user.nationality}</p>
              </div>
            </div>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500">Street</p>
                <p className="font-medium">{user.address.street}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{user.address.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{user.address.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Postal Code</p>
                <p className="font-medium">{user.address.postalCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{user.address.country}</p>
              </div>
            </div>
          </div>

          <div className="border-b pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Membership
            </h3>
            {user.membership ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-medium">{user.membership.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Purchase Date</p>
                  <p className="font-medium">
                    {formatDate(user.membership.purchaseDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expiry Date</p>
                  <p className="font-medium">
                    {formatDate(user.membership.expiryDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">${user.membership.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Verification</p>
                  <p className="font-medium">
                    {user.membership.verified ? "Verified" : "Pending"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-indigo-50 p-6 rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-medium text-gray-900">
                      No Active Membership
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Purchase a membership to access premium features
                    </p>
                  </div>
                  <button
                    onClick={() => navigate("/usermembership")}
                    className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Purchase Membership
                  </button>
                </div>
              </div>
            )}
          </div>

          {user.rewards && user.rewards.length > 0 && (
            <div className="border-b pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Your Rewards
              </h3>
              <div className="space-y-4">
                {user.rewards.map((reward, index) => (
                  <div key={index} className="bg-yellow-50 p-4 rounded-md">
                    <h4 className="font-medium text-gray-900">{reward.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {reward.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Earned on: {formatDate(reward.dateEarned)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {user.purchaseHistory && user.purchaseHistory.length > 0 && (
            <div className="pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Purchase History
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {user.purchaseHistory.map((purchase, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {purchase.itemName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {purchase.itemType}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${purchase.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(purchase.purchaseDate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
