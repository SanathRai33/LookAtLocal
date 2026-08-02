export const mockRentals = [
  {
    id: 1,
    title: "Canon EOS 5D Mark IV",
    category: "Camera",
    categoryIcon: "📷",
    rating: 4.9,
    reviews: 128,
    pricePerDay: 650,
    deposit: 5000,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    owner: {
      name: "Ravi Kumar",
      initials: "RK",
      verified: true,
      joinedDate: "2023"
    },
    location: "Koramangala, Bangalore",
    availability: true,
    description: "Professional DSLR camera with 30.4MP sensor and 4K video capability. Perfect for photography enthusiasts.",
    tags: ["Professional", "4K Video", "Full Frame"]
  },
  {
    id: 2,
    title: "Honda Generator 5KVA",
    category: "Power Tools",
    categoryIcon: "🔧",
    rating: 4.7,
    reviews: 89,
    pricePerDay: 1200,
    deposit: 8000,
    image: "https://images.unsplash.com/photo-1658260867231-535a1f7c98b9",
    owner: {
      name: "Ravi Kumar",
      initials: "RK",
      verified: true,
      joinedDate: "2023"
    },
    location: "Electronic City, Bangalore",
    availability: true,
    description: "Reliable 5KVA generator for outdoor events and emergency power backup.",
    tags: ["Heavy Duty", "Reliable", "Backup"]
  },
  {
    id: 3,
    title: "Hydraulic Drill Machine",
    category: "Power Tools",
    categoryIcon: "🔧",
    rating: 4.5,
    reviews: 67,
    pricePerDay: 450,
    deposit: 3000,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=300&fit=crop",
    owner: {
      name: "Tools & Co.",
      initials: "T&",
      verified: false,
      joinedDate: "2024"
    },
    location: "Whitefield, Bangalore",
    availability: true,
    description: "Industrial-grade hydraulic drill for construction and heavy-duty work.",
    tags: ["Industrial", "Heavy Duty", "Durable"]
  },
  {
    id: 4,
    title: "Professional Camera Tripod",
    category: "Camera",
    categoryIcon: "📷",
    rating: 4.8,
    reviews: 45,
    pricePerDay: 350,
    deposit: 2000,
    image: "https://images.unsplash.com/photo-1587005091480-7e2ef5d5daae?w=400&h=300&fit=crop",
    owner: {
      name: "Kiran S.",
      initials: "KS",
      verified: true,
      joinedDate: "2023"
    },
    location: "Indiranagar, Bangalore",
    availability: true,
    description: "Carbon fiber tripod with ball head, lightweight and sturdy for professional use.",
    tags: ["Lightweight", "Professional", "Sturdy"]
  },
  {
    id: 5,
    title: "Toyota Innova Crysta",
    category: "Vehicle",
    categoryIcon: "🚗",
    rating: 4.9,
    reviews: 156,
    pricePerDay: 2500,
    deposit: 15000,
    image: "https://images.pexels.com/photos/18029607/pexels-photo-18029607.jpeg",
    owner: {
      name: "City Cabs",
      initials: "CC",
      verified: true,
      joinedDate: "2022"
    },
    location: "MG Road, Bangalore",
    availability: true,
    description: "Spacious 7-seater SUV perfect for family trips and group travel.",
    tags: ["7-Seater", "AC", "Automatic"]
  },
  {
    id: 6,
    title: "Sony 4K Projector",
    category: "Electronics",
    categoryIcon: "💻",
    rating: 4.6,
    reviews: 34,
    pricePerDay: 800,
    deposit: 6000,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=300&fit=crop",
    owner: {
      name: "Tech Hub",
      initials: "TH",
      verified: true,
      joinedDate: "2024"
    },
    location: "HSR Layout, Bangalore",
    availability: true,
    description: "Ultra HD 4K projector for movie nights and presentations.",
    tags: ["4K", "Home Theater", "Portable"]
  },
  {
    id: 7,
    title: "Wedding Decor Set",
    category: "Events",
    categoryIcon: "🎉",
    rating: 4.4,
    reviews: 23,
    pricePerDay: 1500,
    deposit: 10000,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
    owner: {
      name: "Event Essentials",
      initials: "EE",
      verified: false,
      joinedDate: "2024"
    },
    location: "Jayanagar, Bangalore",
    availability: false,
    description: "Complete wedding decor setup including flowers, lights, and stage props.",
    tags: ["Wedding", "Decor", "Premium"]
  },
  {
    id: 8,
    title: "Modern Sofa Set",
    category: "Furniture",
    categoryIcon: "🛋️",
    rating: 4.3,
    reviews: 56,
    pricePerDay: 900,
    deposit: 5000,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
    owner: {
      name: "Furnish Co.",
      initials: "FC",
      verified: true,
      joinedDate: "2023"
    },
    location: "Koramangala, Bangalore",
    availability: true,
    description: "Elegant 3-seater sofa with premium fabric and comfortable cushioning.",
    tags: ["Comfortable", "Modern", "Premium"]
  }
];

// Categories for filter
export const categories = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'camera', label: 'Camera', icon: '📷' },
  { id: 'vehicle', label: 'Vehicle', icon: '🚗' },
  { id: 'power-tools', label: 'Power Tools', icon: '🔧' },
  { id: 'electronics', label: 'Electronics', icon: '💻' },
  { id: 'furniture', label: 'Furniture', icon: '🛋️' },
  { id: 'events', label: 'Events', icon: '🎉' }
];