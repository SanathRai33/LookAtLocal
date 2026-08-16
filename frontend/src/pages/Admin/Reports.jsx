import React, { useState, useEffect } from 'react';
import {
  Flag,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  RefreshCw,
  Eye,
  AlertCircle,
  User,
  FileText,
  MessageSquare
} from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

const Reports = () => {
  const { getReports, reviewReport, resolveReport, dismissReport, loading } = useAdmin();
  const [reports, setReports] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterEntityType, setFilterEntityType] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [resolutionNote, setResolutionNote] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const entityTypes = [
    { value: 'USER', label: 'User' },
    { value: 'SERVICE', label: 'Service' },
    { value: 'RENTAL', label: 'Rental' },
    { value: 'PRODUCT', label: 'Product' },
    { value: 'SPACE', label: 'Space' },
    { value: 'JOB', label: 'Job' },
    { value: 'COMMUNITY', label: 'Community' },
  ];

  useEffect(() => {
    fetchReports();
  }, [pagination.page, filterStatus, filterEntityType]);

  const fetchReports = async () => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      ...(search && { search }),
      ...(filterStatus && { status: filterStatus }),
      ...(filterEntityType && { entityType: filterEntityType }),
    };
    const result = await getReports(params);
    if (result.success) {
      setReports(result.data || []);
      setPagination(result.meta || { page: 1, limit: 10, total: 0, totalPages: 0 });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchReports();
  };

  const handleAction = async (reportId, action) => {
    setActionLoading(true);
    let result;
    if (action === 'review') {
      result = await reviewReport(reportId);
    } else if (action === 'resolve') {
      result = await resolveReport(reportId, { resolutionNote });
    } else if (action === 'dismiss') {
      result = await dismissReport(reportId, { resolutionNote });
    }
    if (result?.success) {
      fetchReports();
      setShowActionModal(false);
      setSelectedReport(null);
      setResolutionNote('');
    }
    setActionLoading(false);
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

  const getEntityTypeLabel = (type) => {
    const found = entityTypes.find(et => et.value === type);
    return found ? found.label : type;
  };

  if (loading && reports.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Spam</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage user reports and spam</p>
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
              placeholder="Search reports..."
              className="w-full h-10 pl-9 pr-3 text-sm border border-gray-200 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </form>

        <div className="flex flex-wrap gap-2">
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
          <select
            value={filterEntityType}
            onChange={(e) => {
              setFilterEntityType(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="h-10 px-3 text-sm border border-gray-200 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Types</option>
            {entityTypes.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          <button
            onClick={fetchReports}
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
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Report</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Reporter</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Type</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Reason</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Reported</th>
              <th className="px-4 py-3 text-xs font-medium text-right text-gray-500 uppercase dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[150px]">
                      {report.description || 'Report'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {report.reporter?.fullName || 'Unknown'}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                    {getEntityTypeLabel(report.entityType)}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    {report.reason}
                  </span>
                </td>
                <td className="px-4 py-3">{getStatusBadge(report.status)}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(report.createdAt)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    {report.status === 'OPEN' && (
                      <button
                        onClick={() => {
                          setSelectedReport(report);
                          setActionType('review');
                          setShowActionModal(true);
                        }}
                        className="p-1.5 text-blue-600 rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                        title="Review"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    {(report.status === 'OPEN' || report.status === 'REVIEWING') && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setActionType('resolve');
                            setShowActionModal(true);
                          }}
                          className="p-1.5 text-emerald-600 rounded-lg hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
                          title="Resolve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setActionType('dismiss');
                            setShowActionModal(true);
                          }}
                          className="p-1.5 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700"
                          title="Dismiss"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {reports.length} of {pagination.total} reports
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

      {showActionModal && selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl dark:bg-slate-900">
            <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-blue-100 dark:bg-blue-950/30">
              {actionType === 'review' ? (
                <Eye className="w-6 h-6 text-blue-600" />
              ) : actionType === 'resolve' ? (
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              ) : (
                <XCircle className="w-6 h-6 text-gray-600" />
              )}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-center text-gray-950 dark:text-white">
              {actionType === 'review' ? 'Review Report' :
               actionType === 'resolve' ? 'Resolve Report' :
               'Dismiss Report'}
            </h3>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              {actionType === 'review' ? 'Mark this report as under review' :
               actionType === 'resolve' ? 'Resolve this report' :
               'Dismiss this report'}
            </p>
            <div className="mt-4">
              <textarea
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder={`Add ${actionType === 'review' ? 'review notes' : 'resolution note'}...`}
                className="w-full h-24 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setSelectedReport(null);
                  setResolutionNote('');
                }}
                className="flex-1 h-12 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAction(selectedReport.id, actionType)}
                disabled={actionLoading}
                className={`flex-1 h-12 text-sm font-medium text-white transition rounded-xl disabled:opacity-50 ${
                  actionType === 'review'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : actionType === 'resolve'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {actionLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;