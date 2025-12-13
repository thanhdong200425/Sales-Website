import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Resetting password for:", {
            email,
            newPassword,
            rememberMe,
        });
    };

    return (
        <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-[480px] flex flex-col items-center">
                {/* Logo */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
                        SHOP.CO
                    </h1>
                </div>

                {/* Title */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Forgot Password?
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    {/* Email */}
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
                                placeholder="yourname@email.com"
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700 ml-1">
                            New Password
                        </label>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Lock size={20} strokeWidth={2} />
                            </div>

                            <input
                                type={showPassword ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400 tracking-widest"
                                placeholder="Enter a new password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember & Login link */}
                    <div className="flex items-center justify-between pt-2">
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => setRememberMe(!rememberMe)}
                        >
                            <div
                                className={`w-5 h-5 rounded flex items-center justify-center transition-colors border ${
                                    rememberMe
                                        ? "bg-sky-500 border-sky-500"
                                        : "bg-white border-slate-300"
                                }`}
                            >
                                {rememberMe && (
                                    <Check
                                        size={14}
                                        className="text-white stroke-4"
                                    />
                                )}
                            </div>
                            <span className="text-sm font-medium text-slate-700 group-hover:text-black transition-colors">
                                Remember Me
                            </span>
                        </div>

                        <a
                            href="/login"
                            className="text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors"
                        >
                            Login
                        </a>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-zinc-900 hover:bg-black text-white font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.99] mt-4 shadow-lg shadow-zinc-200"
                    >
                        Continue
                        <ArrowRight size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
}
