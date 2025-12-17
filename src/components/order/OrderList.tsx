import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type Order } from "@/services/api";
import { ReviewModal } from "./ReviewModal";
import { toast } from "sonner";

interface OrderListProps {
  orders: Order[];
}

export const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const navigate = useNavigate();
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: number;
    name: string;
    image: string;
  } | null>(null);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600";
      case "processing":
        return "text-amber-600";
      case "pending":
        return "text-blue-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "processing":
        return "bg-amber-500";
      case "pending":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  const handleViewOrder = (orderId: number) => {
    navigate(`/order-status?orderId=${orderId}`);
  };

  const handleBuyAgain = async (productId: number) => {
    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${API_BASE_URL}/api/items/${productId}`);
      if (response.ok) {
        const product = await response.json();
        if (product.slug) {
          navigate(`/product/${product.slug}`);
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleReview = (
    productId: number,
    productName: string,
    productImage: string
  ) => {
    setSelectedProduct({
      id: productId,
      name: productName,
      image: productImage,
    });
    setReviewModalOpen(true);
  };

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!selectedProduct) return;

    try {
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://localhost:3000";
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");

      if (!token) {
        toast.error("Please login to submit a review");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/reviews/${selectedProduct.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating,
            comment,
          }),
        }
      );

      if (response.ok) {
        toast.success("Review submitted successfully!");
      } else {
        const error = await response.json();
        toast.error(error.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  const canReview = (order: Order) => {
    // Only show review button for completed orders (delivered, cancelled, or completed status)
    return ["delivered", "cancelled", "completed"].includes(
      order.status.toLowerCase()
    );
  };

  return (
    <>
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => {
          setReviewModalOpen(false);
          setSelectedProduct(null);
        }}
        productName={selectedProduct?.name || ""}
        productImage={selectedProduct?.image || ""}
        productId={selectedProduct?.id || 0}
        onSubmit={handleSubmitReview}
      />

      <div className="grid gap-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-200 rounded-[20px] overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white"
          >
            <div className="bg-[#F9F9F9] px-6 py-4 flex flex-wrap gap-y-4 items-center justify-between border-b border-gray-100">
              <div className="flex gap-8 text-sm md:text-base">
                <div>
                  <span className="block text-slate-500 text-xs font-bold uppercase mb-1">
                    Order ID
                  </span>
                  <span className="font-bold text-slate-900">
                    #{order.orderNumber}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-500 text-xs font-bold uppercase mb-1">
                    Date Placed
                  </span>
                  <span className="font-medium text-slate-700">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div>
                  <span className="block text-slate-500 text-xs font-bold uppercase mb-1">
                    Total Amount
                  </span>
                  <span className="font-black text-slate-900">
                    ${order.totalAmount}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="px-4 py-1.5 rounded-full text-sm font-bold bg-white border border-gray-200 shadow-sm flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getStatusBgColor(
                      order.status
                    )}`}
                  ></div>
                  <span className={getStatusColor(order.status)}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6 last:mb-0"
                >
                  <img
                    src={
                      item.image ||
                      "https://placehold.co/120x120/F0EEED/1A1A1A?text=Product"
                    }
                    alt={item.productName}
                    className="w-24 h-24 rounded-[12px] object-cover bg-[#F0EEED]"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {item.productName}
                    </h3>
                    {item.size && (
                      <p className="text-sm text-slate-500 mb-1">
                        Size:{" "}
                        <span className="text-slate-800 font-medium">
                          {item.size}
                        </span>
                      </p>
                    )}
                    {item.color && (
                      <p className="text-sm text-slate-500 mb-1">
                        Color:{" "}
                        <span className="text-slate-800 font-medium">
                          {item.color}
                        </span>
                      </p>
                    )}
                    <p className="text-sm text-slate-500 mb-1">
                      Quantity:{" "}
                      <span className="text-slate-800 font-medium">
                        {item.quantity}
                      </span>
                    </p>
                    <p className="text-lg font-bold text-slate-900 mt-2">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                    <button
                      onClick={() => handleViewOrder(order.id)}
                      className="px-6 py-3 rounded-full border border-gray-200 text-black font-medium hover:bg-gray-50 transition-colors text-sm whitespace-nowrap"
                    >
                      View Order
                    </button>
                    {canReview(order) && (
                      <button
                        onClick={() =>
                          handleReview(
                            item.productId,
                            item.productName,
                            item.image || ""
                          )
                        }
                        className="px-6 py-3 rounded-full border border-gray-200 text-black font-medium hover:bg-gray-50 transition-colors text-sm whitespace-nowrap"
                      >
                        Review
                      </button>
                    )}
                    <button
                      onClick={() => handleBuyAgain(item.productId)}
                      className="px-6 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-transform active:scale-95 text-sm whitespace-nowrap shadow-md"
                    >
                      Buy Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
