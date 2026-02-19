"use client";

import React from 'react';
import type { ProjectFilters as ProjectFiltersType, Project } from '../../types';

interface ProjectFiltersProps {
  filters: ProjectFiltersType;
  onChange: (filters: ProjectFiltersType) => void;
  categories: string[];
  statuses: Project['status'][];
}

export default function ProjectFilters({ 
  filters, 
  onChange, 
  categories,
  statuses 
}: ProjectFiltersProps) {
  const handleCategoryChange = (category: string) => {
    onChange({
      ...filters,
      category: category === 'All' ? undefined : category
    });
  };

  const handleStatusChange = (status: string) => {
    onChange({
      ...filters,
      status: status === 'All' ? undefined : status as Project['status']
    });
  };

  const handleClientChange = (client: string) => {
    onChange({
      ...filters,
      client: client.trim() || undefined
    });
  };

  const handleFeaturedChange = (featured: boolean) => {
    onChange({
      ...filters,
      featured: featured || undefined
    });
  };

  const clearFilters = () => {
    onChange({});
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category || 'All'}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={filters.status || 'All'}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="All">All Statuses</option>
          {statuses.map(status => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Client Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Client
        </label>
        <input
          type="text"
          placeholder="Search by client..."
          value={filters.client || ''}
          onChange={(e) => handleClientChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Featured Filter & Clear */}
      <div className="flex flex-col justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="featured"
            checked={!!filters.featured}
            onChange={(e) => handleFeaturedChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
            Featured Only
          </label>
        </div>
        
        <button
          onClick={clearFilters}
          className="mt-2 px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}
