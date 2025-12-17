import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPasswordVendor } from "@/services/vendorApi";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";

export default function VendorForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await forgotPasswordVendor(email);
      if (response.success) {
        setEmailSent(true);
        toast.success("Password reset link sent to your email!");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">VendorHub</h1>
            <p className="mt-2 text-sm text-slate-600">Password Reset</p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-semibold text-slate-900">Email Sent!</h2>
              <p className="mb-6 text-sm text-slate-600">
                If an account exists with {email}, you will receive a password reset link shortly.
              </p>
              <button
                onClick={() => navigate("/vendor/login")}
                className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">VendorHub</h1>
          <p className="mt-2 text-sm text-slate-600">Reset your password</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl">
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
              <p className="mt-2 text-xs text-slate-500">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/vendor/login")}
              className="font-semibold text-slate-900 hover:underline"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
