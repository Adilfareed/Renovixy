"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const OrderNowSection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full bg-white shadow-lg p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left mb-4 md:mb-0 md:mr-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Start Your Project?
        </h2>
        <p className="text-gray-600">
          Get in touch with us today for a free consultation and quote.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link
          href="/contact"
          className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaEnvelope className="mr-2" />
          Get Quote
          <FaArrowRightLong className="ml-2" />
        </Link>
        
        <Link
          href="tel:5551234567"
          className="flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <FaPhone className="mr-2" />
          Call Us
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderNowSection;
