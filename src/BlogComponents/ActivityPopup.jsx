import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Button } from "./Button";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const ActivityPopup = ({ activity, onClose }) => {
  if (!activity) return null;

  // Process all images
  const images = activity.images?.map((img) =>
    img.startsWith("http") ? img : `http://localhost:5000${img}`
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
    <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
      <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header with close button */}
          <div className="relative bg-gradient-to-r from-amber-700 to-amber-900 p-6 sm:p-8">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white hover:text-gray-200 bg-black/20 rounded-full p-2 backdrop-blur-sm transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
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
                <span>📅 {activity.date}</span>
                <span>⏱️ {activity.readTime}</span>
                {activity.author && <span>✍️ By {activity.author}</span>}
              </div>
            </div>
          </div>

          {/* Main content container */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-6 sm:p-8">
            {/* Article content (3/4 width) */}
            <article className="lg:col-span-3">
              {/* Image carousel */}
              <div className="rounded-xl overflow-hidden mb-8">
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

              {/* Blog content - Added overflow-y-auto and max-h for scrollbar */}
              <div className="prose prose-lg max-w-none overflow-y-auto max-h-[60vh]">
                <div dangerouslySetInnerHTML={{ __html: activity.content }} />
              </div>

              {/* Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activity.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar (1/4 width) */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Highlights box */}
              <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">
                  Adventure Highlights
                </h3>
                <ul className="space-y-2">
                  {activity.highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key details */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Quick Facts
                </h3>
                <dl className="space-y-3">
                  {activity.duration && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Duration
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {activity.duration}
                      </dd>
                    </div>
                  )}
                  {activity.difficulty && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Difficulty
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {activity.difficulty}
                      </dd>
                    </div>
                  )}
                  {activity.price && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Starting Price
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {activity.price}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* CTA Button */}
              <Button className="w-full">Book This Adventure</Button>

              {/* Share buttons */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Share This Adventure
                </h3>
                <div className="flex space-x-3">
                  <button className="text-gray-500 hover:text-blue-600">
                    <span className="sr-only">Facebook</span>
                    <FaFacebookF className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-blue-400">
                    <span className="sr-only">Twitter</span>
                    <FaTwitter className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <span className="sr-only">Instagram</span>
                    <FaInstagram className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
