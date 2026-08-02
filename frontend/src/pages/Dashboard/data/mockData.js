import {
  Wrench,
  Repeat2,
  ShoppingBag,
  Building2,
  BriefcaseBusiness,
  Siren,
  Megaphone,
} from 'lucide-react';

export const categories = [
  {
    id: 1,
    title: 'Local Services',
    description: 'Plumbers, electricians, cleaners & more',
    icon: Wrench,
    path: '/services',
    iconClass: 'text-blue-600',
    bgClass: 'bg-blue-50 dark:bg-blue-950/40',
  },
  {
    id: 2,
    title: 'Rental Marketplace',
    description: 'Tools, vehicles & equipment for rent',
    icon: Repeat2,
    path: '/rentals',
    iconClass: 'text-purple-600',
    bgClass: 'bg-purple-50 dark:bg-purple-950/40',
  },
  {
    id: 3,
    title: 'Buy & Sell',
    description: 'Local marketplace for goods',
    icon: ShoppingBag,
    path: '/marketplace',
    iconClass: 'text-orange-600',
    bgClass: 'bg-orange-50 dark:bg-orange-950/40',
  },
  {
    id: 4,
    title: 'Space Availability',
    description: 'Shops, offices, rooms & PGs',
    icon: Building2,
    path: '/properties',
    iconClass: 'text-teal-600',
    bgClass: 'bg-teal-50 dark:bg-teal-950/40',
  },
  {
    id: 5,
    title: 'Local Jobs',
    description: 'Find work in your neighborhood',
    icon: BriefcaseBusiness,
    path: '/jobs',
    iconClass: 'text-indigo-600',
    bgClass: 'bg-indigo-50 dark:bg-indigo-950/40',
  },
  {
    id: 6,
    title: 'Emergency Help',
    description: 'Blood, medical & volunteer support',
    icon: Siren,
    path: '/emergency',
    iconClass: 'text-red-600',
    bgClass: 'bg-red-50 dark:bg-red-950/40',
  },
  {
    id: 7,
    title: 'Notice Board',
    description: 'Community updates & announcements',
    icon: Megaphone,
    path: '/community',
    iconClass: 'text-amber-600',
    bgClass: 'bg-amber-50 dark:bg-amber-950/40',
  },
];

export const featuredListings = [
  {
    id: 1,
    category: 'Services',
    title: 'Professional AC Repair',
    location: 'Andheri, Mumbai',
    rating: 4.8,
    reviews: 124,
    price: '₹499',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    category: 'Rentals',
    title: 'Canon DSLR – Daily Rent',
    location: 'Koramangala, Bengaluru',
    rating: 4.9,
    reviews: 87,
    price: '₹650/day',
    image:
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    category: 'Buy & Sell',
    title: 'Sofa Set – Barely Used',
    location: 'Powai, Mumbai',
    rating: 4.6,
    reviews: 33,
    price: '₹8,000',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    category: 'Spaces',
    title: 'Furnished Office Space',
    location: 'HSR Layout, Bengaluru',
    rating: 4.7,
    reviews: 19,
    price: '₹22K/mo',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80',
  },
];

export const services = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    service: 'Electrical Repairs',
    rating: 4.9,
    reviews: 201,
    distance: '1.2 km',
    price: '₹350/hr',
    badge: 'Top Rated',
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 2,
    name: 'Kavitha Devi',
    service: 'House Cleaning',
    rating: 4.7,
    reviews: 156,
    distance: '0.8 km',
    price: '₹800/visit',
    badge: 'Available',
    image: 'https://i.pravatar.cc/150?img=47',
  },
  {
    id: 3,
    name: 'Arjun Plumbing',
    service: 'Plumbing Works',
    rating: 4.6,
    reviews: 98,
    distance: '2.1 km',
    price: '₹400/hr',
    image: 'https://i.pravatar.cc/150?img=11',
  },
];

export const testimonials = [
  {
    id: 1,
    rating: 5,
    quote:
      'Found an amazing plumber within 2 hours. The experience was seamless and totally trustworthy!',
    name: 'Priya Sharma',
    role: 'Homeowner, Bandra',
    image: 'https://i.pravatar.cc/150?img=45',
  },
  {
    id: 2,
    rating: 5,
    quote:
      'Rented a commercial space through Look@Local. Saved me months of searching through brokers.',
    name: 'Rohan Nair',
    role: 'Business Owner, Koramangala',
    image: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 3,
    rating: 4,
    quote:
      'Got my first local client through the Jobs section. The platform really connects the community.',
    name: 'Divya Menon',
    role: 'Freelancer, Powai',
    image: 'https://i.pravatar.cc/150?img=32',
  },
];