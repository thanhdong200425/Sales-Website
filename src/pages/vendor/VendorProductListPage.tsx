import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useVendorAuth } from "../../contexts/VendorAuthContext";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Package, ArrowLeft } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  stockLevel: number;
  inStock: boolean;
  images: { url: string }[];
  status: string;
}

export default function ProductListPage() {
  const { token } = useVendorAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/vendor/products/me", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await res.json();
      
      if (res.ok) {
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/vendor/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        alert("Product deleted successfully.");
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading products...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="mb-6">
                <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => navigate("/vendor/dashboard")}
                    className="pl-0 text-slate-500 hover:text-slate-900 hover:bg-transparent"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
            </div>
        <div>
            <h1 className="text-3xl font-bold text-slate-900">My Products</h1>
            <p className="text-slate-500 mt-1">Manage your store inventory</p>
        </div>
        <Link to="/vendor/products/create">
          <Button className="bg-black hover:bg-zinc-800">
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-700 font-semibold border-b">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <Package className="mx-auto h-10 w-10 mb-3 opacity-20" />
                  You haven't added any products yet.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg border bg-slate-100 overflow-hidden flex-shrink-0">
                        {product.images && product.images[0] ? (
                          <img 
                            src={product.images[0].url} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-xs text-slate-400">No Img</div>
                        )}
                      </div>
                      <span className="font-medium text-slate-900">{product.name}</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 font-medium">${product.price}</td>
                  
                  <td className="px-6 py-4">
                    <span className={`${product.stockLevel > 0 ? 'text-slate-600' : 'text-red-500 font-bold'}`}>
                      {product.stockLevel} units
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/vendor/products/edit/${product.id}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      
                      <Button 
                        variant="destructive" 
                        size="icon" 
                        className="h-8 w-8 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}