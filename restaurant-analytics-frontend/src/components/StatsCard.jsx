import React from 'react';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend = 'neutral', 
  icon, 
  color = 'blue',
  loading = false 
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600',
    pink: 'from-pink-500 to-pink-600',
    emerald: 'from-emerald-500 to-emerald-600'
  };

  const trendColors = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-blue-600',
    stable: 'text-gray-600'
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    neutral: '→',
    stable: '→'
  };

  if (loading) {
    return (
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transition-all duration-300 group-hover:from-gray-100 group-hover:to-gray-200"></div>
        <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
              <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-32 h-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transition-all duration-300 group-hover:from-gray-100 group-hover:to-gray-200"></div>
      <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
        <div className="flex items-center justify-between mb-4">
          {/* Icon */}
          <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center text-white text-2xl shadow-lg`}>
            {icon}
          </div>
          
          {/* Trend Indicator */}
          {change && (
            <div className={`text-sm font-medium ${trendColors[trend]} flex items-center space-x-1`}>
              <span className="text-lg">{trendIcons[trend]}</span>
              <span>{change}</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        
        {/* Hover Effect Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"></div>
      </div>
    </div>
  );
};

export default StatsCard;

