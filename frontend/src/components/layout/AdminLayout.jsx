import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ClipboardList,
    BarChart3,
    AlertTriangle,
    Flag,
    FolderTree,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Search,
    Bell,
    User,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        { path: '/admin', label: 'Overview', icon: LayoutDashboard },
        { path: '/admin/users', label: 'User Management', icon: Users },
        { path: '/admin/listings', label: 'Listing Approvals', icon: ClipboardList },
        { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
        { path: '/admin/emergency', label: 'Emergency Requests', icon: AlertTriangle },
        { path: '/admin/reports', label: 'Reports & Spam', icon: Flag },
        { path: '/admin/categories', label: 'Categories', icon: FolderTree },
        { path: '/admin/settings', label: 'Admin Settings', icon: Settings },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const isActive = (path) => {
        if (path === '/admin') {
            return location.pathname === '/admin';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="flex h-screen overflow-hidden">
                <div
                    className={`fixed inset-y-0 left-0 z-30 bg-white dark:bg-slate-800 border-r border-gray-200 dark:border-slate-700 transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'
                        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
                >
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-slate-700">
                            {!sidebarCollapsed && (
                                <Link to="/admin" className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text">
                                        L@L Admin
                                    </span>
                                </Link>
                            )}
                            {sidebarCollapsed && (
                                <Link to="/admin" className="mx-auto text-xl font-bold text-blue-600">
                                    L@L
                                </Link>
                            )}
                            <button
                                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                                className="hidden lg:block p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                {sidebarCollapsed ? (
                                    <ChevronRight className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronLeft className="w-5 h-5 text-gray-500" />
                                )}
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 py-4 overflow-y-auto">
                            <nav className="px-2 space-y-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.path);

                                    return (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active
                                                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                                        >
                                            <Icon className={`w-5 h-5 ${active ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                                            {!sidebarCollapsed && <span>{item.label}</span>}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                            <div className={`flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                                {user?.profileImageUrl ? (
                                    <img
                                        src={user.profileImageUrl}
                                        alt={user.fullName}
                                        className="object-cover w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white bg-blue-600 rounded-full">
                                        {user?.fullName?.charAt(0) || 'A'}
                                    </div>
                                )}
                                {!sidebarCollapsed && (
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {user?.fullName || 'Admin'}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate dark:text-gray-400">
                                            {user?.email || 'admin@lookatlocal.com'}
                                        </p>
                                    </div>
                                )}
                                {!sidebarCollapsed && (
                                    <button
                                        onClick={handleLogout}
                                        className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                                    >
                                        <LogOut className="w-4 h-4 text-gray-500" />
                                    </button>
                                )}
                            </div>
                            {sidebarCollapsed && (
                                <button
                                    onClick={handleLogout}
                                    className="flex justify-center w-full mt-3 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                                >
                                    <LogOut className="w-4 h-4 text-gray-500" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
                        }`}
                >
                    <header className="sticky top-0 z-20 bg-white border-b border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setMobileMenuOpen(true)}
                                    className="p-2 rounded-lg lg:hidden hover:bg-gray-100 dark:hover:bg-slate-700"
                                >
                                    <Menu className="w-5 h-5 text-gray-500" />
                                </button>
                                <div className="relative hidden sm:block">
                                    <Search className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-48 pr-3 text-sm text-gray-900 border border-gray-200 rounded-lg outline-none h-9 pl-9 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                                    <Bell className="w-5 h-5 text-gray-500" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>
                                <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 lg:hidden">
                                    <User className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-4 overflow-y-auto sm:p-6">
                        <Outlet />
                    </main>
                </div>
            </div>

            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminLayout;