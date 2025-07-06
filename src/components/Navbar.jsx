import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { RiAdminFill } from "react-icons/ri";
import logo from "../assets/logo.png";
import { useUserAuth } from "../../UserAuth/UserAuthContext";
import { CgProfile } from "react-icons/cg";
import { BACKEND_URL } from "../config/backend";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  const { user } = useUserAuth();
  console.log(user);

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

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navItems = [
    {
      path: "/",
      label: "Home",
      onClick: handleHomeClick,
      isActive: isRouteActive("/") && !location.hash,
      isMobile: true,
    },
    {
      path: "/adventures",
      label: "Adventures",
      onClick: handleNavClick,
      isActive: isRouteActive("/adventures"),
      isMobile: true,
    },
    {
      label: "Climbing",
      isDropdown: true,
      items: [
        {
          path: "/membership",
          label: "Membership",
          onClick: handleNavClick,
          isActive: isRouteActive("/membership"),
        },
        {
          path: "/store",
          label: "Gears",
          onClick: handleNavClick,
          isActive: isRouteActive("/store"),
        },
        {
          path: "/guides",
          label: "Guides",
          onClick: handleNavClick,
          isActive: isRouteActive("/guides"),
        },
      ],
      isActive: location.pathname.startsWith("/climbing"),
      isMobile: true,
    },
    {
      path: "/about",
      label: "About",
      onClick: handleNavClick,
      isActive: isRouteActive("/about"),
      isMobile: true,
    },
    {
      path: "/blog",
      label: "Blog",
      onClick: handleNavClick,
      isActive: isRouteActive("/blog"),
      isMobile: true,
    },
    {
      path: "#contact",
      label: "Book Now",
      onClick: handleBookNowClick,
      isActive: isContactActive(),
      isMobile: true,
      isButton: true,
    },
  ];

  const renderNavLink = (item, isMobile = false) => {
    if (item.isButton) {
      return isMobile ? (
        <motion.a
          href={item.path}
          onClick={item.onClick}
          className={`px-6 py-4 rounded-lg text-xl font-medium text-center ${
            item.isActive
              ? "text-amber-400 bg-gray-700/50"
              : "text-white hover:text-amber-400 hover:bg-gray-700/30"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          {item.label}
        </motion.a>
      ) : (
        <motion.a
          href={item.path}
          onClick={item.onClick}
          className="inline-flex items-center px-6 py-3 bg-transparent hover:bg-white/10 border-2 border-white rounded-lg text-lg text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {item.label}
        </motion.a>
      );
    }

    if (item.isDropdown) {
      if (isMobile) {
        return (
          <div className="flex flex-col">
            <button
              onClick={toggleDropdown}
              className={`px-6 py-4 rounded-lg text-xl font-medium text-center flex items-center justify-center ${
                item.isActive
                  ? "text-amber-400 bg-gray-700/50"
                  : "text-white hover:text-amber-400 hover:bg-gray-700/30"
              }`}
            >
              {item.label}
              {dropdownOpen ? (
                <FaChevronUp className="ml-2" />
              ) : (
                <FaChevronDown className="ml-2" />
              )}
            </button>
            {dropdownOpen && (
              <div className="pl-6 pt-2 space-y-2">
                {item.items.map((subItem, index) => (
                  <Link
                    key={index}
                    to={subItem.path}
                    onClick={() => {
                      subItem.onClick();
                      setDropdownOpen(false);
                    }}
                    className={`block px-6 py-3 rounded-lg text-lg font-medium text-center ${
                      subItem.isActive
                        ? "text-amber-400 bg-gray-700/30"
                        : "text-white hover:text-amber-400 hover:bg-gray-700/20"
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <div className="relative group">
          <button
            className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
              item.isActive
                ? "text-amber-400 bg-gray-700"
                : "text-white hover:text-amber-400 hover:bg-gray-700/50"
            }`}
          >
            {item.label}
            <FaChevronDown className="ml-1 text-xs" />
          </button>
          <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="py-1">
              {item.items.map((subItem, index) => (
                <Link
                  key={index}
                  to={subItem.path}
                  onClick={subItem.onClick}
                  className={`block px-4 py-2 text-sm ${
                    subItem.isActive
                      ? "text-amber-400 bg-gray-700"
                      : "text-white hover:text-amber-400 hover:bg-gray-700/50"
                  }`}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return isMobile ? (
      <Link
        to={item.path}
        onClick={item.onClick}
        className={`px-6 py-4 rounded-lg text-xl font-medium text-center ${
          item.isActive
            ? "text-amber-400 bg-gray-700/50"
            : "text-white hover:text-amber-400 hover:bg-gray-700/30"
        }`}
      >
        {item.label}
      </Link>
    ) : (
      <Link
        to={item.path}
        onClick={item.onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium ${
          item.isActive
            ? "text-amber-400 bg-gray-700"
            : "text-white hover:text-amber-400 hover:bg-gray-700/50"
        }`}
      >
        {item.label}
      </Link>
    );
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
              {navItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderNavLink(item)}
                </React.Fragment>
              ))}
              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else if (user.role === "admin") {
                    navigate("/admin");
                  } else {
                    navigate("/userprofile");
                  }
                }}
                className="flex items-center cursor-pointer justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
              >
                {user?.profileImage ? (
                  <img
                    src={
                      user.role !== "admin" &&
                      `${BACKEND_URL}${user.profileImage}`
                    }
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </button>
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
              {navItems.map((item, index) => (
                <React.Fragment key={index}>
                  {item.isMobile && renderNavLink(item, true)}
                </React.Fragment>
              ))}
              <div className="mt-auto pt-8 cursor-pointer">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (!user) {
                      navigate("/login");
                    } else if (user.role === "admin") {
                      navigate("/admin");
                    } else {
                      navigate("/userprofile");
                    }
                  }}
                  className="flex items-center cursor-pointer justify-center w-full px-6 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xl font-medium"
                >
                  {user ? (
                    <>
                      {user?.profileImage ? <CgProfile /> : <CgProfile />}
                      {user.role === "admin" ? "Admin Panel" : "My Profile"}
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      Login
                    </>
                  )}
                </button>
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
