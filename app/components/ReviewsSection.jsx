"use client";

import { motion } from "framer-motion";
import { FaStar, FaUserCircle } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import Image from "next/image";
import whatsapp from "../../public/assets/whatsapp.jpg";

// --- DIVERSIFIED Review Data with Construction Terms and Random Roman Urdu ---
const reviews = [
  {
    username: "Ahmed Khan",
    description:
      "Excellent service! The kitchen renovation was completed on time and the quality exceeded expectations. Time frame bilkul set tha.",
  },
  {
    username: "Fatima Ali",
    description:
      "Very professional team. They handled the complex structural changes smoothly and cleanly. Kaam mein koi kami nahi chhori, dil khush ho gaya.",
  },
  {
    username: "Zain Malik",
    description:
      "Affordable and reliable. Highly recommend for any home remodeling needs. Great craftsmanship! **Munasib rate pe aala mayar.** (High standard at a reasonable rate.)",
  },
  {
    username: "Aisha Begum",
    description:
      "Great experience! The team was very cooperative and kept us informed through every stage of the build. **Inke mazaaj bohot achhe hain.",
  },
  {
    username: "Omar Hussain",
    description:
      "Timely delivery and top-notch service on our commercial buildout. Will use again for future projects! **Pura commercial project high quality ka banaya.They built the entire commercial project with high quality.",
  },
  {
    username: "Nadia Iqbal",
    description:
      "Best renovation company I've used so far! Beautiful results on the bathroom remodel. **Bathroom ki tiles ka kaam shandaar hai.The tiling work in the bathroom is splendid",
  },
  {
    username: "Imran Raza",
    description:
      "They provided excellent customer support throughout the planning and construction process. **Plan banane se le kar finish tak saath diya. They supported us from planning to finishing.",
  },
  {
    username: "Samina Bano",
    description:
      "Hassle-free experience with professional, skilled staff. Our office looks amazing. **Mujhe koi tension nahi hui. I didn't have any stress/worry.",
  },
  {
    username: "Tariq Mahmood",
    description:
      "Highly efficient and cost-effective service, especially considering the high standard of finish. **Humari umeed se zyada acha kaam mila.We got better work than we expected.",
  },
  {
    username: "Sana Chaudhry",
    description:
      "Amazing quality and service. 10/10 recommended for their dedication to detail! .Chhoti chhoti cheezon pe bhi tawajjo di.** (They paid attention to even the small things.)",
  },
  {
    username: "Rizwan Baig",
    description:
      "On-time completion and excellent customer service. True professionals. Inki professionalism ki tareef banti hai.** (Their professionalism deserves praise.)",
  },
  {
    username: "Mariam Jafar",
    description:
      "Smooth experience, and the staff was very helpful in navigating permits and design choices! .Sab documents aasani se clear ho gaye.",
  },
];


// --- Dot Navigation Component (Unchanged) ---
const DotButton = ({ selected, onClick }) => (
  <button
    className={`w-3 h-3 rounded-full mx-1 transition-colors ${
      selected ? 'bg-blue-700' : 'bg-gray-300'
    }`}
    type="button"
    onClick={onClick}
  />
);

const ReviewsSection = () => {
  // Embla Setup (Unchanged)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 1, slidesPerView: 3 },
      '(min-width: 768px) and (max-width: 1023px)': { slidesToScroll: 1, slidesPerView: 2 },
      '(max-width: 767px)': { slidesToScroll: 1, slidesPerView: 1 },
    },
  });

  // Autoplay functionality for Embla (Unchanged)
  const AUTOPLAY_INTERVAL = 3000;
  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(autoplay, AUTOPLAY_INTERVAL);
    emblaApi.on('pointerDown', () => clearInterval(timer));
    emblaApi.on('select', () => clearInterval(timer));
    return () => clearInterval(timer);
  }, [emblaApi, autoplay]);
  
  // Dot Navigation State (Unchanged)
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);


  return (
    <div
      className="py-16 px-6 md:px-20 text-center"
      style={{
        background:
          "linear-gradient(90deg, rgba(225,244,255,1) 0%, rgba(204,230,255,1) 50%, rgba(255,255,255,1) 100%)",
      }}
    >
      <h3 className="text-blue-900 text-4xl font-extrabold tracking-wide">
        Client Feedback
      </h3>
      <h2 className="text-sm md:text-xl font-semibold mt-2 text-gray-700">
        What Our Clients Say About Us
      </h2>

      {/* Embla Carousel Structure (Unchanged) */}
      <div className="mt-10 max-w-7xl mx-auto embla-carousel">
        <div className="overflow-hidden" ref={emblaRef}> 
          <div className="flex -ml-4"> 
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 35 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
                className="pl-4 flex-shrink-0 w-full md:w-1/2 lg:w-1/3" 
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
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Dot Navigation (Unchanged) */}
        <div className="mt-8 flex justify-center">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => emblaApi.scrollTo(index)}
            />
          ))}
        </div>
      </div>
      
     <a
        href="https://wa.me/+9203142124253"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 z-50 p-4 rounded-full shadow-lg hover:bg-green-600 transition-all"
      >
        <Image src={whatsapp} alt="WhatsApp" width={32} height={32} className="w-8 h-8" />
      </a>
    </div>
  );
};

export default ReviewsSection;