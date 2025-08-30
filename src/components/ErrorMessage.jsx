import React from 'react';
import { AlertCircle, X } from 'lucide-react';

// Error message component with optional close functionality
export function ErrorMessage({ message, onClose }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 animate-in slide-in-from-top-2 duration-300">
      <div className="flex items-start">
        <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-3 flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}