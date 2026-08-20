import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';

const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const ForgotPassword = React.lazy(() => import('./pages/Auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/Auth/ResetPassword'));
const ChangePassword = React.lazy(() => import('./pages/Auth/ChangePassword'));
const VerifyEmail = React.lazy(() => import('./pages/Auth/VerifyEmail'));
const Dashboard = React.lazy(() => import('./pages/Dashboard/Dashboard'));

// Services
const Services = React.lazy(() => import('./pages/Services/Services'));
const CreateService = React.lazy(() => import('./pages/Services/CreateService'));
const ServiceDetail = React.lazy(() => import('./pages/Services/ServiceDetails'));
const MyServices = React.lazy(() => import('./pages/Services/MyServices'));
const EditService = React.lazy(() => import('./pages/Services/EditService'));

// Rental
const Rentals = React.lazy(() => import('./pages/Rentals/Rentals'));
const CreateRental = React.lazy(() => import('./pages/Rentals/CreateRental'));
const RentalDetail = React.lazy(() => import('./pages/Rentals/RentalDetails'));
const MyRentals = React.lazy(() => import('./pages/Rentals/MyRentals'));
const EditRental = React.lazy(() => import('./pages/Rentals/EditRental'));

// Jobs
const Jobs = React.lazy(() => import('./pages/Jobs/Jobs'));
const CreateJob = React.lazy(() => import('./pages/Jobs/CreateJob'));
const JobDetails = React.lazy(() => import('./pages/Jobs/JobDetails'));
const MyJobs = React.lazy(() => import('./pages/Jobs/MyJobs'));
const EditJob = React.lazy(() => import('./pages/Jobs/EditJob'));

// Product/Market
const Product = React.lazy(() => import('./pages/Product/Product'));
const ProductDetails = React.lazy(() => import('./pages/Product/ProductDetails'));
const CreateProduct = React.lazy(() => import('./pages/Product/CreateProduct'));
const EditProduct = React.lazy(() => import('./pages/Product/EditProduct'));
const MyProducts = React.lazy(() => import('./pages/Product/MyProducts'));

// Space/Property
const Spaces = React.lazy(() => import('./pages/Spaces/Spaces'));
const SpaceDetails = React.lazy(() => import('./pages/Spaces/SpaceDetails'));
const MySpaces = React.lazy(() => import('./pages/Spaces/MySpaces'));
const CreateSpace = React.lazy(() => import('./pages/Spaces/CreateSpace'));
const EditSpace = React.lazy(() => import('./pages/Spaces/EditSpace'));
const ManageSpaceUnits = React.lazy(() => import('./pages/Spaces/ManageSpaceUnits'));

// Community
const Community = React.lazy(() => import('./pages/Community/Community'));
const CreateCommunityPost = React.lazy(() => import('./pages/Community/CreateCommunityPost'));
const EditCommunityPost = React.lazy(() => import('./pages/Community/EditCommunityPost'));

// Emergency
const Emergency = React.lazy(() => import('./pages/Emergency/Emergency'));
const CreateEmergency = React.lazy(() => import('./pages/Emergency/CreateEmergency'));
const EditEmergency = React.lazy(() => import('./pages/Emergency/EditEmergency'));

// Profile
const Profile = React.lazy(() => import('./pages/Profile/Profile'));
const EditProfile = React.lazy(() => import('./pages/Profile/EditProfile'));
const EditAddress = React.lazy(() => import('./pages/Profile/EditAddress'));
const MyListings = React.lazy(() => import('./pages/MyListings/MyListings'));
const CreatePost = React.lazy(() => import('./pages/Profile/CreatePost'));
const MyPosts = React.lazy(() => import('./pages/Profile/MyPosts'));
const CompleteAdress = React.lazy(() => import('./pages/Profile/CompleteAddress'));
const PublicProfile = React.lazy(() => import('./pages/Profile/PublicProfile'));

// Setting
const Settings = React.lazy(() => import('./pages/Settings/Settings'));
const SettingsVerifyEmail = React.lazy(() => import('./pages/Settings/SettingsVerifyEmail'));
const EmailSettings = React.lazy(() => import('./pages/Settings/EmailSettings'));
const PhoneSettings = React.lazy(() => import('./pages/Settings/PhoneSettings'));
const PrivacySettings = React.lazy(() => import('./pages/Settings/PrivacySettings'));
const DeleteAccount = React.lazy(() => import('./pages/Settings/DeleteAccount'));
const ReactivateAccount = React.lazy(() => import('./pages/Settings/ReactivateAccount'));

