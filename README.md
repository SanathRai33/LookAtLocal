# Look@Local

> A local-first community platform that connects people with nearby
> services, rentals, products, spaces, jobs, community updates, and
> emergency requests.

## Overview

Look@Local brings multiple local-use cases into one platform:

-   Services
-   Rentals
-   Buy & Sell
-   Spaces / Properties
-   Jobs
-   Community
-   Emergency requests
-   User profiles and listings
-   Admin management

The project uses React and Vite for the frontend, Node.js and Express
for the backend, Prisma with PostgreSQL for data access, and Cloudinary
for image storage.

## Tech Stack

### Frontend

-   React
-   Vite
-   React Router
-   Tailwind CSS
-   Axios
-   Lucide React

### Backend

-   Node.js
-   Express
-   Prisma
-   PostgreSQL
-   JWT
-   Nodemailer
-   Cloudinary
-   Multer
-   Zod
-   Helmet
-   CORS
-   Express Rate Limit
-   Morgan

### Infrastructure

-   GitHub
-   Vercel
-   Render
-   Neon PostgreSQL
-   Cloudinary

## Main Features

### Services

Users can browse, create, edit, and manage local service listings.

Categories include:

-   Electrician
-   Plumber
-   Carpenter
-   Cleaning
-   Gardening
-   Appliance Repair

### Rentals

Users can discover and manage rental listings for items such as tools,
machinery, vehicles, electronics, and event equipment.

### Buy & Sell

Users can create and manage marketplace listings.

Categories include:

-   Electronics
-   Furniture
-   Appliances
-   Vehicles
-   Other

### Spaces

Users can discover and manage spaces such as:

-   Shops
-   Offices
-   Warehouses

The platform also supports space unit management.

### Jobs

Users can browse and manage local job listings.

Categories include:

-   Skilled Work
-   Delivery
-   Sales
-   Office Work
-   Part Time

### Community

Users can create and manage community posts for local information and
alerts.

### Emergency

Users can create and manage emergency requests.

### User Accounts

The application includes:

-   Registration
-   Login
-   Protected routes
-   User profiles
-   Profile editing
-   Address management
-   Complete-address flow
-   Password reset
-   Change password
-   Email verification
-   Public profiles
-   User listings

Location is an important part of the platform because local relevance is
one of its core goals.

### Admin

The admin area includes:

-   Admin dashboard
-   User management
-   Listing approvals
-   Analytics
-   Emergency requests
-   Reports
-   Categories
-   Admin settings

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

Install:

-   Node.js
-   npm
-   PostgreSQL for local development

### Clone

``` bash
git clone https://github.com/SanathRai33/LookAtLocal.git
cd LookAtLocal
```

## Backend Setup

``` bash
cd backend
npm install
```

Create:

``` text
backend/.env
```

Example:

``` env
NODE_ENV=development
PORT=5000

DATABASE_URL=your_database_url

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
REFRESH_COOKIE_MAX_AGE=604800000

PASSWORD_RESET_EXPIRES_MINUTES=15

SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=your_email

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit real credentials.

### Prisma

Generate the Prisma client:

``` bash
npx prisma generate
```

Run local migrations:

``` bash
npx prisma migrate dev
```

Check migration status:

``` bash
npx prisma migrate status
```

Apply production migrations:

``` bash
npx prisma migrate deploy
```

Seed categories:

``` bash
npm run seed
```

### Start Backend

Development:

``` bash
npm run dev
```

Production:

``` bash
npm start
```

Local API:

``` text
http://localhost:5000/api/v1
```

## Frontend Setup

``` bash
cd frontend
npm install
```

Create:

``` text
frontend/.env
```

Example:

``` env
VITE_API_URL=http://localhost:5000/api/v1
```

Start:

``` bash
npm run dev
```

Build:

``` bash
npm run build
```

## API Architecture

The backend follows a modular request flow:

``` text
Frontend
   ↓
API
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Prisma
   ↓
PostgreSQL
```

The frontend generally follows:

``` text
Component / Page
   ↓
Hook
   ↓
API Service
   ↓
Backend API
```

This keeps UI, API communication, and business logic separated.

## Authentication

The application separates:

-   Authentication routes
-   Protected user routes
-   Admin routes

Admin routes require administrator privileges.

## Location

Location data can include:

-   City
-   State
-   Postal code

Listings can be prioritized according to the user's location so that
locally relevant content appears first.

## Images

Listing and profile images are handled using Cloudinary. Image URLs are
stored with the relevant application data instead of storing image files
directly in PostgreSQL.

## Categories

Initial categories are defined in:

``` text
backend/prisma/seed.js
```

The seed uses Prisma `upsert`, allowing categories to be inserted or
updated safely.

## Production Deployment

### Backend --- Render

The backend is deployed on Render.

Production API:

``` text
https://lookatlocal-api.onrender.com
```

Health endpoint:

``` text
https://lookatlocal-api.onrender.com/api/v1/health
```

Typical Render configuration:

``` text
Root Directory: backend
Build Command: npm install && npx prisma generate
Start Command: npm start
```

Production environment variables must be configured in Render.

### Database --- Neon

The production PostgreSQL database is hosted on Neon.

Apply migrations:

``` bash
npx prisma migrate deploy
```

### Frontend --- Vercel

The frontend is deployed on Vercel.

Production API variable:

``` env
VITE_API_URL=https://lookatlocal-api.onrender.com/api/v1
```

## React Router on Vercel

Look@Local is a React single-page application. Direct access and
refreshes on routes such as:

``` text
/services
/rentals
/products
/jobs
/spaces
/community
/emergency
/admin
/admin/users
```

require Vercel to serve the React entry point.

The frontend contains:

``` text
frontend/vercel.json
```

with:

``` json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

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
