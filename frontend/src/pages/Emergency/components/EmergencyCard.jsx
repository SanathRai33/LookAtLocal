import React from 'react';
import {
    MapPin,
    Clock,
    Phone,
    User,
    Share2,
    MessageCircle,
    AlertCircle,
    CheckCircle,
    Users,
    Tag
} from 'lucide-react';

const EmergencyCard = ({ request }) => {
    const {
        type,
        typeIcon,
        urgency,
        urgencyColor,
        title,
        description,
        location,
        time,
        contact,
        contactPerson,
        status,
        tags,
        responses,
        shares,
        isUrgent
    } = request;

    const getUrgencyColor = (color) => {
        const colors = {
            red: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
            orange: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
            yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
            green: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400'
        };
        return colors[color] || colors.yellow;
    };

    const getUrgencyDot = (color) => {
        const colors = {
            red: 'bg-red-500',
            orange: 'bg-orange-500',
            yellow: 'bg-yellow-500',
            green: 'bg-green-500'
        };
        return colors[color] || colors.yellow;
    };

    return (
        <div className={`group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${isUrgent ? 'border-red-200 dark:border-red-800' : 'border-gray-200 dark:border-gray-700'
            } hover:border-red-300 dark:hover:border-red-700`}>

            {/* Header */}
            <div className="p-5 pb-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">{typeIcon}</span>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getUrgencyColor(urgencyColor)} flex items-center gap-1.5`}>
                                    <span className={`h-1.5 w-1.5 rounded-full ${getUrgencyDot(urgencyColor)} animate-pulse`}></span>
                                    {urgency}
                                </span>
                                <span className="text-xs text-gray-400 dark:text-gray-500">{type}</span>
                            </div>
                            <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                                {title}
                            </h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                            {responses} responded
                        </span>
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
                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, index) => (
                            <span key={index} className="flex items-center gap-1 text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full">
                                <Tag className="w-3 h-3" />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Location & Time */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {time}
                    </span>
                </div>

                {/* Contact Info */}
                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <a href={`tel:${contact}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                            {contact}
                        </a>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                    <button className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2">
                        <Phone className="w-4 h-4" />
                        Contact Now
                    </button>
                    <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                    <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Message
                    </button>
                </div>

                {/* Help Stats */}
                <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-500">
                    <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {responses} people responded
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                        <Share2 className="h-3.5 w-3.5" />
                        Shared {shares} times
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EmergencyCard;