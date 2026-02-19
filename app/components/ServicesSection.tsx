"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaTools, FaBuilding } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  link: string;
}

const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      title: "Home Renovation",
      description: "Transform your living space with our expert renovation services",
      icon: FaHome,
      link: "/services/home-renovation"
    },
    {
      title: "Commercial Construction",
      description: "Professional commercial building solutions for your business",
      icon: FaBuilding,
      link: "/services/commercial"
    },
    {
      title: "Repair & Maintenance",
      description: "Keep your property in perfect condition with our maintenance services",
      icon: FaTools,
      link: "/services/maintenance"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="renovixy-gradient-text">Services</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive construction and renovation services 
            tailored to meet your specific needs and exceed your expectations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="p-6 sm:p-8">
                {/* Icon */}
                <div className="w-16 h-16 bg-renovixy-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-renovixy-blue-200 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-renovixy-blue-600" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-renovixy-blue-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 text-sm sm:text-base leading-relaxed">
                  {service.description}
                </p>
                
                {/* Link */}
                <a
                  href={service.link}
                  className="inline-flex items-center text-renovixy-blue-600 hover:text-renovixy-blue-700 font-semibold group-hover:translate-x-1 transition-all duration-300"
                >
                  Learn More
                  <BsArrowRight className="w-4 h-4 ml-2" />
                </a>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-linear-to-br from-renovixy-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
