import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { type Product } from '@/components/home/product-section';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
    product: Product;
    initialLiked?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, initialLiked = false }) => {
    const [isLiked, setIsLiked] = useState(initialLiked);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const navigate = useNavigate();
  const { addToCart } = useCart();


    const originalPrice = Number(product.price);
    const salePrice = originalPrice > 150 ? Math.round(originalPrice * 0.7) : originalPrice;
    const isSale = salePrice < originalPrice;
    const discountPercent = isSale ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : 0;
    const rating = 4.5;

  const imageUrl = product.images?.[0]?.url || product.image || "https://via.placeholder.com/300";

    const handleToggleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isLoading) return;
        setIsLoading(true);

        const previousState = isLiked;
        setIsLiked(!isLiked);
        const willLike = !isLiked;

        try {
            const response = await fetch('http://localhost:3000/wishlist/toggle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: 1, productId: product.id }),
            });
            if (!response.ok) {
              throw new Error("Failed to toggle wishlist");
            }
            if (willLike) {
              window.dispatchEvent(new CustomEvent("wishlist:pulse"));
            }
        } catch (error) {
            console.error(error);
            setIsLiked(previousState);
        } finally {
            setIsLoading(false);
        }
    };


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: String(product.id),
      name: product.name,
      image: imageUrl,
      price: Number(product.price),
      size: "Default",
      color: "Default",
      quantity: 1,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);

    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
    });
  };

    const handleCardClick = () => {
        navigate(`/product/${product.slug}`);
    };

    return (
        <div
            onClick={handleCardClick}
            className="group relative block cursor-pointer"
        >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-100">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />

                {isSale && (
                    <span className="absolute left-2 top-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full font-medium z-10">
                        -{discountPercent}%
                    </span>
                )}

                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-sm z-20 active:scale-90"
                >
                    <Heart
                        size={18}
                        className={`transition-colors duration-300 ${
                            isLiked ? "fill-red-500 text-red-500" : "text-gray-500 hover:text-gray-700"
                        }`}
                    />
                </button>

                <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-full group-hover:translate-y-0 transition duration-300 z-20 pb-2">
                    <Button
                        variant={isAdded ? "default" : "secondary"}
                        onClick={handleAddToCart}
                        className={`w-11/12 h-9 text-xs flex items-center gap-1 shadow-md transition-all ${
                            isAdded ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-slate-900 hover:text-white"
                        }`}
                    >
                        {isAdded ? (
                            <> <Check className="size-3.5" /> Added </>
                        ) : (
                            <> <ShoppingCart className="size-3.5" /> Quick Add </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="mt-3 flex flex-col gap-1">
                <div className="flex items-start justify-between">
                    <h3 className="text-sm text-slate-800 font-medium truncate pr-2 flex-1 group-hover:text-indigo-600 transition-colors">
                        {product.name}
                    </h3>
                    <div className="flex items-center text-yellow-500 flex-shrink-0">
                        <Star className="size-3 fill-yellow-500" />
                        <span className="text-xs text-slate-500 ml-1 font-medium">{rating.toFixed(1)}</span>
                    </div>
                </div>
                <div className="flex items-baseline space-x-2">
                    <span className={`text-lg font-bold ${isSale ? 'text-red-600' : 'text-slate-900'}`}>
                        ${salePrice.toFixed(2)}
                    </span>
                    {isSale && (
                        <span className="text-xs text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;