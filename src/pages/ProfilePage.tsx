import React, { useState, useRef } from 'react';
import { Mail, User, Camera, Save, ArrowRight, Lock, Eye, EyeOff } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';

type TabType = 'profile' | 'password';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile:', { name, email, avatar });
    console.log('Editting', isEditing )
    setIsEditing(false);
    
  };

  const handleCancel = () => {
    setIsEditing(false);
 
  };
  const handleEdit = () =>{
    setIsEditing(true)
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordError('Mật khẩu mới phải khác mật khẩu hiện tại');
      return;
    }

    console.log('Changing password:', { currentPassword, newPassword });
   
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className='min-h-screen w-full bg-white flex items-center justify-center p-4 sm:p-8 py-12'>
      <div className='w-full max-w-[500px] flex flex-col items-center'>
        {/* Page Title */}
        <div className='mb-8 text-center'>
          <h2 className='text-3xl font-bold text-slate-900 tracking-tight'>
            Tài khoản của tôi
          </h2>
          <p className='text-slate-600 mt-2'>Quản lý thông tin tài khoản của bạn</p>
        </div>

        {/* Tabs */}
        <div className='w-full mb-8 flex gap-2 border-b border-slate-200'>
          <button
            type='button'
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Thông tin cá nhân
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'password'
                ? 'text-slate-900 border-b-2 border-slate-900'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đổi mật khẩu
          </button>
        </div>

        {/* Profile Tab Content */}
        {activeTab === 'profile' && (
          <>
            {/* Avatar Section */}
            <div className='mb-8 relative'>
              <div className='relative inline-block'>
                <Avatar
                  src={avatar || undefined}
                  alt={name}
                  fallback={getInitials(name)}
                  className='size-24 border-4 border-white shadow-lg'
                />
                {isEditing && (
                  <button
                    type='button'
                    onClick={handleAvatarClick}
                    className='absolute bottom-0 right-0 size-10 bg-slate-900 hover:bg-black text-white rounded-full flex items-center justify-center shadow-lg transition-colors border-2 border-white'
                  >
                    <Camera size={18} />
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleAvatarChange}
                className='hidden'
              />
            </div>

            {/* Form */}
            <div  className='w-full space-y-6'>
              {/* Name Input */}
              <div className='space-y-2'>
                <label className='text-sm font-bold text-slate-700 ml-1'>Họ và tên</label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400'>
                    <User size={20} strokeWidth={2} />
                  </div>
                  {isEditing ? (
                    <input
                      type='text'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400'
                      placeholder='Nhập họ và tên'
                    />
                  ) : (
                    <div className='w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900'>
                      {name}
                    </div>
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div className='space-y-2'>
                <label className='text-sm font-bold text-slate-700 ml-1'>Email</label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400'>
                    <Mail size={20} strokeWidth={2} />
                  </div>
                  {isEditing ? (
                    <input
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className='w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400'
                      placeholder='Nhập email'
                    />
                  ) : (
                    <div className='w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900'>
                      {email}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className='pt-4 space-y-3'>
                {isEditing ? (
                  <>
                    <button
                      type='button'
                      onClick={(e)=> handleSave(e)}
                      className='w-full bg-zinc-900 hover:bg-black text-white font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-zinc-200'
                    >
                      Lưu thay đổi
                      <Save size={20} />
                    </button>
                    <button
                      type='button'
                      onClick={handleCancel}
                      className='w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-4 rounded-full border-2 border-slate-200 transition-colors'
                    >
                      Hủy
                    </button>
                  </>
                ) : (
                  <button
                    type='button'
                    onClick={() => handleEdit()}
                    className='w-full bg-zinc-900 hover:bg-black text-white font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-zinc-200'
                  >
                    Chỉnh sửa thông tin
                    <ArrowRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        {/* Password Change Tab Content */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordChange} className='w-full space-y-6'>
            {/* Current Password Input */}
            <div className='space-y-2'>
              <label className='text-sm font-bold text-slate-700 ml-1'>
                Mật khẩu hiện tại
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400'>
                  <Lock size={20} strokeWidth={2} />
                </div>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className='w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400 tracking-widest'
                  placeholder='Nhập mật khẩu hiện tại'
                />
                <button
                  type='button'
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className='absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer'
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* New Password Input */}
            <div className='space-y-2'>
              <label className='text-sm font-bold text-slate-700 ml-1'>
                Mật khẩu mới
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400'>
                  <Lock size={20} strokeWidth={2} />
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className='w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400 tracking-widest'
                  placeholder='Nhập mật khẩu mới'
                />
                <button
                  type='button'
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className='absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer'
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className='space-y-2'>
              <label className='text-sm font-bold text-slate-700 ml-1'>
                Xác nhận mật khẩu mới
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400'>
                  <Lock size={20} strokeWidth={2} />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className='w-full pl-11 pr-11 py-3.5 bg-slate-50 border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-slate-400 tracking-widest'
                  placeholder='Xác nhận mật khẩu mới'
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer'
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {passwordError && (
              <div className='text-sm text-red-600 bg-red-50 border border-red-200 rounded-full px-4 py-3'>
                {passwordError}
              </div>
            )}

            {/* Action Button */}
            <div className='pt-4'>
              <button
                type='submit'
                className='w-full bg-zinc-900 hover:bg-black text-white font-medium py-4 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-[0.99] shadow-lg shadow-zinc-200'
              >
                Đổi mật khẩu
                <ArrowRight size={20} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
