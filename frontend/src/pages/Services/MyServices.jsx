import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  X,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  List,
  MapPin,
  IndianRupee
} from 'lucide-react';
import { useServices } from '../../hooks/useServices';

const MyServices = () => {
  const navigate = useNavigate();
  const { services, loading, pagination, getMyServices, deleteService } = useServices();
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const statusOptions = [
    { value: 'ALL', label: 'All' },
    { value: 'ACTIVE', label: 'Active' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'REJECTED', label: 'Rejected' },
    { value: 'CLOSED', label: 'Closed' },
  ];

  const statusColors = {
    ACTIVE: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    CLOSED: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  };

  const statusIcons = {
    ACTIVE: CheckCircle,
    PENDING: Clock,
    REJECTED: AlertCircle,
    CLOSED: AlertCircle,
  };

  useEffect(() => {
    fetchServices();
  }, [currentPage, filterStatus, appliedSearch]);

  const fetchServices = async () => {
    const params = {
      page: currentPage,
      limit: 12,
    };

    if (filterStatus !== 'ALL') {
      params.status = filterStatus;
    }

    if (appliedSearch.trim()) {
      params.search = appliedSearch.trim();
    }

    await getMyServices(params);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setAppliedSearch(searchTerm.trim());
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setAppliedSearch('');
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteService(selectedService.id);
      if (result.success) {
        setShowDeleteModal(false);
        await fetchServices();
      }
    } catch (error) {
      console.error('Error deleting service:', error);
    } finally {
      setDeleting(false);
      setSelectedService(null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getPricingLabel = (type) => {
    const types = {
      HOURLY: '/hr',
      DAILY: '/day',
      FIXED: '',
    };
    return types[type] || '';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading your listings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="w-full px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              My Listings
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage all your service listings
            </p>
          </div>
          <Link
            to="/services/create"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition rounded-xl bg-gray-950 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Create New Listing
          </Link>
        </div>

        <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search your listings..."
              className="w-full h-12 pl-12 pr-12 text-base text-gray-900 transition border border-gray-300 outline-none rounded-2xl bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute text-gray-400 -translate-y-1/2 right-12 top-1/2 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Search
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="h-12 px-4 pr-10 text-base text-gray-900 transition border border-gray-300 outline-none appearance-none rounded-2xl bg-gray-50 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Filter className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none right-4 top-1/2" />
            </div>

            <div className="flex gap-1 p-1 border border-gray-200 rounded-xl dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid'
                    ? 'bg-gray-950 text-white dark:bg-blue-600'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list'
                    ? 'bg-gray-950 text-white dark:bg-blue-600'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {services.length} of {pagination.total || 0} listings
            {appliedSearch && ` for "${appliedSearch}"`}
          </p>
        </div>

        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 mt-8 text-center">
            <div className="p-4 bg-gray-100 rounded-full dark:bg-slate-800">
              <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-950 dark:text-white">
              {appliedSearch || filterStatus !== 'ALL'
                ? 'No listings found matching your filters'
                : 'No listings found'}
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {appliedSearch || filterStatus !== 'ALL'
                ? 'Try adjusting your search or filters'
                : 'Start by creating your first listing'}
            </p>
            {!appliedSearch && filterStatus === 'ALL' && (
              <Link
                to="/services/create"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white transition rounded-xl bg-gray-950 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                Create Listing
              </Link>
            )}
          </div>
        ) : (
          <div className={`mt-6 ${viewMode === 'grid'
              ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
              : 'space-y-4'
            }`}>
            {services.map((service) => {
              const StatusIcon = statusIcons[service.status] || AlertCircle;
              const statusColor = statusColors[service.status] || statusColors.CLOSED;

              return (
                <div
                  key={service.id}
                  className={`rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 ${viewMode === 'list' ? 'flex flex-col sm:flex-row sm:items-center p-4 gap-4' : 'p-5'
                    }`}
                >
                  <div className={`flex-1 min-w-0 ${viewMode === 'grid' ? 'space-y-3' : ''}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate text-gray-950 dark:text-white">
                          {service.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {service.category?.name || 'Service'}
                          </span>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                            <StatusIcon className="w-3 h-3" />
                            {service.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className={`text-sm text-gray-500 dark:text-gray-400 ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-1'
                      }`}>
                      {service.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 font-semibold text-gray-950 dark:text-white">
                        <IndianRupee className="w-4 h-4" />
                        {service.price === 0 ? 'Free' : `${service.price}${getPricingLabel(service.pricingType)}`}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {service.city}, {service.state}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {formatDate(service.createdAt)}
                      </span>
                    </div>

                    {service.averageRating > 0 && (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-yellow-500">★</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {service.averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-400 dark:text-gray-500">
                          ({service.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={`flex gap-2 ${viewMode === 'grid' ? 'pt-3 border-t border-gray-100 dark:border-slate-800' : 'sm:border-l sm:pl-4 border-gray-100 dark:border-slate-800'
                    }`}>
                    <button
                      onClick={() => navigate(`/services/${service.id}`)}
                      className="p-2 text-gray-400 transition rounded-lg hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-gray-300"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/services/edit/${service.id}`)}
                      className="p-2 text-gray-400 transition rounded-lg hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-gray-300"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService(service);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 text-gray-400 transition rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-gray-400 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
              disabled={currentPage === pagination.totalPages}
              className="p-2 text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-gray-400 dark:hover:bg-slate-800"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl dark:bg-slate-900">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full dark:bg-red-950/30">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-center text-gray-950 dark:text-white">
              Delete Listing
            </h3>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Are you sure you want to delete "{selectedService?.title}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 h-12 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 h-12 text-sm font-medium text-white transition bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? (
                  <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyServices;