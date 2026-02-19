"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/app/redux/store/hooks';
import { createService } from '@/app/redux/features/serviceSlice';
import { fetchServiceCategories } from '@/app/redux/features/serviceCategorySlice';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaPlus, FaTrash, FaBolt, FaWrench, FaUtensils, FaTools, FaHome, FaHammer, FaSnowflake, FaTruck, FaBox } from 'react-icons/fa';
import Link from 'next/link';

// Icon mapping for categories
const categoryIcons: { [key: string]: React.ReactNode } = {
  'electrical-services': <FaBolt className="w-4 h-4" />,
  'plumbing': <FaWrench className="w-4 h-4" />,
  'kitchen': <FaUtensils className="w-4 h-4" />,
  'clean-hands': <FaTools className="w-4 h-4" />,
  'domain': <FaHome className="w-4 h-4" />,
  'home-repair-service': <FaHammer className="w-4 h-4" />,
  'carpenter': <FaTools className="w-4 h-4" />,
  'ac-unit': <FaSnowflake className="w-4 h-4" />,
  'local-shipping': <FaTruck className="w-4 h-4" />,
  'inventory': <FaBox className="w-4 h-4" />
};

export default function AddServicePage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const { categories, loading: categoriesLoading } = useAppSelector((state: any) => state.serviceCategories);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    features: [''],
    popular: false,
    images: [] as File[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchServiceCategories());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    const validFeatures = formData.features.filter(feature => feature.trim());
    if (validFeatures.length === 0) {
      newErrors.features = 'At least one feature is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const serviceFormData = new FormData();
      
      // Add basic fields
      serviceFormData.append('title', formData.title);
      serviceFormData.append('description', formData.description);
      serviceFormData.append('category', formData.category);
      serviceFormData.append('popular', formData.popular.toString());
      
      // Add features
      const validFeatures = formData.features.filter(feature => feature.trim());
      validFeatures.forEach((feature, index) => {
        serviceFormData.append(`features[${index}]`, feature);
      });
      
      // Add images
      formData.images.forEach((image, index) => {
        serviceFormData.append(`images`, image);
      });

      await dispatch(createService(serviceFormData)).unwrap();
      router.push('/dashboard/services');
    } catch (error) {
      console.error('Failed to create service:', error);
      setErrors({ submit: 'Failed to create service. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Link
                href="/dashboard/services"
                className="mr-4 p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <FaArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Service</h1>
                <p className="text-gray-600 mt-1">Create a new service for your business</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter service title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  disabled={categoriesLoading}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  } ${categoriesLoading ? 'bg-gray-100' : ''}`}
                >
                  <option value="">
                    {categoriesLoading ? 'Loading categories...' : 'Select a category'}
                  </option>
                  {categories.map((category: any) => (
                    <option key={category._id} value={category._id}>
                      {categoryIcons[category.icon] && (
                        <span className="inline-flex items-center mr-2">
                          {categoryIcons[category.icon]}
                        </span>
                      )}
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your service in detail"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Features *
              </label>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter a feature"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center px-3 py-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <FaPlus className="h-4 w-4 mr-2" />
                  Add Feature
                </button>
              </div>
              {errors.features && (
                <p className="mt-1 text-sm text-red-600">{errors.features}</p>
              )}
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Images
              </label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="text-gray-400 text-center">
                      <div className="text-4xl mb-2">📁</div>
                      <p className="text-sm">Click to upload images</p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF up to 10MB each
                      </p>
                    </div>
                  </label>
                </div>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FaTrash className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Popular Service */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="popular"
                name="popular"
                checked={formData.popular}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="popular" className="ml-2 block text-sm text-gray-700">
                Mark as popular service
              </label>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                href="/dashboard/services"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Creating...' : 'Create Service'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
