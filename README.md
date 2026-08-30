# Look@Local

> A local-first community platform that connects people with nearby services, rentals, products, spaces, jobs, community updates, and emergency requests.

## Overview

Look@Local is a comprehensive local marketplace that brings multiple use cases into one integrated platform:

-   **Services** - Book local professionals
-   **Rentals** - Rent or lease items locally
-   **Buy & Sell** - Local marketplace for products
-   **Spaces** - Rent shops, offices, warehouses
-   **Jobs** - Local job listings and applications
-   **Community** - Local posts and updates
-   **Emergency Requests** - Community emergency assistance
-   **User Profiles** - Manage listings and reputation
-   **Admin Dashboard** - Platform management and analytics

The project uses **React** with **Vite** for the frontend, **Node.js** with **Express** for the backend, **Prisma** with **PostgreSQL** for data persistence, and **Cloudinary** for image management.

## Tech Stack

### Frontend

-   **React** 19 - UI library
-   **Vite** 8 - Build tool and dev server
-   **React Router** 7 - Client-side routing
-   **Redux Toolkit** - State management
-   **Tailwind CSS** - Styling
-   **Axios** - HTTP client
-   **React Hook Form** - Form management
-   **Framer Motion** - Animations
-   **Recharts** - Data visualization
-   **Socket.io Client** - Real-time communication
-   **Google Maps API** - Location services
-   **Lucide React** - Icon library
-   **React Hot Toast** - Notifications
-   **React Slick** - Carousel component

### Backend

-   **Node.js** - Runtime
-   **Express** 5 - Web framework
-   **Prisma** 7 - ORM and migrations
-   **PostgreSQL** - Database
-   **JWT** - Authentication
-   **bcrypt/bcryptjs** - Password hashing
-   **Resend** - Email delivery
-   **Cloudinary** - Image storage
-   **Multer** - File uploads
-   **Zod** - Data validation
-   **Helmet** - Security headers
-   **CORS** - Cross-origin requests
-   **Express Rate Limit** - Rate limiting
-   **Morgan** - HTTP logging

### Infrastructure

-   **GitHub** - Version control and repository
-   **Vercel** - Frontend hosting
-   **Render** - Backend hosting
-   **Neon PostgreSQL** - Cloud database
-   **Cloudinary** - Image and file storage
-   **Resend** - Email service

## Main Features

### 🏢 Services

Browse and manage local service listings with categories like:
Electrician, Plumber, Carpenter, Cleaning, Gardening, Appliance Repair

**Features:**
- Create, edit, and manage service listings
- Search and filter by location and category
- Service reviews and ratings
- Booking system with confirmation

### 🚗 Rentals

Discover and manage rental opportunities:
Tools, Machinery, Vehicles, Electronics, Event Equipment

**Features:**
- List rental items with availability
- Booking and scheduling
- Rental history and tracking
- Reviews and ratings

### 🛍️ Buy & Sell (Products)

Local marketplace for buying and selling products:
Electronics, Furniture, Appliances, Vehicles, Other

**Features:**
- Create and manage product listings
- Product images and descriptions
- Search and filtering
- Transaction management

### 🏠 Spaces

Rent commercial and residential spaces:
Shops, Offices, Warehouses, Storage units

**Features:**
- Space listings with amenities
- Unit management for multi-unit properties
- Availability calendar
- Booking and scheduling

### 💼 Jobs

Local job opportunities and applications

**Features:**
- Post and browse job listings
- Job categories and filtering
- Application tracking
- Applicant management

### 👥 Community

Local posts and community engagement

**Features:**
- Create and share community posts
- Local updates and alerts
- Community feed
- Engagement and discussions

### 🚨 Emergency Requests

Post and respond to emergency situations

**Features:**
- Create emergency requests
- Location-based assistance
- Request tracking
- Rapid response coordination

### 👤 User Accounts

Comprehensive user management

**Features:**
- Registration and email verification
- Login with JWT authentication
- User profiles with ratings
- Address management
- Password reset and change
- Public user profiles
- Favorite listings
- Points/Rewards system
- Transaction history

### ⚙️ Admin Dashboard

Platform management and analytics

**Features:**
- User management
- Listing approvals and moderation
- Analytics and reports
- Emergency request management
- Category management
- Platform settings
- Revenue reports
- Performance metrics

