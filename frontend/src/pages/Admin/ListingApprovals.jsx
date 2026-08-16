import React, { useState, useEffect } from 'react';
import {
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
  Building,
  Briefcase,
  Package,
  ShoppingBag,
  Wrench
} from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

const ListingApprovals = () => {
  const {
    getPendingServices,
    getPendingRentals,
    getPendingProducts,
    getPendingSpaces,
    getPendingJobs,
    approveService,
    rejectService,
    approveRental,
    rejectRental,
    approveProduct,
    rejectProduct,
    approveSpace,
    rejectSpace,
    approveJob,
    rejectJob,
    loading
  } = useAdmin();

  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [activeTab, setActiveTab] = useState('services');
  const [search, setSearch] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const tabs = [
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'rentals', label: 'Rentals', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'spaces', label: 'Spaces', icon: Building },
    { id: 'jobs', label: 'Jobs', icon: Briefcase },
  ];

  useEffect(() => {
    fetchListings();
  }, [activeTab, pagination.page]);

  const fetchListings = async () => {
    let result;
    switch (activeTab) {
      case 'services':
        result = await getPendingServices({ page: pagination.page, limit: pagination.limit, search });
        break;
      case 'rentals':
        result = await getPendingRentals({ page: pagination.page, limit: pagination.limit, search });
        break;
      case 'products':
        result = await getPendingProducts({ page: pagination.page, limit: pagination.limit, search });
        break;
      case 'spaces':
        result = await getPendingSpaces({ page: pagination.page, limit: pagination.limit, search });
        break;
      case 'jobs':
        result = await getPendingJobs({ page: pagination.page, limit: pagination.limit, search });
        break;
      default:
        return;
    }
    if (result.success) {
      const data = result.data || [];
      setListings(data);
      setPagination(result.meta || { page: 1, limit: 10, total: 0, totalPages: 0 });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchListings();
  };

  const handleApprove = async (id) => {
    setActionLoading(true);
    let result;
    switch (activeTab) {
      case 'services':
        result = await approveService(id);
        break;
      case 'rentals':
        result = await approveRental(id);
        break;
      case 'products':
        result = await approveProduct(id);
        break;
      case 'spaces':
        result = await approveSpace(id);
        break;
      case 'jobs':
        result = await approveJob(id);
        break;
    }
    if (result?.success) {
      fetchListings();
    }
    setActionLoading(false);
  };

  const handleReject = async () => {
    if (!selectedListing) return;
    setActionLoading(true);
    let result;
    const data = { reason: rejectReason || 'Not approved' };
    switch (activeTab) {
      case 'services':
        result = await rejectService(selectedListing.id, data);
        break;
      case 'rentals':
        result = await rejectRental(selectedListing.id, data);
        break;
      case 'products':
        result = await rejectProduct(selectedListing.id, data);
        break;
      case 'spaces':
        result = await rejectSpace(selectedListing.id, data);
        break;
      case 'jobs':
        result = await rejectJob(selectedListing.id, data);
        break;
    }
    if (result?.success) {
      fetchListings();
      setShowReasonModal(false);
      setSelectedListing(null);
      setRejectReason('');
    }
    setActionLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const getCategoryLabel = (item) => {
    switch (activeTab) {
      case 'services': return 'Services';
      case 'rentals': return 'Rentals';
      case 'products': return 'Products';
      case 'spaces': return 'Spaces';
      case 'jobs': return 'Jobs';
      default: return '';
    }
  };

  const getProviderName = (item) => {
    return item?.provider?.fullName || item?.owner?.fullName || item?.seller?.fullName || item?.poster?.fullName || 'Unknown';
  };

  if (loading && listings.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading pending listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Listing Approvals</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {pagination.total || 0} listings pending review
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setPagination(prev => ({ ...prev, page: 1 }));
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search listings..."
              className="w-full h-10 pl-9 pr-3 text-sm border border-gray-200 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </form>
        <button
          onClick={fetchListings}
          className="flex items-center gap-2 px-4 h-10 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      <div className="space-y-4">
        {listings.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl shadow-sm dark:bg-slate-800">
            <div className="mb-4 text-6xl">✅</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">All clear!</h3>
            <p className="text-gray-500 dark:text-gray-400">No pending listings to review.</p>
          </div>
        ) : (
          listings.map((item) => (
            <div key={item.id} className="p-4 bg-white rounded-2xl shadow-sm dark:bg-slate-800">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                      {item.title}
                    </h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {getCategoryLabel()}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>{getProviderName(item)}</span>
                    <span>•</span>
                    <span>{formatDate(item.createdAt)}</span>
                    {item.category && (
                      <>
                        <span>•</span>
                        <span>{item.category.name}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedListing(item);
                      setShowReasonModal(true);
                    }}
                    disabled={actionLoading}
                    className="px-3 py-1.5 text-sm font-medium text-red-600 transition border border-red-200 rounded-lg hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    <XCircle className="inline w-4 h-4 mr-1" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(item.id)}
                    disabled={actionLoading}
                    className="px-3 py-1.5 text-sm font-medium text-white transition bg-emerald-600 rounded-lg hover:bg-emerald-700"
                  >
                    <CheckCircle className="inline w-4 h-4 mr-1" />
                    Approve
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {listings.length} of {pagination.total} listings
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

      {showReasonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl dark:bg-slate-900">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full dark:bg-red-950/30">
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-center text-gray-950 dark:text-white">
              Reject Listing
            </h3>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Please provide a reason for rejection
            </p>
            <div className="mt-4">
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection..."
                className="w-full h-24 px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowReasonModal(false);
                  setSelectedListing(null);
                  setRejectReason('');
                }}
                className="flex-1 h-12 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={actionLoading}
                className="flex-1 h-12 text-sm font-medium text-white transition bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading ? <Loader2 className="w-5 h-5 mx-auto animate-spin" /> : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingApprovals;