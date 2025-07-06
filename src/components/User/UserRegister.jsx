import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../api/userService";
import { BACKEND_URL } from "../../config/backend";

const UserRegister = () => {
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNo: "",
    email: "",
    nationality: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    },
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchUserData = async () => {
        try {
          const token = JSON.parse(localStorage.getItem("user")).token;
          const user = await userService.getProfile(token);

          setFormData({
            fullName: user.fullName,
            contactNo: user.contactNo,
            email: user.email,
            nationality: user.nationality,
            address: user.address,
            password: "",
            confirmPassword: "",
          });

          if (user.profileImage) {
            setImagePreview(`${BACKEND_URL}${user.profileImage}`);
          }
        } catch (err) {
          setError("Failed to load user data");
        }
      };
      fetchUserData();
    }
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleCheckbox = (e) => {
    console.log(e.target.checked);
    setIsChecked(e.target.checked);
  };
  console.log(isChecked);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfileImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!isEditMode && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    if (!isEditMode && !isChecked) {
      setError("Please agree to our terms and conditions");
      setIsLoading(false);
      return;
    }

    try {
      if (isEditMode) {
        // Edit mode - update profile
        const token = JSON.parse(localStorage.getItem("user")).token;

        // First update profile data
        const userData = {
          fullName: formData.fullName,
          contactNo: formData.contactNo,
          nationality: formData.nationality,
          address: formData.address,
          ...(formData.password && { password: formData.password }),
        };

        await userService.updateProfile(userData, token);

        // Then upload image if selected
        if (profileImage) {
          await userService.uploadProfileImage(profileImage, token);
        }

        navigate("/userprofile");
      } else {
        // Register mode
        // First register user
        // In your handleSubmit function in UserRegister.jsx
        const newUser = await userService.register({
          fullName: formData.fullName,
          contactNo: formData.contactNo,
          email: formData.email,
          nationality: formData.nationality,
          address: formData.address,
          password: formData.password,
        });

        // Store the user data with role
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: newUser.token,
            _id: newUser._id,
            fullName: formData.fullName,
            email: formData.email,
            role: "user", // Explicitly set role to 'user'
            profileImage: newUser.profileImage,
          })
        );

        navigate("/userprofile");

        // Then upload image if selected
        if (profileImage && newUser.token) {
          await userService.uploadProfileImage(profileImage, newUser.token);
        }

        // Redirect to profile page after successful registration and login
        navigate("/userprofile");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isEditMode ? "Update failed" : "Registration failed")
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extralight text-gray-900">
            {isEditMode ? "Edit Profile" : "Create an account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isEditMode
              ? "Update your account information"
              : "Join our platform today"}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                {imagePreview ? (
                  <img
                    src={imagePreview}
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
                  onChange={handleImageChange}
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
            <p className="text-sm text-gray-500">
              {isEditMode ? "Change profile picture" : "Upload profile picture"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Personal Info */}
            <div className="sm:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                Personal Information
              </h3>
            </div>

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="contactNo"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                id="contactNo"
                name="contactNo"
                type="tel"
                required
                value={formData.contactNo}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isEditMode}
                className={`mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  isEditMode ? "bg-gray-100" : ""
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="nationality"
                className="block text-sm font-medium text-gray-700"
              >
                Nationality
              </label>
              <input
                id="nationality"
                name="nationality"
                type="text"
                required
                value={formData.nationality}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                Address
              </h3>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="street"
                className="block text-sm font-medium text-gray-700"
              >
                Street
              </label>
              <input
                id="street"
                name="street"
                type="text"
                required
                value={formData.address.street}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={formData.address.city}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700"
              >
                State/Province
              </label>
              <input
                id="state"
                name="state"
                type="text"
                required
                value={formData.address.state}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="postalCode"
                className="block text-sm font-medium text-gray-700"
              >
                Postal Code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                required
                value={formData.address.postalCode}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                name="country"
                type="text"
                required
                value={formData.address.country}
                onChange={handleChange}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Password - Only show for registration or if user wants to change */}
            {!isEditMode || formData.password ? (
              <>
                <div className="sm:col-span-2">
                  <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">
                    {isEditMode ? "Change Password" : "Security"}
                  </h3>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password (min 6 characters)
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    minLength="6"
                    required={!isEditMode}
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    minLength="6"
                    required={!isEditMode}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </>
            ) : (
              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      password: " ",
                      confirmPassword: " ",
                    })
                  }
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={isChecked}
              onChange={handleCheckbox}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="terms"
              className="ml-2 block text-sm text-gray-700 cursor-pointer"
            >
              I agree to{" "}
              <a className="font-bold underline" href="../../waiverform.pdf">
                terms and conditions
              </a>
            </label>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() =>
                navigate(isEditMode ? "/userprofile" : "/userlogin")
              }
              className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            {/* <button
              type="submit"
              disabled={isChecked}
              className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                !isChecked ? "opacity-70 cursor-not-allowed" : "disabled"
              }`}
            >
              {isLoading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Profile"
                : "Create Account"}
            </button> */}
            <button
              type="submit"
              disabled={!isChecked || isLoading}
              className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                !isChecked || isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Profile"
                : "Create Account"}
            </button>
          </div>
        </form>

        {!isEditMode && (
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Login
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserRegister;
