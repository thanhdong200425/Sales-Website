import { BrandStrip } from "@/components/home/brand-strip";
import { Hero } from "@/components/home/hero";
import { NewsletterCta } from "@/components/home/newsletter-cta";
import {
  ProductSection,
  type Product,
} from "@/components/home/product-section";
import { StyleBrowser } from "@/components/home/style-browser";
import { TestimonialSection } from "@/components/home/testimonial-section";
import { NEW_ARRIVALS, TOP_SELLING } from "@/data/homepage";
import { useEffect, useState } from "react";
import { fetchProducts, type ApiProduct } from "@/services/api";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const apiProducts = await fetchProducts();

        // Transform API products to match the Product interface
        const transformedProducts: Product[] = apiProducts.map(
          (product: ApiProduct) => ({
            id: product.id.toString(),
            name: product.name,
            image: product.images[0]?.url || "https://via.placeholder.com/300",
            price: parseFloat(product.price),
            rating: 4.5, // Default rating since it's not in the database
          })
        );

        setProducts(transformedProducts);
        setError(null);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Failed to load products from the server");
        // Fall back to static data
        setProducts([...NEW_ARRIVALS, ...TOP_SELLING]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // Split products into new arrivals (first 4) and top selling (next 4)
  const newArrivals = products.slice(0, 4);
  const topSelling = products.slice(4, 8);

  return (
    <div className="space-y-0">
      <Hero />
      <BrandStrip />

      {loading ? (
        <div className="px-4 py-16 text-center">
          <p className="text-slate-600">Loading products...</p>
        </div>
      ) : error ? (
        <div className="px-4 py-16 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      ) : null}

      {!loading && (
        <>
          <ProductSection
            products={newArrivals.length > 0 ? newArrivals : NEW_ARRIVALS}
            title="New Arrivals"
          />
          <ProductSection
            products={topSelling.length > 0 ? topSelling : TOP_SELLING}
            title="Top Selling"
          />
        </>
      )}

      <StyleBrowser />
      <TestimonialSection />
      <NewsletterCta />
    </div>
  );
}

export default HomePage;
