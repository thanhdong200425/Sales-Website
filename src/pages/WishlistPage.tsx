import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard'; 
import { type Product } from '@/components/home/product-section'; 
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const WishlistPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const response = await fetch('http://localhost:3000/wishlist/1');
                
                if (!response.ok) throw new Error('Failed to fetch');
                
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi tải wishlist:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWishlist();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Đang tải danh sách...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Heart className="fill-red-500 text-red-500 w-8 h-8" /> 
                Danh sách yêu thích của tôi
            </h1>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                        <Heart className="h-10 w-10 text-slate-300" />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">Danh sách trống</h2>
                    <p className="text-slate-500 mb-6 mt-2">Bạn chưa thả tim sản phẩm nào cả.</p>
                    <Link to="/products">
                        <Button className="rounded-full px-8">Khám phá sản phẩm ngay</Button>
                    </Link>
                </div>
            ) : (
                
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            initialLiked={true} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage;