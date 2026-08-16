import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../hooks/useUser';
import { 
  User, 
  Mail, 
  Phone, 
  Loader2, 
  Save, 
  AlertCircle, 
  MapPin,
  Camera,
  X,
  CheckCircle
} from 'lucide-react';
import { userApi } from '../../api/user.api';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser, refreshUser } = useAuth();
  const { loading: updateLoading } = useUser();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        phone: user.phone || '',
        bio: user.bio || '',
      });
      setImagePreview(user.profileImageUrl || null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

    if (!allowedTypes.includes(file.type)) {
      setImageError('Please upload a JPG, PNG, or WEBP image');
      return;
    }

    if (file.size > maxSize) {
      setImageError('Image size must be less than 2MB');
      return;
    }

    setImageError('');
    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(user?.profileImageUrl || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadImage = async () => {
    if (!profileImage) return;

    setUploadingImage(true);
    setImageError('');

    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);

      const response = await userApi.updateAvatar(formData);
      await refreshUser();
      setImagePreview(response.data.data.profileImageUrl);
      setProfileImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setImageError(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const result = await updateUser(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-8 h-8 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="w-full max-w-3xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
            Edit Profile
          </h1>
          <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
            Update your personal information and profile picture
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-start gap-2 p-3 mb-4 text-sm rounded-lg text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400">
            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>Profile updated successfully!</span>
          </div>
        )}

        <div className="mb-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative">
              <div className="w-24 h-24 overflow-hidden border-2 border-gray-200 rounded-full dark:border-slate-700">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-blue-500 to-blue-600">
                    <User className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                type="button"
                className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition disabled:opacity-50"
                title="Change profile picture"
              >
                <Camera className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/jpg"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
                {user.fullName || 'User'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email || 'user@example.com'}
              </p>
              
              {profileImage && (
                <div className="flex items-center justify-center gap-2 mt-3 sm:justify-start">
                  <button
                    onClick={handleUploadImage}
                    disabled={uploadingImage}
                    type="button"
                    className="px-5 py-1.5 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Save Photo'
                    )}
                  </button>
                  <button
                    onClick={handleRemoveImage}
                    disabled={uploadingImage}
                    type="button"
                    className="px-4 py-1.5 text-sm font-medium text-gray-600 transition bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600 disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              {imageError && (
                <p className="mt-2 text-sm text-red-500">{imageError}</p>
              )}
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                JPG, PNG, WEBP • Max 2MB
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
            >
              Full name
            </label>
            <div className="relative">
              <User className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                disabled={loading || updateLoading}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
              <input
                id="email"
                type="email"
                value={user.email || ''}
                disabled
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-100 pl-12 pr-4 text-base text-gray-500 outline-none cursor-not-allowed dark:border-slate-700 dark:bg-slate-800 dark:text-gray-400"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Email cannot be changed
            </p>
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
            >
              Mobile number
            </label>
            <div className="relative">
              <Phone className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                disabled={loading || updateLoading}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="bio"
              className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
            >
              Bio
            </label>
            <div className="relative">
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                rows="3"
                maxLength="500"
                disabled={loading || updateLoading}
                className="w-full px-4 py-3 text-base text-gray-900 transition border border-gray-300 outline-none rounded-2xl bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {formData.bio?.length || 0}/500 characters
            </p>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Address Information
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Manage your address details
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/profile/edit-address')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 transition rounded-lg hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/50"
              >
                <MapPin className="w-4 h-4" />
                Edit Address
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading || updateLoading}
              className="flex h-12 min-w-[160px] items-center justify-center gap-3 rounded-2xl bg-gray-950 text-base font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {loading || updateLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/profile')}
              disabled={loading || updateLoading}
              className="flex h-12 min-w-[140px] items-center justify-center rounded-2xl border border-gray-300 bg-white text-base font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed dark:border-slate-700 dark:bg-slate-900 dark:text-gray-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;