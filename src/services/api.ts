const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


export interface ProductImage {
  id: number;
  url: string;
  altText: string | null;
  position: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  summary: string | null;
  description: string | null;
  price: string;
  currency: string;
  inStock: boolean;
  featured: boolean;
  status: string;
  category: ProductCategory;
  images: ProductImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  data: ApiProduct[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  style?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  color?: string;
  size?: string;
  type?: string;
  page?: number;
}

export async function fetchProducts(filters: ProductFilters = {}): Promise<ApiProduct[]> {
  try {
    
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    const url = `${API_BASE_URL}/api/products${params ? `?${params}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchFeaturedProducts(): Promise<ApiProduct[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/featured`);
    if (!response.ok) {
      throw new Error(`Failed to fetch featured products: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
}