import {
  BriefcaseBusiness,
  Eye,
  Heart,
  MessageSquare,
  Plus,
  Search,
  User,
  Star,
  CheckCircle2,
} from 'lucide-react';

export const profileUser = {
  name: 'Arjun Mehta',
  avatar: 'https://i.pravatar.cc/150?img=12',
  unreadMessages: 7,
  newListingViews: 3,
};

export const profileStats = [
  {
    id: 1,
    title: 'Active Listings',
    value: 12,
    change: '+2',
    icon: BriefcaseBusiness,
    iconClass: 'text-blue-600',
    iconBg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  {
    id: 2,
    title: 'Profile Views',
    value: 248,
    change: '+18%',
    icon: Eye,
    iconClass: 'text-purple-600',
    iconBg: 'bg-purple-50 dark:bg-purple-950/40',
  },
  {
    id: 3,
    title: 'Messages',
    value: 7,
    change: '3 unread',
    icon: MessageSquare,
    iconClass: 'text-emerald-600',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  {
    id: 4,
    title: 'Saved Items',
    value: 34,
    change: '+5',
    icon: Heart,
    iconClass: 'text-red-500',
    iconBg: 'bg-red-50 dark:bg-red-950/40',
  },
];

export const quickActions = [
  {
    id: 1,
    label: 'Post Listing',
    icon: Plus,
    to: '/listings/create',
    bg: 'bg-slate-950 dark:bg-slate-800',
  },
  {
    id: 2,
    label: 'Find Service',
    icon: Search,
    to: '/services',
    bg: 'bg-emerald-500',
  },
  {
    id: 3,
    label: 'Find Jobs',
    icon: BriefcaseBusiness,
    to: '/jobs',
    bg: 'bg-indigo-500',
  },
  {
    id: 4,
    label: 'Messages',
    icon: MessageSquare,
    to: '/messages',
    bg: 'bg-orange-500',
  },
  {
    id: 5,
    label: 'Favorites',
    icon: Heart,
    to: '/favorites',
    bg: 'bg-red-500',
  },
  {
    id: 6,
    label: 'My Profile',
    icon: User,
    to: '/profile/edit',
    bg: 'bg-purple-500',
  },
];

export const opportunities = [
  {
    id: 1,
    category: 'Services',
    title: 'AC Repair – Andheri',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    price: '₹499',
  },
  {
    id: 2,
    category: 'Rentals',
    title: 'DSLR Camera Rental',
    image:
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    price: '₹650/day',
  },
];

export const recentActivities = [
  {
    id: 1,
    text: 'Priya viewed your ‘Sofa Set’ listing',
    time: '5 min ago',
    icon: Eye,
    iconClass: 'text-blue-600',
  },
  {
    id: 2,
    text: 'New message from Rohan Nair',
    time: '23 min ago',
    icon: MessageSquare,
    iconClass: 'text-emerald-500',
  },
  {
    id: 3,
    text: 'Someone saved your ‘AC Repair’ listing',
    time: '1 hr ago',
    icon: Heart,
    iconClass: 'text-red-500',
  },
  {
    id: 4,
    text: "Your listing 'Office Space' was approved",
    time: '3 hrs ago',
    icon: CheckCircle2,
    iconClass: 'text-emerald-500',
  },
  {
    id: 5,
    text: 'You received a 5-star review from Kavitha',
    time: 'Yesterday',
    icon: Star,
    iconClass: 'text-orange-500',
  },
];

export const profileStrength = {
  percentage: 72,
  tasks: [
    {
      id: 1,
      label: 'Add profile photo',
      completed: true,
    },
    {
      id: 2,
      label: 'Verify mobile number',
      completed: true,
    },
    {
      id: 3,
      label: 'Add bio & skills',
      completed: false,
    },
    {
      id: 4,
      label: 'Upload ID proof',
      completed: false,
    },
  ],
};