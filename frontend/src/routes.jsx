import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy load pages for better performance
const Landing = React.lazy(() => import('./pages/Dashboard'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));
const Services = React.lazy(() => import('./pages/Services/Services'));
const Rentals = React.lazy(() => import('./pages/Rentals/Rentals'));
const Marketplace = React.lazy(() => import('./pages/Market/Marketplace'));
const Properties = React.lazy(() => import('./pages/Properties/Properties'));
const Jobs = React.lazy(() => import('./pages/Jobs/Jobs'));
const Emergency = React.lazy(() => import('./pages/Emergency/Emergency'));
const Community = React.lazy(() => import('./pages/Community/Community'));
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const MyListings = React.lazy(() => import('./pages/MyListings/MyListings'));
// const Settings = React.lazy(() => import('./pages/Settings'));

// Admin Pages
// const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
// const AdminUsers = React.lazy(() => import('./pages/admin/Users'));
// const AdminListings = React.lazy(() => import('./pages/admin/Listings'));

export const routes = [
  // Public Routes
  // {
  //   path: '/',
  //   element: <MainLayout />,
  //   children: [
  //     { index: true, element: <Landing /> }, // Testing Page
  //   ]
  // },

  // Auth Routes
  {
    path: '/login',
    element: (<AuthLayout title="Welcome Back" subtitle="Sign in to your account"/> ),
    children: [
      { index: true, element: <Login /> },
    ],
  },
  {
    path: '/register',
    element: <AuthLayout title="Create Account" subtitle="Join the community" />,
    children: [
      { index: true, element: <Register /> }
    ]
  },

  // Protected User Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/services',
            element: <Services />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/rentals',
            element: <Rentals />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/marketplace',
            element: <Marketplace />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/properties',
            element: <Properties />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/jobs',
            element: <Jobs />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/emergency',
            element: <Emergency />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/community',
            element: <Community />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/my-listings',
            element: <MyListings />,
          },
        ],
      },
    ],
  },
  // {
  //   path: '/settings',
  //   element: <ProtectedRoute />,
  //   children: [
  //     { index: true, element: <MainLayout><Settings /></MainLayout> }
  //   ]
  // },

  // Admin Routes
  // {
  //   path: '/admin',
  //   element: <ProtectedRoute requireAdmin={true} />,
  //   children: [
  //     { index: true, element: <DashboardLayout><AdminDashboard /></DashboardLayout> }
  //   ]
  // },
  // {
  //   path: '/admin/users',
  //   element: <ProtectedRoute requireAdmin={true} />,
  //   children: [
  //     { index: true, element: <DashboardLayout><AdminUsers /></DashboardLayout> }
  //   ]
  // },
  // {
  //   path: '/admin/listings',
  //   element: <ProtectedRoute requireAdmin={true} />,
  //   children: [
  //     { index: true, element: <DashboardLayout><AdminListings /></DashboardLayout> }
  //   ]
  // },

  // 404 - Catch all
  // {
  //   path: '*',
  //   element: <Navigate to="/" replace />
  // }
];