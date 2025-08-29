import React from 'react';

const LoadingSpinner = ({ size = 'default', text = 'Loading...', variant = 'primary' }) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const variantClasses = {
    primary: 'border-blue-600',
    secondary: 'border-slate-600',
    success: 'border-green-600',
    warning: 'border-yellow-600',
    danger: 'border-red-600'
  };

  const textSizes = {
    small: 'text-sm',
    default: 'text-base',
    large: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      {/* Simple Spinner */}
      <div className={`${sizeClasses[size]} border-2 border-slate-200 rounded-full animate-spin mb-4`}>
        <div className={`w-full h-full border-2 ${variantClasses[variant]} rounded-full border-t-transparent`}></div>
      </div>
      
      {/* Loading Text */}
      <p className={`${textSizes[size]} font-medium text-slate-600 text-center`}>
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;

