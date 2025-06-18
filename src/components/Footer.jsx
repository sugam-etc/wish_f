import { useState } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { createEmail } from "../api/emailService";

export default function Footer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage({ text: "Please enter your email", type: "error" });
      return;
    }

    if (!validateEmail(email)) {
      setMessage({ text: "Please enter a valid email address", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await createEmail({ title: email });
      setMessage({
        text: "Thank you for subscribing!",
        type: "success",
      });
      setEmail("");
    } catch (error) {
      setMessage({
        text: error.message || "Subscription service is currently unavailable",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = () => {
    if (window.location.pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#contact");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="flex flex-col items-start">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-2">Wish Adventure Nepal</h3>
              <img
                src={logo}
                alt="Wish Adventure Nepal Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400">
              Highlighting the best adventure organizations in Nepal.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-amber-400 transition duration-300 flex items-center"
                >
                  <span className="hover:underline">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/adventures"
                  className="text-gray-400 hover:text-amber-400 transition duration-300 flex items-center"
                >
                  <span className="hover:underline">Adventures</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-amber-400 transition duration-300 flex items-center"
                >
                  <span className="hover:underline">About</span>
                </a>
              </li>
              <li>
                <Link
                  to="/#contact"
                  onClick={handleContactClick}
                  className="text-gray-400 hover:text-amber-400 transition duration-300 flex items-center"
                >
                  <span className="hover:underline">Contact</span>
                </Link>
              </li>
              <li>
                <a
                  href="/gallery"
                  className="text-gray-400 hover:text-amber-400 transition duration-300 flex items-center"
                >
                  <span className="hover:underline">Gallery</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <address className="text-gray-400 not-italic space-y-3">
              <p className="flex items-start">
                <svg
                  className="w-5 h-5 mr-2 mt-0.5 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                20th Street, Lakeside, Pokhara 33700
              </p>
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                wishadventurenepal@gmail.com
              </p>
              <p className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                +977 9823470214
              </p>
            </address>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.facebook.com/wishadventurenepal"
                className="text-gray-400 hover:text-amber-400 transition duration-300"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="https://www.instagram.com/wishadventurenepal.pkr/"
                className="text-gray-400 hover:text-amber-400 transition duration-300"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={22} />
              </a>
            </div>

            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <form onSubmit={handleSubmit}>
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md border border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-white"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className={`bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-md transition duration-300 ${
                    loading ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                  aria-label="Subscribe to newsletter"
                >
                  {loading ? (
                    <span className="inline-flex items-center">
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
                      Processing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </div>
              {message.text && (
                <p
                  className={`mt-2 text-sm ${
                    message.type === "error" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {message.text}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Wish Adventure Nepal. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
