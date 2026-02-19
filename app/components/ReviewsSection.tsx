"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaUserCircle } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react';
import Image from "next/image";
import whatsapp from "../../public/assets/whatsapp.jpg";

interface Review {
  id: number;
  name: string;
  rating: number;
  review: string;
  project: string;
  image?: string;
}

const ReviewsSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Ahmed Hassan",
      rating: 5,
      review: "Excellent work on our home renovation. The team was professional and completed the project on time. Highly recommended!",
      project: "Home Renovation",
    },
    {
      id: 2,
      name: "Sarah Khan",
      rating: 5,
      review: "Great experience with R Construction. They built our commercial office and the quality exceeded our expectations.",
      project: "Commercial Office",
    },
    {
      id: 3,
      name: "Muhammad Ali",
      rating: 4,
      review: "Good workmanship and attention to detail. Our bathroom renovation looks amazing. Will definitely work with them again.",
      project: "Bathroom Renovation",
    },
    {
      id: 4,
      name: "Fatima Sheikh",
      rating: 5,
      review: "Professional team, excellent communication, and outstanding results. Our new home is exactly what we dreamed of.",
      project: "New Home Construction",
    },
    {
      id: 5,
      name: "Omar Farooq",
      rating: 5,
      review: "The structural repair work was done efficiently and safely. The team handled everything perfectly.",
      project: "Structural Repair",
    },
  ];

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    
    const handleInit = () => {
      onInit(emblaApi);
    };
    
    const handleSelect = () => {
      onSelect(emblaApi);
    };
    
    handleInit();
    handleSelect();
    emblaApi.on('reInit', handleInit);
    emblaApi.on('reInit', handleSelect);
    emblaApi.on('select', handleSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800">
            What Our <span className="renovixy-gradient-text">Clients Say</span>
          </h2>
          <p className="mt-3 text-lg text-gray-700">
            Real reviews from satisfied customers
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="flex-none w-full md:w-1/2 lg:w-1/3 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg p-6 h-full"
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <FaUserCircle className="w-10 h-10 text-gray-400 mr-3" />
                          <div className="text-left">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <p className="text-sm text-gray-600">{review.project}</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 text-left italic">
                      "{review.review}"
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? 'bg-renovixy-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <div className="bg-green-50 rounded-lg p-6 flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <Image
                src={whatsapp}
                alt="WhatsApp"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  Need to talk to us?
                </h3>
                <p className="text-gray-600">
                  Chat with us on WhatsApp for quick assistance
                </p>
              </div>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;
