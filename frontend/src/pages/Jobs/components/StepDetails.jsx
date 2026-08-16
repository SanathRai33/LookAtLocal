import React, { useState } from 'react';

const jobTypes = [
  { value: 'FULL_TIME', label: 'Full-time' },
  { value: 'PART_TIME', label: 'Part-time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'DAILY_WAGE', label: 'Daily Wage' },
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
    if (!formData.companyName?.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.jobType) newErrors.jobType = 'Please select job type';
    if (formData.title?.length < 3) newErrors.title = 'Title must be at least 3 characters';
    if (formData.description?.length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (formData.companyName?.length < 2) newErrors.companyName = 'Company name must be at least 2 characters';
    if (formData.vacancies && formData.vacancies < 1) newErrors.vacancies = 'Vacancies must be at least 1';
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
        Job Details
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Provide detailed information about the job opportunity
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
          >
            Job Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Senior Software Developer"
            className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${
              errors.title
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
          >
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g. Tech Solutions Pvt Ltd"
            className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${
              errors.companyName
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
            }`}
          />
          {errors.companyName && (
            <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the job role, responsibilities, and requirements..."
            rows="5"
            className={`w-full rounded-2xl border bg-gray-50 px-4 py-3 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${
              errors.description
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {formData.description?.length || 0}/3000 characters
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="jobType"
              className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
            >
              Job Type
            </label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${
                errors.jobType
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
              }`}
            >
              <option value="">Select job type</option>
              {jobTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            {errors.jobType && (
              <p className="mt-1 text-sm text-red-500">{errors.jobType}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="vacancies"
              className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
            >
              Number of Vacancies
            </label>
            <input
              id="vacancies"
              name="vacancies"
              type="number"
              min="1"
              value={formData.vacancies}
              onChange={handleChange}
              placeholder="e.g. 2"
              className={`w-full h-[42px] rounded-2xl border bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:bg-white focus:ring-4 disabled:opacity-60 dark:bg-slate-900 dark:text-white ${
                errors.vacancies
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500/10 dark:border-slate-700'
              }`}
            />
            {errors.vacancies && (
              <p className="mt-1 text-sm text-red-500">{errors.vacancies}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="experienceRequired"
            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
          >
            Experience Required (optional)
          </label>
          <input
            id="experienceRequired"
            name="experienceRequired"
            type="text"
            value={formData.experienceRequired}
            onChange={handleChange}
            placeholder="e.g. 2-3 years"
            className="w-full h-[42px] rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="benefits"
            className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
          >
            Benefits (optional)
          </label>
          <input
            id="benefits"
            name="benefits"
            type="text"
            value={formData.benefits}
            onChange={handleChange}
            placeholder="e.g. Health insurance, Paid time off, Flexible hours"
            className="w-full h-[42px] rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Separate multiple benefits with commas
          </p>
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

export default StepDetails;