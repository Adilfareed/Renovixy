"use client";

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGetProjects, useFilterProjects } from '../../data/hooks';
import type { Project, ProjectFilters } from '../../types';

// UI Components
import SearchBar from '../../components/ui/SearchBar';
import FilterPanel from '../../components/ui/FilterPanel';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import Modal from '../../components/ui/Modal';

// Feature Components
import ProjectCard from '../../components/ProjectCard';
import ProjectFiltersComponent from '../../components/filters/ProjectFilters';
import ProjectDetailModal from '../../components/modals/ProjectDetailModal';

// Constants
const CATEGORIES = ['All', 'Commercial', 'Residential', 'Multi-Family', 'Remodeling', 'Restoration', 'Outdoor', 'Healthcare'];
const STATUSES: Project['status'][] = ['completed', 'ongoing', 'planned'];

// Main Projects Page Component
export default function ProjectsPage() {
  // Custom hook for projects data
  const { projects, isLoading, error } = useGetProjects();
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ProjectFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Apply filters and search
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(project => project.status === filters.status);
    }

    // Apply featured filter
    if (filters.featured) {
      filtered = filtered.filter(project => project.featured);
    }

    return filtered;
  }, [projects, searchTerm, filters]);

  // Event handlers
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (newFilters: ProjectFilters) => {
    setFilters(newFilters);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleRetry = () => {
    // fetchProjects();
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
          message={`Failed to load projects: ${error?.message || 'Unknown error'}`}
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
        statuses={STATUSES}
      />

      {/* Projects Grid Section */}
      <ProjectsGridSection
        projects={filteredProjects}
        totalProjects={projects.length}
        onProjectClick={handleProjectClick}
      />

      {/* Project Detail Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        title={selectedProject?.title}
        size="xl"
      >
        {selectedProject && (
          <ProjectDetailModal 
            project={selectedProject}
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
            Our <span className="renovixy-gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of completed construction projects and see how we've transformed spaces into remarkable places
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
  filters: ProjectFilters;
  onFilterChange: (filters: ProjectFilters) => void;
  categories: string[];
  statuses: Project['status'][];
}

function SearchAndFiltersSection({
  searchTerm,
  onSearch,
  showFilters,
  onToggleFilters,
  filters,
  onFilterChange,
  categories,
  statuses
}: SearchAndFiltersSectionProps) {
  return (
    <section className="py-8 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={onSearch}
              placeholder="Search projects..."
            />
          </div>

          <FilterPanel
            isOpen={showFilters}
            onToggle={onToggleFilters}
          >
            <ProjectFiltersComponent
              filters={filters}
              onChange={onFilterChange}
              categories={categories}
              statuses={statuses}
            />
          </FilterPanel>
        </div>
      </div>
    </section>
  );
}

// Projects Grid Section Component
interface ProjectsGridSectionProps {
  projects: Project[];
  totalProjects: number;
  onProjectClick: (project: Project) => void;
}

function ProjectsGridSection({
  projects,
  totalProjects,
  onProjectClick
}: ProjectsGridSectionProps) {
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
            Showing {projects.length} of {totalProjects} projects
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project._id}
                project={project}
                onClick={() => onProjectClick(project)}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
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
