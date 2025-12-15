import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { login, register } from "@/services/api";
import { toast } from "sonner";

export default function LoginPage() {
  const navigate = useNavigate();
  // Login page state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        // Register
        if (!name.trim()) {
          toast.error("Please enter your name");
          return;
        }
        const result = await register({ email, password, name });
        if (result.success) {
          toast.success("Registration successful! Logging in...");
          // Auto login after registration
          const loginResult = await login({ email, password });
          if (loginResult.success) {
            toast.success("Login successful!");
            navigate("/");
          }
        }
      } else {
        // Login
        const result = await login({ email, password });
        if (result.success) {
          toast.success("Login successful!");
          // Trigger event để header update
          window.dispatchEvent(new Event("storage"));
          navigate("/");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        {/* Logo Area */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
            SHOP.CO
          </h1>
        </div>

        {/* Page Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            {isRegisterMode ? "Sign Up" : "Login"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isRegisterMode
              ? "Create a new account to start shopping"
              : "Welcome back"}
          </p>
        </div>

        {/* Toggle Login/Register */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setIsRegisterMode(false)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              !isRegisterMode
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsRegisterMode(true)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              isRegisterMode
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full space-y-6">
          {/* Name Input (only shown when registering) */}
          {isRegisterMode && (
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Full Name
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={20} strokeWidth={2} />
                </div>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400"
                  placeholder="Enter your full name"
                  required={isRegisterMode}
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Email Address
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={20} strokeWidth={2} />
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Password
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={20} strokeWidth={2} />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400"
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-2">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setRememberMe(!rememberMe)}
            >
              <div
                className={`
                  w-5 h-5 rounded flex items-center justify-center transition-colors border
                  ${
                    rememberMe
                      ? "bg-sky-500 border-sky-500"
                      : "bg-white border-slate-300"
                  }
                `}
              >
                {rememberMe && (
                  <Check size={14} className="text-white stroke-[4]" />
                )}
              </div>
              <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">
                Remember Me
              </span>
            </div>

            <a
              href="#"
              className="text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors"
            >
              Forgot Password
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-zinc-900 hover:bg-black disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.99] mt-4 shadow-lg shadow-zinc-200"
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                {isRegisterMode ? "Sign Up" : "Login"}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
