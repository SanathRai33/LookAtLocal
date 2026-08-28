import React from 'react';
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

// Service Bookings
const ReceivedServiceBookings = React.lazy(() => import('./pages/ServiceBookings/ReceivedBookings'));
const MyBookedServices = React.lazy(() => import('./pages/ServiceBookings/MyBookings'));


// Rental
const Rentals = React.lazy(() => import('./pages/Rentals/Rentals'));
const CreateRental = React.lazy(() => import('./pages/Rentals/CreateRental'));
const RentalDetail = React.lazy(() => import('./pages/Rentals/RentalDetails'));
const MyRentals = React.lazy(() => import('./pages/Rentals/MyRentals'));
const EditRental = React.lazy(() => import('./pages/Rentals/EditRental'));

// Rental Booking
const ReceivedRentalBookings = React.lazy(() => import('./pages/RentalBookings/ReceivedRentalBookings'));
const MyRentalBookings = React.lazy(() => import('./pages/RentalBookings/MyRentalBookings'));


// Jobs
const Jobs = React.lazy(() => import('./pages/Jobs/Jobs'));
const CreateJob = React.lazy(() => import('./pages/Jobs/CreateJob'));
const JobDetails = React.lazy(() => import('./pages/Jobs/JobDetails'));
const MyJobs = React.lazy(() => import('./pages/Jobs/MyJobs'));
const EditJob = React.lazy(() => import('./pages/Jobs/EditJob'));

// Job Application 
const ReceivedJobApplications = React.lazy(() => import('./pages/JobApplication/ReceivedApplications'));
const MyJobApplications = React.lazy(() => import('./pages/JobApplication/MyApplications'));


// Product/Market
const Product = React.lazy(() => import('./pages/Product/Product'));
const ProductDetails = React.lazy(() => import('./pages/Product/ProductDetails'));
const CreateProduct = React.lazy(() => import('./pages/Product/CreateProduct'));
const EditProduct = React.lazy(() => import('./pages/Product/EditProduct'));
const MyProducts = React.lazy(() => import('./pages/Product/MyProducts'));

// Product Booking
const ReceivedProductBookings = React.lazy(() => import('./pages/ProductBookings/ReceivedProductBookings'));
const MyProductBookings = React.lazy(() => import('./pages/ProductBookings/MyProductBookings'));


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
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },

  // Protected Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/complete-address",
        element: <CompleteAdress />,
      },
    ],
  },

  // Protected Routes with Main Layout
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          // Dashboard
          { path: '/', element: <Dashboard /> },

          // User
          { path: '/users/:userId', element: <PublicProfile /> },

          // Posts
          { path: '/create', element: <CreatePost /> },
          { path: '/my-posts', element: <MyPosts /> },

          // Profile
          {
            path: "/profile",
            children: [
              { index: true, element: <Profile /> },
              { path: "edit-info", element: <EditProfile /> },
              { path: "edit-address", element: <EditAddress /> },
            ],
          },

          // Services
          {
            path: "/services",
            children: [
              { index: true, element: <Services /> },
              { path: "create", element: <CreateService /> },
              { path: "my-services", element: <MyServices /> },
              { path: ":serviceId", element: <ServiceDetail /> },
              { path: "edit/:serviceId", element: <EditService /> },
            ],
          },

          // Services-Bookings
          {
            path: "/service-bookings",
            children: [
              { index: true, element: <MyBookedServices /> },
              { path: "received", element: <ReceivedServiceBookings /> },
              // { path: "my-services", element: <MyServices /> },
              // { path: ":serviceId", element: <ServiceDetail /> },
              // { path: "edit/:serviceId", element: <EditService /> },
            ],
          },

          // Rentals
          {
            path: "/rentals",
            children: [
              { index: true, element: <Rentals /> },
              { path: "create", element: <CreateRental /> },
              { path: "my-rentals", element: <MyRentals /> },
              { path: ":rentalId", element: <RentalDetail /> },
              { path: "edit/:rentalId", element: <EditRental /> },
            ],
          },

          // Services-Bookings
          {
            path: "/rental-bookings",
            children: [
              { index: true, element: <MyRentalBookings /> },
              { path: "received", element: <ReceivedRentalBookings /> },
            ],
          },

          // Products
          {
            path: "/products",
            children: [
              { index: true, element: <Product /> },
              { path: "create", element: <CreateProduct /> },
              { path: "my-products", element: <MyProducts /> },
              { path: ":productId", element: <ProductDetails /> },
              { path: "edit/:productId", element: <EditProduct /> },
            ],
          },

          // Product-Bookings
          {
            path: "/product-bookings",
            children: [
              { index: true, element: <MyProductBookings /> },
              { path: "received", element: <ReceivedProductBookings /> },
            ],
          },

          // Jobs
          {
            path: "/jobs",
            children: [
              { index: true, element: <Jobs /> },
              { path: "create", element: <CreateJob /> },
              { path: "my-jobs", element: <MyJobs /> },
              { path: ":jobId", element: <JobDetails /> },
              { path: "edit/:jobId", element: <EditJob /> },
            ],
          },

          // Job-Applications
          {
            path: "/job-applications",
            children: [
              { index: true, element: <MyJobApplications /> },
              { path: "received", element: <ReceivedJobApplications /> },
            ],
          },

          // Space/Property routes
          {
            path: "/spaces",
            children: [
              { index: true, element: <Spaces /> },
              { path: ":spaceId", element: <SpaceDetails /> },
              { path: "my-spaces", element: <MySpaces /> },
              { path: "create", element: <CreateSpace /> },
              { path: "edit/:spaceId", element: <EditSpace /> },
              { path: ":spaceId/units", element: <ManageSpaceUnits /> },
            ],
          },

          // Community
          {
            path: "/community",
            children: [
              { index: true, element: <Community /> },
              { path: "create", element: <CreateCommunityPost /> },
              { path: "edit/:postId", element: <EditCommunityPost /> },
            ],
          },

          // Emergency
          {
            path: "/emergency",
            children: [
              { index: true, element: <Emergency /> },
              { path: "create", element: <CreateEmergency /> },
              { path: "edit/:emergencyId", element: <EditEmergency /> },
            ],
          },

          // Settings
          {
            path: "/settings",
            children: [
              { index: true, element: <Settings /> },
              { path: "change-password", element: <ChangePassword /> },
              { path: "verify-email", element: <SettingsVerifyEmail /> },
              { path: "email", element: <EmailSettings /> },
              { path: "phone", element: <PhoneSettings /> },
              { path: "privacy", element: <PrivacySettings /> },
              { path: "delete-account", element: <DeleteAccount /> },
              { path: "reactivate-account", element: <ReactivateAccount /> },
            ],
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