export interface CartItem {
  id: string
  name: string
  image: string
  price: number
  size: string
  color: string
  quantity: number
}

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Gradient Graphic T-shirt",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop",
    price: 145,
    size: "Large",
    color: "White",
    quantity: 1,
  },
  {
    id: "2",
    name: "Checkered Shirt",
    image: "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=200&h=200&fit=crop",
    price: 180,
    size: "Medium",
    color: "Red",
    quantity: 1,
  },
  {
    id: "3",
    name: "Skinny Fit Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop",
    price: 240,
    size: "Large",
    color: "Blue",
    quantity: 1,
  },
]

