import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaInfoCircle,
  FaRegCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { GrGallery } from "react-icons/gr";

import { Button } from "./Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config/backend";
import { getLatestInfo } from "../api/infoService";
import { useEffect, useState } from "react";
import axios from "axios";

export const BlogPostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [latestInfo, setLatestInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/blogs/${id}`);
        setActivity(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchLatestInfo = async () => {
      try {
        const data = await getLatestInfo();
        setLatestInfo(data);
      } catch (err) {
        setError(err.message);
        setLatestInfo(null);
      }
    };

    fetchActivity();
    fetchLatestInfo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error loading blog post
          </h2>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-gray-50 rounded-lg max-w-md">
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Blog post not found
          </h2>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Process all images
  const images = activity.images?.map((img) =>
    img.startsWith("http") ? img : `${BACKEND_URL}${img}`
  ) || ["/default-image.jpg"];

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
  };

  return (
    <div className="bg-white">
      {/* Header with back button */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-800 p-6 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/blog")}
            className="text-white hover:text-gray-200 bg-black/20 rounded-full p-2 backdrop-blur-sm transition-colors mb-6"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>

          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-amber-400 bg-white/20 rounded-full uppercase tracking-wider">
              {activity.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {activity.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-amber-100">
              <span>
                <FaRegCalendarAlt />{" "}
                {new Date(activity.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>
                <FaClock /> {activity.readTime}
              </span>
              {activity.author && <span>✍️ By {activity.author}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Main content container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8">
        {/* Article content (2/3 width) */}
        <article className="lg:col-span-2">
          {/* Image carousel */}
          <div className="rounded-xl overflow-hidden mb-8 border border-gray-200">
            <Slider {...carouselSettings}>
              {images.map((imgUrl, index) => (
                <div key={index} className="relative">
                  <img
                    src={imgUrl}
                    alt={`${activity.title} - ${index + 1}`}
                    className="w-full h-auto max-h-[500px] object-cover"
                  />
                  {activity.imageCaption && (
                    <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-sm">
                      {activity.imageCaption}
                    </p>
                  )}
                </div>
              ))}
            </Slider>
          </div>

          {/* Blog content */}
          <div className="prose prose-lg max-w-none whitespace-pre-line">
            <div dangerouslySetInnerHTML={{ __html: activity.content }} />
          </div>

          {/* Tags */}
          {activity.tags && activity.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Related Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {activity.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full hover:bg-amber-100 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar (1/3 width) */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Latest Info Box */}
          {latestInfo && (
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <FaInfoCircle className="text-blue-500 text-xl" />
                <h3 className="text-lg font-semibold text-blue-800">
                  Latest Update
                </h3>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-blue-700">
                  {latestInfo.title}
                </h4>
                <p className="text-sm text-blue-600">{latestInfo.content}</p>
                {latestInfo.date && (
                  <p className="text-xs text-blue-500 mt-2">
                    Posted on: {new Date(latestInfo.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Highlights box */}
          <div
            className="bg-amber-50 p-5 rounded-lg border border-amber-200 cursor-pointer hover:shadow-xl"
            onClick={() => navigate("/adventures")}
          >
            <h3 className="text-lg font-semibold text-amber-800 mb-3 flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              View Adventures
            </h3>
            <ul className="space-y-3">
              {activity.highlights?.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-amber-500 mr-2 mt-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key details */}
          <div
            className="bg-gray-50 p-5 rounded-lg border border-gray-200 cursor-pointer hover:shadow-xl"
            onClick={() => navigate("/gallery")}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <GrGallery />
              View Gallery
            </h3>
            {/* <div className="space-y-4"></div> */}
          </div>

          {/* CTA Button */}
          <Button className="w-full" onClick={() => navigate("/contact")}>
            Book This Adventure
          </Button>

          {/* Share buttons */}
          <div className="bg-white p-5 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Share This Adventure
            </h3>
            <div className="flex justify-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-full bg-gray-100 hover:bg-blue-50">
                <span className="sr-only">Facebook</span>
                <FaFacebookF className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-blue-400 transition-colors p-2 rounded-full bg-gray-100 hover:bg-blue-50">
                <span className="sr-only">Twitter</span>
                <FaTwitter className="h-5 w-5" />
              </button>
              <button className="text-gray-600 hover:text-red-600 transition-colors p-2 rounded-full bg-gray-100 hover:bg-red-50">
                <span className="sr-only">Instagram</span>
                <FaInstagram className="h-5 w-5" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
