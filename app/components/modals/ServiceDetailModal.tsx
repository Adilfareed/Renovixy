"use client";

import React from 'react';
import type { Service } from '../../types';
import ImageCarousel from '../ImageCarousel';
import { 
  DollarSign, Clock, ArrowRight, CheckCircle
} from 'lucide-react';

interface ServiceDetailModalProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceDetailModal({ 
  service, 
  onClose 
}: ServiceDetailModalProps) {
  const handleGetQuote = () => {
    // Navigate to quote page or open quote modal
    window.location.href = '/quote';
  };

  return (
    <div className="p-6">
      {/* Image Carousel */}
      {service.images && service.images.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Gallery</h3>
          <ImageCarousel 
            images={service.images.map(img => img.url)}
            alt={service.title}
            showThumbnails={true}
            showFullscreen={true}
            className="rounded-lg"
          />
        </div>
      )}

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Description</h3>
        <p className="text-gray-600 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Features */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">What's Included</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="text-center">
        <button
          onClick={handleGetQuote}
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <span>Get Quote for This Service</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