Admin routes are protected separately from normal user routes.

## Project Structure

``` text
LookAtLocal/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes.jsx
│   │   └── ...
│   ├── vercel.json
│   ├── package.json
│   └── ...
│
└── README.md
```

## Getting Started

### Prerequisites

Install on your system:
-   **Node.js** (v18 or higher) and npm
-   **PostgreSQL** (for local development)
-   **Git** for version control

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/SanathRai33/LookAtLocal.git
cd LookAtLocal
```

## Backend Setup

### Install dependencies:

```bash
cd backend
npm install
```

### Configure environment variables:

Create `backend/.env` file:

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/lookatlocal

# JWT
JWT_ACCESS_SECRET=your_access_secret_key_here
JWT_REFRESH_SECRET=your_refresh_secret_key_here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
REFRESH_COOKIE_MAX_AGE=604800000

# Password Reset
PASSWORD_RESET_EXPIRES_MINUTES=15

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Prisma setup:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed categories
npm run seed

# Check migration status
npx prisma migrate status

# Apply migrations to production
npx prisma migrate deploy
```

### Start the backend:

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

**API Base URL:** `http://localhost:5000/api/v1`

## Frontend Setup

### Install dependencies:

```bash
cd frontend
npm install
```

### Configure environment variables:

Create `frontend/.env` file:

```env
# API
VITE_API_URL=http://localhost:5000/api/v1

# Google Maps (optional)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_key
```

### Development:

```bash
npm run dev
```

Access at `http://localhost:5173`

### Production build:

```bash
npm run build
npm run preview
```

### Linting:

```bash
npm run lint
```

## API Architecture

### Backend Architecture

The backend follows a **modular, layered architecture**:

```
HTTP Request
    ↓
Express Server (src/server.js)
    ↓
Routes (src/modules/*/routes.js)
    ↓
Middlewares (src/middlewares/)
    ├─ Auth Middleware
    ├─ Authorization Middleware
    ├─ Validation Middleware
    ├─ Error Handler Middleware
    └─ Rate Limiting, CORS, Security
    ↓
Controllers (src/modules/*/controllers.js)
    ↓
Services (src/services/, business logic)
    ↓
Prisma ORM
    ↓
PostgreSQL Database
```

**Key Modules:**
- `auth/` - Authentication, JWT, password management
- `user/` - User profiles and management
- `service/` & `service-booking/` - Service listings and bookings
- `rental/` & `rental-booking/` - Rental management
- `product/` & `product-booking/` - Marketplace products
- `space/` & `job/` - Spaces and job listings
- `community/`, `emergency/` - Community features
- `notification/` - Email and in-app notifications
- `points/` - Rewards system
- `admin/` - Admin operations
- `review/` - Reviews and ratings

### Frontend Architecture

```
Component / Page (React)
    ↓
Redux Store (State Management)
    ↓
Custom Hooks (src/hooks/)
    ↓
API Service (src/api/)
    ↓
Axios HTTP Client
    ↓
Backend REST API
```

**Key Layers:**
- **Pages** - Route-based components
- **Components** - Reusable UI elements
- **Redux** - Global state management
- **Hooks** - Custom logic (useServices, useJobs, etc.)
- **API Services** - HTTP communication
- **Context** - Theme and Auth context

This separation ensures:
- Clean code organization
- Reusable components and logic
- Testable business logic
- Scalable architecture

## Authentication & Authorization

### JWT Flow

1. **Registration** → User creates account with email/password
2. **Login** → Backend validates credentials, issues JWT tokens
3. **Access Token** → Short-lived (15 min) for API requests
4. **Refresh Token** → Long-lived (7 days) stored in HTTP-only cookies
5. **Protected Routes** → Verified via `auth.middleware.js`
6. **Admin Routes** → Additional role check via `admin.middleware.js`

### Security Features

- Password hashing with bcryptjs
- JWT tokens with expiration
- HTTP-only cookies for refresh tokens
- CORS protection
- Helmet.js for security headers
- Rate limiting
- Request validation with Zod
- SQL injection protection via Prisma ORM

## Location & Geolocation

Look@Local prioritizes **local relevance** by leveraging location data:

**Location Data:**
- City, State, Postal Code
- Google Maps integration for coordinates
- Distance-based search and filtering

