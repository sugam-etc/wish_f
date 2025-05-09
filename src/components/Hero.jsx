import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

// Import images directly
import img1 from "../assets/BackgroundImages/img1.jpg";
import img2 from "../assets/BackgroundImages/img2.jpg";
import img3 from "../assets/BackgroundImages/img3.jpg";
import img4 from "../assets/BackgroundImages/img4.jpg";
import img5 from "../assets/BackgroundImages/img5.jpg";
import img6 from "../assets/BackgroundImages/img6.jpg";
import img7 from "../assets/BackgroundImages/img7.jpg";
import img8 from "../assets/BackgroundImages/img8.jpg";
import img9 from "../assets/BackgroundImages/img9.jpg";

// Fallback image in case imports fail
const fallbackImage =
  "https://via.placeholder.com/1920x1080?text=West+Indoor+Sport+Hub";

const backgroundImages = [
  { url: img1, textColor: "text-white" },
  { url: img2, textColor: "text-white" },
  { url: img3, textColor: "text-white" },
  { url: img4, textColor: "text-white" },
  { url: img5, textColor: "text-white" },
  { url: img6, textColor: "text-white" },
  { url: img7, textColor: "text-white" },
  { url: img8, textColor: "text-white" },
  { url: img9, textColor: "text-white" },
].map((img) => ({
  ...img,
  url: img.url || fallbackImage, // Use fallback if image is undefined
}));

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textColor, setTextColor] = useState("text-white");
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Preload all images
    const loadImages = async () => {
      const promises = backgroundImages.map((img) => {
        return new Promise((resolve) => {
          const image = new Image();
          image.src = img.url;
          image.onload = resolve;
          image.onerror = resolve; // Continue even if some images fail
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    loadImages();

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % backgroundImages.length;
        setTextColor(backgroundImages[newIndex].textColor);
        return newIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  return (
    <section className="relative bg-gray-900 h-screen max-h-[800px] overflow-hidden flex items-center justify-center">
      {/* Animated Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {imagesLoaded && (
            <motion.div
              key={currentImageIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={backgroundImages[currentImageIndex].url}
                alt="West Indoor Sport Hub Climbing Gym"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          className={`max-w-4xl mx-auto ${textColor}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            West Indoor Sport Hub Pvt. Ltd
          </motion.h1>
          <h1 className="text-xl md:text-2xl mb-8 mx-auto max-w-2xl">
            <Typewriter
              words={[
                "        Pokhara's premier indoor climbing destination with world-class facilities for all skill levels",
              ]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h1>

          <motion.div
            className="mb-8 space-y-4 flex flex-col items-center"
            variants={itemVariants}
          >
            <div className="flex items-center text-lg">
              <FaClock className="text-amber-400 mr-3 text-xl" />
              <span>Open Daily: 8 AM - 8 PM</span>
            </div>
            <div className="flex items-center text-lg">
              <FaMapMarkerAlt className="text-amber-400 mr-3 text-xl" />
              <span>20th Street, Lakeside, Pokhara</span>
            </div>
            <div className="flex items-center text-lg">
              <FaPhone className="text-amber-400 mr-3 text-xl" />
              <span>+977 9863539501</span>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.a
              href="#services"
              className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium rounded-lg transition text-lg"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Our Services <FaArrowRight className="ml-2" />
            </motion.a>
            <motion.a
              href="#contact"
              className={`inline-flex items-center px-6 py-3 bg-transparent hover:bg-white/10 border-2 border-white rounded-lg transition text-lg ${textColor}`}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Book Now
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated scrolling indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-amber-400 rounded-full mt-1"
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
