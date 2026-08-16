import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

const conditionOptions = [
  { value: 'NEW', label: 'New' },
  { value: 'LIKE_NEW', label: 'Like New' },
  { value: 'GOOD', label: 'Good' },
  { value: 'FAIR', label: 'Fair' },
  { value: 'POOR', label: 'Poor' },
];

const deliveryOptions = [
  { value: 'PICKUP', label: 'Pickup Only' },
  { value: 'SELLER_DELIVERY', label: 'Seller Delivery' },
  { value: 'BOTH', label: 'Both' },
];

const StepDetails = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (formData.title?.length < 3) newErrors.title = 'Title must be at least 3 characters';
    if (formData.description?.length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (!formData.condition) newErrors.condition = 'Please select condition';
    if (!formData.deliveryOption) newErrors.deliveryOption = 'Please select delivery option';
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-950 dark:text-white">Product Details</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Provide detailed information about your item</p>

      <div className="mt-6 space-y-5">
        <div>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Professional DSLR Camera"
            className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${
              errors.title
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
            }`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your item, condition, features, and selling terms..."
            rows="5"
            className={`w-full rounded-2xl border bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${
              errors.description
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
            }`}
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{formData.description?.length || 0}/3000 characters</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="condition" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Condition</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${
                errors.condition
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
              }`}
            >
              <option value="">Select condition</option>
              {conditionOptions?.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.condition && <p className="mt-1 text-sm text-red-500">{errors.condition}</p>}
          </div>

          <div>
            <label htmlFor="deliveryOption" className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200">Delivery Option</label>
            <select
              id="deliveryOption"
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleChange}
              className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${
                errors.deliveryOption
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
              }`}
            >
              <option value="">Select delivery option</option>
              {deliveryOptions?.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.deliveryOption && <p className="mt-1 text-sm text-red-500">{errors.deliveryOption}</p>}
          </div>
        </div>

        <ImageUpload images={formData.images} onImagesChange={(files) => updateFormData({ images: files })} />
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition rounded-xl bg-gray-950 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Next Step
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StepDetails;