"use client";

import { motion } from "framer-motion";
import { FaStar, FaUserCircle } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const reviews = [
  { username: "John Smith", description: "Excellent service! The trucks were clean and well-maintained." },
  { username: "Emma Johnson", description: "Very professional team. They handled everything smoothly!" },
  { username: "Liam Williams", description: "Affordable and reliable. Highly recommend for logistics needs." },
  { username: "Sophia Brown", description: "Great experience! The team was very cooperative." },
  { username: "Noah Davis", description: "Timely delivery and top-notch service. Will use again!" },
  { username: "Olivia Martinez", description: "Best transportation service I've used so far!" },
  { username: "Mason Wilson", description: "They provided excellent customer support throughout the process." },
  { username: "Isabella Thomas", description: "Hassle-free experience with professional staff." },
  { username: "James White", description: "Highly efficient and cost-effective service." },
  { username: "Charlotte Harris", description: "Amazing quality and service. 10/10 recommended!" },
  { username: "Benjamin Clark", description: "On-time delivery and excellent customer service." },
  { username: "Amelia Lewis", description: "Smooth experience, and the staff was very helpful!" },
];

const ReviewsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: true,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100 py-12 px-6 md:px-20 text-center">
      <h3 className="text-blue-600 uppercase text-sm font-semibold">Customer Reviews</h3>
      <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800">What Our Clients Say</h2>

      {/* Reviews Carousel */}
      <div className="mt-8">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="p-4"
            >
              <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg text-left mx-2">
                <div className="flex items-center space-x-3">
                  <FaUserCircle className="text-gray-500 text-4xl" />
                  <h3 className="text-lg font-semibold text-gray-800">{review.username}</h3>
                </div>
                <p className="text-gray-600 mt-2">{review.description}</p>
                <div className="flex mt-3 text-yellow-500">
                  <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
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
