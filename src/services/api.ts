const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

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
// User interfaces
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  success: boolean;
  user: User;
  message?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export async function fetchProducts(
  filters: ProductFilters = {}
): Promise<ProductsResponse[]> {
  try {
    const params = new URLSearchParams(filters as Record<string, string>).toString();
    const url = `${API_BASE_URL}/api/items${params ? `?${params}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
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
    console.error('Error fetching featured products:', error);
    throw error;
  }
}


// Helper function to get auth token from storage
function getAuthToken(): string | null {
  return localStorage.getItem('accessToken') || localStorage.getItem('token');
}

// Helper function to create headers with auth
function createAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}


export async function getUser(): Promise<UserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: 'GET',
      headers: createAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch user: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}


export async function updateUser(data: UpdateUserData): Promise<UserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: 'PUT',
      headers: createAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to update user: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}


export async function changePassword(
  data: ChangePasswordData
): Promise<ChangePasswordResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me/password`, {
      method: 'PUT',
      headers: createAuthHeaders(),
      body: JSON.stringify({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to change password: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
}
