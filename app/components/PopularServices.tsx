"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Home, Building, Bath, HardHat, PaintBucket, Trees,
  Wrench, Ruler, Tractor, Hammer, ArrowRight
} from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const PopularServices: React.FC = () => {
  // Icon mapping
  const iconMap = {
    Home, Building, Bath, HardHat, PaintBucket, Trees,
    Wrench, Ruler, Tractor, Hammer
  };

  const services: Service[] = [
    {
      id: "1",
      title: "New Home Construction",
      description: "Build your dream home from the ground up with our expert construction team.",
      icon: "Home",
      link: "/services/new-home-construction"
    },
    {
      id: "2", 
      title: "Commercial Projects",
      description: "Professional commercial construction for businesses and organizations.",
      icon: "Building",
      link: "/services/commercial-projects"
    },
    {
      id: "3",
      title: "Bathroom Renovation",
      description: "Transform your bathroom with modern fixtures and elegant designs.",
      icon: "Bath",
      link: "/services/bathroom-renovation"
    },
    {
      id: "4",
      title: "Structural Repair",
      description: "Professional structural repair services to ensure building safety.",
      icon: "HardHat",
      link: "/services/structural-repair"
    },
    {
      id: "5",
      title: "Painting Services",
      description: "Professional painting services for both interior and exterior projects.",
      icon: "PaintBucket",
      link: "/services/painting"
    },
    {
      id: "6",
      title: "Landscaping",
      description: "Complete landscaping solutions to enhance your property's beauty.",
      icon: "Trees",
      link: "/services/landscaping"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular <span className="renovixy-gradient-text">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a comprehensive range of construction and renovation services 
            to meet all your needs.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Home;
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="group"
              >
                <Link href={service.link}>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-renovixy-blue-300 cursor-pointer">
                    <div className="flex items-center justify-center w-16 h-16 bg-renovixy-blue-100 rounded-lg mb-4 group-hover:bg-renovixy-blue-200 transition-colors">
                      <Icon className="w-8 h-8 text-renovixy-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-renovixy-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center text-renovixy-blue-600 font-medium group-hover:text-renovixy-blue-700 transition-colors">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-3 renovixy-gradient text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            View All Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularServices;
