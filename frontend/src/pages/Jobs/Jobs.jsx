import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import JobsHeader from './components/JobsHeader';
import JobFilter from './components/JobFilter';
import JobGrid from './components/JobGrid';
import { useJobs } from '../../hooks/useJobs';
import { useCategories } from '../../hooks/useCategories';
import { TrendingUp } from 'lucide-react';

const Jobs = () => {
  const { jobs, loading, pagination, getJobs } = useJobs();
  const { categories, getCategories } = useCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  const currentPage = Number(searchParams.get('page')) || 1;
  const activeFilter = searchParams.get('jobType') || 'all';
  const sortBy = searchParams.get('sort') || 'newest';

  const itemsPerPage = 10;

  useEffect(() => {
    getCategories({ module: 'JOB' });
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [
    currentPage,
    activeFilter,
    sortBy,
    searchParams.get('search'),
  ]);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const fetchJobs = async () => {
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
      params.jobType = activeFilter;
    }

    await getJobs(params);
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
      jobType: filterId,
      page: 1,
    });
  };

  const handlePageChange = (page) => {
    updateParams({
      page,
    });
  };

  const handleSortChange = (sort) => {
    updateParams({
      sort,
      page: 1,
    });
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Local Jobs' },
  ];

  const jobFilters = [
    { id: 'all', label: 'All Jobs' },
    { id: 'FULL_TIME', label: 'Full Time' },
    { id: 'PART_TIME', label: 'Part Time' },
    { id: 'CONTRACT', label: 'Contract' },
    { id: 'DAILY_WAGE', label: 'Daily Wage' },
  ];

  const urgentJobs = jobs?.filter(j => j.isUrgent)?.length;

  return (
    <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <JobsHeader
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          onSearch={handleSearchSubmit}
          totalCount={pagination?.total || 0}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          loading={loading}
        />

        <JobFilter
          filters={jobFilters}
          activeFilter={activeFilter}
          setActiveFilter={handleFilterChange}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {jobs?.length}
            </span>{' '}
            jobs

            {activeFilter !== 'all' && (
              <span>
                {' '}
                in{' '}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {jobFilters.find(f => f.id === activeFilter)?.label}
                </span>
              </span>
            )}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              {urgentJobs} urgent
            </span>
          </div>
        </div>

        <JobGrid
          jobs={jobs}
          loading={loading}
        />

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

export default Jobs;