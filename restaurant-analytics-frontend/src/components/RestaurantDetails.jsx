import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import LoadingSpinner from './LoadingSpinner';
import ChartContainer from './ChartContainer';
import EmptyState from './EmptyState';

const API_BASE_URL = 'http://localhost:8000/api/v1';

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [orderTrends, setOrderTrends] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start_date: format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    end_date: format(new Date(), 'yyyy-MM-dd')
  });
  const [filters, setFilters] = useState({
    min_amount: '',
    max_amount: '',
    start_hour: '',
    end_hour: ''
  });

  useEffect(() => {
    fetchRestaurantData();
  }, [id]);

  useEffect(() => {
    if (restaurant) {
      fetchOrderTrends();
      fetchFilteredOrders();
    }
  }, [restaurant, dateRange, filters]);

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurants`);
      const foundRestaurant = response.data.data.find(r => r.id == id);
      setRestaurant(foundRestaurant);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      setLoading(false);
    }
  };

  const fetchOrderTrends = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/order-trends`, {
        params: dateRange
      });
      setOrderTrends(response.data.daily_data);
    } catch (error) {
      console.error('Error fetching order trends:', error);
    }
  };

  const fetchFilteredOrders = async () => {
    try {
      const params = {
        restaurant_id: id,
        ...dateRange,
        ...filters
      };
      
      // Remove empty filter values
      Object.keys(params).forEach(key => {
        if (params[key] === '') {
          delete params[key];
        }
      });

      const response = await axios.get(`${API_BASE_URL}/filtered-orders`, { params });
      setFilteredOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching filtered orders:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner 
          size="large" 
          text="Loading restaurant data..." 
          variant="primary" 
        />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
          <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div className="text-xl font-semibold text-red-800 mb-4">Restaurant not found</div>
          <p className="text-red-600 mb-6">The restaurant you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  // Mock data for demonstration (remove in production)
  const mockMetrics = [
    { label: 'Total Orders', value: '1,247', change: '+12%', trend: 'up', icon: '📊' },
    { label: 'Revenue', value: '₹2.4M', change: '+8%', trend: 'up', icon: '💰' },
    { label: 'Avg. Order Value', value: '₹1,920', change: '+5%', trend: 'up', icon: '📈' },
    { label: 'Peak Hours', value: '12-2 PM', change: 'Lunch Rush', trend: 'stable', icon: '⏰' }
  ];

  const getTrendColor = (trend) => {
    const colors = {
      up: 'text-green-600',
      down: 'text-red-600',
      stable: 'text-blue-600'
    };
    return colors[trend] || 'text-gray-600';
  };

  const getTrendIcon = (trend) => {
    const icons = {
      up: '↗',
      down: '↘',
      stable: '→'
    };
    return icons[trend] || '→';
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl transition-all duration-300 group-hover:from-blue-100 group-hover:to-indigo-100"></div>
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-6">
              {/* Restaurant Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {restaurant.name.charAt(0).toUpperCase()}
              </div>
              
              {/* Restaurant Info */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{restaurant.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z" />
                    </svg>
                    <span className="font-medium">{restaurant.cuisine}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Back Button */}
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric, index) => (
          <div key={index} className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl transition-all duration-300 group-hover:from-gray-100 group-hover:to-gray-200"></div>
            <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{metric.icon}</div>
                <div className={`text-sm font-medium ${getTrendColor(metric.trend)}`}>
                  <span className="mr-1">{getTrendIcon(metric.trend)}</span>
                  {metric.change}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Date Range Selector */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl transition-all duration-300 group-hover:from-green-100 group-hover:to-emerald-100"></div>
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">📅 Date Range Selection</h2>
              <p className="text-gray-600">Choose the time period for your analytics</p>
            </div>
            
            <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-semibold text-gray-700">From</span>
                <input
                  type="date"
                  value={dateRange.start_date}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start_date: e.target.value }))}
                  className="border-0 bg-transparent text-sm text-gray-600 focus:ring-0 focus:outline-none font-medium"
                />
              </div>
              <span className="text-gray-400 text-lg">→</span>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-semibold text-gray-700">To</span>
                <input
                  type="date"
                  value={dateRange.end_date}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end_date: e.target.value }))}
                  className="border-0 bg-transparent text-sm text-gray-600 focus:ring-0 focus:outline-none font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Trends Charts */}
      {orderTrends.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Daily Orders Count */}
          <ChartContainer 
            title="Daily Orders Count"
            subtitle="Track order volume over time"
            icon="📊"
            color="blue"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={orderTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="orders_count" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fill="url(#ordersGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Daily Revenue */}
          <ChartContainer 
            title="Daily Revenue"
            subtitle="Monitor revenue performance"
            icon="💰"
            color="green"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`₹${value}`, 'Revenue']}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="url(#revenueGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Average Order Value */}
          <ChartContainer 
            title="Average Order Value"
            subtitle="Track customer spending patterns"
            icon="📈"
            color="yellow"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={orderTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`₹${value}`, 'Avg. Order Value']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="average_order_value" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>

          {/* Peak Order Hour */}
          <ChartContainer 
            title="Peak Order Hours"
            subtitle="Identify busiest time periods"
            icon="⏰"
            color="purple"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={orderTrends} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value}:00`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`${value}:00`, 'Peak Hour']}
                  />
                  <Bar 
                    dataKey="peak_hour" 
                    fill="url(#peakHourGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="peakHourGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.9}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        </div>
      )}

      {/* Enhanced Filters */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl transition-all duration-300 group-hover:from-orange-100 group-hover:to-red-100"></div>
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">🔍</span>
            Advanced Order Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                💰 Minimum Amount (₹)
              </label>
              <input
                type="number"
                placeholder="0"
                value={filters.min_amount}
                onChange={(e) => handleFilterChange('min_amount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                💰 Maximum Amount (₹)
              </label>
              <input
                type="number"
                placeholder="1000"
                value={filters.max_amount}
                onChange={(e) => handleFilterChange('max_amount', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🌅 Start Hour
              </label>
              <input
                type="number"
                min="0"
                max="23"
                placeholder="0"
                value={filters.start_hour}
                onChange={(e) => handleFilterChange('start_hour', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                🌙 End Hour
              </label>
              <input
                type="number"
                min="0"
                max="23"
                placeholder="23"
                value={filters.end_hour}
                onChange={(e) => handleFilterChange('end_hour', e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filtered Orders Table */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl transition-all duration-300 group-hover:from-slate-100 group-hover:to-gray-100"></div>
        <div className="relative bg-white rounded-3xl shadow-sm border border-gray-200 p-8 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center mr-3">📋</span>
            Filtered Orders
          </h2>
          
          {filteredOrders.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Amount (₹)
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-blue-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
                            #{order.id}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                          ₹{order.order_amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {format(new Date(order.order_time), 'MMM dd, yyyy HH:mm')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              icon="📋"
              title="No orders found"
              description="Try adjusting your filter criteria or date range"
              size="default"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
