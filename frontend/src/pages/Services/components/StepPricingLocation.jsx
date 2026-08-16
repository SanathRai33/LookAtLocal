import React, { useState } from 'react';

const pricingTypes = [
    { value: 'HOURLY', label: 'Per hour' },
    { value: 'DAILY', label: 'Per day' },
    { value: 'FIXED', label: 'Fixed price' },
];

const StepPricingLocation = ({ formData, updateFormData, onNext, onPrev }) => {
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        updateFormData({
            [name]: type === 'checkbox' ? checked : value,
        });
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.price) newErrors.price = 'Price is required';
        if (parseFloat(formData.price) <= 0) newErrors.price = 'Price must be greater than 0';
        if (!formData.pricingType) newErrors.pricingType = 'Please select a pricing type';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (formData.postalCode && !/^[1-9][0-9]{5}$/.test(formData.postalCode)) {
            newErrors.postalCode = 'Please enter a valid 6-digit PIN code';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validate()) {
            onNext();
        }
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
                Pricing & Location
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Set your pricing and location details
            </p>

            <div className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="price"
                            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                        >
                            Price / Rate
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="e.g. 499"
                            className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${errors.price
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
                                }`}
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-500">{errors.price}</p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="pricingType"
                            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                        >
                            Unit
                        </label>
                        <select
                            id="pricingType"
                            name="pricingType"
                            value={formData.pricingType}
                            onChange={handleChange}
                            className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${errors.pricingType
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
                                }`}
                        >
                            <option value="">Select unit</option>
                            {pricingTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>
                        {errors.pricingType && (
                            <p className="mt-1 text-sm text-red-500">{errors.pricingType}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        id="isNegotiable"
                        name="isNegotiable"
                        type="checkbox"
                        checked={formData.isNegotiable}
                        onChange={handleChange}
                        className="w-4 h-4 border-gray-300 rounded accent-gray-950 dark:accent-blue-500"
                    />
                    <label
                        htmlFor="isNegotiable"
                        className="text-sm text-gray-700 dark:text-gray-300"
                    >
                        Price is negotiable
                    </label>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-slate-800">
                    <h3 className="text-sm font-medium text-gray-950 dark:text-white">Location</h3>

                    <div className="mt-4 space-y-4">
                        <div>
                            <label
                                htmlFor="addressLine"
                                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                            >
                                Address (optional)
                            </label>
                            <input
                                id="addressLine"
                                name="addressLine"
                                type="text"
                                value={formData.addressLine}
                                onChange={handleChange}
                                placeholder="e.g. Andheri West"
                                className="w-full h-[42px] rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="city"
                                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                                >
                                    City
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="e.g. Mumbai"
                                    className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${errors.city
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
                                        }`}
                                />
                                {errors.city && (
                                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="state"
                                    className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                                >
                                    State
                                </label>
                                <input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="e.g. Maharashtra"
                                    className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${errors.state
                                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
                                        }`}
                                />
                                {errors.state && (
                                    <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="postalCode"
                                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                            >
                                PIN Code
                            </label>
                            <input
                                id="postalCode"
                                name="postalCode"
                                type="text"
                                maxLength="6"
                                value={formData.postalCode}
                                onChange={handleChange}
                                placeholder="e.g. 400001"
                                className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${errors.postalCode
                                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
                                    }`}
                            />
                            {errors.postalCode && (
                                <p className="mt-1 text-sm text-red-500">{errors.postalCode}</p>
                            )}
                        </div>
                    </div>
                </div>
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

export default StepPricingLocation;