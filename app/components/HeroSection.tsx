"use client";

import React from "react";
import QuoteForm from "./QuoteForm";
import { motion } from "framer-motion";
import { ArrowRight, Play, CheckCircle } from "lucide-react";

const HeroSection: React.FC = () => {
  const features = [
    "15+ Years Experience",
    "500+ Projects Completed",
    "24/7 Support Available"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12 lg:py-0">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-renovixy-blue-50 via-white to-renovixy-red-50 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-renovixy-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-renovixy-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse [animation-delay:2s]"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-renovixy-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse [animation-delay:4s]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 lg:space-y-8 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-renovixy-blue-100"
            >
              <CheckCircle className="w-4 h-4 text-renovixy-blue-600 mr-2" />
              <span className="text-sm font-medium text-renovixy-blue-800">Licensed & Insured</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900"
            >
              Building Your
              <span className="renovixy-gradient-text block lg:inline"> Dreams</span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Expert construction and renovation services for residential and commercial projects. 
              Quality craftsmanship, timely delivery, and customer satisfaction guaranteed.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-3 max-w-md mx-auto lg:mx-0"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-renovixy-blue-600 rounded-full shrink-0"></div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(37, 99, 235, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 renovixy-gradient text-white font-semibold rounded-xl transition-all duration-300 renovixy-shadow flex items-center justify-center space-x-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-renovixy-blue-600 text-renovixy-blue-600 font-semibold rounded-xl transition-all duration-300 hover:bg-renovixy-blue-50 flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                Watch Our Work
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Content - Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-4 -right-4 lg:-top-4 lg:-right-4 renovixy-gradient text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg z-10"
            >
              Free Quote
            </motion.div>
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <QuoteForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
