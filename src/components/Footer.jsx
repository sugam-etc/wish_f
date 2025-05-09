import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Footer() {
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
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition duration-300 flex items-center"
                >
                  <span className="hover:underline">Home</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition duration-300 flex items-center"
                >
                  <span className="hover:underline">Adventures</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition duration-300 flex items-center"
                >
                  <span className="hover:underline">About</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-amber-400 transition duration-300 flex items-center"
                >
                  <span className="hover:underline">Contact</span>
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
                +977 9863539501
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
              {/* Uncomment when you have these social links
              <a
                href="#"
                className="text-gray-400 hover:text-amber-400 transition duration-300"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={22} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-amber-400 transition duration-300"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube size={22} />
              </a> */}
            </div>

            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-800"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-r-md transition duration-300">
                Subscribe
              </button>
            </div>
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
