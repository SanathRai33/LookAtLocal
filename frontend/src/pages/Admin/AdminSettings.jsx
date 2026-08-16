import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Lock,
  User,
  Mail,
  Phone,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Globe,
  Database,
  Server,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../hooks/useAdmin';

const AdminSettings = () => {
  const { user } = useAuth();
  const { sendPlatformNotification, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'ANNOUNCEMENT',
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'system', label: 'System', icon: Server },
  ];

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    // Simulate API call
    setTimeout(() => {
      setSuccess('Profile updated successfully');
      setSaving(false);
    }, 1500);
  };

  const handleNotificationSend = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const result = await sendPlatformNotification({
      type: notificationForm.type,
      title: notificationForm.title,
      message: notificationForm.message,
    });

    if (result.success) {
      setSuccess('Platform notification sent successfully');
      setNotificationForm({ title: '', message: '', type: 'ANNOUNCEMENT' });
    } else {
      setError(result.error || 'Failed to send notification');
    }
    setSaving(false);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const systemStatus = [
    { label: 'API Status', value: 'Operational', status: 'operational' },
    { label: 'Database', value: 'Connected', status: 'operational' },
    { label: 'Storage', value: '85% used', status: 'warning' },
    { label: 'Cache', value: 'Active', status: 'operational' },
    { label: 'Queue', value: '0 pending', status: 'operational' },
    { label: 'Last Backup', value: '2 hours ago', status: 'operational' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your admin preferences and platform settings</p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-slate-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm dark:bg-slate-800 p-6">
        {success && (
          <div className="flex items-start gap-2 p-3 mb-4 text-sm text-emerald-600 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400">
            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {activeTab === 'profile' && (
          <form onSubmit={handleProfileUpdate} className="space-y-5 max-w-2xl">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="text"
                  name="fullName"
                  value={profileForm.fullName}
                  onChange={handleProfileChange}
                  className="w-full h-10 pl-9 pr-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="email"
                  name="email"
                  value={profileForm.email}
                  onChange={handleProfileChange}
                  className="w-full h-10 pl-9 pr-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <div className="relative">
                <Phone className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={profileForm.phone}
                  onChange={handleProfileChange}
                  className="w-full h-10 pl-9 pr-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white transition rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </form>
        )}

        {activeTab === 'notifications' && (
          <form onSubmit={handleNotificationSend} className="space-y-5 max-w-2xl">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Notification Type</label>
              <select
                value={notificationForm.type}
                onChange={(e) => setNotificationForm(prev => ({ ...prev, type: e.target.value }))}
                className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="ANNOUNCEMENT">Announcement</option>
                <option value="ALERT">Alert</option>
                <option value="REMINDER">Reminder</option>
                <option value="UPDATE">Update</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
              <input
                type="text"
                value={notificationForm.title}
                onChange={(e) => setNotificationForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Notification title"
                required
                className="w-full h-10 px-3 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea
                value={notificationForm.message}
                onChange={(e) => setNotificationForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Notification message"
                rows="4"
                required
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <Shield className="inline w-4 h-4 mr-2" />
                This notification will be sent to all active users on the platform.
              </p>
            </div>

            <button
              type="submit"
              disabled={saving || loading}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white transition rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {saving || loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
              Send Platform Notification
            </button>
          </form>
        )}

        {activeTab === 'security' && (
          <div className="space-y-5 max-w-2xl">
            <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Security Settings</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Security settings are managed through your account preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Change Password</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Update your admin password</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-500" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Session Management</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manage active sessions</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-5 max-w-2xl">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {systemStatus.map((item) => (
                <div key={item.label} className="p-4 border border-gray-200 rounded-xl dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      item.status === 'operational'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {item.status === 'operational' ? '✅' : '⚠️'}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-lg bg-gray-50 dark:bg-slate-700/50">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">System Information</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Version 1.0.0 • Last updated: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="px-4 py-2.5 text-sm font-medium text-white transition rounded-xl bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600">
                <Zap className="inline w-4 h-4 mr-2" />
                Clear Cache
              </button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700">
                <Database className="inline w-4 h-4 mr-2" />
                Run Maintenance
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSettings;