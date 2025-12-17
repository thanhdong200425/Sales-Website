import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, ArrowRight, Filter, SlidersHorizontal } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger,
  
  SheetHeader,
  SheetTitle,
  SheetDescription,
 } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


import {
  fetchProducts,
  type ApiProduct,
  type ProductFilters,
} from "@/services/api";
import { type Product } from "@/components/home/product-section";
import ProductCard from "./ProductCard";
import ProductFilterSidebar from "@/components/shop/ProductFilterSidebar";

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const currentStyle = searchParams.get("style");
  const currentCategory = searchParams.get("category");
  const rawSearch = searchParams.get("search") || searchParams.get("q");

 const searchTerm = rawSearch && rawSearch.trim() !== "" ? rawSearch : null;
   const currentSort = searchParams.get("sort") || "newest";
  const currentPage = parseInt(searchParams.get("page") || "1");

  const pageTitle = searchTerm 
    ? `Search results for "${searchTerm}"` 
    : (currentCategory || currentStyle || "All Products");

  const handleFilterChange = (newFilters: ProductFilters) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (newFilters.minPrice) params.set("minPrice", newFilters.minPrice.toString());
    if (newFilters.maxPrice) params.set("maxPrice", newFilters.maxPrice.toString());
    if (newFilters.category) params.set("category", newFilters.category);
    if (newFilters.style) params.set("style", newFilters.style);
    if (newFilters.color) params.set("color", newFilters.color);
    if (newFilters.size) params.set("size", newFilters.size);
    if (newFilters.inStock) params.set("inStock", "true");
    else params.delete("inStock");

    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    params.set("page", "1"); 
    setSearchParams(params);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    setSearchParams(params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    async function loadFilteredProducts() {
      try {
        setLoading(true);
        setError(null);

        const currentFilters: ProductFilters = {
          page: currentPage,
          limit: pagination.limit,
          search: searchTerm || undefined,
          category: currentCategory || undefined,
          style: currentStyle || undefined,
          sort: currentSort,
          minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
          maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
          color: searchParams.get("color") || undefined,
          size: searchParams.get("size") || undefined,
          inStock: searchParams.get("inStock") === "true",
          rating: searchParams.get("rating") ? Number(searchParams.get("rating")) : undefined,
        };

        const apiResponse = await fetchProducts(currentFilters);

        const transformedProducts: Product[] = apiResponse.data.map(
          (item: ApiProduct) => {
            const priceValue = typeof item.price === "string" ? parseFloat(item.price) : item.price;

            return {
              id: item.id.toString(),
              name: item.name || "Unknown Product",
              image: item.images?.[0]?.url || "https://placehold.co/300x300?text=No+Image",
              price: priceValue, 
              rating: 4.5,
              slug: item.slug,
              discount: priceValue < 50 ? 20 : 0,
            };
          }
        );

        setProducts(transformedProducts);
        setPagination(apiResponse.pagination);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    const timeoutId = setTimeout(() => {
      loadFilteredProducts();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchParams, currentPage, pagination.limit, searchTerm, currentCategory, currentStyle, currentSort]);

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, pagination.page - 2);
    const endPage = Math.min(pagination.totalPages, startPage + 4);

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 0) {
        pages.push(
          <Button
            key={i}
            variant="ghost"
            onClick={() => handlePageChange(i)}
            className={cn(
              "h-9 w-9 rounded-lg",
              i === pagination.page
                ? "bg-black text-white font-bold hover:bg-black/90"
                : "text-slate-500 hover:bg-slate-100"
            )}
          >
            {i}
          </Button>
        );
      }
    }
    return pages;
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-6 min-h-screen">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-slate-900 capitalize">{pageTitle}</span>
      </nav>

      <div className="flex items-start gap-8">

        <div className="hidden lg:block w-[295px] flex-shrink-0 sticky top-24">
          <ProductFilterSidebar
            currentStyle={currentStyle}
            onFilterChange={handleFilterChange}
          />
        </div>

        <div className="flex-1 min-w-0">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold capitalize">{pageTitle}</h1>
              <p className="text-sm text-gray-500 mt-1">
                Showing {(pagination.page - 1) * pagination.limit + 1}-
                {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} Products
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" /> Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] sm:w-[350px] overflow-y-auto p-0">
                    <SheetHeader className="sr-only">
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                    Filter products by category, price, color and size.
                </SheetDescription>
            </SheetHeader>
                    <div className="p-6">
                      <ProductFilterSidebar
                        currentStyle={currentStyle}
                        onFilterChange={handleFilterChange}
                        className="w-full border-r-0 mr-0" 
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/*SORT DROPDOWN */}
              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <span className="text-sm text-slate-500 hidden sm:inline">Sort by:</span>
                <Select value={currentSort} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="price_asc">Price: Low to High</SelectItem>
                    <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-[250px] sm:h-[300px] w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="py-20 text-center bg-red-50 rounded-lg text-red-600 border border-red-100">
              <p className="font-semibold">{error}</p>
              <Button variant="link" onClick={() => window.location.reload()}>Try again</Button>
            </div>
          ) : products.length === 0 ? (
            <div className="py-32 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <SlidersHorizontal className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-900">No products found</h3>
              <p className="text-slate-500 max-w-sm mx-auto mt-2">
                We couldn't find any products matching your filters. Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSearchParams({ page: "1" })} 
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && pagination.totalPages > 1 && (
            <div className="flex justify-center sm:justify-between items-center mt-12 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="hidden sm:flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Previous
              </Button>

              <div className="flex gap-1">{renderPageNumbers()}</div>

              <Button
                variant="outline"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="hidden sm:flex items-center gap-2"
              >
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductListPage;