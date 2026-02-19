"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/app/redux/store/hooks';
import { 
  fetchServiceCategories, 
  createServiceCategory, 
  updateServiceCategory, 
  deleteServiceCategory 
} from '@/app/redux/features/serviceCategorySlice';
import { useRouter } from 'next/navigation';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft, FaSave, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

// Icon mapping for categories
const categoryIcons: { [key: string]: React.ReactNode } = {
  'electrical-services': <span className="text-blue-600">⚡</span>,
  'plumbing': <span className="text-blue-600">🔧</span>,
  'kitchen': <span className="text-blue-600">🍳</span>,
  'clean-hands': <span className="text-blue-600">🧹</span>,
  'domain': <span className="text-blue-600">🏠</span>,
  'home-repair-service': <span className="text-blue-600">🔨</span>,
  'carpenter': <span className="text-blue-600">🛠️</span>,
  'ac-unit': <span className="text-blue-600">❄️</span>,
  'local-shipping': <span className="text-blue-600">🚚</span>,
  'inventory': <span className="text-blue-600">📦</span>
};

export default function ServiceCategoriesPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const { categories, loading, error } = useAppSelector((state: any) => state.serviceCategories);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    description: '',
    isActive: true
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Category name is required';
    }
    
    if (!formData.icon.trim()) {
      errors.icon = 'Icon identifier is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (selectedCategory) {
        await dispatch(updateServiceCategory({ 
          id: selectedCategory._id, 
          categoryData: formData 
        })).unwrap();
      } else {
        await dispatch(createServiceCategory(formData)).unwrap();
      }
      
      setShowAddModal(false);
      setShowEditModal(false);
      setSelectedCategory(null);
      resetForm();
    } catch (error) {
      console.error('Failed to save category:', error);
      setFormErrors({ submit: 'Failed to save category. Please try again.' });
    }
  };

  const handleEdit = (category: any) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      icon: category.icon,
      description: category.description,
      isActive: category.isActive
    });
    setShowEditModal(true);
  };

  const handleDelete = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await dispatch(deleteServiceCategory(categoryId)).unwrap();
      } catch (error) {
        console.error('Failed to delete category:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      icon: '',
      description: '',
      isActive: true
    });
    setFormErrors({});
  };

  const openAddModal = () => {
    resetForm();
    setSelectedCategory(null);
    setShowAddModal(true);
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
                <h1 className="text-2xl font-bold text-gray-900">Service Categories</h1>
                <p className="text-gray-600 mt-1">Manage service categories</p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Category
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 text-lg">Error loading categories</div>
            <p className="text-gray-600 mt-2">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category: any, index: number) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">
                      {categoryIcons[category.icon] || <span className="text-gray-400">📁</span>}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                        category.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit category"
                    >
                      <FaEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                      title="Delete category"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mt-3 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-4">ID: {category._id}</span>
                    <span>Created: {new Date(category.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedCategory ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedCategory(null);
                  resetForm();
                }}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter category name"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
                  Icon Identifier *
                </label>
                <select
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.icon ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select an icon</option>
                  <option value="electrical-services">⚡ Electrical</option>
                  <option value="plumbing">🔧 Plumbing</option>
                  <option value="kitchen">🍳 Kitchen</option>
                  <option value="clean-hands">🧹 Cleaning</option>
                  <option value="domain">🏠 Construction</option>
                  <option value="home-repair-service">🔨 Renovation</option>
                  <option value="carpenter">🛠️ Carpenter</option>
                  <option value="ac-unit">❄️ AC Services</option>
                  <option value="local-shipping">🚚 Shifting</option>
                  <option value="inventory">📦 Packers</option>
                </select>
                {formErrors.icon && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.icon}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    formErrors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe the category"
                />
                {formErrors.description && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.description}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active category
                </label>
              </div>

              {formErrors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{formErrors.submit}</p>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setSelectedCategory(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <FaSave className="mr-2 h-4 w-4" />
                  {selectedCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
