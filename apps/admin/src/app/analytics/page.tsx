'use client';

import { BarChart3, TrendingUp, Users, Eye, Clock, Globe } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Platform performance and user insights</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <Eye className="h-8 w-8 text-blue-600" />
            <span className="text-sm text-green-600 font-semibold">+15.3%</span>
          </div>
          <p className="text-sm text-gray-600">Total Views</p>
          <p className="text-2xl font-bold text-gray-900">2.4M</p>
          <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-purple-600" />
            <span className="text-sm text-green-600 font-semibold">+8.2%</span>
          </div>
          <p className="text-sm text-gray-600">Avg. Watch Time</p>
          <p className="text-2xl font-bold text-gray-900">42m</p>
          <p className="text-xs text-gray-500 mt-1">Per session</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <Users className="h-8 w-8 text-green-600" />
            <span className="text-sm text-green-600 font-semibold">+22.1%</span>
          </div>
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-2xl font-bold text-gray-900">18,432</p>
          <p className="text-xs text-gray-500 mt-1">Daily average</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <Globe className="h-8 w-8 text-orange-600" />
            <span className="text-sm text-green-600 font-semibold">+5.7%</span>
          </div>
          <p className="text-sm text-gray-600">Countries</p>
          <p className="text-2xl font-bold text-gray-900">34</p>
          <p className="text-xs text-gray-500 mt-1">Active regions</p>
        </div>
      </div>

      {/* Top Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-gray-900">Top Performing Content</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { title: 'Black Python', views: '342K', growth: '+18%' },
                { title: 'Lukim Yu', views: '298K', growth: '+12%' },
                { title: 'Wara', views: '276K', growth: '+9%' },
                { title: 'Plesman 2', views: '245K', growth: '+15%' },
                { title: "I'm Moshanty", views: '198K', growth: '+7%' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <span className="text-sm font-bold text-gray-500 w-6">{i + 1}</span>
                    <span className="text-sm font-medium text-gray-900 ml-3">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{item.views} views</span>
                    <span className="text-sm text-green-600 font-semibold">{item.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-bold text-gray-900">Geographic Distribution</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { country: 'Papua New Guinea', users: '12,453', percentage: 42 },
                { country: 'Australia', users: '8,234', percentage: 28 },
                { country: 'New Zealand', users: '4,567', percentage: 15 },
                { country: 'Fiji', users: '2,345', percentage: 8 },
                { country: 'Others', users: '1,892', percentage: 7 },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{item.country}</span>
                    <span className="text-sm text-gray-600">{item.users} users</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trends */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-bold text-gray-900">Revenue Trends</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const heights = [60, 75, 55, 85, 70, 90, 65];
              return (
                <div key={day} className="flex flex-col items-center">
                  <div className="w-full flex items-end justify-center h-32 mb-2">
                    <div
                      className="w-12 bg-red-600 rounded-t"
                      style={{ height: `${heights[i]}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{day}</span>
                  <span className="text-xs font-semibold text-gray-900">${(heights[i] * 10).toFixed(0)}K</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
