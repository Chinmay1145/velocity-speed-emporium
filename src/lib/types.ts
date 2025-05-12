
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  engineCapacity: string;
  power: string;
  topSpeed: string;
  weight: string;
  colors: string[];
  inStock: boolean;
  featured?: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export type SortOption = 'price-low-high' | 'price-high-low' | 'newest' | 'popular';
