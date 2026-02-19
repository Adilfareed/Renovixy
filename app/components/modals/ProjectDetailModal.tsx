"use client";

import React from 'react';
import type { Project } from '../../types';
import ImageCarousel from '../ImageCarousel';
import { 
  MapPin, User, Clock, DollarSign, Calendar
} from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailModal({ 
  project
}: ProjectDetailModalProps) {
  const handleGetSimilarQuote = () => {
    // Navigate to quote page with project context
    window.location.href = '/quote';
  };

  return (
    <div className="p-6">
      {/* Image Gallery */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Project Gallery</h3>
        <ImageCarousel 
          images={project.images?.map(img => img.url) || []}
          alt={project.title}
          showThumbnails={true}
          showFullscreen={true}
          autoPlay={false}
          className="rounded-lg"
        />
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Project Overview</h3>
        <p className="text-gray-600 leading-relaxed">{project.description}</p>
      </div>

      {/* Project Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {project.location && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold">Location</h4>
            </div>
            <p className="text-gray-900">{project.location}</p>
          </div>
        )}

        {project.dateCompleted && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold">Completed</h4>
            </div>
            <p className="text-gray-900">
              {new Date(project.dateCompleted).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>

      {/* Services Used */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Services Used</h3>
        <div className="flex flex-wrap gap-2">
          {project.services.map((service:any, index:any) => (
            <span key={index} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={handleGetSimilarQuote}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Get Similar Project Quote
        </button>
      </div>
    </div>
  );
}
