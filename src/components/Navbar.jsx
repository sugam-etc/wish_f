import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaPhoneAlt, FaRadiation } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiAdminFill } from "react-icons/ri";
import logo from "../assets/logo.png";

export default function NavbarMotionContact() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsOpen(false); // Close menu on route change
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname === "/" && location.hash !== "#contact") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const isRouteActive = (path) => {
    return location.pathname === path;
  };

  const isContactActive = () => {
    return location.pathname === "/" && location.hash === "#contact";
  };

  const handleNavClick = () => {
    setIsOpen(false); // Close menu on link click
  };

  const handleHomeClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
    setIsOpen(false); // Close menu on Home click
  };

  const handleBookNowClick = () => {
    navigate("/#contact");
    setIsOpen(false);
  };

  const textColor = "text-white";
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-900" // Scrolled state - solid dark with shadow
            : "bg-gray-900/90 backdrop-blur-sm" // Non-scrolled - semi-transparent dark with blur
        }`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={handleHomeClick}
            >
              <img
                src={logo}
                alt="Site Logo"
                className="w-16 h-12 sm:w-20 sm:h-16 text-amber-400 transition-transform hover:scale-105 object-contain"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/80x64/1F2937/FFF?text=Logo";
                  e.currentTarget.onerror = null;
                }}
              />
            </Link>

            {/* --- Desktop Navigation --- */}
            <nav className="hidden md:flex items-center space-x-4">
              {/* Home Link */}
              <Link
                to="/"
                onClick={handleHomeClick}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isRouteActive("/") && location.hash !== "#contact"
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/50"
                }`}
              >
                Home
              </Link>
              {/* Adventures Link */}
              <Link
                to="/adventures"
                onClick={handleNavClick}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isRouteActive("/adventures")
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/50"
                }`}
              >
                Adventures
              </Link>
              {/* About Link */}
              <Link
                to="/about"
                onClick={handleNavClick}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isRouteActive("/about")
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/50"
                }`}
              >
                About
              </Link>
              {/* Blog Link */}
              <Link
                to="/blog"
                onClick={handleNavClick}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isRouteActive("/blog")
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700/50"
                }`}
              >
                Blog
              </Link>
              {/* Contact Link */}
              <motion.a
                href="#contact"
                onClick={handleBookNowClick}
                className={`inline-flex items-center px-6 py-3 bg-transparent hover:bg-white/10 border-2 border-white rounded-lg transition text-lg ${textColor}`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Book Now
              </motion.a>
              {/* Call Us Button */}
              <a
                href="/admin"
                className="flex items-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-sm font-medium transition-colors shadow-md hover:shadow-lg"
              >
                <RiAdminFill />
              </a>
            </nav>

            {/* --- Mobile menu button --- */}
            <button
              className="md:hidden p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* --- Mobile Navigation Menu --- */}
          <div
            className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
              isOpen ? "max-h-96 mt-4 border-t border-gray-700 pt-4" : "max-h-0"
            }`}
          >
            <nav className="flex flex-col space-y-2 pb-4">
              {/* Mobile Home Link */}
              <Link
                to="/"
                onClick={handleHomeClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isRouteActive("/") && location.hash !== "#contact"
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700"
                }`}
              >
                Home
              </Link>
              {/* Mobile Adventures Link */}
              <Link
                to="/adventures"
                onClick={handleNavClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isRouteActive("/adventures")
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700"
                }`}
              >
                Adventures
              </Link>
              {/* Mobile About Link */}
              <Link
                to="/about"
                onClick={handleNavClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isRouteActive("/about")
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700"
                }`}
              >
                About
              </Link>
              {/* Mobile Blog Link */}
              <Link
                to="/blog"
                onClick={handleNavClick}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isRouteActive("/blog")
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700"
                }`}
              >
                Blog
              </Link>
              {/* Mobile Contact Link */}
              <motion.a
                href="#contact"
                onClick={handleBookNowClick}
                whileHover={{ scale: 1.02 }}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isContactActive()
                    ? "text-amber-400 bg-gray-700"
                    : "text-white hover:text-amber-400 hover:bg-gray-700"
                }`}
              >
                Book Now
              </motion.a>
              {/* Mobile Call Us Button */}
              <a
                href="/admin"
                className="flex items-center justify-center px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md text-base font-medium mt-3 transition-colors shadow-md"
              >
                <RiAdminFill />
              </a>
            </nav>
          </div>
        </div>
      </header>
      {/* Add a div with a top margin to prevent overlap */}
      <div style={{ paddingTop: "60px" }}>
        {/* The rest of your page content will go here */}
      </div>
    </>
  );
}
