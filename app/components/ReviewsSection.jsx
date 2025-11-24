"use client";

import { motion } from "framer-motion";
import { FaStar, FaUserCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🔄 Reviews Data
const reviews = [
  { username: "Ahmed Khan", description: "Excellent service! The kitchen renovation was completed on time and the quality exceeded expectations." },
  { username: "Fatima Ali", description: "Very professional team. They handled the complex structural changes smoothly and cleanly." },
  { username: "Zain Malik", description: "Affordable and reliable. Highly recommend for any home remodeling needs. Great craftsmanship!" },
  { username: "Aisha Begum", description: "Great experience! The team was very cooperative and kept us informed through every stage of the build." },
  { username: "Omar Hussain", description: "Timely delivery and top-notch service on our commercial buildout. Will use again for future projects!" },
  { username: "Nadia Iqbal", description: "Best renovation company I've used so far! Beautiful results on the bathroom remodel." },
  { username: "Imran Raza", description: "They provided excellent customer support throughout the planning and construction process." },
  { username: "Samina Bano", description: "Hassle-free experience with professional, skilled staff. Our office looks amazing." },
  { username: "Tariq Mahmood", description: "Highly efficient and cost-effective service, especially considering the high standard of finish." },
  { username: "Sana Chaudhry", description: "Amazing quality and service. 10/10 recommended for their dedication to detail!" },
  { username: "Rizwan Baig", description: "On-time completion and excellent customer service. True professionals." },
  { username: "Mariam Jafar", description: "Smooth experience, and the staff was very helpful in navigating permits and design choices!" },
];

const ReviewsSection = () => {

  // ✅ Slider Configuration (no undefined settings issue)
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2600,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div
      className="py-16 px-6 md:px-20 text-center"
      style={{
        background: "linear-gradient(90deg, rgba(225,244,255,1) 0%, rgba(204,230,255,1) 50%, rgba(255,255,255,1) 100%)",
      }}
    >
      <h3 className="text-blue-900 text-4xl font-extrabold tracking-wide">
        Client Feedback
      </h3>
      <h2 className="text-sm md:text-xl font-semibold mt-2 text-gray-700">
        What Our Clients Say About Us
      </h2>

      {/* Reviews Slider */}
      <div className="mt-10 max-w-7xl mx-auto">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className="p-4"
            >
              <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-lg text-left mx-3 hover:shadow-xl transition">
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="text-gray-500 text-4xl" />
                  <h3 className="text-lg font-bold text-gray-900">
                    {review.username}
                  </h3>
                </div>

                <p className="text-gray-600 mt-2 leading-relaxed">
                  {review.description}
                </p>

                <div className="flex mt-3 text-yellow-400">
                  <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReviewsSection;
