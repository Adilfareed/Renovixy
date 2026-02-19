"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye, FaFilter, FaSearch, FaStar } from 'react-icons/fa';
import Link from 'next/link';
import type { Service } from '@/app/types';
import { useGetServices, useFilterServices, useDeleteService } from '@/app/data/hooks';
import { useGetServiceCategories } from '@/app/data/hooks';

export default function ServicesDashboard() {
  const { services, isLoading, error } = useGetServices();
  const { categories: serviceCategories, isLoading: categoriesLoading } = useGetServiceCategories();
  const deleteServiceMutation = useDeleteService();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [popularFilter, setPopularFilter] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  const filteredServices = useFilterServices({
    category: categoryFilter !== 'all' ? categoryFilter : undefined,
    popular: popularFilter === 'popular' ? true : undefined,
  }).services;

  const handleDelete = (service: Service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (serviceToDelete) {
      try {
        await deleteServiceMutation.mutateAsync(serviceToDelete._id);
        setShowDeleteModal(false);
        setServiceToDelete(null);
      } catch (error) {
        console.error('Failed to delete service:', error);
      }
    }
  };

  const categories = ['all', ...Array.from(new Set(serviceCategories.map((c: any) => c.name)))];


  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Residential': 'bg-blue-100 text-blue-800',
      'Commercial': 'bg-green-100 text-green-800',
      'Repair': 'bg-red-100 text-red-800',
      'Finishing': 'bg-orange-100 text-orange-800',
      'Outdoor': 'bg-emerald-100 text-emerald-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Services Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your construction services</p>
            </div>
            <Link
              href="/dashboard/services/add"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Service
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.slice(1).map((category:any) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                value={popularFilter}
                onChange={(e) => setPopularFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Services</option>
                <option value="popular">Popular Only</option>
                <option value="regular">Regular Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: Service, index: number) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                {isLoading ? (
                  <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-indigo-600"></div>
                ) : service.images && service.images.length > 0 ? (
                  <img 
                    src={service.images[0].url} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-blue-400 to-indigo-600"></div>
                )}
                <div className="absolute top-4 right-4 flex space-x-2">
                  {service.popular && (
                    <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-medium flex items-center">
                      <FaStar className="mr-1" />
                      Popular
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category.name)}`}>
                    {service.category.name}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>Features:</span>
                    <span className="font-medium">{service.features?.length || 0} included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{service.category.name}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link
                    href={`/dashboard/services/${service._id}`}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <FaEye className="mr-1" />
                    View
                  </Link>
                  <Link
                    href={`/dashboard/services/${service._id}/edit`}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(service)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              <FaFilter />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || categoryFilter !== 'all' || popularFilter !== 'all'
                ? 'Try adjusting your filters or search terms'
                : 'Get started by adding your first service'}
            </p>
            {!searchTerm && categoryFilter === 'all' && popularFilter === 'all' && (
              <Link
                href="/dashboard/services/add"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPlus className="mr-2" />
                Add Your First Service
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && serviceToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Service</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{serviceToDelete.title}"? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setServiceToDelete(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
