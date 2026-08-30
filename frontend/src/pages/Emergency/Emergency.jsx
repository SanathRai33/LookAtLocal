import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import EmergencyHeader from './components/EmergencyHeader';
import EmergencyStats from './components/EmergencyStats';
import EmergencyFilter from './components/EmergencyFilter';
import EmergencyGrid from './components/EmergencyGrid';
import { useEmergency } from '../../hooks/useEmergency';
import { AlertCircle } from 'lucide-react';

const Emergency = () => {
  const { emergencies, loading, pagination, getEmergencyRequests } =
    useEmergency();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  const currentPage = Number(searchParams.get('page')) || 1;
  const activeFilter = searchParams.get('emergencyType') || 'all';
  const urgencyFilter = searchParams.get('urgency') || 'all';
  const sortBy = searchParams.get('sort') || 'urgent_first';

  const itemsPerPage = 10;

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'BLOOD', label: 'Blood' },
    { id: 'MEDICAL', label: 'Medical' },
    { id: 'ACCIDENT', label: 'Accident' },
    { id: 'VOLUNTEER', label: 'Volunteer' },
    { id: 'OTHER', label: 'Other' },
  ];

  const urgencyOptions = [
    { id: 'all', label: 'All' },
    { id: 'CRITICAL', label: 'Critical' },
    { id: 'URGENT', label: 'Urgent' },
    { id: 'NORMAL', label: 'Normal' },
  ];

  useEffect(() => {
    fetchEmergencies();
  }, [
    currentPage,
    activeFilter,
    urgencyFilter,
    sortBy,
    searchParams.get('search'),
  ]);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const fetchEmergencies = async () => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      sort: sortBy,
    };

    const search = searchParams.get('search');

    if (search?.trim()) {
      params.search = search.trim();
    }

    if (activeFilter !== 'all') {
      params.emergencyType = activeFilter;
    }

    if (urgencyFilter !== 'all') {
      params.urgency = urgencyFilter;
    }

    await getEmergencyRequests(params);
  };

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        value === 'all'
      ) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    updateParams({
      search: searchQuery.trim(),
      page: 1,
    });
  };

  const handleFilterChange = (filterId) => {
    updateParams({
      emergencyType: filterId,
      page: 1,
    });
  };

  const handleUrgencyChange = (urgencyId) => {
    updateParams({
      urgency: urgencyId,
      page: 1,
    });
  };

  const handleSortChange = (sort) => {
    updateParams({
      sort,
      page: 1,
    });
  };

  const handlePageChange = (page) => {
    updateParams({
      page,
    });
  };

  const urgentCount = emergencies?.filter((emergency) =>
    (emergency.urgency === 'CRITICAL' || emergency.urgency === 'URGENT') && emergency.status !== 'RESOLVED')?.length || 0;

  const unresolvedCount = emergencies?.filter((emergency) => emergency.status !== 'RESOLVED')?.length || 0;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Emergency Help' },
  ];

  return (
    <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <EmergencyHeader
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          onSearch={handleSearchSubmit}
          totalCount={unresolvedCount || 0}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          loading={loading}
        />

        <EmergencyStats emergencies={emergencies} />

        {urgentCount > 0 && (
          <div className="flex items-center gap-3 p-4 mb-6 border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 rounded-2xl">
            <AlertCircle className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400" />

            <p className="text-sm text-red-700 dark:text-red-300">
              <span className="font-bold">{urgentCount}</span>{' '}
              {urgentCount === 1 ? 'urgent request' : 'urgent requests'} need immediate attention. Please help if you can.
            </p>
          </div>
        )}

        <EmergencyFilter
          filters={filterOptions}
          activeFilter={activeFilter}
          setActiveFilter={handleFilterChange}
          urgencyOptions={urgencyOptions}
          urgencyFilter={urgencyFilter}
          setUrgencyFilter={handleUrgencyChange}
        />

        <EmergencyGrid emergencies={emergencies} loading={loading} onStatusChange={fetchEmergencies}/>

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-gray-400 dark:hover:bg-slate-800"
            >
              ←
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {pagination.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="p-2 text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-gray-400 dark:hover:bg-slate-800"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Emergency;