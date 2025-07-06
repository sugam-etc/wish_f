import {
  FaMountain,
  FaShoePrints,
  FaHandRock,
  FaUserShield,
  FaClipboardCheck,
  FaTshirt,
  FaWater,
  FaFirstAid,
  FaUsers,
  FaStar,
  FaRegClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { GiMountainClimbing } from "react-icons/gi";
import { MdSafetyDivider } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function WallClimbingGuide() {
  const navigate = useNavigate();
  const handleContactClick = () => {
    if (window.location.pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#contact");
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };
  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-amber-600 to-amber-800 flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 text-center px-4">
          <GiMountainClimbing className="mx-auto text-6xl text-white mb-4" />
          <h1 className="text-5xl font-bold text-white mb-4">
            Wall Climbing at West Indoor Sport Hub
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Experience the thrill of climbing in Pokhara's premier indoor
            climbing facility
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-amber-700 flex items-center">
              <FaMountain className="mr-3" /> Discover Indoor Climbing
            </h2>
            <p className="text-lg mb-4">
              At West Indoor Sport Hub, we offer a state-of-the-art climbing
              wall designed for both beginners and experienced climbers. Our
              facility in Pokhara provides a safe and controlled environment to
              learn and practice climbing techniques.
            </p>
            <p className="text-lg">
              Whether you're looking for a fun workout, want to build strength
              and endurance, or are training for outdoor climbs, our wall
              climbing facility has everything you need.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://www.kscc.com.np/uploads/features/1656927823.jpg"
              alt="Climbing Wall"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-amber-700">
            Our Climbing Wall Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-amber-500">
              <div className="text-amber-600 text-4xl mb-4">
                <GiMountainClimbing />
              </div>
              <h3 className="text-xl font-bold mb-3">Varied Wall Designs</h3>
              <p className="text-gray-700">
                Our climbing wall features multiple routes with varying
                difficulty levels, including overhangs, slabs, and vertical
                walls to challenge climbers of all skill levels.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-amber-500">
              <div className="text-amber-600 text-4xl mb-4">
                <MdSafetyDivider />
              </div>
              <h3 className="text-xl font-bold mb-3">Top-Rope Systems</h3>
              <p className="text-gray-700">
                Equipped with professional top-rope climbing systems to ensure
                maximum safety while you focus on your climbing technique and
                endurance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-amber-500">
              <div className="text-amber-600 text-4xl mb-4">
                <FaShoePrints />
              </div>
              <h3 className="text-xl font-bold mb-3">Bouldering Area</h3>
              <p className="text-gray-700">
                A dedicated bouldering section with crash pads for those who
                prefer climbing without ropes at lower heights, perfect for
                practicing moves and building strength.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-amber-500">
              <div className="text-amber-600 text-4xl mb-4">
                <FaUserShield />
              </div>
              <h3 className="text-xl font-bold mb-3">Safety First</h3>
              <p className="text-gray-700">
                All equipment is regularly inspected and maintained. Our staff
                are trained in safety procedures and belaying techniques to
                ensure a secure climbing experience.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-amber-500">
              <div className="text-amber-600 text-4xl mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold mb-3">Group Sessions</h3>
              <p className="text-gray-700">
                We offer group climbing sessions perfect for team building,
                school groups, or friends looking for a fun and challenging
                activity together.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-amber-500">
              <div className="text-amber-600 text-4xl mb-4">
                <FaStar />
              </div>
              <h3 className="text-xl font-bold mb-3">Professional Guidance</h3>
              <p className="text-gray-700">
                Our certified instructors are available to provide guidance,
                from basic techniques for beginners to advanced training for
                experienced climbers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-amber-700">
          Getting Started with Wall Climbing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
            <div className="text-amber-600 text-2xl font-bold mb-2">1</div>
            <h3 className="text-xl font-bold mb-3">Registration</h3>
            <p className="text-gray-700">
              All climbers must complete a registration form and waiver.
              First-time climbers receive a safety orientation.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
            <div className="text-amber-600 text-2xl font-bold mb-2">2</div>
            <h3 className="text-xl font-bold mb-3">Equipment</h3>
            <p className="text-gray-700">
              We provide all necessary equipment including harnesses, climbing
              shoes, and helmets. You're welcome to bring your own gear if
              certified.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-amber-500">
            <div className="text-amber-600 text-2xl font-bold mb-2">3</div>
            <h3 className="text-xl font-bold mb-3">Belay Certification</h3>
            <p className="text-gray-700">
              To belay independently, you must pass our belay test. We offer
              belay lessons for those who need training.
            </p>
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-amber-700">
            What to Bring for Climbing
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <FaTshirt className="text-4xl text-amber-600 mb-3" />
              <h3 className="font-bold mb-1">Comfortable Clothing</h3>
              <p className="text-sm text-gray-600">
                Flexible, non-restrictive athletic wear
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FaShoePrints className="text-4xl text-amber-600 mb-3" />
              <h3 className="font-bold mb-1">Climbing Shoes</h3>
              <p className="text-sm text-gray-600">
                Available for rent if you don't have your own
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FaWater className="text-4xl text-amber-600 mb-3" />
              <h3 className="font-bold mb-1">Water Bottle</h3>
              <p className="text-sm text-gray-600">
                Stay hydrated during your climb
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FaHandRock className="text-4xl text-amber-600 mb-3" />
              <h3 className="font-bold mb-1">Chalk Bag</h3>
              <p className="text-sm text-gray-600">Optional for better grip</p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Information */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 order-2 md:order-1">
            <img
              src="https://www.kscc.com.np/uploads/features/1656927823.jpg"
              alt="Safety Equipment"
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6 text-amber-700 flex items-center">
              <FaFirstAid className="mr-3" /> Safety Guidelines
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600" />
                </div>
                <span>Always check your equipment before climbing</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600" />
                </div>
                <span>Listen carefully to staff instructions</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600" />
                </div>
                <span>Never climb above the designated top point</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600" />
                </div>
                <span>Maintain proper communication with your belayer</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600" />
                </div>
                <span>Report any equipment issues immediately</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600" />
                </div>
                <span>Children must be supervised at all times</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits of Climbing */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-amber-700">
          Benefits of Indoor Climbing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-500">
            <h3 className="text-xl font-bold mb-3 text-amber-700">
              Physical Benefits
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600 text-sm" />
                </div>
                <span>
                  Full-body workout that builds strength and endurance
                </span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600 text-sm" />
                </div>
                <span>Improves flexibility and coordination</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600 text-sm" />
                </div>
                <span>Enhances grip strength and core stability</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600 text-sm" />
                </div>
                <span>Low-impact exercise that's easy on joints</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-500">
            <h3 className="text-xl font-bold mb-3 text-amber-700">
              Mental Benefits
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600 text-sm" />
                </div>
                <span>Boosts problem-solving skills as you plan routes</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600 text-sm" />
                </div>
                <span>Reduces stress and improves focus</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600 text-sm" />
                </div>
                <span>Builds confidence as you overcome challenges</span>
              </li>
              <li className="flex items-start">
                <div className="bg-amber-100 p-1 rounded-full mr-3 mt-1">
                  <FaClipboardCheck className="text-amber-600 text-sm" />
                </div>
                <span>Encourages mindfulness and being present</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact & Hours */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-amber-700">
            Visit Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-amber-600" /> Location
              </h3>
              <p className="mb-6">
                West Indoor Sport Hub Pvt Ltd
                <br />
                20th Street, Lakeside, Pokhara
                <br />
                Gandaki Province, Nepal
              </p>

              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaRegClock className="mr-2 text-amber-600" /> Opening Hours
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between max-w-xs">
                  <span>Everyday</span>
                  <span className="font-semibold">8:00 AM - 8:00 PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <FaPhone className="mr-2 text-amber-600" /> Contact Us
              </h3>
              <p className="mb-6">
                Have questions about our climbing wall or want to book a
                session? Get in touch!
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <FaPhone className="mt-1 mr-3 text-amber-600" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>+977 9823470214</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FaEnvelope className="mt-1 mr-3 text-amber-600" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>info@wishadventurenepal.com</p>
                    <p>climbing@wishadventurenepal.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3 text-amber-600">
                    <FaUsers />
                  </div>
                  <div>
                    <p className="font-semibold">Social Media</p>
                    <div className="flex space-x-4 mt-2">
                      <a
                        href="https://www.facebook.com/wishadventurenepal"
                        className="text-amber-600 hover:text-amber-800"
                      >
                        <FaFacebook className="text-2xl" />
                      </a>
                      <a
                        href="https://www.instagram.com/wishadventurenepal.pkr/"
                        className="text-amber-600 hover:text-amber-800"
                      >
                        <FaInstagram className="text-2xl" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Climbing?</h2>
          <p className="text-xl mb-8">
            Whether you're a beginner or an experienced climber, our wall offers
            challenges for all levels. Come experience the thrill of climbing in
            Pokhara's premier indoor climbing facility.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleContactClick}
              className="bg-white text-amber-800 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              Book Your Session Now
            </button>
            <button
              onClick={handleContactClick}
              className="bg-transparent border-2 border-white hover:bg-amber-700 px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
