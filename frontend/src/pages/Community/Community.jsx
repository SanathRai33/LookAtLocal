import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import CommunityHeader from './components/CommunityHeader';
import CategoryFilter from './components/CategoryFilter';
import NoticeGrid from './components/NoticeGrid';
import { mockNotices, categories, getCategoryCounts } from './data/mockNotices';
import { Pin, AlertCircle } from 'lucide-react';

const Community = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    // Filter notices based on category
    const filteredNotices = useMemo(() => {
        let filtered = mockNotices;

        // Filter by category
        if (activeCategory !== 'all') {
            const categoryMap = {
                'apartment': 'Apartment',
                'event': 'Event',
                'lost-found': 'Lost & Found',
                'notice': 'Notice'
            };
            filtered = filtered.filter(
                notice => notice.category === categoryMap[activeCategory]
            );
        }

        // Sort: Pinned first, then by urgency, then by date
        return [...filtered].sort((a, b) => {
            if (a.isPinned && !b.isPinned) return -1;
            if (!a.isPinned && b.isPinned) return 1;
            if (a.isUrgent && !b.isUrgent) return -1;
            if (!a.isUrgent && b.isUrgent) return 1;
            return 0;
        });
    }, [activeCategory]);

    // Get pinned and urgent counts
    const pinnedCount = useMemo(() => {
        return mockNotices.filter(n => n.isPinned).length;
    }, []);

    const urgentCount = useMemo(() => {
        return mockNotices.filter(n => n.isUrgent).length;
    }, []);

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Community' }
    ];

    return (
        <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb items={breadcrumbItems} />
                </div>

                {/* Header */}
                <CommunityHeader />

                {/* Info Banner */}
                {(pinnedCount > 0 || urgentCount > 0) && (
                    <div className="flex flex-wrap gap-3 mb-6">
                        {pinnedCount > 0 && (
                            <div className="flex items-center gap-2 px-4 py-2 border border-yellow-200 bg-yellow-50 dark:bg-yellow-950/30 dark:border-yellow-800 rounded-xl">
                                <Pin className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-sm text-yellow-700 dark:text-yellow-300">
                                    {pinnedCount} pinned {pinnedCount === 1 ? 'notice' : 'notices'}
                                </span>
                            </div>
                        )}
                        {urgentCount > 0 && (
                            <div className="flex items-center gap-2 px-4 py-2 border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 rounded-xl">
                                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                <span className="text-sm text-red-700 dark:text-red-300">
                                    {urgentCount} urgent {urgentCount === 1 ? 'notice' : 'notices'}
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Category Filter */}
                <CategoryFilter
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                />

                {/* Results Count */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing <span className="font-medium text-gray-700 dark:text-gray-300">{filteredNotices.length}</span> notices
                        {activeCategory !== 'all' && (
                            <span> in <span className="font-medium text-gray-700 dark:text-gray-300">
                                {categories.find(c => c.id === activeCategory)?.label}
                            </span></span>
                        )}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                            📌 {mockNotices.filter(n => n.isPinned).length} pinned
                        </span>
                        <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
                        <span className="flex items-center gap-1">
                            ⚡ {mockNotices.filter(n => n.isUrgent).length} urgent
                        </span>
                    </div>
                </div>

                {/* Notice Grid */}
                <NoticeGrid notices={filteredNotices} />
            </div>
        </div>
    );
};

export default Community;