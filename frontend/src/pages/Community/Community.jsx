import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import CommunityHeader from './components/CommunityHeader';
import CommunityFilter from './components/CommunityFilter';
import CommunityGrid from './components/CommunityGrid';
import { useCommunity } from '../../hooks/useCommunity';

const Community = () => {
  const { posts, loading, pagination, getCommunityPosts } = useCommunity();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  const currentPage = Number(searchParams.get('page')) || 1;
  const activeFilter = searchParams.get('postType') || 'all';
  const isMine = searchParams.get('isMine') === 'true';
  const showClosed = searchParams.get('showClosed') === 'true';
  const sortBy = searchParams.get('sort') || 'newest';

  const itemsPerPage = 10;

  const filterOptions = [
    { id: 'all', label: 'All' },
    { id: 'EVENT', label: 'Events' },
    { id: 'ANNOUNCEMENT', label: 'Announcements' },
    { id: 'LOST_FOUND', label: 'Lost & Found' },
    { id: 'ALERT', label: 'Alerts' },
    { id: 'GENERAL', label: 'General' },
  ];

  useEffect(() => {
    fetchPosts();
  }, [
    currentPage,
    activeFilter,
    isMine,
    showClosed,
    sortBy,
    searchParams.get('search'),
  ]);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const fetchPosts = async () => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      sort: sortBy,
      isMine: isMine ? 'true' : 'false',
      showClosed: showClosed ? 'true' : 'false',
    };

    const search = searchParams.get('search');

    if (search?.trim()) {
      params.search = search.trim();
    }

    if (activeFilter !== 'all') {
      params.postType = activeFilter;
    }

    await getCommunityPosts(params);
  };

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        value === 'all' ||
        value === false
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
      postType: filterId,
      page: 1,
    });
  };

  const handleMineToggle = () => {
    updateParams({
      isMine: !isMine,
      page: 1,
    });
  };

  const handleShowClosedToggle = () => {
    updateParams({
      showClosed: !showClosed,
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

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Community' },
  ];

  return (
    <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <CommunityHeader
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          onSearch={handleSearchSubmit}
          totalCount={pagination?.total || 0}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          loading={loading}
          isMine={isMine}
          onMineToggle={handleMineToggle}
        />

        <CommunityFilter
          filters={filterOptions}
          activeFilter={activeFilter}
          setActiveFilter={handleFilterChange}
          showClosed={showClosed}
          onShowClosedToggle={handleShowClosedToggle}
        />

        <CommunityGrid
          posts={posts}
          loading={loading}
          onPostDeleted={fetchPosts}
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

export default Community;