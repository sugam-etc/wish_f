import { FaMountain, FaMedal, FaUsers, FaChartLine } from "react-icons/fa";
import img1 from "../assets/BackgroundImages/img1.jpg";
import img2 from "../assets/BackgroundImages/img2.jpg";
import img3 from "../assets/BackgroundImages/img3.jpg";
import img4 from "../assets/BackgroundImages/img4.jpg";
import img5 from "../assets/BackgroundImages/img5.jpg";
import img6 from "../assets/BackgroundImages/img6.jpg";
import img7 from "../assets/BackgroundImages/img7.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function About() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white h-96 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Climbing team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About West Indoor Sport Hub
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Nepal's premier climbing destination since 2015
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Our humble beginnings"
                className="rounded-xl shadow-lg w-full"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">
                Founded in 2021, West Indoor Sport Hub began as a small climbing
                wall in Pokhara with a vision to make climbing accessible to
                everyone in Nepal.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We aim to provide the best indoor climbing experience with rope
                climbing wall up to 40ft high and 18ft high bouldering wall.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-600 mb-2">2021</h3>
                  <p>Founded</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-600 mb-2">2023</h3>
                  <p>Expanded to outdoor climbing services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">By The Numbers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our impact on Nepal's climbing community
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <FaMountain className="text-amber-500 text-4xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">40ft</h3>
              <p className="text-gray-600">Only climbing wall in pokhara</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <FaUsers className="text-amber-500 text-4xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">8,000+</h3>
              <p className="text-gray-600">Climbers</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <FaMedal className="text-amber-500 text-4xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">2</h3>
              <p className="text-gray-600">National champions</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow text-center">
              <FaChartLine className="text-amber-500 text-4xl mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">100%</h3>
              <p className="text-gray-600">Safety record</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What drives us every day
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-amber-600">Mission</h3>
              <p className="text-gray-700">
                To make climbing accessible, safe, and enjoyable for people of
                all ages and skill levels while promoting Nepal's adventure
                sports culture worldwide.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-amber-600">Vision</h3>
              <p className="text-gray-700">
                To establish Nepal as a world-class climbing destination and
                develop the next generation of Nepali climbing athletes.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-amber-600">Values</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Safety above all else</li>
                <li>Inclusivity in adventure sports</li>
                <li>Environmental responsibility</li>
                <li>Community development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2 className="text-3xl font-bold mb-4 relative z-10">
                Pricing & Membership Plans
              </h2>
              <div className="absolute -bottom-1 left-0 w-full h-2 bg-amber-200 z-0"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Affordable options for every climber's needs
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {/* Day Pass */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      Day Pass
                    </h3>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">
                      Popular
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">Single day access</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      Rs. 500
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-amber-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Full day access</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-amber-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>All climbing areas</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Gear Rentals */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Gear Rentals
                  </h3>
                  <p className="text-gray-600 mb-4">Per session rentals</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Rope</span>
                      <span className="font-semibold">Rs. 100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Harness</span>
                      <span className="font-semibold">Rs. 100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Climbing Shoes</span>
                      <span className="font-semibold">Rs. 100</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Chalk Bag</span>
                      <span className="font-semibold">Rs. 100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Belay Service */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Belay Service
                  </h3>
                  {/* <p className="text-gray-600 mb-4">For young climbers</p> */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      Rs. 100
                    </span>
                    <span className="text-gray-600"> / 3 visits</span>
                  </div>
                  {/* <ul className="space-y-3 mb-6">
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-amber-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Special pricing</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-amber-500 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Child-friendly routes</span>
                    </li>
                  </ul> */}
                </div>
              </div>
            </div>

            {/* Membership Plans */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Exclusive Membership */}
              <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg overflow-hidden border border-amber-100">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">
                      Exclusive Membership
                    </h3>
                    <span className="px-3 py-1 bg-amber-500 text-white rounded-full text-sm font-semibold">
                      Best Value
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">Wall access only</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">1 Month</span>
                      <span className="font-semibold">Rs. 4,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">6 Months</span>
                      <span className="font-semibold">Rs. 12,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">12 Months</span>
                      <span className="font-semibold">Rs. 18,000</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inclusive Membership */}
              <div className="bg-gradient-to-br from-amber-50 to-white rounded-xl shadow-lg overflow-hidden border border-amber-100">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Inclusive Membership
                  </h3>
                  <p className="text-gray-600 mb-4">Includes gear rentals</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">1 Month</span>
                      <span className="font-semibold">Rs. 5,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-700">3 Months</span>
                      <span className="font-semibold">Rs. 12,000</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-700">6 Months</span>
                      <span className="font-semibold">Rs. 18,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waiver Form Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-amber-50 rounded-xl p-8 shadow-inner border border-amber-100">
            <h2 className="text-3xl font-bold mb-4">Safety First</h2>
            <p className="text-xl text-gray-600 mb-6">
              All climbers must complete our waiver form before participating.
            </p>
            <a
              href="/waiver-form.pdf"
              download
              className="inline-flex items-center justify-center bg-amber-500 text-white font-semibold py-3 px-6 rounded-full shadow hover:bg-amber-600 transition"
            >
              Download Waiver Form
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Facility</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A look inside Nepal's premier climbing gym
            </p>
          </div>

          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="pb-10"
          >
            {[img2, img3, img4, img5, img6, img7].map((img, index) => (
              <SwiperSlide key={index}>
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={img}
                    alt={`Facility ${index + 1}`}
                    className="w-full h-48 md:h-64 object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}
