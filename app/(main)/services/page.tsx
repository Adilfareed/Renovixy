"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGetServices, useFilterServices } from '../../data/hooks';
import type { Service, ServiceFilters } from '../../types';

// UI Components
import SearchBar from '../../components/ui/SearchBar';
import FilterPanel from '../../components/ui/FilterPanel';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Modal from '../../components/ui/Modal';

// Feature Components
import ServiceCard from '../../components/ServiceCard';
import ServiceFiltersComponent from '../../components/filters/ServiceFilters';
import ServiceDetailModal from '../../components/modals/ServiceDetailModal';

// Constants
const CATEGORIES = ['All', 'Construction', 'Commercial', 'Remodeling', 'Repair', 'Finishing', 'Exterior', 'Systems', 'Design'];

// Main Services Page Component
export default function ServicesPage() {
  // Custom hook for services data
  const { services, isLoading, error } = useGetServices();
  
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ServiceFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Apply filters and search
  const filteredServices = useMemo(() => {
    let filtered = [...services];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(service => service.category.name === filters.category);
    }

    // Apply featured filter
    if (filters.featured) {
      filtered = filtered.filter(service => service.popular);
    }

    return filtered;
  }, [services, searchTerm, filters]);

  // Event handlers
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (newFilters: ServiceFilters) => {
    setFilters(newFilters);
  };

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  const handleRetry = () => {
    // fetchServices();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage 
          message={`Failed to load services: ${error?.message || 'Unknown error'}`}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Search and Filters Section */}
      <SearchAndFiltersSection
        searchTerm={searchTerm}
        onSearch={handleSearch}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        filters={filters}
        onFilterChange={handleFilterChange}
        categories={CATEGORIES}
      />

      {/* Services Grid Section */}
      <ServicesGridSection
        services={filteredServices}
        totalServices={services.length}
        onServiceClick={handleServiceClick}
      />

      {/* Service Detail Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={handleCloseModal}
        title={selectedService?.title}
        size="xl"
      >
        {selectedService && (
          <ServiceDetailModal 
            service={selectedService}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
    </div>
  );
}

// Hero Section Component
function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="renovixy-gradient-text">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive construction and renovation solutions tailored to transform your vision into reality
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Search and Filters Section Component
interface SearchAndFiltersSectionProps {
  searchTerm: string;
  onSearch: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
  filters: ServiceFilters;
  onFilterChange: (filters: ServiceFilters) => void;
  categories: string[];
}

function SearchAndFiltersSection({
  searchTerm,
  onSearch,
  showFilters,
  onToggleFilters,
  filters,
  onFilterChange,
  categories
}: SearchAndFiltersSectionProps) {
  return (
    <section className="py-8 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={onSearch}
              placeholder="Search services..."
            />
          </div>

          <FilterPanel
            isOpen={showFilters}
            onToggle={onToggleFilters}
          >
            <ServiceFiltersComponent
              filters={filters}
              onChange={onFilterChange}
              categories={categories}
            />
          </FilterPanel>
        </div>
      </div>
    </section>
  );
}

// Services Grid Section Component
interface ServicesGridSectionProps {
  services: Service[];
  totalServices: number;
  onServiceClick: (service: Service) => void;
}

function ServicesGridSection({
  services,
  totalServices,
  onServiceClick
}: ServicesGridSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {services.length} of {totalServices} services
          </p>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={service._id}
                service={service}
                onClick={() => onServiceClick(service)}
                index={index}
              />
            ))}
          </motion.div>
        ) : (
          <EmptyState onClearFilters={() => {}} />
        )}
      </div>
    </section>
  );
}

// Empty State Component
interface EmptyStateProps {
  onClearFilters: () => void;
}

function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
      <p className="text-gray-500 mb-4">
        Try adjusting your search or filters to find what you're looking for.
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-2 renovixy-gradient text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Clear Filters
      </button>
    </div>
  );
}
