import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVendorAuth } from "@/contexts/VendorAuthContext";
import { loginVendor } from "@/services/vendorApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function VendorLoginPage() {
  const navigate = useNavigate();
  const { login } = useVendorAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await loginVendor(email, password);
      if (response.success) {
        login(response.token, response.vendor);
        toast.success("Login successful!");
        navigate("/vendor/dashboard");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">VendorHub</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to your vendor account</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="vendor@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/vendor/forgot-password")}
                  className="text-xs font-medium text-slate-900 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/vendor/register")}
              className="font-semibold text-slate-900 hover:underline"
            >
              Register here
            </button>
          </div>

          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <p className="text-xs font-medium text-blue-900">Demo Credentials:</p>
            <p className="mt-1 text-xs text-blue-700">
              Email: vendor1@techstore.com<br />
              Password: vendor123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

