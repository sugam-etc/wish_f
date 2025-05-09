import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Hero from "../components/Hero.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import ContactForm from "../components/ContactForm.jsx";
import TeamMember from "../components/TeamMember.jsx";
import ServiceModal from "../components/ServiceModal.jsx";
import outdoor from "../assets/Images/outdoor.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";
import { GiRopeCoil } from "react-icons/gi";
import {
  FaMountain,
  FaBalanceScale,
  FaTshirt,
  FaTree,
  FaCampground,
  FaHiking,
} from "react-icons/fa";
import { teamMembers, reviews } from "../assets/Data/ContentData.js";
import { BACKEND_URL } from "../App.jsx";

// Services array
const services = [
  {
    icon: <FaMountain />,
    title: "Indoor Bouldering",
    description:
      "Climb without ropes on our varied bouldering walls with crash pads for safety. Perfect for all skill levels with routes regularly updated.",
  },
  {
    icon: <GiRopeCoil />,
    title: "Top Rope Climbing",
    description:
      "Safe climbing experience with our auto-belay systems and instructor-led top rope sessions on 15m walls.",
  },
  {
    icon: <FaTree />,
    title: "Outdoor Rock Climbing",
    description:
      "Guided outdoor climbing trips to nearby crags with all equipment provided. Experience real rock in stunning locations.",
  },
  {
    icon: <FaHiking />,
    title: "Multi-pitch Climbing",
    description:
      "Advanced climbing experiences on longer routes with our certified guides. Perfect for those looking to progress.",
  },
  {
    icon: <FaBalanceScale />,
    title: "Slacklining",
    description:
      "Test your balance on our slacklines with different lengths and tensions available both indoors and outdoors.",
  },
  {
    icon: <FaCampground />,
    title: "Climbing Camps",
    description:
      "Multi-day climbing programs combining technique training, strength development, and outdoor excursions.",
  },
];

export default function Home() {
  const [selectedService, setSelectedService] = useState(null);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/events`);
      // Sort events newest first
      const sortedEvents = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setFeaturedEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events data:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="my-0">
      <Hero />

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Climbing Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive climbing programs for all levels, from first-timers
              to seasoned climbers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                onLearnMore={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

      {/* Featured Events Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our special adventure events and community gatherings
            </p>
          </div>

          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".event-button-next",
                prevEl: ".event-button-prev",
              }}
              spaceBetween={24}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              grabCursor
              speed={600}
              className="!px-4"
            >
              {featuredEvents.map((event) => (
                <SwiperSlide key={event._id}>
                  <div className="group hover:-translate-y-1 transition-transform duration-300">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                      <div className="h-48 overflow-hidden">
                        <img
                          src={`${event.image}`} // ← THIS PREPENDS http://localhost:5000
                          alt={event.title}
                          className="w-full h-48 object-cover rounded mb-4"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {event.description}
                        </p>

                        <div className="space-y-2">
                          <div className="flex items-center text-gray-500">
                            <FaCalendarAlt className="mr-2 text-amber-500" />
                            <span>
                              {new Date(event.date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <FaClock className="mr-2 text-amber-500" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <FaMapMarkerAlt className="mr-2 text-amber-500" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition"
                        >
                          View Album
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <div className="event-button-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 15.707a1 1 0 01-1.414 0L6.586 11l4.707-4.707a1 1 0 011.414 1.414L9.414 11l3.293 3.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="event-button-next absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 z-10">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 4.293a1 1 0 011.414 0L13.414 9l-4.707 4.707a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Outdoor Climbing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src={outdoor}
                alt="Outdoor climbing in Nepal"
                className="rounded-xl shadow-md w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>

            <div className="lg:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5">
                Outdoor Climbing Adventures
              </h2>
              <p className="text-base text-gray-700 mb-4">
                Take your climbing outdoors with our guided trips to some of
                Nepal's best climbing areas. We offer:
              </p>
              <ul className="list-disc pl-5 text-base text-gray-700 mb-5 space-y-2">
                <li>Half-day and full-day climbing excursions</li>
                <li>All necessary equipment provided</li>
                <li>Transportation from our gym to climbing sites</li>
                <li>Certified guides with extensive local knowledge</li>
                <li>Beginner-friendly to advanced routes</li>
              </ul>
              <a
                href="#contact"
                className="inline-block px-5 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium rounded-lg transition duration-300"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4"> Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our certified instructors are passionate about sharing their
              climbing knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real experiences from our climbers
            </p>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".testimonial-button-next",
              prevEl: ".testimonial-button-prev",
            }}
            spaceBetween={24}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            grabCursor
            speed={600}
            className="!px-4"
          >
            {reviews.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="group hover:-translate-y-1 transition-transform duration-300">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">
                        <FaQuoteLeft className="inline text-amber-500" />{" "}
                        {testimonial.comment}
                      </p>
                      <div className="flex items-center text-gray-500">
                        <FaStar className="text-amber-500 mr-2" />
                        <span>{testimonial.rating}</span>
                      </div>
                      <div className="mt-4">
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
