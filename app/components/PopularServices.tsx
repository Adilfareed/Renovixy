"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Home, Building, Bath, HardHat, PaintBucket, Trees,
  Wrench, Ruler, Tractor, Hammer, Zap, Phone, 
  ArrowRight, Star, Shield, Clock, CheckCircle
} from "lucide-react";
import { useGetServiceCategories } from "@/app/data/hooks";
import type { ServiceCategory } from "@/app/data/api-services/service-categories";

const PopularServices: React.FC = () => {
  // Fetch service categories from API
  const { categories, isLoading, error } = useGetServiceCategories();
  // Limit to 6 categories for display
  const displayCategories = categories.slice(0, 6);

  // Dynamic icon mapping based on icon name from backend
  const getIconComponent = (iconName: string) => {
    if (!iconName) return Home; // Return default icon if no icon name provided

    const iconMap: { [key: string]: React.ComponentType<any> } = {
      'home': Home,
      'building': Building,
      'bath': Bath,
      'hard-hat': HardHat,
      'hardhat': HardHat,
      'paint-bucket': PaintBucket,
      'paintbucket': PaintBucket,
      'trees': Trees,
      'wrench': Wrench,
      'ruler': Ruler,
      'tractor': Tractor,
      'hammer': Hammer,
      'zap': Zap,
      'electrical-services': Zap,
      'phone': Phone,
      'star': Star,
      'shield': Shield,
      'clock': Clock,
      'check-circle': CheckCircle,
      'checkcircle': CheckCircle,
      // Add more icon mappings as needed
    };

    return iconMap[iconName.toLowerCase()] || Home; // Default to Home icon
  };

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

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="renovixy-gradient-text">Services</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Popular <span className="renovixy-gradient-text">Services</span>
          </h2>
          <p className="text-gray-600">Unable to load services at the moment. Please try again later.</p>
        </div>
      </section>
    );
  }

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
            Service <span className="renovixy-gradient-text">Categories</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of service categories 
            and discover the perfect solution for your project.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {displayCategories.map((category, index) => {
            const Icon = getIconComponent(category.icon);
            const categoryName = category.name;
            const categoryLink = `/services?category=${category._id}`;
            
            return (
              <motion.div
                key={category._id}
                variants={itemVariants}
                className="group"
              >
                <Link href={categoryLink}>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:border-renovixy-blue-300 cursor-pointer">
                    <div className="flex items-center justify-center w-16 h-16 bg-renovixy-blue-100 rounded-lg mb-4 group-hover:bg-renovixy-blue-200 transition-colors">
                      <Icon className="w-8 h-8 text-renovixy-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-renovixy-blue-600 transition-colors">
                      {categoryName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description || `Explore our ${categoryName.toLowerCase()} services and find the perfect solution for your needs.`}
                    </p>
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