**Features:**
- Users set their home location during signup
- Listings sorted by proximity to user
- Location-based recommendations
- Emergency requests mapped by area
- Community posts filtered by locality

## Image Management

### Cloudinary Integration

- **Profile Images** - User avatars and covers
- **Listing Images** - Services, rentals, products, spaces
- **Gallery Support** - Multiple images per listing
- **Optimization** - Automatic resizing and compression
- **CDN** - Fast global delivery

Images are referenced by Cloudinary URLs stored in PostgreSQL, not embedded as files.

## Categories & Seeding

### Initial Data Setup

Categories are defined in [backend/prisma/seed.js](backend/prisma/seed.js) and include:

**Services:** Electrician, Plumber, Carpenter, Cleaning, Gardening, Appliance Repair

**Rentals:** Tools, Machinery, Vehicles, Electronics, Event Equipment

**Products:** Electronics, Furniture, Appliances, Vehicles, Other

**Jobs:** Skilled Work, Delivery, Sales, Office Work, Part Time

**Spaces:** Shops, Offices, Warehouses

Seed the database:

```bash
npm run seed
```

Uses Prisma `upsert` for safe category management.

## Production Deployment

### Backend on Render

Deployed at: **https://lookatlocal-api.onrender.com**

**Configuration:**
- Root Directory: `backend`
- Build Command: `npm install && npx prisma generate`
- Start Command: `npm start`
- Environment: Production `.env` variables

**Migrations:**
```bash
npx prisma migrate deploy
```

**Health Check:**
```
https://lookatlocal-api.onrender.com/api/v1/health
```

### Database on Neon

PostgreSQL hosted on **Neon** cloud platform.

Connection via `DATABASE_URL` in production environment.

### Frontend on Vercel

Deployed at: **https://lookatlocal.vercel.app**

**Build:** `npm run build`

**Environment Variable:**
```env
VITE_API_URL=https://lookatlocal-api.onrender.com/api/v1
```

### SPA Routing Configuration

Look@Local is a single-page application with client-side routing.

**Vercel Configuration** ([frontend/vercel.json](frontend/vercel.json)):

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures React Router handles all routes (e.g., `/services`, `/jobs`, `/admin`).

## Development Tips

### Environment Setup

1. Copy `.env.example` to `.env` in both `backend/` and `frontend/`
2. Fill in actual values for secrets and API keys
3. Never commit `.env` files

### Common Commands

```bash
# Backend
cd backend
npm run dev                    # Start dev server
npx prisma studio            # Open Prisma Studio
npm run seed                  # Seed database

# Frontend
cd frontend
npm run dev                   # Start dev server
npm run build                 # Build for production
npm run lint                  # Run ESLint
```

### Database Management

```bash
# View database with GUI
npx prisma studio

# Create migration
npx prisma migrate dev --name migration_name

# Reset database (dev only)
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## License

ISC License - See LICENSE file for details

## Support

For issues, questions, or contributions, please visit:
https://github.com/SanathRai33/LookAtLocal

## Useful Commands

### Backend

``` bash
npm install
npm run dev
npm start
npm run seed
npx prisma generate
npx prisma migrate dev
npx prisma migrate deploy
npx prisma migrate status
```

### Frontend

``` bash
npm install
npm run dev
npm run build
```

## Environment Variables

Do not commit:

``` text
.env
```

Use `.env.example` to document required variables.

Production secrets belong in the hosting provider's environment-variable
settings.

## Git Workflow

``` bash
git status
git add .
git commit -m "feat: description"
git push origin main
```

Changes pushed to the configured branch can trigger automatic
deployments on Vercel and Render.

## Current Deployment

  Part            Platform
  --------------- -----------------
  Frontend        Vercel
  Backend         Render
  Database        Neon PostgreSQL
  Image Storage   Cloudinary
  Source Code     GitHub

## Project Goal

Look@Local aims to make local discovery simpler by bringing useful
community services and opportunities into one platform.

Users should be able to find nearby services, rent items, buy and sell
products, discover spaces, find jobs, share community information, and
access emergency-related functionality from a single application.

## Author

**Sanath Rai**

Full Stack Developer

GitHub: https://github.com/SanathRai33/LookAtLocal

## License

This project is currently a personal project. Add an appropriate
open-source license before distributing it under a specific license.
