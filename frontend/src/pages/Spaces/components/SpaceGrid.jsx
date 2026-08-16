import React from 'react';
import SpaceCard from './SpaceCard';
import { Loader2 } from 'lucide-react';

const SpaceGrid = ({ spaces, loading }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="ml-3 text-gray-500 dark:text-gray-400">Loading spaces...</span>
            </div>
        );
    }

    if (spaces?.length === 0) {
        return (
            <div className="py-16 text-center">
                <div className="mb-4 text-6xl">🔍</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    No spaces found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:gap-6">
            {spaces?.map((space) => (
                <SpaceCard key={space.id} space={space} />
            ))}
        </div>
    );
};

export default SpaceGrid;