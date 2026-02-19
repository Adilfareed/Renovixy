"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiAward, FiCheckCircle, FiUsers, FiStar } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
}

const WhoWeAre: React.FC = () => {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});

  const stats: Stat[] = [
    { 
      label: "Services", 
      value: 15, 
      icon: <FiAward className="text-blue-900 w-10 h-10 mx-auto mb-2" /> 
    },
    { 
      label: "Repairs Completed", 
      value: 2500, 
      icon: <FiCheckCircle className="text-blue-900 w-10 h-10 mx-auto mb-2" /> 
    },
    { 
      label: "Expert Technicians", 
      value: 50, 
      icon: <FiUsers className="text-blue-900 w-10 h-10 mx-auto mb-2" /> 
    },
    { 
      label: "Customer Satisfaction", 
      value: 99, 
      icon: <FiStar className="text-blue-900 w-10 h-10 mx-auto mb-2" /> 
    }
  ];

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervals: NodeJS.Timeout[] = [];

    stats.forEach((stat) => {
      const increment = stat.value / (duration / 16); // 60fps
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCounters(prev => ({ ...prev, [stat.label]: stat.value }));
          clearInterval(interval);
        } else {
          setCounters(prev => ({ ...prev, [stat.label]: Math.floor(current) }));
        }
      }, 16);

      intervals.push(interval);
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-renovixy-blue-200 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-renovixy-red-200 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 renovixy-gradient text-white rounded-full shadow-lg"
            >
              <span className="text-sm font-semibold">About Renovixy</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Your Trusted Repair & Renovation Partner
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Renovixy is your premier destination for comprehensive repair, renovation, and maintenance services. 
              We specialize in doorstep services including epoxy flooring, mobile/laptop/printer repair, and CCTV installation. 
              With years of experience, we've built a reputation for quality, reliability, and customer satisfaction.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg text-gray-600 leading-relaxed mb-8"
            >
              Our team of skilled technicians and professionals is committed to delivering exceptional service at your convenience. 
              Using the latest technology and best practices, we ensure every project meets your expectations and exceeds industry standards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 renovixy-gradient text-white font-semibold rounded-xl transition-all duration-300 renovixy-shadow flex items-center justify-center space-x-2"
              >
                About Us
                <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-renovixy-blue-600 text-renovixy-blue-600 font-semibold rounded-xl transition-all duration-300 hover:bg-renovixy-blue-50 flex items-center justify-center space-x-2"
              >
                <span>Our Portfolio</span>
                <BsArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-xl border border-gray-100/50 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="text-center space-y-2"
                  >
                    <div className="relative inline-flex items-center justify-center">
                      {stat.icon}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-900">
                      {counters[stat.label]}
                      <span className="text-xl md:text-2xl text-renovixy-blue-600 ml-1">+</span>
                    </div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 p-4 bg-gradient-to-r from-renovixy-blue-50 to-renovixy-red-50 rounded-xl border border-renovixy-blue-100"
              >
                <p className="text-center text-sm font-semibold text-renovixy-blue-800">
                  ✓ Certified Technicians
                  <span className="mx-2">•</span>
                  ✓ 24/7 Service Available
                  <span className="mx-2">•</span>
                  ✓ Quality Guaranteed
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
