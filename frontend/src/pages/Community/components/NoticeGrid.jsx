import React from 'react';
import NoticeCard from './NoticeCard';
import { Megaphone } from 'lucide-react';

const NoticeGrid = ({ notices }) => {
    if (notices?.length === 0) {
        return (
            <div className="py-16 text-center">
                <div className="mb-4 text-6xl">📋</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    No notices found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Check back later for community updates
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 md:gap-6">
            {notices?.map((notice) => (
                <NoticeCard key={notice.id} notice={notice} />
            ))}
        </div>
    );
};

export default NoticeGrid;