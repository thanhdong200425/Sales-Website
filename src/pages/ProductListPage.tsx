import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom'; // Thêm Link
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react'; 

import { fetchProducts, type ApiProduct, type ProductFilters } from "@/services/api"; 
import { type Product } from "@/components/home/product-section";
import { ProductCard } from "./ProductCard";
import ProductFilterSidebar from "@/components/shop/ProductFilterSidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function ProductListPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 9,
        totalPages: 1
    });

    const [searchParams, setSearchParams] = useSearchParams(); 
    // const currentFilters = Object.fromEntries(searchParams.entries()) as unknown as ProductFilters;
    const currentStyle = searchParams.get('style');
    
    // Name Breadcrumbs and title
    const pageTitle = currentStyle ? `${currentStyle}` : 'All Products';
    
    const currentPage = parseInt(searchParams.get('page') || '1');

    const handleFilterChange = (newFilters: Record<string, string>) => {
        const updatedParams = new URLSearchParams({ ...newFilters, page: '1' });
        setSearchParams(updatedParams);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > pagination.totalPages) return;
        const current = Object.fromEntries(searchParams.entries());
        setSearchParams({ ...current, page: newPage.toString() });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        async function loadFilteredProducts() {
            try {
                setLoading(true);
                setError(null);

                const currentFilters = Object.fromEntries(searchParams.entries()) as unknown as ProductFilters;
                const apiResponse = await fetchProducts({ ...currentFilters, page: currentPage });
                
                const transformedProducts: Product[] = apiResponse.data.map((item: ApiProduct) => ({
                    id: item.id.toString(),
                    name: item.name || 'Unknown Product',
                    image: item.images?.[0]?.url || "https://placehold.co/300x300?text=No+Image",
                    price: typeof item.price === 'string' ? parseFloat(item.price) : item.price,
                    rating: 4.5, 
                }));

                setProducts(transformedProducts);
                setPagination(apiResponse.pagination);
                
            } catch (err) {
                console.error("Error loading products:", err);
                setError("Failed to load products.");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        loadFilteredProducts();
    }, [searchParams, currentPage]);

    const renderPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, pagination.page - 2);
        const endPage = Math.min(pagination.totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button 
                    key={i} 
                    variant="ghost" 
                    onClick={() => handlePageChange(i)}
                    className={cn(
                        "h-9 w-9 rounded-lg", 
                        i === pagination.page ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-500 hover:bg-slate-50"
                    )}
                >
                    {i}
                </Button>
            );
        }
        return pages;
    };

    return (
        <div className="container mx-auto px-4 lg:px-8 py-6">
            
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                <Link to="/" className="hover:text-slate-900 transition-colors">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-slate-900">
                    {pageTitle}
                </span>
            </nav>

            <div className="flex items-start gap-8">
                <div className="hidden lg:block">
                    <ProductFilterSidebar 
                        currentStyle={currentStyle} 
                        onFilterChange={handleFilterChange} 
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold">
                            {currentStyle ? `${currentStyle} Collection` : 'All Products'}
                        </h1>
                        <span className="text-sm text-gray-500">
                            Showing {(pagination.page - 1) * pagination.limit + 1}-
                            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} Products
                        </span>
                    </div>
                    
                    {loading && <div className="py-20 text-center">Loading products...</div>}
                    {error && <div className="py-10 text-center text-red-600">{error}</div>}

                    {!loading && !error && products.length > 0 && (
                        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                    
                    {!loading && !error && products.length === 0 && (
                        <div className="py-20 text-center bg-gray-50 rounded-lg text-gray-500">
                            No products found.
                        </div>
                    )}

                    {!loading && !error && pagination.totalPages > 1 && (
                        <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-200">
                            <Button 
                                variant="outline" 
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page <= 1}
                                className="flex items-center gap-2 px-4 py-2 h-9 rounded-lg border-slate-200 hover:bg-gray-50 text-sm font-medium text-slate-800 disabled:opacity-50"
                            >
                                <ArrowLeft className="size-4" /> Previous
                            </Button>
                            
                            <div className="flex gap-1">
                                {renderPageNumbers()}
                            </div>

                            <Button 
                                variant="outline" 
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page >= pagination.totalPages}
                                className="flex items-center gap-2 px-4 py-2 h-9 rounded-lg border-slate-200 hover:bg-gray-50 text-sm font-medium text-slate-800 disabled:opacity-50"
                            >
                                Next <ArrowRight className="size-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductListPage;