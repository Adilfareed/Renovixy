"use client";

import React, { useState, useMemo, useEffect } from "react";
import * as Icons from "lucide-react";
import { FiSearch, FiX } from "react-icons/fi";

interface IconPickerProps {
  value?: string;
  onChange: (iconName: string) => void;
  placeholder?: string;
  className?: string;
}

// Debounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};



const IconPicker: React.FC<IconPickerProps> = ({
  value = "",
  onChange,
  placeholder = "Select an icon...",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Get all available icon names (excluding utility functions and Icon suffix versions)
  const allIconNames = useMemo(() => {
    const exports = Object.keys(Icons);
    console.log('Total exports from lucide-react:', exports.length);
    console.log('Sample exports:', exports.slice(0, 20));
    return exports;
  }, []);

  // Filter icons based on debounced search term
  const filteredIcons = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return allIconNames.slice(0, 300);

    console.log('Searching for:', debouncedSearchTerm);
    console.log('Total icons available:', allIconNames.length);

    const searchTerms = debouncedSearchTerm.toLowerCase().split(' ').filter(term => term.length > 0);
    console.log('Search terms:', searchTerms);
    
    const filtered = allIconNames.filter(iconName => {
      const iconLower = iconName.toLowerCase();
      const matches = searchTerms.some(term => iconLower.includes(term));
      return matches;
    });

    console.log('Icons found:', filtered.length);
    console.log('Sample found icons:', filtered.slice(0, 10));

    return filtered.slice(0, 500);
  }, [allIconNames, debouncedSearchTerm]);

  const handleSelectIcon = (iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClearIcon = () => {
    onChange("");
  };

  const getSelectedIconComponent = () => {
    if (!value || !Icons[value as keyof typeof Icons]) return null;
    const IconComponent = Icons[value as keyof typeof Icons] as React.ComponentType<any>;
    return IconComponent;
  };

  const SelectedIcon = getSelectedIconComponent();

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white flex items-center justify-between hover:border-gray-400"
      >
        <div className="flex items-center">
          {SelectedIcon && (
            <SelectedIcon className="w-4 h-4 mr-2 text-gray-600" />
          )}
          <span className={SelectedIcon ? "text-gray-900" : "text-gray-500"}>
            {SelectedIcon ? value : placeholder}
          </span>
          {/* Show selected icon preview */}
          {SelectedIcon && (
            <div className="ml-2 p-1 bg-blue-100 rounded">
              <SelectedIcon className="w-3 h-3 text-blue-600" />
            </div>
          )}
        </div>
        <div className="flex items-center space-x-1">
          {SelectedIcon && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClearIcon();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-4 h-4" />
            </button>
          )}
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Icon</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              {/* Search Input */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                {searchTerm !== debouncedSearchTerm && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                    Searching...
                  </div>
                )}
              </div>
            </div>

            {/* Icons Grid */}
            <div className="p-4 overflow-y-auto max-h-96">
              {filteredIcons.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No icons found matching "{debouncedSearchTerm}"
                </div>
              ) : (
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-16 gap-2">
                  {filteredIcons.map((iconName: string) => {
                    const IconComponent = Icons[iconName as keyof typeof Icons] as React.ComponentType<any>;
                    const isSelected = iconName === value;

                    return (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => handleSelectIcon(iconName)}
                        className={`p-2 rounded border hover:border-blue-300 transition-colors group ${
                          isSelected
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        title={iconName}
                      >
                        <IconComponent
                          className={`w-4 h-4 mx-auto ${
                            isSelected ? 'text-blue-600' : 'text-gray-600 group-hover:text-gray-800'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Showing {filteredIcons.length} of {allIconNames.length} icons</span>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IconPicker;
