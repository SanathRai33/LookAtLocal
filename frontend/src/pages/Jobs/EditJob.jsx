import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../../../hooks/useJobs';
import { useCategories } from '../../../hooks/useCategories';
import {
  Loader2,
  AlertCircle,
  Save,
  X,
  MapPin,
  IndianRupee,
  Clock,
  CheckCircle,
  Building,
  Briefcase,
  Users
} from 'lucide-react';

const jobTypes = [
  { value: 'FULL_TIME', label: 'Full-time' },
  { value: 'PART_TIME', label: 'Part-time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'DAILY_WAGE', label: 'Daily Wage' },
];

const salaryTypes = [
  { value: 'HOURLY', label: 'Per hour' },
  { value: 'DAILY', label: 'Per day' },
  { value: 'MONTHLY', label: 'Per month' },
  { value: 'YEARLY', label: 'Per year' },
];

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { getJobById, updateJob, loading } = useJobs();
  const { categories, getCategories } = useCategories();
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    companyName: '',
    jobType: '',
    salaryMin: '',
    salaryMax: '',
    salaryType: '',
    benefits: '',
    experienceRequired: '',
    vacancies: 1,
    addressLine: '',
    locality: '',
    city: '',
    state: '',
    postalCode: '',
    applicationDeadline: '',
    isAvailable: true,
  });
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchData();
  }, [jobId]);

  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [jobResult, categoriesResult] = await Promise.all([
        getJobById(jobId),
        getCategories({ module: 'JOB' })
      ]);

      if (jobResult.success) {
        const job = jobResult.data;
        setFormData({
          categoryId: job.categoryId || '',
          title: job.title || '',
          description: job.description || '',
          companyName: job.companyName || '',
          jobType: job.jobType || '',
          salaryMin: job.salaryMin || '',
          salaryMax: job.salaryMax || '',
          salaryType: job.salaryType || '',
          benefits: job.benefits || '',
          experienceRequired: job.experienceRequired || '',
          vacancies: job.vacancies || 1,
          addressLine: job.addressLine || '',
          locality: job.locality || '',
          city: job.city || '',
          state: job.state || '',
          postalCode: job.postalCode || '',
          applicationDeadline: job.applicationDeadline ? job.applicationDeadline.split('T')[0] : '',
          isAvailable: job.isAvailable !== undefined ? job.isAvailable : true,
        });
      } else {
        setError(jobResult.error || 'Failed to load job');
      }
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
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
      const result = await updateJob(jobId, formData);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/my-jobs');
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to update job');
    } finally {
      setSaving(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />
          <p className="mt-4 text-gray-500 dark:text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="w-full max-w-3xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
              Edit Job
            </h1>
            <p className="mt-1.5 text-[14px] text-gray-500 dark:text-gray-400">
              Update your job listing details
            </p>
          </div>
          <button
            onClick={() => navigate('/my-jobs')}
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
            <span>Job updated successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="categoryId"
              className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
            >
              Category
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              disabled={saving}
              className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

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
              disabled={saving}
              className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
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
              disabled={saving}
              className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
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
              placeholder="Describe the job role and responsibilities..."
              rows="4"
              disabled={saving}
              className="w-full px-4 py-3 text-base text-gray-900 transition border border-gray-300 outline-none rounded-2xl bg-gray-50 placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                disabled={saving}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="">Select job type</option>
                {jobTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
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
                disabled={saving}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
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
              disabled={saving}
              className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
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
              placeholder="e.g. Health insurance, Paid time off"
              disabled={saving}
              className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label
                htmlFor="salaryMin"
                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
              >
                Min Salary
              </label>
              <input
                id="salaryMin"
                name="salaryMin"
                type="number"
                min="0"
                step="0.01"
                value={formData.salaryMin}
                onChange={handleChange}
                placeholder="30000"
                disabled={saving}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="salaryMax"
                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
              >
                Max Salary (optional)
              </label>
              <input
                id="salaryMax"
                name="salaryMax"
                type="number"
                min="0"
                step="0.01"
                value={formData.salaryMax}
                onChange={handleChange}
                placeholder="50000"
                disabled={saving}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="salaryType"
                className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
              >
                Salary Type
              </label>
              <select
                id="salaryType"
                name="salaryType"
                value={formData.salaryType}
                onChange={handleChange}
                disabled={saving}
                className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                <option value="">Select type</option>
                {salaryTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="applicationDeadline"
              className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
            >
              Application Deadline (optional)
            </label>
            <input
              id="applicationDeadline"
              name="applicationDeadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={handleChange}
              disabled={saving}
              className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
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
                  placeholder="Street address"
                  disabled={saving}
                  className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="locality"
                  className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                >
                  Locality (optional)
                </label>
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
                    placeholder="City"
                    disabled={saving}
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
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
                    placeholder="State"
                    disabled={saving}
                    className="h-[42px] w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 text-base text-gray-900 outline-none transition placeholder:text-gray-500 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block mb-2 text-sm font-medium text-gray-950 dark:text-gray-200"
                >
                  PIN Code (optional)
                </label>
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
              onClick={() => navigate('/jobs/my-jobs')}
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

export default EditJob;