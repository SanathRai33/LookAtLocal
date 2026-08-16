import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Package,
  DollarSign,
  Activity,
  Loader2,
  Calendar
} from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';

const Analytics = () => {
  const { getDashboardStats, loading } = useAdmin();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const result = await getDashboardStats();
    if (result.success) {
      setStats(result.data);
    }
  };

  const categoryData = [
    { name: 'Services', value: stats?.services?.active || 0, color: '#3b82f6' },
    { name: 'Products', value: stats?.products?.active || 0, color: '#8b5cf6' },
    { name: 'Rentals', value: stats?.rentals?.active || 0, color: '#10b981' },
    { name: 'Spaces', value: stats?.spaces?.active || 0, color: '#f59e0b' },
    { name: 'Jobs', value: stats?.jobs?.active || 0, color: '#ef4444' },
  ];

  const totalActive = categoryData.reduce((sum, item) => sum + item.value, 0);

  const monthlyData = [
    { month: 'Jan', users: 1200, listings: 450, revenue: 12000 },
    { month: 'Feb', users: 1450, listings: 520, revenue: 14500 },
    { month: 'Mar', users: 1680, listings: 580, revenue: 16800 },
    { month: 'Apr', users: 1900, listings: 650, revenue: 19000 },
    { month: 'May', users: 2100, listings: 720, revenue: 21000 },
    { month: 'Jun', users: 2350, listings: 790, revenue: 23500 },
    { month: 'Jul', users: 2550, listings: 850, revenue: 25500 },
  ];

  const statsCards = [
    {
      title: 'Total Users',
      value: stats?.users?.total || 0,
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-950/20'
    },
    {
      title: 'Active Listings',
      value: totalActive,
      change: '+8.2%',
      icon: Package,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20'
    },
    {
      title: 'Total Bookings',
      value: stats?.bookings?.total || 0,
      change: '+15.3%',
      icon: Calendar,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-950/20'
    },
    {
      title: 'Revenue',
      value: '₹' + (totalActive * 250).toLocaleString(),
      change: '+22.1%',
      icon: DollarSign,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-950/20'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Platform analytics and insights</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="p-5 bg-white rounded-2xl shadow-sm dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Growth Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Area type="monotone" dataKey="users" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.2} />
                <Bar dataKey="listings" barSize={20} fill="#8b5cf6" />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Category Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 p-5 bg-white rounded-2xl shadow-sm dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">User Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Top Cities</h3>
          <div className="space-y-3">
            {[
              { name: 'Mumbai', value: '82,400', growth: '+14%' },
              { name: 'Bengaluru', value: '61,200', growth: '+19%' },
              { name: 'Pune', value: '38,800', growth: '+11%' },
              { name: 'Hyderabad', value: '27,400', growth: '+23%' },
              { name: 'Chennai', value: '18,600', growth: '+9%' },
            ].map((city, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{city.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{city.value}</span>
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{city.growth}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Total Active Users</span>
              <span className="font-semibold text-gray-900 dark:text-white">{stats?.users?.active || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;