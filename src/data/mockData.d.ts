// Type definitions for mock data
export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
  images: string[];
  size: string;
  occupancy: number;
  features: string[];
  description: string;
  amenities: string[];
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  content: string;
}

export interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  image: string;
  terms: string[];
  roomTypes: string[];
}

export interface InventoryRoom extends Room {
  status: 'available' | 'booked' | 'maintenance';
  occupancyRate: number;
}

export interface ChatbotResponse {
  trigger: string;
  response: string;
}

export declare const rooms: Room[];
export declare const reviews: Review[];
export declare const blogPosts: BlogPost[];
export declare const specialOffers: SpecialOffer[];
export declare const chatbotResponses: ChatbotResponse[];