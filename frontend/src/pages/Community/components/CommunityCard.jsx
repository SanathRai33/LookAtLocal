import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Heart,
  MoreVertical,
  Edit,
  Trash2,
  Clock,
  User,
  Eye,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useCommunity } from '../../../hooks/useCommunity';

const CommunityCard = ({ post, onPostDeleted }) => {
  const { user } = useAuth();
  const { deleteCommunityPost } = useCommunity();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [liked, setLiked] = useState(false);

  const {
    id,
    postType,
    title,
    description,
    startsAt,
    endsAt,
    locationName,
    author,
    status,
    createdAt,
    likeCount,
    isPinned,
  } = post;

  const getPostTypeLabel = (type) => {
    const labels = {
      EVENT: 'Event',
      ANNOUNCEMENT: 'Announcement',
      LOST_FOUND: 'Lost & Found',
      ALERT: 'Alert',
      GENERAL: 'General',
    };
    return labels[type] || type;
  };

  const getPostTypeColor = (type) => {
    const colors = {
      EVENT: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400',
      ANNOUNCEMENT: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
      LOST_FOUND: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
      ALERT: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
      GENERAL: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
    };
    return colors[type] || colors.GENERAL;
  };

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
      CLOSED: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
      PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
      REJECTED: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
    };
    return colors[status] || colors.ACTIVE;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOwner = author?.id === user?.id;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const result = await deleteCommunityPost(id);
      if (result.success) {
        setShowDeleteModal(false);
        if (onPostDeleted) {
          onPostDeleted();
        }
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setDeleting(false);
    }
  };

  const getInitials = (name) => {
    return name?.split(' ').map((n) => n[0]).join('').toUpperCase() || 'U';
  };

  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <>
      <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group dark:bg-slate-800 rounded-2xl hover:shadow-xl dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800">
        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getPostTypeColor(
                    postType
                  )}`}
                >
                  {getPostTypeLabel(postType)}
                </span>
                {isPinned && (
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    📌 Pinned
                  </span>
                )}
                {status && (
                  <span
                    className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                      status
                    )}`}
                  >
                    {status}
                  </span>
                )}
              </div>
                <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {title}
                </h3>
            </div>

            {isOwner && (
              <div className="relative flex-shrink-0">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1.5 transition rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 z-10 w-48 py-1 mt-1 bg-white border border-gray-200 shadow-lg dark:bg-slate-800 dark:border-gray-700 rounded-xl">
                    <Link
                      to={`/community/edit/${id}`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 transition dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                      onClick={() => setShowMenu(false)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
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

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {truncateDescription(description)}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500 dark:text-gray-400">
            {author && (
              <div className="flex items-center gap-1.5">
                {author.profileImageUrl ? (
                  <img
                    src={author.profileImageUrl}
                    alt={author.fullName}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                    {getInitials(author.fullName)}
                  </div>
                )}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {author.fullName}
                </span>
              </div>
            )}
            <span className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(createdAt)} at {formatTime(createdAt)}
            </span>
            {locationName && (
              <>
                <span className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {locationName}
                </span>
              </>
            )}
            {startsAt && (
              <>
                <span className="w-px h-3 bg-gray-300 dark:bg-gray-600" />
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(startsAt)}
                  {endsAt && ` - ${formatDate(endsAt)}`}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setLiked(!liked)}
              className="flex items-center gap-1.5 text-sm transition hover:text-red-500"
            >
              <Heart
                className={`w-4 h-4 ${
                  liked ? 'fill-red-500 text-red-500' : 'text-gray-400'
                }`}
              />
              <span className="text-gray-600 dark:text-gray-300">
                {likeCount || 0}
              </span>
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl dark:bg-slate-900">
            <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full dark:bg-red-950/30">
              <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-center text-gray-950 dark:text-white">
              Delete Post
            </h3>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post? This action cannot be
              undone.
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

export default CommunityCard;