import { BrandStrip } from "@/components/home/brand-strip"
import { Hero } from "@/components/home/hero"
import { NewsletterCta } from "@/components/home/newsletter-cta"
import { ProductSection } from "@/components/home/product-section"
import { StyleBrowser } from "@/components/home/style-browser"
import { TestimonialSection } from "@/components/home/testimonial-section"
import { NEW_ARRIVALS, TOP_SELLING } from "@/data/homepage"

function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <BrandStrip />
      <ProductSection products={NEW_ARRIVALS} title="New Arrivals" />
      <ProductSection products={TOP_SELLING} title="Top Selling" />
      <StyleBrowser />
      <TestimonialSection />
      <NewsletterCta />
    </div>
  )
}

export default HomePage

