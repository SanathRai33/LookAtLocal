import React from 'react';
import { Link } from 'react-router-dom'
import CommunityCard from './CommunityCard';
import { Loader2 } from 'lucide-react';

const CommunityGrid = ({ posts, loading, onPostDeleted }) => {
    if (loading) {
        return (
            <div className="flex items-center justify-center py-16">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="ml-3 text-gray-500 dark:text-gray-400">
                    Loading posts...
                </span>
            </div>
        );
    }

    if (posts?.length === 0) {
        return (
            <div className="py-16 text-center">
                <div className="mb-4 text-6xl">📝</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    No posts found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter
                </p>
                <Link
                    to="/community/create"
                    className="inline-block px-6 py-2.5 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
                >
                    Create a Post
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {posts?.map((post) => (
                <CommunityCard
                    key={post.id}
                    post={post}
                    onPostDeleted={onPostDeleted}
                />
            ))}
        </div>
    );
};

export default CommunityGrid;