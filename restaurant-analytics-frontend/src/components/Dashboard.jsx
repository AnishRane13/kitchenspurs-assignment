import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatsCard from './StatsCard';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const API_BASE_URL = 'http://localhost:8000/api/v1';

function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dateRange, setDateRange] = useState({
    start_date: format(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'),
    end_date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    fetchRestaurants();
    fetchTopRestaurants();
  }, [searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    fetchTopRestaurants();
  }, [dateRange]);

  const fetchRestaurants = async () => {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        sort_by: sortBy,
        sort_order: sortOrder
      });
      
      const response = await axios.get(`${API_BASE_URL}/restaurants?${params}`);
      setRestaurants(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setLoading(false);
    }
  };

  const fetchTopRestaurants = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/top-restaurants`, {
        params: dateRange
      });
      setTopRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching top restaurants:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner 
          size="large" 
          text="Loading your analytics..." 
          variant="primary" 
        />
      </div>
    );
  }

  // Mock data for demonstration
  const mockStats = [
    { label: 'Total Restaurants', value: restaurants.length, change: '+5%', trend: 'up', color: 'blue' },
    { label: 'Active Orders', value: '1,247', change: '+12%', trend: 'up', color: 'green' },
    { label: 'Total Revenue', value: '₹2.4M', change: '+8%', trend: 'up', color: 'purple' },
    { label: 'Average Rating', value: '4.2', change: '+2%', trend: 'up', color: 'orange' }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Analytics Dashboard
        </h2>
        <p className="text-lg text-slate-600">
          Get real-time insights into your restaurant performance and track key metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            color={stat.color}
            icon={index === 0 ? '🏪' : index === 1 ? '📦' : index === 2 ? '💰' : '⭐'}
          />
        ))}
      </div>

      {/* Top Restaurants Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Top Performing Restaurants</h3>
            <p className="text-gray-600 text-sm">Revenue performance over the selected time period</p>
          </div>
          
          {/* Date Range Selector */}
          <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={dateRange.start_date}
              onChange={(e) => setDateRange(prev => ({ ...prev, start_date: e.target.value }))}
              className="border-0 bg-transparent text-sm text-gray-700 focus:ring-0 focus:outline-none"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={dateRange.end_date}
              onChange={(e) => setDateRange(prev => ({ ...prev, end_date: e.target.value }))}
              className="border-0 bg-transparent text-sm text-gray-700 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>
        
        {topRestaurants.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topRestaurants} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
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
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [`₹${value}`, 'Revenue']}
                />
                <Bar 
                  dataKey="total_revenue" 
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center">
            <EmptyState
              title="No data available"
              description="Select a different date range to view analytics"
            />
          </div>
        )}
      </div>

      {/* Restaurants List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">Restaurant Directory</h3>
            <p className="text-gray-600 text-sm">Browse and analyze all your restaurant locations</p>
          </div>
          
          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            {/* Search Bar */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all w-64"
              />
            </div>
            
            {/* Sort Controls */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-sm"
              >
                <option value="name">Sort by Name</option>
                <option value="location">Sort by Location</option>
                <option value="cuisine">Sort by Cuisine</option>
              </select>
              <button
                onClick={() => handleSort(sortBy)}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Restaurant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cuisine
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm mr-3">
                        {restaurant.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                        <div className="text-xs text-gray-500">ID: {restaurant.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {restaurant.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {restaurant.cuisine}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={`/restaurant/${restaurant.id}`}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {restaurants.length === 0 && (
          <div className="mt-8">
            <EmptyState
              title="No restaurants found"
              description="Try adjusting your search criteria"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;