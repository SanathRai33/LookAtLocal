import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import JobsHeader from './components/JobsHeader';
import JobFilter from './components/JobFilter';
import JobGrid from './components/JobGrid';
import { mockJobs, jobFilters } from './data/mockJobs';
import { TrendingUp } from 'lucide-react';

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter jobs based on search and filter
  const filteredJobs = useMemo(() => {
    let filtered = mockJobs;

    // Filter by job type
    if (activeFilter !== 'all') {
      filtered = filtered.filter(job => job.category === activeFilter);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        job => 
          job.title.toLowerCase().includes(query) ||
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.skills.some(skill => skill.toLowerCase().includes(query)) ||
          job.requirements.some(req => req.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [activeFilter, searchQuery]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Local Jobs' }
  ];

  // Get counts for each filter
  const getFilterCount = (filterId) => {
    if (filterId === 'all') return mockJobs.length;
    return mockJobs.filter(j => j.category === filterId).length;
  };

  return (
    <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header */}
        <JobsHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Job Filter */}
        <JobFilter 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-gray-700 dark:text-gray-300">{filteredJobs.length}</span> jobs
            {activeFilter !== 'all' && (
              <span> in <span className="font-medium text-gray-700 dark:text-gray-300">
                {jobFilters.find(f => f.id === activeFilter)?.label}
              </span></span>
            )}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              {mockJobs.filter(j => j.isUrgent).length} urgent
            </span>
            <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
            <span>📌 {mockJobs.filter(j => j.featured).length} featured</span>
          </div>
        </div>

        {/* Job Grid */}
        <JobGrid jobs={filteredJobs} />
      </div>
    </div>
  );
};

export default Jobs;