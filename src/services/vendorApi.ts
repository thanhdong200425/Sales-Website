const API_BASE_URL = "http://localhost:3000/api/vendor";

// Helper function to create auth headers
function createVendorAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("vendorToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Auth APIs
export async function loginVendor(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function registerVendor(data: {
  email: string;
  password: string;
  businessName: string;
  contactName?: string;
  phone?: string;
  address?: string;
}) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Registration failed");
  }

  return result;
}

export async function logoutVendor() {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
}

export async function getVendorProfile() {
  const response = await fetch(`${API_BASE_URL}/me`, {
    method: "GET",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get profile");
  }

  return data;
}

export async function forgotPasswordVendor(email: string) {
  const response = await fetch(`${API_BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to send reset email");
  }

  return data;
}

export async function resetPasswordVendor(token: string, newPassword: string) {
  const response = await fetch(`${API_BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to reset password");
  }

  return data;
}

// Dashboard APIs
export async function getVendorStats() {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`, {
    method: "GET",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get stats");
  }

  return data;
}

export async function getRevenueOverview(period: string = "30days") {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/revenue-overview?period=${period}`,
    {
      method: "GET",
      headers: createVendorAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get revenue overview");
  }

  return data;
}

export async function getVendorOrders(
  page: number = 1,
  limit: number = 10,
  status: string = "all"
) {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/orders?page=${page}&limit=${limit}&status=${status}`,
    {
      method: "GET",
      headers: createVendorAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get orders");
  }

  return data;
}

export async function getOrderBreakdown() {
  const response = await fetch(`${API_BASE_URL}/dashboard/order-breakdown`, {
    method: "GET",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get order breakdown");
  }

  return data;
}

export async function getProductAlerts() {
  const response = await fetch(`${API_BASE_URL}/dashboard/product-alerts`, {
    method: "GET",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get product alerts");
  }

  return data;
}

export async function getPerformanceMetrics() {
  const response = await fetch(`${API_BASE_URL}/dashboard/performance`, {
    method: "GET",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get performance metrics");
  }

  return data;
}

// Vendor Orders APIs
export async function getSalesAnalytics(year?: number) {
  const url = year
    ? `${API_BASE_URL}/orders/analytics?year=${year}`
    : `${API_BASE_URL}/orders/analytics`;

  const response = await fetch(url, {
    method: "GET",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get sales analytics");
  }

  return data;
}

export async function getVendorOrdersList(
  page: number = 1,
  limit: number = 10,
  status?: string
) {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (status && status !== "all") {
    params.append("status", status);
  }

  const response = await fetch(`${API_BASE_URL}/orders?${params.toString()}`, {
    method: "GET",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get orders");
  }

  return data;
}

export async function getVendorOrderDetail(orderId: number) {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
    method: "GET",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get order detail");
  }

  return data;
}

export async function updateOrderItemStatus(
  orderItemId: number,
  status: string,
  trackingNumber?: string
) {
  const response = await fetch(
    `${API_BASE_URL}/orders/items/${orderItemId}/status`,
    {
      method: "PUT",
      headers: createVendorAuthHeaders(),
      body: JSON.stringify({ status, trackingNumber }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update order status");
  }

  return data;
}

export async function getVendorOrderStats() {
  const response = await fetch(`${API_BASE_URL}/orders/stats`, {
    method: "GET",
    headers: createVendorAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get order stats");
  }

  return data;
}
