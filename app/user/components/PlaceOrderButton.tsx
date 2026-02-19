"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiShoppingCart, FiPlus } from "react-icons/fi";
import CreateOrderModal from "./CreateOrderModal";

interface QuoteData {
  name: string;
  email: string;
  services: string[];
  message: string;
  phoneNumber?: string;
  address?: string;
}

const PlaceOrderButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

  // Load quote data and auto-open modal if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('quoteFormData');
      const redirectAfterLogin = localStorage.getItem('redirectAfterLogin');
      
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          // Only use data if it's less than 24 hours old
          const now = Date.now();
          const twentyFourHours = 24 * 60 * 60 * 1000;
          if (now - parsedData.timestamp < twentyFourHours) {
            setQuoteData(parsedData.formData);
            // Auto-open modal only if quote data exists and user just logged in
            if (redirectAfterLogin === 'order') {
              setIsModalOpen(true);
              // Clear the redirect flag after using it
              localStorage.removeItem('redirectAfterLogin');
            }
          } else {
            localStorage.removeItem('quoteFormData');
            localStorage.removeItem('redirectAfterLogin');
          }
        } catch (error) {
          console.error('Error parsing stored quote data:', error);
          localStorage.removeItem('quoteFormData');
          localStorage.removeItem('redirectAfterLogin');
        }
      }
    }
  }, []); // Run once on component mount

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Clear quote data if modal is closed without placing order
    if (quoteData && !isModalOpen) {
      // Only clear if user explicitly closes modal with quote data
      // This allows user to come back later
    }
  };

  return (
    <>
      <motion.button
        onClick={handlePlaceOrder}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2"
      >
        <FiShoppingCart className="w-5 h-5" />
        <span>
          {quoteData ? 'Complete Your Quote' : 'Place Order'}
        </span>
        <FiPlus className="w-4 h-4" />
      </motion.button>

      {quoteData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg"
        >
          <p className="text-xs text-green-800 font-medium text-center">
            Your quote data is ready! Click above to complete your order.
          </p>
        </motion.div>
      )}

      <CreateOrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        quoteData={quoteData}
        autoOpen={!!quoteData && isModalOpen} // Auto-open only if quote data exists and modal is open
      />
    </>
  );
};

export default PlaceOrderButton;
