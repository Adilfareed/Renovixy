"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { FaLightbulb, FaTasks, FaUsers, FaTruck } from "react-icons/fa";
// import chillertruck from "../../../public/assets/chillertruck.png";

interface CounterProps {
  target: number;
}

const Counter: React.FC<CounterProps> = ({ target }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-3xl font-bold text-blue-600">
      {count}+
    </div>
  );
};

const OurWorkSection: React.FC = () => {
  const stats = [
    { icon: FaTruck, number: 500, label: "Projects Completed" },
    { icon: FaUsers, number: 300, label: "Happy Clients" },
    { icon: FaTasks, number: 50, label: "Team Members" },
    { icon: FaLightbulb, number: 15, label: "Years Experience" },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Achievements</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Numbers that speak for our quality and commitment to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-center mb-4">
                  <stat.icon className="text-4xl text-blue-600" />
                </div>
                <Counter target={stat.number} />
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Quality Equipment & Service
                </h3>
                <p className="text-gray-600 mb-6">
                  We use state-of-the-art equipment and maintain the highest standards 
                  in all our projects to ensure customer satisfaction.
                </p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Learn More
                </button>
              </div>
              <div className="relative h-64 lg:h-auto">
                {/* <Image
                  src={chillertruck}
                  alt="Construction Equipment"
                  fill
                  className="object-cover"
                /> */}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurWorkSection;
