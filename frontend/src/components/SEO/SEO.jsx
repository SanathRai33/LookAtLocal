import React from "react";
import { useLocation } from "react-router-dom";

export const SITE_NAME = "LookAtLocal";
export const BASE_URL = "https://lookatlocal.vercel.app";
export const LOGO_URL = `${BASE_URL}/logo.png`;

const routeMetadata = {
  "/": {
    title: "LookAtLocal - Connect With Your Local Community",
    description:
      "LookAtLocal is a local community platform to discover services, jobs, rentals, products, spaces and people around you.",
  },
  "/help": {
    title: "LookAtLocal Help - Get Help and Support",
    description:
      "Find answers, account guidance and support for using LookAtLocal.",
  },
  "/terms": {
    title: "LookAtLocal Terms of Service",
    description:
      "Read the terms and conditions that apply when you use LookAtLocal.",
  },
  "/privacy": {
    title: "LookAtLocal Privacy Policy",
    description:
      "Learn how LookAtLocal handles information, privacy preferences and account security.",
  },
  "/dashboard": {
    title: "LookAtLocal Dashboard",
    description:
      "Explore local services, jobs, rentals, products, spaces and community activity on LookAtLocal.",
  },
  "/services": {
    title: "Local Services - LookAtLocal",
    description:
      "Find trusted local professionals and services for your everyday needs.",
  },
  "/rentals": {
    title: "Local Rentals - LookAtLocal",
    description:
      "Discover local rental listings and connect with owners around you.",
  },
  "/jobs": {
    title: "Local Jobs - LookAtLocal",
    description:
      "Explore local job opportunities and connect with employers in your community.",
  },
  "/products": {
    title: "Local Marketplace - LookAtLocal",
    description:
      "Buy, sell and discover products from people in your local community.",
  },
  "/spaces": {
    title: "Local Spaces and Properties - LookAtLocal",
    description:
      "Find local spaces and properties for living, work, storage and more.",
  },
  "/community": {
    title: "Local Community - LookAtLocal",
    description:
      "Connect with local people, conversations and community updates on LookAtLocal.",
  },
  "/profile": {
    title: "Your Profile - LookAtLocal",
    description: "Manage your LookAtLocal profile and local community presence.",
  },
  "/settings": {
    title: "Account Settings - LookAtLocal",
    description:
      "Manage your LookAtLocal account, privacy and communication preferences.",
  },
  "/login": {
    title: "Sign In - LookAtLocal",
    description: "Sign in to your LookAtLocal account and connect locally.",
  },
  "/register": {
    title: "Create Your Account - LookAtLocal",
    description:
      "Create a LookAtLocal account to discover and connect with your local community.",
  },
  "/points": {
    title: "Community Points - LookAtLocal",
    description: "View and manage your LookAtLocal community points.",
  },
  "/notifications": {
    title: "Notifications - LookAtLocal",
    description: "Review your latest LookAtLocal notifications and updates.",
  },
  "/service-bookings": {
    title: "Service Bookings - LookAtLocal",
    description: "Manage your local service bookings on LookAtLocal.",
  },
  "/rental-bookings": {
    title: "Rental Bookings - LookAtLocal",
    description: "Manage your local rental bookings on LookAtLocal.",
  },
  "/product-bookings": {
    title: "Product Bookings - LookAtLocal",
    description: "Manage your local marketplace bookings on LookAtLocal.",
  },
  "/job-applications": {
    title: "Job Applications - LookAtLocal",
    description: "Track your local job applications on LookAtLocal.",
  },
  "/emergency": {
    title: "Emergency Requests - LookAtLocal",
    description: "View and manage local emergency requests on LookAtLocal.",
  },
};

const detailPathPattern = /^\/(services|rentals|jobs|products|spaces)\/[^/]+$/;

const getCanonicalUrl = (canonical) => {
  if (!canonical) return `${BASE_URL}/`;
  if (canonical.startsWith("http")) return canonical;
  return `${BASE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`;
};

const getImageUrl = (image) => {
  if (typeof image === "string") return image;
  return image?.imageUrl || image?.url || LOGO_URL;
};

const SEO = ({
  title,
  description,
  canonical,
  image = LOGO_URL,
  type = "website",
  structuredData,
}) => {
  const canonicalUrl = getCanonicalUrl(canonical);
  const imageUrl = getImageUrl(image);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </>
  );
};

export const RouteSEO = () => {
  const { pathname } = useLocation();

  if (detailPathPattern.test(pathname)) return null;

  const metadata = routeMetadata[pathname] || {
    title: "LookAtLocal - Connect Locally",
    description:
      "Discover local services, jobs, rentals, products, spaces and people with LookAtLocal.",
  };

  const structuredData = pathname === "/"
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            name: SITE_NAME,
            url: `${BASE_URL}/`,
            logo: LOGO_URL,
          },
          {
            "@type": "WebSite",
            name: SITE_NAME,
            url: `${BASE_URL}/`,
            publisher: { "@type": "Organization", name: SITE_NAME },
          },
        ],
      }
    : undefined;

  return (
    <SEO
      title={metadata.title}
      description={metadata.description}
      canonical={pathname}
      structuredData={structuredData}
    />
  );
};

export default SEO;