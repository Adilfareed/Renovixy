"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCreateProject } from '@/app/data/hooks/useProjects';
import { useGetServices } from '@/app/data/hooks/useServices';
import { useAppDispatch, useAppSelector } from '@/app/redux/store/hooks';
import { fetchServiceCategories, type ServiceCategory } from '@/app/redux/features/serviceCategorySlice';
import { FaArrowLeft, FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import type { Project } from '@/app/types';

interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  client: string;
  location: string;
  duration: string;
  completedDate: string;
  status: Project['status'];
  featured: boolean;
  services: string[];
  budgetMin: string;
  budgetMax: string;
  images: File[];
}

export default function AddProjectPage() {
  const router = useRouter();
  const createProjectMutation = useCreateProject();
  const { services: availableServices, isLoading: servicesLoading } = useGetServices();
  const dispatch = useAppDispatch();
  const { categories: serviceCategories, loading: categoriesLoading } = useAppSelector((state: { serviceCategories: { categories: ServiceCategory[], loading: boolean } }) => state.serviceCategories);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    category: '',
    client: '',
    location: '',
    duration: '',
    completedDate: '',
    status: 'planned',
    featured: false,
    services: [],
    budgetMin: '',
    budgetMax: '',
    images: [],
  });

  useEffect(() => {
    dispatch(fetchServiceCategories());
  }, [dispatch]);

  const statuses: Project['status'][] = ['planned', 'ongoing', 'completed'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, images: newImages }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const projectFormData = new FormData();
      
      // Add basic fields
      projectFormData.append('title', formData.title);
      projectFormData.append('description', formData.description);
      projectFormData.append('category', formData.category);
      projectFormData.append('client', formData.client);
      projectFormData.append('location', formData.location);
      projectFormData.append('duration', formData.duration);
      projectFormData.append('dateCompleted', formData.completedDate);
      projectFormData.append('status', formData.status);
      projectFormData.append('featured', formData.featured.toString());
      projectFormData.append('budget.min', formData.budgetMin);
      projectFormData.append('budget.max', formData.budgetMax);
      
      // Add services
      if (formData.services && formData.services.length > 0) {
        projectFormData.append('services', formData.services.join(','));
      }
      
      // Add images
      formData.images.forEach((image, index) => {
        projectFormData.append(`images`, image);
      });

      await createProjectMutation.mutateAsync(projectFormData);
      router.push('/dashboard/projects');
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Link
              href="/dashboard/projects"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <FaArrowLeft className="mr-2" />
              Back to Projects
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Project</h1>
              <p className="text-gray-600 mt-1">Create a new construction project</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project title"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categoriesLoading ? (
                  <option disabled>Loading...</option>
                ) : (
                  serviceCategories
                    .filter(cat => cat.isActive)
                    .map(category => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))
                )}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the project"
              />
            </div>

            {/* Project Details */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h2>
            </div>

            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-2">
                Client Name
              </label>
              <input
                type="text"
                id="client"
                name="client"
                value={formData.client}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter client name"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter project location"
              />
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <input
                type="text"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 6 months"
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="completedDate" className="block text-sm font-medium text-gray-700 mb-2">
                Completion Date
              </label>
              <input
                type="date"
                id="completedDate"
                name="completedDate"
                value={formData.completedDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Budget */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget</h2>
            </div>

            <div>
              <label htmlFor="budgetMin" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Budget
              </label>
              <input
                type="number"
                id="budgetMin"
                name="budgetMin"
                value={formData.budgetMin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter minimum budget"
              />
            </div>

            <div>
              <label htmlFor="budgetMax" className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Budget
              </label>
              <input
                type="number"
                id="budgetMax"
                name="budgetMax"
                value={formData.budgetMax}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter maximum budget"
              />
            </div>

            {/* Services */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Services</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {servicesLoading ? (
                  <div>Loading services...</div>
                ) : (
                  availableServices.map(service => (
                    <label
                      key={service._id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service._id)}
                        onChange={() => handleServiceToggle(service._id)}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{service.title}</span>
                    </label>
                  ))
                )}
              </div>
            </div>

            {/* Additional Options */}
            <div className="md:col-span-2 mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Options</h2>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Feature this project on the website</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
                Project Images
              </label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
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
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t">
            <Link
              href="/dashboard/projects"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <FaSave className="mr-2" />
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