// Admin Pages
const AdminLayout = React.lazy(() => import('./components/layout/AdminLayout'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/AdminDashboard'));
const UserManagement = React.lazy(() => import('./pages/Admin/UserManagement'));
const ListingApprovals = React.lazy(() => import('./pages/Admin/ListingApprovals'));
const Analytics = React.lazy(() => import('./pages/Admin/Analytics'));
const EmergencyRequests = React.lazy(() => import('./pages/Admin/EmergencyRequests'));
const Reports = React.lazy(() => import('./pages/Admin/Reports'));
const Categories = React.lazy(() => import('./pages/Admin/Categories'));
const AdminSettings = React.lazy(() => import('./pages/Admin/AdminSettings'));

// Public Pages
const Help = React.lazy(() => import('./pages/Public/Help'));
const Terms = React.lazy(() => import('./pages/Public/Terms'));
const PrivacyPolicy = React.lazy(() => import('./pages/Public/Privacy'));

// Not Found
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'));

export const routes = [

  // Auth Routes
  {
    path: '/login',
    element: (<AuthLayout title="Welcome Back" subtitle="Sign in to your account" />),
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
  {
    path: '/forgot-password',
    element: <AuthLayout title="Create Account" subtitle="Join the community" />,
    children: [
      { index: true, element: <ForgotPassword /> }
    ]
  },
  {
    path: '/reset-password',
    element: <AuthLayout title="Create Account" subtitle="Join the community" />,
    children: [
      { index: true, element: <ResetPassword /> }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        children: [
          {
            path: "/verify-email",
            element: <VerifyEmail />,
          },
        ],
      },
    ],
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
            path: '/profile/edit-info',
            element: <EditProfile />,
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
            path: '/profile/edit-address',
            element: <EditAddress />,
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
            path: '/create',
            element: <CreatePost />,
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
            path: '/my-posts',
            element: <MyPosts />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/complete-address',
        element: <CompleteAdress />,
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
            path: '/users/:userId',
            element: <PublicProfile />,
          },
        ],
      },
    ],
  },

  // Service routes
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
            path: '/services/create',
            element: <CreateService />,
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
            path: '/services/my-services',
            element: <MyServices />,
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
            path: '/services/:serviceId',
            element: <ServiceDetail />,
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
            path: 'services/edit/:serviceId',
            element: <EditService />,
          },
        ],
      },
    ],
  },

  // Rental routes
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
            path: '/rentals/create',
            element: <CreateRental />,
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
            path: '/rentals/my-rentals',
            element: <MyRentals />,
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
            path: '/rentals/:rentalId',
            element: <RentalDetail />,
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
            path: 'rentals/edit/:rentalId',
            element: <EditRental />,
          },
        ],
      },
    ],
  },

  // Produt/Market routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/products',
            element: <Product />,
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
            path: '/product/create',
            element: <CreateProduct />,
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
            path: '/products/my-products',
            element: <MyProducts />,
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
            path: '/product/:productId',
            element: <ProductDetails />,
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
            path: 'product/edit/:productId',
            element: <EditProduct />,
          },
        ],
      },
    ],
  },

  // Job routes
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
            path: '/jobs/create',
            element: <CreateJob />,
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
            path: '/jobs/my-jobs',
            element: <MyJobs />,
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
            path: '/jobs/:jobId',
            element: <JobDetails />,
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
            path: 'jobs/edit/:jobId',
            element: <EditJob />,
          },
        ],
      },
    ],
  },


  // Space/Property routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/spaces',
            element: <Spaces />,
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
            path: '/spaces/:spaceId',
            element: <SpaceDetails />,
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
            path: '/spaces/my-spaces',
            element: <MySpaces />,
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
            path: '/spaces/create',
            element: <CreateSpace />,
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
            path: '/spaces/edit/:spaceId',
            element: <EditSpace />,
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
            path: '/spaces/:spaceId/units',
            element: <ManageSpaceUnits />,
          },
        ],
      },
    ],
  },


  // Community
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
            path: '/community/create',
            element: <CreateCommunityPost />,
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
            path: '/community/edit/:postId',
            element: <EditCommunityPost />,
          },
        ],
      },
    ],
  },


  // Emergency
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
            path: '/emergency/create',
            element: <CreateEmergency />,
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
            path: '/emergency/edit/:emergencyId',
            element: <EditEmergency />,
          },
        ],
      },
    ],
  },

  // Settings Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/settings',
            element: <Settings />,
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
            path: '/settings/change-password',
            element: <ChangePassword />,
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
            path: '/settings/verify-email',
            element: <SettingsVerifyEmail />,
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
            path: '/settings/email',
            element: <EmailSettings />,
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
            path: '/settings/phone',
            element: <PhoneSettings />,
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
            path: '/setting/privacy',
            element: <PrivacySettings />,
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
            path: '/settings/delete-account',
            element: <DeleteAccount />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        children: [
          {
            path: "/settings/reactivate-account",
            element: <ReactivateAccount />,
          },
        ],
      },
    ],
  },



  // Admin Routes
  {
    path: '/admin',
    element: <ProtectedRoute requireAdmin={true} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'users', element: <UserManagement /> },
          { path: 'listings', element: <ListingApprovals /> },
          { path: 'analytics', element: <Analytics /> },
          { path: 'emergency', element: <EmergencyRequests /> },
          { path: 'reports', element: <Reports /> },
          { path: 'categories', element: <Categories /> },
          { path: 'settings', element: <AdminSettings /> },
        ],
      },
    ],
  },

  // Public Routes
  {
    path: '/help',
    element: <Help />,
  },
    {
    path: '/terms',
    element: <Terms />,
  },
    {
    path: '/privacy',
    element: <PrivacyPolicy />,
  },

  // 404 - Catch all
  {
    path: '*',
    element: <NotFound />,
  },
];