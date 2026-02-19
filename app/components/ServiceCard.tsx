"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../types';
import type { ServiceCardProps } from '../types/components';
import { 
  Home, Building, Bath, HardHat, PaintBucket, Trees, 
  Wrench, Ruler, Tractor, Hammer, DollarSign, Clock, 
  Star, ArrowRight
} from 'lucide-react';
import Image from 'next/image';

// Icon mapping
const iconMap = {
  Home, Building, Bath, HardHat, PaintBucket, Trees,
  Wrench, Ruler, Tractor, Hammer
};

export default function ServiceCard({ service, onClick, index }: ServiceCardProps) {
  const Icon = iconMap[service.category.icon as keyof typeof iconMap] || Home;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform cursor-pointer overflow-hidden group"
      onClick={onClick}
    >
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={service.images?.[0]?.url || '/placeholder-service.jpg'}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder-service.jpg';
          }}
        />
        
        {/* Overlay with Icon */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
          <div className="p-3 rounded-full bg-white/90">
            <Icon className="w-6 h-6" />
          </div>
        </div>

        {/* Popular Badge */}
        {service.popular && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-renovixy-orange-500 text-white text-sm rounded-full flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" />
              Popular
            </span>
          </div>
        )}
      </div>

      {/* Service Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{service.title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
          {service.description}
        </p>
        
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-3 py-1 bg-renovixy-blue-100 text-renovixy-blue-800 text-xs rounded-full">
            {service.category.name}
          </span>
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
