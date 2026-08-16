import React from 'react';
import {
    MapPin,
    Clock,
    User,
    Heart,
    Share2,
    MessageCircle,
    Pin,
    AlertCircle,
    Tag,
    ThumbsDown
} from 'lucide-react';

const NoticeCard = ({ notice }) => {
    const {
        title,
        category,
        categoryIcon,
        type,
        isPinned,
        location,
        description,
        postedBy,
        postedByInitials,
        postedDate,
        community,
        helpful,
        shares,
        comments,
        tags,
        isUrgent
    } = notice;

    const getCategoryColor = (cat) => {
        const colors = {
            'Apartment': 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400',
            'Event': 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
            'Lost & Found': 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
            'Notice': 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400'
        };
        return colors[cat] || colors['Notice'];
    };

    return (
        <div className={`group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${isPinned ? 'border-yellow-300 dark:border-yellow-700' : 'border-gray-200 dark:border-gray-700'
            } hover:border-blue-200 dark:hover:border-blue-800`}>

            {/* Header */}
            <div className="p-5 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center flex-1 min-w-0 gap-3">
                        <span className="text-2xl">{categoryIcon}</span>
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getCategoryColor(category)}`}>
                                    {category}
                                </span>
                                {isPinned && (
                                    <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-yellow-100 dark:bg-yellow-950/50 text-yellow-700 dark:text-yellow-400">
                                        <Pin className="w-3 h-3" />
                                        Pinned
                                    </span>
                                )}
                                {isUrgent && (
                                    <span className="flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400">
                                        <AlertCircle className="w-3 h-3" />
                                        Urgent
                                    </span>
                                )}
                            </div>
                            <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                                {title}
                            </h3>
                        </div>
                        <div className='flex gap-4'>
                            <div className="flex flex-col items-start justify-center gap-1 text-gray-700 data:text-gray-400 dark:text-gray-300 ">
                                <span className="flex items-center gap-1.5 text-xs">
                                    <MapPin className="w-4 h-4" />
                                    {location}
                                </span>
                                <span className="flex items-center gap-1.5 text-xs">
                                    <Clock className="w-4 h-4" />
                                    {postedDate}
                                </span>
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 text-sm font-medium text-white bg-blue-600 rounded-full">
                                {postedByInitials}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
                {/* Description */}
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {description}
                </p>

                {/* Tags */}
                {tags && tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags?.map((tag, index) => (
                            <span key={index} className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-sm font-medium rounded-xl transition-all duration-200">
                        <Heart className="w-4 h-4" />
                        Helpful ({helpful})
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 text-sm font-medium rounded-xl transition-all duration-200">
                        <Share2 className="w-4 h-4" />
                        Share ({shares})
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 border border-red-200 dark:border-red-700 text-red-100 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-700 text-sm font-medium rounded-xl transition-all duration-200">
                        <ThumbsDown className="w-4 h-4" />
                        Dislike ({comments})
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoticeCard;