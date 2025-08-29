import React from 'react';

const LoadingSpinner = ({ size = 'default', text = 'Loading...', variant = 'primary' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    default: 'w-16 h-16',
    large: 'w-24 h-24'
  };

  const variantClasses = {
    primary: 'border-blue-600',
    secondary: 'border-gray-600',
    success: 'border-green-600',
    warning: 'border-yellow-600',
    danger: 'border-red-600'
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-xl',
    large: 'text-2xl'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {/* Animated Spinner */}
      <div className="relative mb-6">
        {/* Outer Ring */}
        <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-spin`}>
          <div className={`absolute inset-0 ${sizeClasses[size]} border-4 ${variantClasses[variant]} rounded-full border-t-transparent animate-spin`}></div>
        </div>
        
        {/* Inner Pulse */}
        <div className={`absolute inset-2 ${sizeClasses[size]} bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-20 animate-pulse`}></div>
        
        {/* Center Dot */}
        <div className={`absolute inset-4 ${sizeClasses[size]} bg-white rounded-full shadow-lg`}></div>
      </div>
      
      {/* Loading Text */}
      <div className="text-center">
        <p className={`${textSizes[size]} font-medium text-gray-600 mb-2`}>
          {text}
        </p>
        
        {/* Animated Dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

