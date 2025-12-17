import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  User,
  Camera,
  Save,
  ArrowRight,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { getUser, updateUser, changePassword } from "@/services/api";
import type { User as UserType } from "@/services/api";

type TabType = "profile" | "password";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getUser();
      if (response.success && response.user) {
        setName(response.user.name || "");
        setEmail(response.user.email);
      }
    } catch (error: any) {
      console.error("Error loading user data:", error);
      setPasswordError("Unable to load user information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setSuccessMessage("");

    try {
      const response = await updateUser({ name, email });
      if (response.success) {
        setSuccessMessage("Profile updated successfully!");
        setIsEditing(false);
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      setPasswordError(error.message || "Unable to update profile");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPasswordError("");
    setSuccessMessage("");
    // Reload user data to reset form
    loadUserData();
  };

  const handleEdit = () => {
    setIsEditing(true);
    setPasswordError("");
    setSuccessMessage("");
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setSuccessMessage("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Password confirmation does not match");
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError("New password must be different from current password");
      return;
    }

    try {
      const response = await changePassword({
        oldPassword: currentPassword,
        newPassword: newPassword,
      });

      if (response.success) {
        setSuccessMessage(response.message || "Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (error: any) {
      console.error("Error changing password:", error);
      setPasswordError(error.message || "Unable to change password");
    }
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          <p className="mt-4 text-slate-600">Loading information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center p-4 sm:p-8 py-12">
      <div className="w-full max-w-[500px] flex flex-col items-center">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            My Account
          </h2>
          <p className="text-slate-600 mt-2">Manage your account information</p>
        </div>

        {/* Tabs */}
        <div className="w-full mb-8 flex gap-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === "profile"
                ? "text-slate-900 border-b-2 border-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Personal Information
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("password")}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === "password"
                ? "text-slate-900 border-b-2 border-slate-900"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Change Password
          </button>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="w-full mb-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-full px-4 py-3 text-center">
            {successMessage}
          </div>
        )}

        {/* Error Message (for profile errors) */}
        {passwordError && activeTab === "profile" && (
          <div className="w-full mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-full px-4 py-3 text-center">
            {passwordError}
          </div>
        )}

        {/* Profile Tab Content */}
        {activeTab === "profile" && (
          <>
            {/* Avatar Section */}
            <div className="mb-8 relative">
              <div className="relative inline-block">
                <Avatar
                  src={avatar || undefined}
                  alt={name}
                  fallback={getInitials(name)}
                  className="size-24 border-4 border-white shadow-lg"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute bottom-0 right-0 size-10 bg-slate-900 hover:bg-black text-white rounded-full flex items-center justify-center shadow-lg transition-colors border-2 border-white"
                  >
                    <Camera size={18} />
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            {/* Form */}
            <div className="w-full space-y-6">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <User size={20} strokeWidth={2} />
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400"
                      placeholder="Enter your full name"
                    />
                  ) : (
                    <div className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900">
                      {name}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail size={20} strokeWidth={2} />
                  </div>
                  {isEditing ? (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900">
                      {email}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={(e) => handleSave(e)}
                      className="w-full bg-zinc-900 hover:bg-black text-white font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-zinc-200"
                    >
                      Save Changes
                      <Save size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-4 rounded-full border-2 border-slate-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleEdit()}
                    className="w-full bg-zinc-900 hover:bg-black text-white font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-zinc-200"
                  >
                    Edit Profile
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Password Change Tab Content */}
        {activeTab === "password" && (
          <form onSubmit={handlePasswordChange} className="w-full space-y-6">
            {/* Current Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} strokeWidth={2} />
                </div>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400 "
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} strokeWidth={2} />
                </div>
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400 "
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={20} strokeWidth={2} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400 "
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-full px-4 py-3">
                {passwordError}
              </div>
            )}

            {/* Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-zinc-900 hover:bg-black text-white font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-zinc-200"
              >
                Change Password
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
