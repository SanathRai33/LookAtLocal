import React, { useState, useEffect } from 'react';
import {
  Users,
  ClipboardList,
  AlertTriangle,
  Flag,
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingBag,
  Briefcase,
  Building,
  Wrench,
  Loader2
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
  Area
} from 'recharts';

const AdminDashboard = () => {
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

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.users?.total || 0,
      icon: Users,
      color: 'bg-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      text: 'text-blue-600 dark:text-blue-400',
      change: '+12.5%',
      changeType: 'up'
    },
    {
      title: 'Active Listings',
      value: (stats?.services?.active || 0) + (stats?.rentals?.active || 0) + (stats?.products?.active || 0) + (stats?.spaces?.active || 0) + (stats?.jobs?.active || 0),
      icon: Package,
      color: 'bg-emerald-500',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      text: 'text-emerald-600 dark:text-emerald-400',
      change: '+8.2%',
      changeType: 'up'
    },
    {
      title: 'Pending Approvals',
      value: (stats?.services?.pending || 0) + (stats?.rentals?.pending || 0) + (stats?.products?.pending || 0) + (stats?.spaces?.pending || 0) + (stats?.jobs?.pending || 0),
      icon: ClipboardList,
      color: 'bg-yellow-500',
      bg: 'bg-yellow-50 dark:bg-yellow-950/20',
      text: 'text-yellow-600 dark:text-yellow-400',
      change: '+3.1%',
      changeType: 'up'
    },
    {
      title: 'Open Reports',
      value: stats?.reports?.open || 0,
      icon: Flag,
      color: 'bg-red-500',
      bg: 'bg-red-50 dark:bg-red-950/20',
      text: 'text-red-600 dark:text-red-400',
      change: '-2.4%',
      changeType: 'down'
    },
  ];

  const categoryData = [
    { name: 'Services', value: stats?.services?.active || 0, color: '#3b82f6' },
    { name: 'Buy & Sell', value: stats?.products?.active || 0, color: '#8b5cf6' },
    { name: 'Rentals', value: stats?.rentals?.active || 0, color: '#10b981' },
    { name: 'Spaces', value: stats?.spaces?.active || 0, color: '#f59e0b' },
    { name: 'Jobs', value: stats?.jobs?.active || 0, color: '#ef4444' },
  ];

  const monthlyData = [
    { month: 'Jan', users: 1200, listings: 450, active: 320 },
    { month: 'Feb', users: 1450, listings: 520, active: 380 },
    { month: 'Mar', users: 1680, listings: 580, active: 410 },
    { month: 'Apr', users: 1900, listings: 650, active: 450 },
    { month: 'May', users: 2100, listings: 720, active: 490 },
    { month: 'Jun', users: 2350, listings: 790, active: 530 },
    { month: 'Jul', users: 2550, listings: 850, active: 570 },
  ];

  const listingDistribution = [
    { name: 'Services', value: stats?.services?.active || 0, percentage: '34%' },
    { name: 'Buy & Sell', value: stats?.products?.active || 0, percentage: '28%' },
    { name: 'Rentals', value: stats?.rentals?.active || 0, percentage: '18%' },
    { name: 'Spaces', value: stats?.spaces?.active || 0, percentage: '12%' },
    { name: 'Jobs', value: stats?.jobs?.active || 0, percentage: '8%' },
  ];

  const totalListings = listingDistribution.reduce((sum, item) => sum + item.value, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Overview</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Dashboard overview of your platform</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="p-5 bg-white rounded-2xl shadow-sm dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.text}`} />
                </div>
                <span className={`text-xs font-medium ${stat.changeType === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'} flex items-center gap-1`}>
                  {stat.changeType === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
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
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Growth Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
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
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="listings" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="active" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Category Distribution</h3>
          <div className="flex items-center justify-center h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
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
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-slate-800 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Listing Distribution</h3>
          <div className="space-y-3">
            {listingDistribution.map((item) => {
              const percentage = totalListings > 0 ? (item.value / totalListings) * 100 : 0;
              return (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{item.percentage}</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-slate-700">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: categoryData.find(c => c.name === item.name)?.color || '#3b82f6'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 bg-white rounded-2xl shadow-sm dark:bg-slate-800">
          <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/50">
                  <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Bookings</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{stats?.bookings?.total || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-950/50">
                  <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Pending Bookings</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{stats?.bookings?.pending || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950/50">
                  <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Completed Bookings</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{stats?.bookings?.completed || 0}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-950/50">
                  <Flag className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Blocked Users</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{stats?.users?.blocked || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;