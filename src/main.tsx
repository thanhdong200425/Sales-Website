import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import App from "./App.tsx"
import "./index.css"
import CartPage from "./pages/CartPage.tsx"
import HomePage from "./pages/HomePage.tsx"
import NotFoundPage from "./pages/NotFoundPage.tsx"
import PipelinePage from "./pages/PipelinePage.tsx"
import ReportsPage from "./pages/ReportsPage.tsx"
import ProductDetailPage from "./pages/DetailPage.tsx"

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
        path: "product/:slug",
        element: <ProductDetailPage/>
      }
    ],
    errorElement: <NotFoundPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
