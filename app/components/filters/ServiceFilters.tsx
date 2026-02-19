"use client";

import React from 'react';
import type { ServiceFilters } from '../../types';

interface ServiceFiltersProps {
  filters: ServiceFilters;
  onChange: (filters: ServiceFilters) => void;
  categories: string[];
}

export default function ServiceFilters({ 
  filters, 
  onChange, 
  categories 
}: ServiceFiltersProps) {
  const handleCategoryChange = (category: string) => {
    onChange({
      ...filters,
      category: category === 'All' ? undefined : category
    });
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    onChange({
      ...filters,
      [type]: value
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

      {/* Min Price Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Min Price: ${filters.minPrice?.toLocaleString() || '0'}
        </label>
        <input
          type="range"
          min="0"
          max="1000000"
          step="10000"
          value={filters.minPrice || 0}
          onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Max Price Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Max Price: ${filters.maxPrice?.toLocaleString() || '1,000,000'}
        </label>
        <input
          type="range"
          min="0"
          max="1000000"
          step="10000"
          value={filters.maxPrice || 1000000}
          onChange={(e) => handlePriceRangeChange('max', parseInt(e.target.value))}
          className="w-full"
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
