// Mock data for the AMASSAH LODGE application

export const rooms = [
  {
    id: 1,
    name: "Luxury Suite",
    type: "Luxury",
    price: 299,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
    description: "Experience ultimate luxury in our premium suite featuring panoramic city views, marble bathroom, and exclusive amenities.",
    features: ["King Size Bed", "City View", "Marble Bathroom", "Mini Bar", "Room Service", "Balcony"],
    occupancy: 2,
    size: "65 sqm",
    available: true
  },
  {
    id: 2,
    name: "Deluxe Room",
    type: "Standard",
    price: 199,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
    description: "Comfortable and elegant room with modern amenities and stylish decor perfect for business or leisure travelers.",
    features: ["Queen Size Bed", "Garden View", "Work Desk", "WiFi", "Coffee Machine", "Air Conditioning"],
    occupancy: 2,
    size: "35 sqm",
    available: true
  },
  {
    id: 3,
    name: "Family Suite",
    type: "Family",
    price: 249,
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&h=600&fit=crop",
    description: "Spacious family accommodation with separate living area and connecting rooms, perfect for families with children.",
    features: ["2 Queen Beds", "Living Area", "Kitchenette", "Kids Area", "Safety Features", "Pool Access"],
    occupancy: 4,
    size: "50 sqm",
    available: true
  },
  {
    id: 4,
    name: "Executive Room",
    type: "Luxury",
    price: 259,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
    description: "Professional accommodation with dedicated workspace and premium business amenities for the modern executive.",
    features: ["King Size Bed", "Work Station", "Meeting Area", "Premium WiFi", "Business Center Access", "Concierge"],
    occupancy: 2,
    size: "40 sqm",
    available: false
  },
  {
    id: 5,
    name: "Standard Room",
    type: "Standard",
    price: 149,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
    description: "Comfortable and affordable accommodation with all essential amenities for a pleasant stay.",
    features: ["Double Bed", "City View", "Private Bathroom", "WiFi", "TV", "Daily Housekeeping"],
    occupancy: 2,
    size: "25 sqm",
    available: true
  },
  {
    id: 6,
    name: "Penthouse Suite",
    type: "Luxury",
    price: 499,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    description: "Ultimate luxury penthouse with panoramic views, private terrace, and exclusive butler service.",
    features: ["Master Bedroom", "Private Terrace", "Butler Service", "Jacuzzi", "Premium Bar", "360° View"],
    occupancy: 2,
    size: "100 sqm",
    available: true
  }
];

export const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    comment: "Absolutely amazing stay! The staff was incredibly welcoming and the room was spotless. The view from our balcony was breathtaking.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    date: "2024-01-10",
    comment: "Great location and excellent service. The breakfast was delicious and the amenities exceeded our expectations.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emma Wilson",
    rating: 5,
    date: "2024-01-05",
    comment: "Perfect for our family vacation! The kids loved the pool and the family suite was spacious and comfortable.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David Rodriguez",
    rating: 4,
    date: "2023-12-28",
    comment: "Business trip made comfortable. The executive room had everything I needed for work, and the WiFi was excellent.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    rating: 5,
    date: "2023-12-20",
    comment: "Romantic getaway perfection! The luxury suite was divine and the service was impeccable throughout our stay.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  }
];

export const specialOffers = [
  {
    id: 1,
    title: "Early Bird Special",
    description: "Book 30 days in advance and save 20% on your stay",
    discount: "20% OFF",
    validUntil: "2024-03-31",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    badge: "Limited Time"
  },
  {
    id: 2,
    title: "Weekend Getaway",
    description: "Special weekend rates for Friday-Sunday stays",
    discount: "15% OFF",
    validUntil: "2024-04-30",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop",
    badge: "Weekends Only"
  },
  {
    id: 3,
    title: "Family Package",
    description: "Family suite + breakfast + kids activities included",
    discount: "25% OFF",
    validUntil: "2024-05-15",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    badge: "Family Special"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "10 Must-Try Local Restaurants Near AMASSAH LODGE",
    summary: "Discover the best dining experiences within walking distance of our hotel...",
    date: "2024-01-18",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop",
    content: "Our concierge team has curated a list of exceptional local restaurants that showcase the best of regional cuisine. From fine dining establishments to cozy bistros, these culinary gems offer unforgettable experiences just steps away from AMASSAH LODGE..."
  },
  {
    id: 2,
    title: "Exploring the City: A Guest's Guide to Local Attractions",
    summary: "Your complete guide to the best attractions and activities in the area...",
    date: "2024-01-12",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop",
    content: "Whether you're here for business or pleasure, our city offers countless opportunities for exploration and adventure. This comprehensive guide highlights must-see attractions, cultural sites, and hidden gems that will make your stay memorable..."
  },
  {
    id: 3,
    title: "Wellness and Relaxation: Our New Spa Services",
    summary: "Introducing our enhanced spa and wellness facilities...",
    date: "2024-01-08",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=250&fit=crop",
    content: "We're excited to announce the expansion of our wellness facilities with new spa services designed to rejuvenate both body and mind. Our expert therapists offer a range of treatments using premium organic products..."
  }
];

export const chatbotResponses = {
  hello: "Hello! Welcome to AMASSAH LODGE. How can I assist you today?",
  hi: "Hi there! I'm here to help with any questions about our hotel. What would you like to know?",
  rooms: "We offer various room types: Luxury Suites, Deluxe Rooms, Family Suites, Executive Rooms, Standard Rooms, and our exclusive Penthouse Suite. Would you like details about any specific room?",
  amenities: "Our amenities include: Free WiFi, Fitness Center, Swimming Pool, Spa Services, Restaurant, Room Service, Business Center, Concierge, and Parking. What would you like to know more about?",
  checkin: "Check-in time is 3:00 PM and check-out is 11:00 AM. Early check-in and late check-out may be available upon request.",
  location: "AMASSAH LODGE is conveniently located in the heart of the city with easy access to major attractions, shopping, and dining.",
  booking: "You can make a reservation through our website, call us directly, or book through major travel platforms. Would you like help with a specific booking?",
  default: "I'm here to help! You can ask me about rooms, amenities, check-in times, location, or booking. What would you like to know?"
};