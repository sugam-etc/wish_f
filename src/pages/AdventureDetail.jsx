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
import { BACKEND_URL } from "../App";
export default function AdventureDetail() {
  const { id } = useParams();
  const [adventure, setAdventure] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdventure() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/adventures/${id}`
        );
        setAdventure(res.data);
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
      <div className="p-8 text-center text-xl">
        Loading adventure details...
      </div>
    );
  }

  if (!adventure) {
    return (
      <div className="p-8 text-center text-red-600 text-xl">
        Adventure not found.
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={`${BACKEND_URL}${adventure.image}`}
              alt={adventure.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{adventure.name}</h1>

            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.floor(adventure.rating)
                      ? "text-amber-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">
                {adventure.rating} ({Math.floor(Math.random() * 100) + 20}{" "}
                reviews)
              </span>
            </div>

            <p className="text-gray-700 mb-6">{adventure.shortDescription}</p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <span>{adventure.location}</span>
              </div>

              <div className="flex items-center">
                <FaClock className="text-gray-500 mr-2" />
                <span>{adventure.hours}</span>
              </div>

              <div className="flex items-center">
                <FaPhone className="text-gray-500 mr-2" />
                <span>
                  +977 {Math.floor(1000000000 + Math.random() * 9000000000)}
                </span>
              </div>

              <div className="flex items-center">
                <FaGlobe className="text-gray-500 mr-2" />
                <a href="#" className="text-amber-600 hover:underline">
                  Visit Website
                </a>
              </div>
            </div>

            <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium rounded-lg transition">
              Contact for Booking
            </button>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">About {adventure.name}</h2>
          <p className="text-gray-700 mb-4">
            {adventure.name} is one of the premier adventure organizations in
            Nepal, offering top-quality experiences for both beginners and
            experienced adventurers. With a focus on safety, professionalism,
            and environmental responsibility, they provide unforgettable
            experiences in some of the most beautiful locations in the
            Himalayas.
          </p>
          <p className="text-gray-700">
            Whether you're looking for a short introductory session or a
            multi-day expedition, {adventure.name} has options to suit all
            interests and skill levels. Their experienced guides and instructors
            are certified and have extensive knowledge of the local terrain and
            conditions.
          </p>
        </div>
      </div>
    </section>
  );
}
