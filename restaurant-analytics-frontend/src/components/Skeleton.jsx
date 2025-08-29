import React from 'react';

const Skeleton = ({ 
  type = 'text', 
  className = '', 
  lines = 1,
  height = 'h-4',
  width = 'w-full'
}) => {
  if (type === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${height} ${width} bg-slate-200 rounded animate-pulse`}
          />
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className={`bg-white rounded-xl p-6 border border-slate-200 ${className}`}>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-slate-200 rounded animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={`bg-white rounded-xl border border-slate-200 overflow-hidden ${className}`}>
        <div className="p-6">
          <div className="space-y-4">
            <div className="h-5 bg-slate-200 rounded w-1/3 animate-pulse" />
            <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
        <div className="border-t border-slate-200">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="p-4 border-b border-slate-100 last:border-b-0">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 rounded animate-pulse" />
                  <div className="h-3 bg-slate-200 rounded w-2/3 animate-pulse" />
                </div>
                <div className="h-4 bg-slate-200 rounded w-20 animate-pulse" />
                <div className="h-8 bg-slate-200 rounded w-24 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`${height} ${width} bg-slate-200 rounded animate-pulse ${className}`} />
  );
};

export default Skeleton;
