import React from 'react';

const ChartContainer = ({ 
  title, 
  subtitle, 
  icon, 
  children, 
  color = 'blue',
  className = '',
  loading = false 
}) => {
  const colorClasses = {
    blue: 'from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100',
    green: 'from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100',
    yellow: 'from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100',
    purple: 'from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100',
    orange: 'from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100',
    slate: 'from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100'
  };

  const iconBgColors = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    purple: 'bg-purple-100',
    orange: 'bg-orange-100',
    slate: 'bg-slate-100'
  };

  if (loading) {
    return (
      <div className={`group relative ${className}`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} rounded-3xl transition-all duration-300`}></div>
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
          <div className="animate-pulse">
            <div className="flex items-center mb-6">
              <div className={`w-8 h-8 ${iconBgColors[color]} rounded-lg mr-3`}></div>
              <div className="space-y-2">
                <div className="w-32 h-6 bg-gray-300 rounded"></div>
                <div className="w-48 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="h-80 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`group relative ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-r ${colorClasses[color]} rounded-3xl transition-all duration-300`}></div>
      <div className="relative bg-white rounded-3xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-center mb-6">
          {icon && (
            <div className={`w-8 h-8 ${iconBgColors[color]} rounded-lg flex items-center justify-center mr-3 text-lg`}>
              {icon}
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            {subtitle && (
              <p className="text-gray-600 text-sm mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Chart Content */}
        <div className="relative">
          {children}
          
          {/* Hover Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;

