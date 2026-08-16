import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSpaces } from '../../hooks/useSpaces';
import { useCategories } from '../../hooks/useCategories';
import {
  Loader2,
  AlertCircle,
  Save,
  X,
  MapPin,
  Building,
  Package,
  CheckCircle,
} from 'lucide-react';

const spaceTypes = [
  { value: 'SHOP', label: 'Shop' },
  { value: 'OFFICE', label: 'Office' },
  { value: 'ROOM', label: 'Room' },
  { value: 'PG', label: 'PG' },
  { value: 'WAREHOUSE', label: 'Warehouse' },
  { value: 'PARKING', label: 'Parking' },
];

const EditSpace = () => {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { getSpaceById, updateSpace, loading } = useSpaces();
  const { categories, getCategories } = useCategories();
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    spaceType: '',
    addressLine: '',
    locality: '',
    city: '',
    state: '',
    postalCode: '',
    status: '',
  });
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, [spaceId]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [spaceResult, categoriesResult] = await Promise.all([
        getSpaceById(spaceId),
        getCategories({ module: 'SPACE' }),
      ]);

      if (spaceResult.success) {
        const space = spaceResult.data;
        setFormData({
          categoryId: space.categoryId || '',
          title: space.title || '',
          description: space.description || '',
          spaceType: space.spaceType || '',
          addressLine: space.addressLine || '',
          locality: space.locality || '',
          city: space.city || '',
          state: space.state || '',
          postalCode: space.postalCode || '',
          status: space.status || '',
        });
      } else {
        setError(spaceResult.error || 'Failed to load space');
      }
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);

    try {
      const result = await updateSpace(spaceId, formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/spaces/my-spaces');
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to update space');
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading space details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="w-full max-w-3xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Edit Space</h1>
            <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">Update your space listing details</p>
          </div>
          <button
            onClick={() => navigate('/spaces/my-spaces')}
            className="p-2 text-gray-500 transition rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
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
            <span>Space updated successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              disabled={saving}
              className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option value="">Select category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Premium Office Space"
              disabled={saving}
              className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="spaceType" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Space Type</label>
            <select
              id="spaceType"
              name="spaceType"
              value={formData.spaceType}
              onChange={handleChange}
              disabled={saving}
              className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option value="">Select space type</option>
              {spaceTypes?.map((type) => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your space in detail..."
              rows="4"
              disabled={saving}
              className="w-full px-4 py-3 text-base text-gray-900 transition border border-gray-300 outline-none rounded-2xl bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
            <h3 className="text-sm font-medium text-gray-950 dark:text-white">Location</h3>

            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="addressLine" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Address (optional)</label>
                <input
                  id="addressLine"
                  name="addressLine"
                  type="text"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="Street address"
                  disabled={saving}
                  className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="locality" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Locality (optional)</label>
                <input
                  id="locality"
                  name="locality"
                  type="text"
                  value={formData.locality}
                  onChange={handleChange}
                  placeholder="Locality/Area"
                  disabled={saving}
                  className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">City</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    disabled={saving}
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">State</label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    disabled={saving}
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">PIN Code (optional)</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  maxLength="6"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="6-digit PIN code"
                  disabled={saving}
                  className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex h-12 min-w-[160px] items-center justify-center gap-3 rounded-2xl bg-gray-950 text-base font-semibold text-white transition hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-950/15 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" /> Save Changes
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/spaces/my-spaces')}
              disabled={saving}
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

export default EditSpace;