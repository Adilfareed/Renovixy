"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiUpload, FiMapPin, FiCalendar, FiDollarSign, FiEdit2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/redux/store/hooks";
import { createOrder } from "@/app/redux/features/orderSlice";
import { useGetServices } from "@/app/data/hooks/useServices";
import { useGetCurrentUser } from "@/app/data/hooks/useAuth";
import { toast } from "react-toastify";
import ServicesDropdownModal from "./ServicesDropdownModal";

interface QuoteData {
  name: string;
  email: string;
  services: string[]; // Changed to array
  message: string;
  phoneNumber?: string;
  address?: string;
}

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteData: QuoteData | null;
  autoOpen?: boolean; // New prop to indicate auto-open from quote
}

const CreateOrderModal: React.FC<CreateOrderModalProps> = ({ isOpen, onClose, quoteData, autoOpen = false }:any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { services } = useGetServices();
  const { user } = useGetCurrentUser(); // Get authenticated user data
  
  const [orderData, setOrderData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    serviceType: [] as string[], // Changed to array for multi-select
    description: "",
    budget: "",
    timeline: "",
    relatedPics: [] as File[], // Changed to array for multiple files
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(autoOpen); // Start in edit mode if auto-opened
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  // Auto-populate form with authenticated user data
  useEffect(() => {
    if (user && !quoteData) {
      // Only auto-populate if no quote data (direct order)
      setOrderData(prev => ({
        ...prev,
        customerName: user.username || "",
        email: user.email || "",
        phone: user.phoneNumber || "",
        address: user.address || "",
      }));
    }
  }, [user, quoteData]);

  // Pre-fill form with quote data when modal opens
  useEffect(() => {
    if (isOpen) {
      if (quoteData) {
        // Pre-fill with quote data, but prioritize user data if available
        setOrderData(prev => ({
          ...prev,
          customerName: quoteData.name || user?.username || "",
          email: quoteData.email || user?.email || "",
          phone: quoteData.phoneNumber || user?.phoneNumber || "",
          address: quoteData.address || user?.address || "",
          serviceType: quoteData.services || [], // Keep as array
          description: quoteData.message || "",
        }));
        setIsEditing(autoOpen); // Enable editing if auto-opened from quote
      } else {
        // Reset form for direct order (no quote data)
        setOrderData(prev => ({
          ...prev,
          customerName: user?.username || "",
          email: user?.email || "",
          phone: user?.phoneNumber || "",
          address: user?.address || "",
          latitude: "",
          longitude: "",
          serviceType: [],
          description: "",
          budget: "",
          timeline: "",
          relatedPics: [], // Reset to empty array
        }));
        setIsEditing(true); // Allow editing for direct orders
      }
    }
  }, [isOpen, quoteData, autoOpen, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setOrderData(prev => ({
      ...prev,
      relatedPics: files
    }));
  };

  const getSelectedServices = () => {
    return services.filter(service => orderData.serviceType.includes(service._id));
  };

  const handleServicesChange = (serviceIds: string[]) => {
    setOrderData(prev => ({
      ...prev,
      serviceType: serviceIds
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      
      // Map form fields to API requirements
      formData.append('customerName', orderData.customerName);
      formData.append('email', orderData.email);
      formData.append('phone', orderData.phone);
      formData.append('address', orderData.address);
      formData.append('latitude', orderData.latitude || "0");
      formData.append('longitude', orderData.longitude || "0");
      formData.append('serviceType', orderData.serviceType.join(',')); // Join array for API
      formData.append('description', orderData.description);
      formData.append('budget', orderData.budget);
      formData.append('timeline', orderData.timeline);
      
      // Append multiple files
      orderData.relatedPics.forEach((file, index) => {
        formData.append(`relatedPics`, file);
      });

      const result:any = await dispatch(createOrder(formData));
      
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Order placed successfully!');
        
        // Clear stored quote data after successful order placement
        if (typeof window !== 'undefined') {
          localStorage.removeItem('quoteFormData');
          localStorage.removeItem('redirectAfterLogin');
        }
        
        // Close modal and redirect to orders
        onClose();
        router.push('/user/orders');
      } else {
        throw new Error(result.payload || 'Failed to place order');
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: "New Home Construction", label: "New Home Construction" },
    { value: "Commercial Projects", label: "Commercial Projects" },
    { value: "Bathroom Renovation", label: "Bathroom Renovation" },
    { value: "Structural Repair", label: "Structural Repair" },
    { value: "Painting Services", label: "Painting Services" },
    { value: "Landscaping", label: "Landscaping" },
    { value: "Other", label: "Other" }
  ];

  const budgetRanges = [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "Over $250,000"
  ];

  const timelineOptions = [
    "ASAP",
    "1-2 weeks",
    "2-4 weeks",
    "1-3 months",
    "3-6 months",
    "6+ months"
  ];

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
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create Order</h2>
              <p className="text-sm text-gray-600 mt-1">
                {autoOpen && quoteData 
                  ? 'Review and complete your order details' 
                  : 'Fill in your order details'
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Quote Information */}
            {autoOpen && quoteData ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-blue-900">Quote Information</h3>
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {isEditing ? 'Lock Editing' : 'Edit Details'}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{orderData.customerName}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{orderData.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Services:</span>
                    <span className="ml-2 font-medium">
                      {quoteData.services.length} service{quoteData.services.length > 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <span className="ml-2 font-medium">{orderData.phone || "Not provided"}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="text-gray-600">Description:</span>
                  <p className="mt-1 text-gray-800 text-sm">{orderData.description}</p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                <p className="text-sm text-gray-600">
                  Fill in your order details below. You can select multiple services and provide project information.
                </p>
              </div>
            )}

            {/* Address and Location */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <FiMapPin className="w-4 h-4 mr-2" />
                Location Details
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleChange}
                  disabled={autoOpen && quoteData && !isEditing}
                  required
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    autoOpen && quoteData && !isEditing
                      ? 'bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Full project address"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude
                  </label>
                  <input
                    type="text"
                    name="latitude"
                    value={orderData.latitude}
                    onChange={handleChange}
                    disabled={autoOpen && quoteData && !isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      autoOpen && quoteData && !isEditing
                        ? 'bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="24.8267"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude
                  </label>
                  <input
                    type="text"
                    name="longitude"
                    value={orderData.longitude}
                    onChange={handleChange}
                    disabled={autoOpen && quoteData && !isEditing}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      autoOpen && quoteData && !isEditing
                        ? 'bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="67.0342"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Project Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={orderData.description}
                  onChange={handleChange}
                  disabled={autoOpen && quoteData && !isEditing}
                  required
                  rows={4}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
                    autoOpen && quoteData && !isEditing
                      ? 'bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Detailed description of your project..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FiDollarSign className="w-4 h-4 inline mr-1" />
                    Budget Range *
                  </label>
                  <select
                    name="budget"
                    value={orderData.budget}
                    onChange={handleChange}
                    disabled={autoOpen && quoteData && !isEditing}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      autoOpen && quoteData && !isEditing
                        ? 'bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FiCalendar className="w-4 h-4 inline mr-1" />
                    Timeline *
                  </label>
                  <select
                    name="timeline"
                    value={orderData.timeline}
                    onChange={handleChange}
                    disabled={autoOpen && quoteData && !isEditing}
                    required
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      autoOpen && quoteData && !isEditing
                        ? 'bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Services Selection */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <FiEdit2 className="w-4 h-4 mr-2" />
                Services Selection
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Services *
                </label>
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={() => setIsServicesModalOpen(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {getSelectedServices().length > 0 
                      ? `${getSelectedServices().length} service${getSelectedServices().length > 1 ? 's' : ''} selected`
                      : 'Select Services'
                    }
                  </button>
                  {getSelectedServices().length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {getSelectedServices().map(service => (
                        <span key={service._id} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                          {service.title}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <FiUpload className="w-4 h-4 inline mr-1" />
                Project Images (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  name="relatedPics"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <FiUpload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {orderData.relatedPics.length > 0 
                      ? `${orderData.relatedPics.length} image${orderData.relatedPics.length > 1 ? 's' : ''} selected`
                      : "Click to upload images"
                    }
                  </span>
                  <span className="text-xs text-gray-500">PNG, JPG up to 10MB each (Multiple files allowed)</span>
                </label>
                
                {/* Show selected files */}
                {orderData.relatedPics.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="text-sm font-medium text-gray-700">Selected Images:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {orderData.relatedPics.map((file, index) => (
                        <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                          <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                            <FiUpload className="w-4 h-4 text-gray-500" />
                          </div>
                          <span className="text-xs text-gray-600 truncate flex-1">{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* Services Dropdown Modal */}
      <ServicesDropdownModal
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
        selectedServices={orderData.serviceType}
        onServicesChange={handleServicesChange}
      />
    </AnimatePresence>
  );
};

export default CreateOrderModal;
