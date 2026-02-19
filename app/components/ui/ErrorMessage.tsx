"use client";

import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export default function ErrorMessage({ 
  message, 
  onRetry, 
  retryText = "Try Again", 
  className = "" 
}: ErrorMessageProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="flex items-center justify-center mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <p className="text-red-600 text-lg mb-4">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          {retryText}
        </button>
      )}
    </div>
  );
}
