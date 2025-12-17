import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Minus, Plus, RefreshCcw, Star, Truck } from "lucide-react";
import { useParams } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import type { Review } from "@/services/api";
import { createReview, getProductReviews } from "@/services/api";
type ProductImage = {
  id: number;
  url: string;
  altText: string | null;
  position: number;
};

const BREADCRUMBS = ["Home", "Shop", "Men", "T-shirts"];
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [selectedColor, setSelectedColor] = useState("Black");
  const { slug } = useParams();
  const [productDetail, setProductDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    console.log("slug", slug);
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${slug}`);
        if (!res.ok) throw new Error("Product not found");

        const data = await res.json();
        console.log("data", data?.images);
        setProductDetail(data);

        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProductDetail();
    }
  }, [slug]);

  useEffect(() => {
    const loadReviews = async () => {
      if (!productDetail?.id) return;
      try {
        const data = await getProductReviews(productDetail.id);
        console.log("review", data);
        setReviews(data.reviews);
        setAverageRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
      } catch (error) {
        console.error("Failed to load reviews", error);
      }
    };

    loadReviews();
  }, [productDetail?.id]);

  const handleQuantityChange = (direction: "increment" | "decrement") => {
    setQuantity((current) => {
      const nextValue = direction === "increment" ? current + 1 : current - 1;
      return Math.min(Math.max(nextValue, 1), 10);
    });
  };

  const handleAddToCart = () => {
    if (!productDetail) return;

    addToCart({
      id: productDetail.id.toString(),
      name: productDetail.name,
      image: productDetail.images[0]?.url || "https://via.placeholder.com/200",
      price: parseFloat(productDetail.price),
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    });

    toast.success("Added to cart!", {
      description: `${productDetail.name} (${quantity}x) has been added to your cart.`,
    });
  };

  const handleSubmitReview = async () => {
    if (!productDetail?.id) return;

    const userIdStr = localStorage.getItem("userId");
    if (!userIdStr) {
      toast.error("You need to login to leave a review.");
      return;
    }

    const userId = parseInt(userIdStr, 10);
    if (!userId) {
      toast.error("Invalid user. Please login again.");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please enter your review.");
      return;
    }

    setSubmittingReview(true);
    try {
      const newReview = await createReview(productDetail.id, {
        userId,
        rating: reviewRating,
        comment: reviewText.trim(),
      });

      const nextReviews = [newReview, ...reviews];
      setReviews(nextReviews);
      setTotalReviews(nextReviews.length);
      const sum = nextReviews.reduce((acc, r) => acc + r.rating, 0);
      setAverageRating(sum / nextReviews.length);
      setReviewText("");
      toast.success("Review submitted successfully.");
    } catch (error: any) {
      console.error("Failed to submit review", error);
      toast.error(error?.message || "Failed to submit review.");
    } finally {
      setSubmittingReview(false);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (!productDetail) return <div>Product not found</div>;

  return (
    <section className="bg-white px-4 py-10 sm:py-14">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-slate-500"
        >
          {BREADCRUMBS.map((crumb, index) => {
            const isLast = index === BREADCRUMBS.length - 1;

            return (
              <div key={crumb} className="flex items-center gap-2">
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(isLast ? "font-semibold text-slate-900" : "")}
                >
                  {crumb}
                </span>
                {!isLast && <span className="text-slate-300">/</span>}
              </div>
            );
          })}
        </nav>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="grid gap-6 lg:grid-cols-[120px_1fr]">
            <div className="flex gap-4 lg:flex-col">
              {productDetail?.images?.map((img: any) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "relative overflow-hidden rounded-2xl border border-transparent p-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/30",

                    img.id === selectedImage?.id
                      ? "border-gray-500"
                      : "hover:border-gray-200"
                  )}
                  aria-label={`View ${img.altText}`}
                >
                  <img
                    alt={img.altText}
                    src={img.url}
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="overflow-hidden rounded-[32px] bg-slate-100 p-6">
              {selectedImage && (
                <img
                  // alt={selectedImage.altText}
                  src={selectedImage.url}
                  className="h-full w-full rounded-[24px] object-cover"
                />
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
                Men · T-shirts
              </p>
              <h1 className="text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
                {productDetail.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <p className="text-4xl font-semibold text-slate-900">
                  ${productDetail?.price}
                </p>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={cn(
                            "h-4 w-4",
                            index < Math.round(averageRating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-slate-300"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">
                      {averageRating.toFixed(1)} / 5 ({totalReviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <p className="max-w-xl text-base leading-relaxed text-slate-600">
                {productDetail.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center rounded-full border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleQuantityChange("decrement")}
                  disabled={quantity === 1}
                  className="h-12 w-12 rounded-full text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                >
                  <Minus className="mx-auto size-4" />
                </button>
                <span className="min-w-[56px] text-center text-lg font-semibold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange("increment")}
                  disabled={quantity === 10}
                  className="h-12 w-12 rounded-full text-slate-900 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:text-slate-300"
                >
                  <Plus className="mx-auto size-4" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="h-14 flex-1 rounded-full bg-slate-900 text-base font-semibold text-white shadow-lg hover:bg-slate-900/90"
              >
                Add to Cart
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center gap-3 text-slate-900">
                  <Truck className="size-6 text-slate-700" />
                  <div>
                    <p className="text-sm font-semibold">Free shipping</p>
                    <p className="text-sm text-slate-500">
                      Arrives in 2-4 business days
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center gap-3 text-slate-900">
                  <RefreshCcw className="size-6 text-slate-700" />
                  <div>
                    <p className="text-sm font-semibold">30-day returns</p>
                    <p className="text-sm text-slate-500">
                      Free pickup available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="reviews" className="mt-10">
          <div className="space-y-4 rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                Customer Reviews
              </h2>
              <p className="text-sm text-slate-600">
                {totalReviews} review{totalReviews !== 1 ? "s" : ""} ·{" "}
                <span className="font-medium">
                  {averageRating.toFixed(1)} / 5
                </span>
              </p>
            </div>

            {/* List comments */}
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {reviews.length === 0 ? (
                <p className="text-sm text-slate-500 text-center my-8">
                  No reviews yet. Be the first to review this product.
                </p>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-slate-100 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          {review.user?.name || "Anonymous"}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={cn(
                              "h-4 w-4",
                              index < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-slate-300"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="mt-2 text-sm text-slate-700">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
