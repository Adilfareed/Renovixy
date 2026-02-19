"use client";

import React, { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/redux/store/hooks";
import { createOrder } from "@/app/redux/features/orderSlice";
import { useGetServices } from "@/app/data/hooks/useServices";
import { ToastContainer, toast } from "react-toastify";
import { FiPlus, FiX, FiCheck, FiShoppingCart } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  name: string;
  email: string;
  services: string[]; // Changed from single service to array
  message: string;
  phoneNumber?: string;
  address?: string;
}

interface StoredQuoteData {
  formData: FormData;
  timestamp: number;
}

interface Service {
  _id: string;
  title: string;
  description: string;
  category: {
    _id: string;
    name: string;
  };
  popular?: boolean;
  featured?: boolean;
}

const QuoteForm: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { services, isLoading: servicesLoading } = useGetServices();
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    services: [],
    message: "",
    phoneNumber: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [serviceSearch, setServiceSearch] = useState("");

  // Load persisted data on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedData = localStorage.getItem('quoteFormData');
      if (storedData) {
        try {
          const parsedData: StoredQuoteData = JSON.parse(storedData);
          // Only use data if it's less than 24 hours old
          const now = Date.now();
          const twentyFourHours = 24 * 60 * 60 * 1000;
          if (now - parsedData.timestamp < twentyFourHours) {
            setFormData(parsedData.formData);
          } else {
            localStorage.removeItem('quoteFormData');
          }
        } catch (error) {
          console.error('Error parsing stored quote data:', error);
          localStorage.removeItem('quoteFormData');
        }
      }

      // Pre-fill data if user is logged in
      if (isAuthenticated && user) {
        setFormData(prev => ({
          ...prev,
          name: user.username || prev.name,
          email: user.email || prev.email,
          address: user.address || prev.address,
          phoneNumber: user.phoneNumber || prev.phoneNumber,
        }));
      }
    }
  }, [isAuthenticated, user]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dataToStore: StoredQuoteData = {
        formData,
        timestamp: Date.now(),
      };
      localStorage.setItem('quoteFormData', JSON.stringify(dataToStore));
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleRemoveService = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(id => id !== serviceId)
    }));
  };

  const getSelectedServices = () => {
    return services.filter(service => formData.services.includes(service._id));
  };

  const getFilteredServices = () => {
    return services.filter(service => 
      service.title.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      service.description.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      service.category.name.toLowerCase().includes(serviceSearch.toLowerCase())
    );
  };

  const handleOrderRequest = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      // Store current form data and redirect to login
      if (typeof window !== 'undefined') {
        const dataToStore: StoredQuoteData = {
          formData,
          timestamp: Date.now(),
        };
        localStorage.setItem('quoteFormData', JSON.stringify(dataToStore));
        localStorage.setItem('redirectAfterLogin', 'order');
      }
      toast.info('Please login to place your order. Your quote data will be saved.');
      router.push('/login');
      return;
    }

    // User is authenticated, redirect to dashboard with order modal
    if (typeof window !== 'undefined') {
      const dataToStore: StoredQuoteData = {
        formData,
        timestamp: Date.now(),
      };
      localStorage.setItem('quoteFormData', JSON.stringify(dataToStore));
    }
    
    toast.success('Quote information saved! Redirecting to complete order...');
    setTimeout(() => {
      router.push('/user');
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleOrderRequest();
  };

  const selectedServices = getSelectedServices();
  const filteredServices = getFilteredServices();

  return (
    <div className="bg-white/95 max-h-[600px] overflow-y-auto backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 max-w-full w-full border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          Get a Free Quote
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-500 ml-2 hidden sm:inline">Instant Response</span>
        </div>
      </div>
      
      {submitMessage ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 text-green-800 p-4 rounded-lg mb-6 flex items-center space-x-2"
        >
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="font-medium">{submitMessage}</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Name *
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-renovixy-blue-500 focus:border-renovixy-blue-500 bg-gray-50/50 transition-all duration-300"
                placeholder="John Doe"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email *
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-renovixy-blue-500 focus:border-renovixy-blue-500 bg-gray-50/50 transition-all duration-300"
                placeholder="john@example.com"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Multi-Select Services */}
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-gray-700">
              Services *
            </label>
            <div className="relative">
              <div 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-renovixy-blue-500 focus:border-renovixy-blue-500 bg-gray-50/50 transition-all duration-300 cursor-pointer"
                onClick={() => setShowServiceDropdown(!showServiceDropdown)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FiShoppingCart className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700 text-sm">
                      {selectedServices.length > 0 
                        ? `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`
                        : 'Select services'
                      }
                    </span>
                  </div>
                  <svg className={`w-4 h-4 text-gray-400 transition-transform ${showServiceDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Selected Services Tags */}
              {selectedServices.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedServices.map(service => (
                    <div key={service._id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm flex items-center space-x-1">
                      <span className="truncate max-w-32">{service.title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(service._id)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Dropdown */}
              {showServiceDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {/* Search */}
                  <div className="p-3 border-b border-gray-200">
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>

                  {/* Service List */}
                  <div className="max-h-48 overflow-y-auto">
                    {servicesLoading ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        Loading services...
                      </div>
                    ) : filteredServices.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">
                        No services found
                      </div>
                    ) : (
                      filteredServices.map(service => (
                        <div
                          key={service._id}
                          className={`p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 ${
                            formData.services.includes(service._id) ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => handleServiceToggle(service._id)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 text-sm truncate">{service.title}</div>
                              <div className="text-sm text-gray-500 truncate">{service.category.name}</div>
                            </div>
                            <div className="flex items-center space-x-2 shrink-0">
                              {service.popular && (
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded whitespace-nowrap">Popular</span>
                              )}
                              {formData.services.includes(service._id) && (
                                <FiCheck className="w-4 h-4 text-blue-600 shrink-0" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Phone Number Field */}
          <div className="space-y-1">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700">
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-renovixy-blue-500 focus:border-renovixy-blue-500 bg-gray-50/50 transition-all duration-300"
                placeholder="+1 (555) 123-4567"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-1">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-renovixy-blue-500 focus:border-renovixy-blue-500 bg-gray-50/50 transition-all duration-300"
                placeholder="123 Main St, City, State"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
              Project Details *
            </label>
            <div className="relative">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-renovixy-blue-500 focus:border-renovixy-blue-500 bg-gray-50/50 transition-all duration-300 resize-none"
                placeholder="Tell us about your project..."
              />
              <div className="absolute right-3 top-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || selectedServices.length === 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-renovixy-blue-500 hover:bg-renovixy-blue-700 text-white py-4 px-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Get Quote & Place Order</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </motion.button>
        </form>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default QuoteForm;
