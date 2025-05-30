
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO string
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[]; // URLs
  category: string;
  rating?: number; // average rating, 1-5
  reviews?: Review[];
  isTrending?: boolean; 
  details?: string[]; // Bullet points for product details
  stock?: number;
}

// Simplified user type for context, can be expanded or replaced by FirebaseUser
export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}
