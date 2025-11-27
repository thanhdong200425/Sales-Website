import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { type Product } from '@/components/home/product-section';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const originalPrice = product.price;

    const salePrice = originalPrice > 150 ? Math.round(originalPrice * 0.7) : originalPrice;
    const isSale = salePrice < originalPrice;
    const discountPercent = isSale ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : 0;

    const rating = product.rating || 4.5;
    const imageUrl = product.image || "https://via.placeholder.com/300";

    return (
        <div className="group relative block cursor-pointer">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-slate-100">
                <img
                    src={imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />
                {isSale && (
                    <span className="absolute left-2 top-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        -{discountPercent}%
                    </span>
                )}
                <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-full group-hover:translate-y-0 transition duration-300">
                    <Button variant="secondary" className="w-11/12 mb-2 text-xs flex items-center gap-1">
                        <ShoppingCart className="size-4" />
                        Quick Add
                    </Button>
                </div>
            </div>

            {/* Product Details */}
            <div className="mt-2 flex flex-col">

                {/* Title and Rating */}
                <div className="flex items-start justify-between">
                    <h3 className="text-sm text-slate-800 font-medium truncate pr-2">
                        {product.name}
                    </h3>
                    <div className="flex items-center text-yellow-500 flex-shrink-0">
                        <Star className="size-3 fill-yellow-500" aria-hidden="true" />
                        <span className="text-xs text-slate-500 ml-1">{rating.toFixed(1)}</span>
                    </div>
                </div>

                {/* Price Display */}
                <div className="mt-1 flex items-center space-x-2">
                    <span className={`text-base font-bold ${isSale ? 'text-red-600' : 'text-slate-900'}`}>
                        ${salePrice.toFixed(2)}
                    </span>
                    {isSale && (
                        <span className="text-sm text-slate-400 line-through">
                            ${originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};