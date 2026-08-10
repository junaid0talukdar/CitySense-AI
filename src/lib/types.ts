export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  color: string;
  description: string | null;
  businessCount: number | null;
}

export interface Business {
  id: number;
  name: string;
  slug: string;
  categoryId: number | null;
  description: string | null;
  address: string;
  latitude: number;
  longitude: number;
  phone: string | null;
  email: string | null;
  website: string | null;
  priceRange: number | null;
  rating: number | null;
  reviewCount: number | null;
  imageUrl: string | null;
  photos: string[] | null;
  tags: string[] | null;
  features: string[] | null;
  openingHours: Record<string, string> | null;
  isOpen: boolean | null;
  isPremium: boolean | null;
  isVerified: boolean | null;
  hasDelivery: boolean | null;
  hasWifi: boolean | null;
  hasParking: boolean | null;
  isAirConditioned: boolean | null;
  isFamilyFriendly: boolean | null;
  isWheelchairAccessible: boolean | null;
  hasHalalFood: boolean | null;
  avgBudget: number | null;
  waitingTime: number | null;
  seatsAvailable: number | null;
  categoryName?: string;
  categorySlug?: string;
  categoryColor?: string;
}

export interface BusinessResult extends Business {
  aiScore: number;
  matchReasons: string[];
  distance?: number;
}

export interface Review {
  id: number;
  businessId: number | null;
  userName: string;
  rating: number;
  comment: string | null;
  createdAt: Date | null;
}

export interface SearchFilters {
  budget?: number;
  distance?: number;
  rating?: number;
  isOpen?: boolean;
  isAirConditioned?: boolean;
  isFamilyFriendly?: boolean;
  hasWifi?: boolean;
  hasParking?: boolean;
  hasDelivery?: boolean;
  hasHalalFood?: boolean;
  isWheelchairAccessible?: boolean;
  isPremium?: boolean;
}
