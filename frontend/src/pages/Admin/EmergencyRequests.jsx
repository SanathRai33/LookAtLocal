import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  RefreshCw,
  Phone,
  MapPin,
  User,
  Calendar
} from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

const EmergencyRequests = () => {
  const { getReports, loading } = useAdmin();
  const [emergencies, setEmergencies] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    fetchEmergencies();
  }, [pagination.page, filterStatus]);

  const fetchEmergencies = async () => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      entityType: 'EMERGENCY',
      ...(search && { search }),
      ...(filterStatus && { status: filterStatus }),
    };
    const result = await getReports(params);
    if (result.success) {
      setEmergencies(result.data || []);
      setPagination(result.meta || { page: 1, limit: 10, total: 0, totalPages: 0 });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchEmergencies();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status) => {
    const styles = {
      OPEN: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      REVIEWING: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      RESOLVED: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      DISMISSED: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.OPEN}`}>
        {status}
      </span>
    );
  };

  if (loading && emergencies.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading emergency requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Emergency Requests</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage emergency requests reported by users</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search emergency requests..."
              className="w-full h-10 pl-9 pr-3 text-sm border border-gray-200 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </form>

        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="h-10 px-3 text-sm border border-gray-200 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="RESOLVED">Resolved</option>
            <option value="DISMISSED">Dismissed</option>
          </select>
          <button
            onClick={fetchEmergencies}
            className="flex items-center gap-2 px-4 h-10 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm dark:bg-slate-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Request</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Reporter</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Reason</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Reported</th>
              <th className="px-4 py-3 text-xs font-medium text-right text-gray-500 uppercase dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {emergencies.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                      {item.description || 'Emergency request'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {item.reporter?.fullName || 'Unknown'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    {item.reason}
                  </span>
                </td>
                <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(item.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => window.location.href = `/admin/reports/${item.id}`}
                    className="p-1.5 text-blue-600 rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {emergencies.length} of {pagination.total} requests
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyRequests;