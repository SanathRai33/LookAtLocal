import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  User as UserIcon,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Edit,
  Trash2,
  RefreshCw,
  Ban,
  UserCheck
} from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';
import { useAuth } from '../../context/AuthContext';

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const { getUsers, changeUserStatus, deleteUser, restoreUser, loading } = useAdmin();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, filterStatus]);

  const fetchUsers = async () => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      ...(search && { search }),
      ...(filterStatus && { status: filterStatus }),
    };
    const result = await getUsers(params);
    if (result.success) {
      setUsers(result.data || []);
      setPagination(result.meta || { page: 1, limit: 10, total: 0, totalPages: 0 });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchUsers();
  };

  const handleStatusChange = async (userId, status) => {
    setActionLoading(true);
    const result = await changeUserStatus(userId, { status });
    if (result.success) {
      fetchUsers();
    }
    setActionLoading(false);
    setShowActionModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId) => {
    setActionLoading(true);
    const result = await deleteUser(userId);
    if (result.success) {
      fetchUsers();
    }
    setActionLoading(false);
    setShowActionModal(false);
    setSelectedUser(null);
  };

  const handleRestoreUser = async (userId) => {
    setActionLoading(true);
    const result = await restoreUser(userId);
    if (result.success) {
      fetchUsers();
    }
    setActionLoading(false);
    setShowActionModal(false);
    setSelectedUser(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      ACTIVE: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
      SUSPENDED: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      BANNED: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      DEACTIVATED: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
    };
    const icons = {
      ACTIVE: <CheckCircle className="w-3 h-3" />,
      SUSPENDED: <Clock className="w-3 h-3" />,
      BANNED: <XCircle className="w-3 h-3" />,
      DEACTIVATED: <XCircle className="w-3 h-3" />,
    };
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.ACTIVE}`}>
        {icons[status] || icons.ACTIVE}
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage all users on the platform</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users by name, email, or phone..."
              className="w-full h-10 pl-9 pr-3 text-sm border border-gray-200 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </form>

        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setPagination(prev => ({ ...prev, page: 1 }));
            }}
            className="h-10 px-3 text-sm border border-gray-200 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="BANNED">Banned</option>
            <option value="DEACTIVATED">Deactivated</option>
          </select>
          <button
            onClick={fetchUsers}
            className="flex items-center gap-2 px-4 h-10 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm dark:bg-slate-800">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-slate-700">
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">User</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Email</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Phone</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Listings</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Joined</th>
              <th className="px-4 py-3 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">Status</th>
              <th className="px-4 py-3 text-xs font-medium text-right text-gray-500 uppercase dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50 dark:hover:bg-slate-700/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {user.profileImageUrl ? (
                      <img src={user.profileImageUrl} alt={user.fullName} className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white bg-blue-600 rounded-full">
                        {user.fullName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{user.phone || '-'}</td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {(user._count?.serviceListings || 0) + (user._count?.rentalListings || 0) + (user._count?.productListings || 0) + (user._count?.spaceListings || 0) + (user._count?.jobListings || 0)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{formatDate(user.createdAt)}</td>
                <td className="px-4 py-3">{getStatusBadge(user.status)}</td>
                <td className="px-4 py-3 text-right">
                  <div className="relative inline-block">
                    <button
                      onClick={() => setShowMenu(showMenu === user.id ? null : user.id)}
                      className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    {showMenu === user.id && (
                      <div className="absolute right-0 z-10 w-48 py-1 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-slate-800 dark:border-slate-700">
                        {user.status !== 'BANNED' && (
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setActionType('suspend');
                              setShowActionModal(true);
                              setShowMenu(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-yellow-600 transition dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                          >
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend
                          </button>
                        )}
                        {user.status !== 'BANNED' && user.id !== currentUser?.id && (
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setActionType('ban');
                              setShowActionModal(true);
                              setShowMenu(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 transition dark:text-red-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Ban
                          </button>
                        )}
                        {user.status === 'BANNED' && (
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setActionType('restore');
                              setShowActionModal(true);
                              setShowMenu(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-emerald-600 transition dark:text-emerald-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            Restore
                          </button>
                        )}
                        {user.id !== currentUser?.id && user.status !== 'DEACTIVATED' && (
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setActionType('delete');
                              setShowActionModal(true);
                              setShowMenu(null);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 transition dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {users.length} of {pagination.total} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page === pagination.totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      {showActionModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 bg-white rounded-2xl dark:bg-slate-900">
            <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-yellow-100 dark:bg-yellow-950/30">
              {actionType === 'delete' ? (
                <Trash2 className="w-6 h-6 text-red-600" />
              ) : actionType === 'ban' ? (
                <XCircle className="w-6 h-6 text-red-600" />
              ) : actionType === 'restore' ? (
                <UserCheck className="w-6 h-6 text-emerald-600" />
              ) : (
                <Ban className="w-6 h-6 text-yellow-600" />
              )}
            </div>
            <h3 className="mt-4 text-lg font-semibold text-center text-gray-950 dark:text-white">
              {actionType === 'delete' ? 'Delete User' :
               actionType === 'ban' ? 'Ban User' :
               actionType === 'restore' ? 'Restore User' :
               'Suspend User'}
            </h3>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              {actionType === 'delete' ? `Are you sure you want to delete "${selectedUser.fullName}"? This action cannot be undone.` :
               actionType === 'ban' ? `Are you sure you want to ban "${selectedUser.fullName}"?` :
               actionType === 'restore' ? `Are you sure you want to restore "${selectedUser.fullName}"?` :
               `Are you sure you want to suspend "${selectedUser.fullName}"?`}
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setSelectedUser(null);
                }}
                className="flex-1 h-12 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (actionType === 'delete') handleDeleteUser(selectedUser.id);
                  else if (actionType === 'restore') handleRestoreUser(selectedUser.id);
                  else if (actionType === 'ban') handleStatusChange(selectedUser.id, 'BANNED');
                  else if (actionType === 'suspend') handleStatusChange(selectedUser.id, 'SUSPENDED');
                }}
                disabled={actionLoading}
                className={`flex-1 h-12 text-sm font-medium text-white transition rounded-xl ${
                  actionType === 'delete' || actionType === 'ban'
                    ? 'bg-red-600 hover:bg-red-700'
                    : actionType === 'restore'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-yellow-600 hover:bg-yellow-700'
                } disabled:opacity-50`}
              >
                {actionLoading ? (
                  <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                ) : (
                  actionType === 'delete' ? 'Delete' :
                  actionType === 'ban' ? 'Ban' :
                  actionType === 'restore' ? 'Restore' :
                  'Suspend'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;