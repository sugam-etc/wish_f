import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaGlobe,
  FaStar,
} from "react-icons/fa";
import { BACKEND_URL } from "../config/backend";
export default function AdventureDetail() {
  const { id } = useParams();
  const [adventure, setAdventure] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    async function fetchAdventure() {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/adventures/${id}`);
        setAdventure(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch adventure:", err);
        setLoading(false);
      }
    }

    fetchAdventure();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg text-gray-600">
        Loading adventure details...
      </div>
    );
  }

  if (!adventure) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-xl font-semibold text-red-600">
        Adventure not found.
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Top Section */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="w-full aspect-video md:aspect-[4/3] rounded-xl overflow-hidden shadow-md">
            <img
              src={
                adventure.image.startsWith("http")
                  ? adventure.image
                  : `${BACKEND_URL}${adventure.image}`
              }
              alt={adventure.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Content */}
          <div className="space-y-5">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
              {adventure.name}
            </h1>

            <div className="flex items-center text-sm text-gray-600">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.floor(adventure.rating)
                      ? "text-amber-400"
                      : "text-gray-300"
                  } mr-1`}
                />
              ))}
              <span className="ml-2">
                {adventure.rating} ({Math.floor(Math.random() * 100) + 20}{" "}
                reviews)
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {adventure.shortDescription}
            </p>

            <div className="grid gap-3 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-gray-500" />
                <span>{adventure.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-gray-500" />
                <span>{adventure.hours}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-gray-500" />
                <span>
                  +977 {Math.floor(1000000000 + Math.random() * 9000000000)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FaGlobe className="text-gray-500" />
                <a
                  href="#"
                  className="text-amber-600 hover:underline hover:text-amber-700"
                >
                  Visit Website
                </a>
              </div>
            </div>

            <button className="mt-4 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition shadow-sm">
              Contact for Booking
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            About {adventure.name}
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {adventure.about?.trim()
              ? adventure.about
              : `${adventure.name} is one of the premier adventure organizations in Nepal, offering top-quality experiences for both beginners and experienced adventurers. With a focus on safety, professionalism, and environmental responsibility, they provide unforgettable experiences in some of the most beautiful locations in the Himalayas.

Whether you're looking for a short introductory session or a multi-day expedition, ${adventure.name} has options to suit all interests and skill levels. Their experienced guides and instructors are certified and have extensive knowledge of the local terrain and conditions.`}
          </p>
        </div>
      </div>
    </section>
  );
}
