import React from 'react';

const EmptyState = ({ 
  icon = '📊',
  title = 'No data available',
  description = 'There\'s nothing to display at the moment.',
  action = null,
  size = 'default'
}) => {
  const sizeClasses = {
    small: 'py-8',
    default: 'py-12',
    large: 'py-16'
  };

  const iconSizes = {
    small: 'w-12 h-12',
    default: 'w-16 h-16',
    large: 'w-20 h-20'
  };

  const textSizes = {
    small: 'text-base',
    default: 'text-lg',
    large: 'text-xl'
  };

  return (
    <div className={`text-center ${sizeClasses[size]}`}>
      {/* Icon */}
      <div className={`${iconSizes[size]} mx-auto mb-4 text-gray-300 flex items-center justify-center`}>
        <span className="text-4xl">{icon}</span>
      </div>
      
      {/* Content */}
      <div className="max-w-md mx-auto">
        <h3 className={`${textSizes[size]} font-semibold text-gray-500 mb-2`}>
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-6">
          {description}
        </p>
        
        {/* Action Button */}
        {action && (
          <div className="flex justify-center">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyState;

