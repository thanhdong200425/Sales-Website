import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import CartPage from "./pages/CartPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PipelinePage from "./pages/PipelinePage.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";
import ProductListPage from "./pages/ProductListPage.tsx";
import ProductDetailPage from "./pages/DetailPage.tsx";
import OrderStatusPage from "./pages/OrderStatusPage.tsx";
import WishlistPage from "./pages/WishlistPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import PaymentSuccessPage from "./pages/PaymentSuccessPage.tsx";
import PaymentFailedPage from "./pages/PaymentFailedPage.tsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NotificationPage from "./pages/NotificationPage.tsx";

// Vendor imports
import {
  VendorAuthProvider,
  ProtectedVendorRoute,
} from "./contexts/VendorAuthContext.tsx";
import { VendorLayout } from "./components/vendor/VendorLayout.tsx";
import VendorLoginPage from "./pages/vendor/VendorLoginPage.tsx";
import VendorRegisterPage from "./pages/vendor/VendorRegisterPage.tsx";
import VendorForgotPasswordPage from "./pages/vendor/VendorForgotPasswordPage.tsx";
import VendorResetPasswordPage from "./pages/vendor/VendorResetPasswordPage.tsx";
import VendorDashboardPage from "./pages/vendor/VendorDashboardPage.tsx";
import SalesAnalyticsPage from "./pages/vendor/SalesAnalyticsPage.tsx";
import { OrderHistoryPage } from "./pages/OrderHistoryPage.tsx";
import VendorProductList from "./pages/vendor/VendorProductListPage.tsx";
import VendorCreateProductPage from "./pages/vendor/VendorCreateProductPage.tsx";
import VendorEditProductPage from "./pages/vendor/VendorEditProductPage.tsx";
import VendorOrderManagementPage from "./pages/vendor/VendorOrderManagementPage.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "products",
        element: <ProductListPage />,
      },
      {
        path: "pipeline",
        element: <PipelinePage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <PaymentPage />,
      },
      {
        path: "product/:slug",
        element: <ProductDetailPage />,
      },
      {
        path: "order-status",
        element: <OrderStatusPage />,
      },
      {
        path: "order-history",
        element: <OrderHistoryPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "notifications",
        element: <NotificationPage />,
      },
      {
        path: "payment/success",
        element: <PaymentSuccessPage />,
      },
      {
        path: "payment/failed",
        element: <PaymentFailedPage />,
      },
      {
        path: "order-success",
        element: <OrderSuccessPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
  // Vendor routes (separate from customer routes)
  {
    path: "/vendor",
    element: <VendorLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedVendorRoute>
            <VendorDashboardPage />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <ProtectedVendorRoute>
            <SalesAnalyticsPage />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedVendorRoute>
            <VendorProductList />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: "products/new",
        element: (
          <ProtectedVendorRoute>
            <VendorCreateProductPage />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: "products/edit/:id",
        element: (
          <ProtectedVendorRoute>
            <VendorEditProductPage />
          </ProtectedVendorRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedVendorRoute>
            <VendorOrderManagementPage />
          </ProtectedVendorRoute>
        ),
      },
    ],
  },
  {
    path: "/vendor/login",
    element: (
      <>
        <VendorLoginPage />
        <Toaster position="top-right" richColors />
      </>
    ),
  },
  {
    path: "/vendor/register",
    element: (
      <>
        <VendorRegisterPage />
        <Toaster position="top-right" richColors />
      </>
    ),
  },
  {
    path: "/vendor/forgot-password",
    element: (
      <>
        <VendorForgotPasswordPage />
        <Toaster position="top-right" richColors />
      </>
    ),
  },
  {
    path: "/vendor/reset-password",
    element: (
      <>
        <VendorResetPasswordPage />
        <Toaster position="top-right" richColors />
      </>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VendorAuthProvider>
      <RouterProvider router={router} />
    </VendorAuthProvider>
  </StrictMode>
);
