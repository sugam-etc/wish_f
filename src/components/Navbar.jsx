import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiAdminFill } from "react-icons/ri";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  const isRouteActive = (path) => location.pathname === path;
  const isContactActive = () =>
    location.pathname === "/" && location.hash === "#contact";

  const handleNavClick = () => setIsOpen(false);
  const handleHomeClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
    setIsOpen(false);
  };
  const handleBookNowClick = () => {
    navigate("/#contact");
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 h-24 ${
          scrolled ? "bg-gray-900" : "bg-gray-900/90 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link
              to="/"
              onClick={handleHomeClick}
              className="flex items-center"
            >
              <img
                src={logo}
                alt="Site Logo"
                className="w-16 h-12 sm:w-20 sm:h-16 object-contain hover:scale-105 transition-transform"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/80x64/1F2937/FFF?text=Logo";
                  e.currentTarget.onerror = null;
                }}
              />
            </Link>

            <nav className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                onClick={handleHomeClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isRouteActive("/") && !location.hash
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/50"
                }`}
              >
                Home
              </Link>
              <Link
                to="/adventures"
                onClick={handleNavClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isRouteActive("/adventures")
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/50"
                }`}
              >
                Adventures
              </Link>
              <Link
                to="/about"
                onClick={handleNavClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isRouteActive("/about")
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/50"
                }`}
              >
                About
              </Link>
              <Link
                to="/blog"
                onClick={handleNavClick}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isRouteActive("/blog")
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/50"
                }`}
              >
                Blog
              </Link>
              <motion.a
                href="#contact"
                onClick={handleBookNowClick}
                className="inline-flex items-center px-6 py-3 bg-transparent hover:bg-white/10 border-2 border-white rounded-lg text-lg text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now
              </motion.a>
              <a
                href="/admin"
                className="flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-sm font-medium shadow-md hover:shadow-lg"
              >
                <RiAdminFill />
              </a>
            </nav>

            <button
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fixed Mobile Menu with full-screen background */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          {/* Close button positioned absolutely at the top right */}
          <button
            className="absolute top-6 right-4 p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 z-50"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <FaTimes className="h-6 w-6" />
          </button>

          <div className="pt-24 h-full w-full overflow-y-auto">
            <nav className="flex flex-col h-full px-6 py-8 space-y-6">
              <Link
                to="/"
                onClick={handleHomeClick}
                className={`px-6 py-4 rounded-lg text-xl font-medium text-center ${
                  isRouteActive("/")
                    ? "text-amber-400 bg-gray-700/50"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/30"
                }`}
              >
                Home
              </Link>
              <Link
                to="/adventures"
                onClick={handleNavClick}
                className={`px-6 py-4 rounded-lg text-xl font-medium text-center ${
                  isRouteActive("/adventures")
                    ? "text-amber-400 bg-gray-700/50"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/30"
                }`}
              >
                Adventures
              </Link>
              <Link
                to="/about"
                onClick={handleNavClick}
                className={`px-6 py-4 rounded-lg text-xl font-medium text-center ${
                  isRouteActive("/about")
                    ? "text-amber-400 bg-gray-700/50"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/30"
                }`}
              >
                About
              </Link>
              <Link
                to="/blog"
                onClick={handleNavClick}
                className={`px-6 py-4 rounded-lg text-xl font-medium text-center ${
                  isRouteActive("/blog")
                    ? "text-amber-400 bg-gray-700/50"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/30"
                }`}
              >
                Blog
              </Link>
              <motion.a
                href="#contact"
                onClick={handleBookNowClick}
                className={`px-6 py-4 rounded-lg text-xl font-medium text-center ${
                  isContactActive()
                    ? "text-amber-400 bg-gray-700/50"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/30"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                Book Now
              </motion.a>
              <div className="mt-auto pt-8">
                <a
                  href="/admin"
                  className="flex items-center justify-center px-6 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xl font-medium"
                >
                  <RiAdminFill className="mr-3" />
                  Admin Panel
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Spacer for navbar height */}
      <div className="h-24"></div>
    </>
  );
}
