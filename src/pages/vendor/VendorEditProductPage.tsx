import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVendorAuth } from "../../contexts/VendorAuthContext";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const COLORS = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Red", value: "#F50606" },
  { name: "Blue", value: "#06CAF5" },
  { name: "Green", value: "#00C12B" },
];
const SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
];
const STYLES = ["Casual", "Formal", "Party", "Gym"];

export default function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useVendorAuth();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stockLevel: "",
    description: "",
    color: COLORS[0].value,
    size: "Medium",
    style: "Casual",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/vendor/products/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        if (res.ok) {
          setFormData({
            name: data.name,
            price: data.price,
            stockLevel: data.stockLevel,
            description: data.description || "",
            color: data.color || COLORS[0].value,
            size: data.size || "Medium",
            style: data.style || "Casual",
            imageUrl: data.images?.[0]?.url || "",
          });
        } else {
          toast.error("Product not found!");
          navigate("/vendor/products");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    if (token) fetchProduct();
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:3000/api/vendor/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            stockLevel: Number(formData.stockLevel),
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update");

      toast.success("Product updated successfully!");
      navigate("/vendor/products");
    } catch (error: any) {
      toast.error(error.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin" /> Loading data...
      </div>
    );

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
      <h1 className="text-3xl font-bold mb-6 text-slate-900">
        Edit Product #{id}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2">
            Product Name
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Price ($)
            </label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Stock</label>
            <Input
              type="number"
              value={formData.stockLevel}
              onChange={(e) =>
                setFormData({ ...formData, stockLevel: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <select
            className="border p-2 rounded"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
          >
            {COLORS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded"
            value={formData.size}
            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          >
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded"
            value={formData.style}
            onChange={(e) =>
              setFormData({ ...formData, style: e.target.value })
            }
          >
            {STYLES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Image URL</label>
          <Input
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Description
          </label>
          <textarea
            className="w-full border p-2 rounded"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-black hover:bg-zinc-800 text-white"
        >
          {loading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}
