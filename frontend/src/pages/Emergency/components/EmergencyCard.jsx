import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
    Tag,
    MoreVertical,
    Edit,
    Trash2,
    Loader2
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useEmergency } from '../../../hooks/useEmergency';

const EmergencyCard = ({ request, onStatusChange }) => {
    const { user } = useAuth();
    const { resolveEmergencyRequest, deleteEmergencyRequest } = useEmergency();
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [resolving, setResolving] = useState(false);

    const {
        id,
        emergencyType,
        title,
        description,
        urgency,
        city,
        contactPhone,
        requester,
        status,
        createdAt,
    } = request;

    const getTypeLabel = (type) => {
        const labels = {
            BLOOD: 'Blood',
            MEDICAL: 'Medical',
            ACCIDENT: 'Accident',
            VOLUNTEER: 'Volunteer',
            OTHER: 'Other',
        };
        return labels[type] || type;
    };

    const getTypeColor = (type) => {
        const colors = {
            BLOOD: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
            MEDICAL: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
            ACCIDENT: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
            VOLUNTEER: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
            OTHER: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
        };
        return colors[type] || colors.OTHER;
    };

    const getUrgencyColor = (urgency) => {
        const colors = {
            CRITICAL: 'bg-red-600',
            URGENT: 'bg-orange-500',
            NORMAL: 'bg-yellow-500',
        };
        return colors[urgency] || colors.NORMAL;
    };

    const getUrgencyLabel = (urgency) => {
        const labels = {
            CRITICAL: 'Critical',
            URGENT: 'Urgent',
            NORMAL: 'Normal',
        };
        return labels[urgency] || urgency;
    };

    const getStatusColor = (status) => {
        const colors = {
            ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
            RESOLVED: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
        };
        return colors[status] || colors.ACTIVE;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffMinutes < 60) return `${diffMinutes}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    };

    const getInitials = (name) => {
        return name?.split(' ')?.map((n) => n[0]).join('').toUpperCase() || 'U';
    };

    const isOwner = requester?.id === user?.id;

    const handleResolve = async () => {
        setResolving(true);
        try {
            const result = await resolveEmergencyRequest(id);
            if (result.success) {
                if (onStatusChange) onStatusChange();
            }
        } catch (error) {
            console.error('Error resolving request:', error);
        } finally {
            setResolving(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);

        try {
            const result = await deleteEmergencyRequest(id);

            if (result.success) {
                setShowDeleteModal(false);

                if (onStatusChange) {
                    onStatusChange();
                }
            }
        } catch (error) {
            console.error('Error deleting request:', error);
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            <div
                className={`group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${urgency === 'CRITICAL' ? 'border-red-200 dark:border-red-800' :
                    urgency === 'URGENT' ? 'border-orange-200 dark:border-orange-800' :
                        'border-gray-200 dark:border-gray-700'
                    } hover:border-red-300 dark:hover:border-red-700`}
            >
                <div className="p-5 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getTypeColor(emergencyType)}`}>
                                {getTypeLabel(emergencyType)}
                            </span>
                            <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                                {status}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span
                                className={`flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium rounded-full bg-${getUrgencyColor(urgency)} text-white`}
                            >
                                <span className={`h-1.5 w-1.5 rounded-full bg-white animate-pulse`}></span>
                                {getUrgencyLabel(urgency)}
                            </span>
                            {isOwner && (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowMenu(!showMenu)}
                                        className="p-1.5 transition rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        <MoreVertical className="w-5 h-5 text-gray-400" />
                                    </button>
                                    {showMenu && (
                                        <div className="absolute right-0 z-10 w-48 py-1 mt-1 bg-white border border-gray-200 shadow-lg dark:bg-slate-800 dark:border-gray-700 rounded-xl">
                                            <Link
                                                to={`/emergency/edit/${id}`}
                                                className="flex items-center px-4 py-2 text-sm text-gray-700 transition dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                                                onClick={() => setShowMenu(false)}
                                            >
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit
                                            </Link>
                                            {status === 'ACTIVE' && (
                                                <button
                                                    onClick={() => {
                                                        setShowMenu(false);
                                                        handleResolve();
                                                    }}
                                                    disabled={resolving}
                                                    className="flex items-center w-full px-4 py-2 text-sm text-green-600 transition dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-950/50"
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    {resolving ? 'Resolving...' : 'Resolve'}
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setShowMenu(false);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="flex items-center w-full px-4 py-2 text-sm text-red-600 transition dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                    </h3>
                </div>

                <div className="p-5 space-y-4">
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {city || 'Location not specified'}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {formatDate(createdAt)}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                            {requester?.profileImageUrl ? (
                                <img
                                    src={requester.profileImageUrl}
                                    alt={requester.fullName}
                                    className="object-cover w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-blue-600 rounded-full">
                                    {getInitials(requester?.fullName)}
                                </div>
                            )}
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {requester?.fullName || 'Unknown'}
                            </span>
                        </div>
                        {contactPhone && (
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <a href={`tel:${contactPhone}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                                    {contactPhone}
                                </a>
                            </div>
                        )}
                    </div>

                    {status === 'ACTIVE' && (
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <button className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25 flex items-center justify-center gap-2">
                                <Phone className="w-4 h-4" />
                                Contact Now
                            </button>
                            {/* <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2">
                                <Share2 className="w-4 h-4" />
                                Share
                            </button>
                            <button className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 text-sm font-medium rounded-xl transition-all duration-200 flex items-center gap-2">
                                <MessageCircle className="w-4 h-4" />
                                Message
                            </button> */}
                        </div>
                    )}
                </div>
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="w-full max-w-md p-6 bg-white rounded-2xl dark:bg-slate-900">
                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full dark:bg-red-950/30">
                            <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-center text-gray-950 dark:text-white">
                            Delete Request
                        </h3>
                        <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this emergency request? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 h-12 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 h-12 text-sm font-medium text-white transition bg-red-600 rounded-xl hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {deleting ? (
                                    <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmergencyCard;