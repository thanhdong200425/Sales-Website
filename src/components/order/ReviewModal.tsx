import { useState } from "react";
import { Star, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
  productId: number;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  productName,
  productImage,
  onSubmit,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(rating, comment);
      // Reset form
      setRating(0);
      setComment("");
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900">Write a Review</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Info */}
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <img
              src={
                productImage ||
                "https://placehold.co/80x80/F0EEED/1A1A1A?text=Product"
              }
              alt={productName}
              className="w-20 h-20 rounded-xl object-cover bg-slate-200"
            />
            <div>
              <h3 className="font-bold text-slate-900">{productName}</h3>
              <p className="text-sm text-slate-500 mt-1">
                Share your experience with this product
              </p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-3">
              Your Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, index) => {
                const value = index + 1;
                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setRating(value)}
                    className="focus-visible:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-10 w-10 transition-colors",
                        value <= rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-slate-300"
                      )}
                    />
                  </button>
                );
              })}
              {rating > 0 && (
                <span className="ml-2 text-sm font-medium text-slate-600">
                  {rating} out of 5
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-3">
              Your Review
            </label>
            <textarea
              className="w-full min-h-[120px] rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-900/20 resize-none"
              placeholder="Share your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-white transition-colors"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting || rating === 0}
            className="px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </div>
  );
};
