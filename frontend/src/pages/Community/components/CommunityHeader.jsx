import React from 'react';
import { Users } from 'lucide-react';

const CommunityHeader = () => {
    return (
        <div className="mb-8">
            <div className="flex items-start gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-950/50 rounded-2xl">
                    <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Community Notice Board
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
                        Stay informed about events, announcements, and community news
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CommunityHeader;