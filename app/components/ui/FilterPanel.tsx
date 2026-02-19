"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import type { FilterPanelProps } from '../../types/components';

export default function FilterPanel({ 
  isOpen, 
  onToggle, 
  children, 
  title = "Filters" 
}: FilterPanelProps) {
  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
      >
        <Filter className="w-5 h-5" />
        {title}
        {isOpen && <X className="w-4 h-4" />}
      </button>

      {/* Filters Panel */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 p-6 bg-gray-50 rounded-lg"
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
