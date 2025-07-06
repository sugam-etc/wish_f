import { FaHome, FaSignInAlt, FaSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <FaSadTear className="text-6xl text-amber-500" />
        </div>

        {/* Error Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-6">
          Page Not Found
        </h2>

        {/* Error Message */}
        <p className="text-gray-500 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
          >
            <FaHome /> Go to Home
          </Link>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
          >
            <FaSignInAlt /> Login
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-8 text-sm text-gray-400">
          <p>
            Need help?{" "}
            <a
              href="mailto:support@westindoorpokhara.com"
              className="text-amber-500 hover:underline"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
