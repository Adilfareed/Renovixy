"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSearch, FiCheck, FiFilter } from "react-icons/fi";
import { useGetServices } from "@/app/data/hooks/useServices";

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

interface ServicesDropdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedServices: string[];
  onServicesChange: (services: string[]) => void;
}

const ServicesDropdownModal: React.FC<ServicesDropdownModalProps> = ({
  isOpen,
  onClose,
  selectedServices,
  onServicesChange
}) => {
  const { services, isLoading: servicesLoading } = useGetServices();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showPopularOnly, setShowPopularOnly] = useState(false);

  // Get unique categories
  const categories = [...new Set(services.map(service => service.category.name))];

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        service.category.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || service.category.name === categoryFilter;
    const matchesPopular = !showPopularOnly || service.popular;
    
    return matchesSearch && matchesCategory && matchesPopular;
  });

  const handleServiceToggle = (serviceId: string) => {
    if (selectedServices.includes(serviceId)) {
      onServicesChange(selectedServices.filter(id => id !== serviceId));
    } else {
      onServicesChange([...selectedServices, serviceId]);
    }
  };

  const handleSelectAll = () => {
    const allServiceIds = filteredServices.map(service => service._id);
    onServicesChange(allServiceIds);
  };

  const handleClearAll = () => {
    onServicesChange([]);
  };

  const getSelectedCount = () => {
    return filteredServices.filter(service => selectedServices.includes(service._id)).length;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Select Services</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {getSelectedCount()} of {filteredServices.length} services selected
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-48">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Popular Filter */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="popular-only"
                  checked={showPopularOnly}
                  onChange={(e) => setShowPopularOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="popular-only" className="text-sm text-gray-700 cursor-pointer">
                  Popular only
                </label>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Services List */}
          <div className="px-6 py-4">
            {servicesLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <FiFilter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredServices.map(service => (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      selectedServices.includes(service._id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => handleServiceToggle(service._id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                        <p className="text-sm text-gray-500">{service.category.name}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {service.popular && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                            Popular
                          </span>
                        )}
                        {selectedServices.includes(service._id) && (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <FiCheck className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
              </div>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Apply Selection
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServicesDropdownModal;
