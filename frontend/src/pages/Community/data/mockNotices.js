export const mockNotices = [
  {
    id: 1,
    title: "Society Maintenance Work – 15th July",
    category: "Notice",
    categoryIcon: "📢",
    type: "Notice",
    isPinned: true,
    location: "Raheja Complex",
    description: "There will be a water supply disruption from 9 AM to 2 PM on 15th July due to maintenance. Kindly store water in advance.",
    postedBy: "RWA Admin",
    postedByInitials: "RA",
    postedDate: "2 hours ago",
    community: "Raheja Complex",
    helpful: 24,
    shares: 8,
    comments: 12,
    image: null,
    tags: ["Maintenance", "Water Supply", "Society"],
    isUrgent: true
  },
  {
    id: 2,
    title: "Ganesh Utsav Celebration – Register by 10th",
    category: "Event",
    categoryIcon: "🎉",
    type: "Event",
    isPinned: false,
    location: "Hiranandani Gardens",
    description: "Annual Ganesh festival celebrations will be held from 18–27 July. All residents are invited. Register your participation.",
    postedBy: "Cultural Committee",
    postedByInitials: "CC",
    postedDate: "1 day ago",
    community: "Hiranandani Gardens",
    helpful: 45,
    shares: 23,
    comments: 18,
    image: null,
    tags: ["Festival", "Ganesh Utsav", "Cultural"],
    isUrgent: false
  },
  {
    id: 3,
    title: "Found: Black Labrador near Park",
    category: "Lost & Found",
    categoryIcon: "🐕",
    type: "Lost & Found",
    isPinned: false,
    location: "Powai",
    description: "Found a friendly Labrador near the garden gate. Has a red collar but no ID tag. Contact to claim.",
    postedBy: "Suresh V.",
    postedByInitials: "SV",
    postedDate: "3 days ago",
    community: "Powai",
    helpful: 18,
    shares: 45,
    comments: 7,
    image: null,
    tags: ["Pet", "Labrador", "Found"],
    isUrgent: true
  },
  {
    id: 4,
    title: "Parking Policy Update – Effective 1st Aug",
    category: "Notice",
    categoryIcon: "📢",
    type: "Notice",
    isPinned: true,
    location: "Green Valley Apts",
    description: "Visitor parking will now be limited to 2 hours between 6 PM – 10 PM. Violations will be fined.",
    postedBy: "Residents Association",
    postedByInitials: "RA",
    postedDate: "5 days ago",
    community: "Green Valley Apts",
    helpful: 56,
    shares: 34,
    comments: 21,
    image: null,
    tags: ["Parking", "Policy", "Society"],
    isUrgent: false
  },
  {
    id: 5,
    title: "Weekly Yoga Classes Starting",
    category: "Event",
    categoryIcon: "🧘",
    type: "Event",
    isPinned: false,
    location: "Bandra, Mumbai",
    description: "Free weekly yoga classes every Saturday at 6 AM in the community garden. Open to all ages. Bring your own mat.",
    postedBy: "Wellness Club",
    postedByInitials: "WC",
    postedDate: "1 week ago",
    community: "Bandra",
    helpful: 38,
    shares: 19,
    comments: 9,
    image: null,
    tags: ["Yoga", "Wellness", "Free"],
    isUrgent: false
  },
  {
    id: 6,
    title: "Road Closure Alert",
    category: "Notice",
    categoryIcon: "⚠️",
    type: "Notice",
    isPinned: false,
    location: "Koramangala, Bengaluru",
    description: "Main road near the market will be closed for repairs from 8 AM to 6 PM. Please use alternate routes.",
    postedBy: "Municipal Office",
    postedByInitials: "MO",
    postedDate: "2 days ago",
    community: "Koramangala",
    helpful: 67,
    shares: 89,
    comments: 15,
    image: null,
    tags: ["Road", "Alert", "Traffic"],
    isUrgent: true
  },
  {
    id: 7,
    title: "Lost: Brown Wallet",
    category: "Lost & Found",
    categoryIcon: "💼",
    type: "Lost & Found",
    isPinned: false,
    location: "Andheri, Mumbai",
    description: "Lost a brown leather wallet near the bus stand. Contains important IDs and cards. Reward for return.",
    postedBy: "Anita M.",
    postedByInitials: "AM",
    postedDate: "4 days ago",
    community: "Andheri",
    helpful: 12,
    shares: 28,
    comments: 4,
    image: null,
    tags: ["Lost", "Wallet", "Reward"],
    isUrgent: false
  },
  {
    id: 8,
    title: "Community Cleanliness Drive",
    category: "Event",
    categoryIcon: "🗑️",
    type: "Event",
    isPinned: false,
    location: "Juhu, Mumbai",
    description: "Join us for a community cleanliness drive on Sunday. Meeting point at the main gate at 7 AM. Refreshments provided.",
    postedBy: "Environment Club",
    postedByInitials: "EC",
    postedDate: "6 days ago",
    community: "Juhu",
    helpful: 34,
    shares: 15,
    comments: 8,
    image: null,
    tags: ["Cleanliness", "Volunteer", "Community"],
    isUrgent: false
  }
];

// Categories for filter
export const categories = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'apartment', label: 'Apartment', icon: '🏢' },
  { id: 'event', label: 'Event', icon: '🎉' },
  { id: 'lost-found', label: 'Lost & Found', icon: '🔍' },
  { id: 'notice', label: 'Notice', icon: '📢' }
];

// Get counts by category
export const getCategoryCounts = () => {
  const counts = {
    all: mockNotices.length,
    apartment: 0,
    event: 0,
    'lost-found': 0,
    notice: 0
  };
  
  mockNotices.forEach(notice => {
    const categoryMap = {
      'Apartment': 'apartment',
      'Event': 'event',
      'Lost & Found': 'lost-found',
      'Notice': 'notice'
    };
    const key = categoryMap[notice.category] || 'all';
    if (key !== 'all') counts[key]++;
  });
  
  return counts;
};