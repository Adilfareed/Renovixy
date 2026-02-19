"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import type { ProjectCardProps } from '../types/components';
import { 
  MapPin, User, Clock, DollarSign, CheckCircle, 
  AlertCircle, Building, Home, Wrench, ArrowRight
} from 'lucide-react';
import Image from 'next/image';

// Status icon mapping
const statusIcons = {
  completed: CheckCircle,
  ongoing: AlertCircle,
  planned: Clock
};

const statusColors = {
  completed: 'text-green-600 bg-green-100',
  ongoing: 'text-renovixy-orange-600 bg-renovixy-orange-100',
  planned: 'text-renovixy-blue-600 bg-renovixy-blue-100'
};

// Category icon mapping
const categoryIcons = {
  'Commercial': Building,
  'Residential': Home,
  'Multi-Family': Building,
  'Remodeling': Wrench,
  'Industrial': Building
};


export default function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const StatusIcon = statusIcons[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.images?.[0]?.url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkE0IiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K'}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUI5QkE0IiBmb250LXNpemU9IjE2IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4K';
          }}
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${statusColors[project.status]}`}>
            <StatusIcon className="w-4 h-4" />
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-renovixy-orange-500 text-white text-sm rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title and Category */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{project.title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Services Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.services.slice(0, 2).map((service, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              {service.title}
            </span>
          ))}
          {project.services.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
              +{project.services.length - 2} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button className="w-full flex items-center justify-center gap-2 py-2 bg-renovixy-blue-600 text-white rounded-lg hover:bg-renovixy-blue-700 transition-colors duration-200 group-hover:bg-renovixy-blue-700 renovixy-shadow">
          <span className="text-sm font-medium">View Details</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
