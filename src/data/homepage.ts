import type { Product } from "@/components/home/product-section"

const NEW_ARRIVALS: Product[] = [
  {
    id: "tee-tape",
    slug: "tee-tape",
    name: "T-shirt with Tape Details",
    image: "https://www.figma.com/api/mcp/asset/4cde38ef-094f-4188-9230-9a0d76c3bf71",
    price: 120,
    rating: 4.5,
  },
  {
    id: "skinny-fit",
    slug: "skinny-fit",
    name: "Skinny Fit Jeans",
    image: "https://www.figma.com/api/mcp/asset/58e2100b-6a10-4d7e-97dd-2bfb21699fd9",
    price: 240,
    originalPrice: 260,
    rating: 4.5,
    badge: "-20%",
  },
  {
    id: "checker-shirt",
    slug: "checker-shirt",
    name: "Checker Shirt",
    image: "https://www.figma.com/api/mcp/asset/90d3d1e5-7e88-4c18-b607-83bbfde3fbe1",
    price: 180,
    rating: 4.3,
  },
  {
    id: "striped-tee",
    slug: "striped-tee",
    name: "Sleeve Striped T-shirt",
    image: "https://www.figma.com/api/mcp/asset/5c1ca76f-2677-4645-a241-77625b80aa79",
    price: 130,
    originalPrice: 160,
    rating: 4.8,
    badge: "-30%",
  },
]

const TOP_SELLING: Product[] = [
  {
    id: "vertical-striped",
    slug: "vertical-striped",
    name: "Vertical Striped Shirt",
    image: "https://www.figma.com/api/mcp/asset/5416e836-7815-4f9c-939f-cecdf46ccb18",
    price: 212,
    originalPrice: 232,
    rating: 5,
    badge: "-20%",
  },
  {
    id: "courage-tee",
    slug: "courage-tee",
    name: "Courage Graphic Tee",
    image: "https://www.figma.com/api/mcp/asset/37b93b7b-8451-4ded-8cb8-22b07b520d69",
    price: 145,
    rating: 4.4,
  },
  {
    id: "loose-shorts",
    slug: "loose-shorts",
    name: "Loose Fit Bermuda Shorts",
    image: "https://www.figma.com/api/mcp/asset/fbf90254-939b-403d-83ad-21d5c4c614bc",
    price: 80,
    rating: 3.8,
  },
  {
    id: "faded-jeans",
    slug: "faded-jeans",
    name: "Faded Skinny Jeans",
    image: "https://www.figma.com/api/mcp/asset/cc7b81d5-98da-4ece-b339-daf2dcf3f084",
    price: 210,
    rating: 4.6,
  },
]

export { NEW_ARRIVALS, TOP_SELLING }

