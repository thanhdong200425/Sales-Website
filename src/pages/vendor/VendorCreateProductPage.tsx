import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVendorAuth } from "../../contexts/VendorAuthContext";
import { ArrowLeft } from "lucide-react";

const COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#F50606" },
  { name: "Blue", value: "#06CAF5" },
  { name: "Green", value: "#00C12B" },
];

const SIZES = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"];
const STYLES = ["Casual", "Formal", "Party", "Gym"];

export default function CreateProductPage() {
  const navigate = useNavigate();
  const { token } = useVendorAuth();

  useEffect(() => {
    if (!token) {
      navigate("/vendor/login");
    }
  }, [token, navigate]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stockLevel: "100",
    description: "",
    categoryId: "1",
    color: COLORS[0].value,
    size: "Medium",
    style: "Casual",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Current Token:", token);

    if (!token) {
      alert("Error: Token not found. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/vendor/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stockLevel: Number(formData.stockLevel),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.details === "EMPTY_CATEGORY_ERROR") {
          alert("Warning: Category list is empty. Please run seed first.");
          return;
        }
        throw new Error(data.message || "Failed to create product");
      }

      alert("Product created successfully!");
      navigate("/vendor/products");

    } catch (error: any) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-xl my-10 border border-slate-100">
      <div className="mb-6">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/vendor/products")}
          className="pl-0 text-slate-500 hover:text-slate-900 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> 
        </Button>
      </div>
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Product Name</label>
          <Input
            placeholder="Ex: Urban Hoodie"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            required
            className="h-11"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Price ($)</label>
            <Input
              type="number"
              placeholder="0.00"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Stock Quantity</label>
            <Input
              type="number"
              value={formData.stockLevel}
              onChange={e => setFormData({ ...formData, stockLevel: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Color</label>
            <select
              className="w-full h-10 border rounded-md px-3 bg-white text-sm"
              value={formData.color}
              onChange={e => setFormData({ ...formData, color: e.target.value })}
            >
              {COLORS.map(c => <option key={c.value} value={c.value}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Size</label>
            <select
              className="w-full h-10 border rounded-md px-3 bg-white text-sm"
              value={formData.size}
              onChange={e => setFormData({ ...formData, size: e.target.value })}
            >
              {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">Style</label>
            <select
              className="w-full h-10 border rounded-md px-3 bg-white text-sm"
              value={formData.style}
              onChange={e => setFormData({ ...formData, style: e.target.value })}
            >
              {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Image URL</label>
          <Input
            placeholder="https://..."
            value={formData.imageUrl}
            onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
          />
          {formData.imageUrl && (
            <img src={formData.imageUrl} alt="Preview" className="mt-3 h-32 w-32 object-cover rounded-lg border" />
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">Description</label>
          <textarea
            className="w-full border rounded-md p-3 text-sm min-h-[100px] focus:ring-2 focus:ring-black focus:outline-none"
            placeholder="Write something about your product..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-black hover:bg-zinc-800 h-12 text-lg">
          {loading ? "Saving..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}