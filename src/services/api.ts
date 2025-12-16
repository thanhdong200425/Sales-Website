const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Logout utility function
export function handleLogout(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("wishlist");

  // Trigger storage event to update UI components
  window.dispatchEvent(new Event("storage"));

  // Redirect to login page
  window.location.href = "/login";
}

// Helper function to handle API responses and check for auth errors
async function handleApiResponse(response: Response): Promise<any> {
  // Check for authentication errors
  if (response.status === 401 || response.status === 403) {
    handleLogout();
    throw new Error("Session expired. Please login again.");
  }

  return response;
}

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

// Auth interfaces
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  user?: User;
}

// Payment interfaces
export interface CreatePaymentRequest {
  orderId?: number;
  items?: Array<{
    productId: number;
    quantity: number;
    color?: string;
    size?: string;
  }>;
  shippingInfo?: {
    customerName: string;
    phone?: string;
    address: string;
  };
}

export interface CreatePaymentResponse {
  success: boolean;
  message: string;
  data: {
    paymentUrl: string;
    orderId: number;
    orderNumber: string;
    amount: number;
    amountVND: number;
  };
}

export async function fetchProducts(
  filters: ProductFilters = {}
): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams(
      filters as Record<string, string>
    ).toString();
    const url = `${API_BASE_URL}/api/items${params ? `?${params}` : ""}`;

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
    const response = await fetch(`${API_BASE_URL}/api/items/featured`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch featured products: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
}

// Helper function to get auth token from storage
function getAuthToken(): string | null {
  return localStorage.getItem("accessToken") || localStorage.getItem("token");
}

// Helper function to create headers with auth
function createAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function getUser(): Promise<UserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "GET",
      headers: createAuthHeaders(),
    });

    await handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch user: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function updateUser(data: UpdateUserData): Promise<UserResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
      method: "PUT",
      headers: createAuthHeaders(),
      body: JSON.stringify(data),
    });

    await handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to update user: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function changePassword(
  data: ChangePasswordData
): Promise<ChangePasswordResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/me/password`, {
      method: "PUT",
      headers: createAuthHeaders(),
      body: JSON.stringify({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }),
    });

    await handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to change password: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
}

/**
 * Đăng nhập
 * @param data - Email và password
 * @returns Token và thông tin user
 */
export async function login(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success && result.token) {
      localStorage.setItem("accessToken", result.token);
    }

    if (!response.ok) {
      throw new Error(
        result.message || `Failed to login: ${response.statusText}`
      );
    }

    return result;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

/**
 * Đăng ký tài khoản mới
 * @param data - Email, password và name (optional)
 * @returns Thông tin user đã đăng ký
 */
export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || `Failed to register: ${response.statusText}`
      );
    }

    return result;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
}

/**
 * Tạo payment URL từ VNPay
 * @param data - Thông tin thanh toán (orderId hoặc items + shippingInfo)
 * @returns Payment URL và thông tin order
 */
export async function createPayment(
  data: CreatePaymentRequest
): Promise<CreatePaymentResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/create`, {
      method: "POST",
      headers: createAuthHeaders(),
      body: JSON.stringify(data),
    });

    await handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to create payment: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}

// Order interfaces
export interface CreateCodOrderRequest {
  items: Array<{
    productId: number;
    quantity: number;
    color?: string;
    size?: string;
  }>;
  shippingInfo: {
    customerName: string;
    phone?: string;
    address: string;
  };
}

export interface CreateCodOrderResponse {
  success: boolean;
  message: string;
  data: {
    orderId: number;
    orderNumber: string;
    amount: number;
    status: string;
  };
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  price: string;
  color?: string;
  size?: string;
  image?: string;
}

export interface OrderEvent {
  id: number;
  status: string;
  description?: string;
  createdAt: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  customerName: string;
  shippingAddress: string;
  trackingNumber?: string;
  totalAmount: string;
  status: string;
  items: OrderItem[];
  timeline: OrderEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface GetOrdersResponse {
  success: boolean;
  data: Order[];
}

export interface GetOrderResponse {
  success: boolean;
  data: Order;
}

/**
 * Tạo đơn hàng với phương thức COD
 * @param data - Thông tin đơn hàng và địa chỉ giao hàng
 * @returns Thông tin đơn hàng đã tạo
 */
export async function createCodOrder(
  data: CreateCodOrderRequest
): Promise<CreateCodOrderResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payments/create-cod`, {
      method: "POST",
      headers: createAuthHeaders(),
      body: JSON.stringify(data),
    });

    await handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to create COD order: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating COD order:", error);
    throw error;
  }
}

/**
 * Lấy danh sách đơn hàng của user
 * @returns Danh sách đơn hàng
 */
export async function getOrders(): Promise<GetOrdersResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "GET",
      headers: createAuthHeaders(),
    });

    await handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch orders: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

/**
 * Lấy chi tiết đơn hàng theo ID
 * @param orderId - ID của đơn hàng
 * @returns Chi tiết đơn hàng
 */
export async function getOrderById(orderId: number): Promise<GetOrderResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      method: "GET",
      headers: createAuthHeaders(),
    });

    await handleApiResponse(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Failed to fetch order: ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}
