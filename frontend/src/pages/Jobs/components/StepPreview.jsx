import React from 'react';
import { MapPin, IndianRupee, Clock, AlertCircle, Loader2, Briefcase, Building, Users } from 'lucide-react';

const StepPreview = ({ formData, onPrev, onSubmit, loading, error }) => {
  const getCategoryName = () => {
    if (formData.categoryName) {
      return formData.categoryName;
    }
    return formData.categoryId || 'Job';
  };

  const getJobTypeLabel = (type) => {
    const labels = {
      FULL_TIME: 'Full-time',
      PART_TIME: 'Part-time',
      CONTRACT: 'Contract',
      DAILY_WAGE: 'Daily Wage',
    };
    return labels[type] || type;
  };

  const getSalaryLabel = (type) => {
    const labels = {
      HOURLY: '/hr',
      DAILY: '/day',
      MONTHLY: '/mo',
      YEARLY: '/yr',
    };
    return labels[type] || '';
  };

  const getSalaryDisplay = () => {
    if (formData.salaryMin && formData.salaryMax) {
      return `₹${formData.salaryMin} - ₹${formData.salaryMax}${getSalaryLabel(formData.salaryType)}`;
    }
    if (formData.salaryMin) {
      return `₹${formData.salaryMin}+${getSalaryLabel(formData.salaryType)}`;
    }
    return 'Salary not specified';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-950 dark:text-white">
        Preview Your Job
      </h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Review your job listing details before submitting
      </p>

      {error && (
        <div className="flex items-start gap-2 p-3 mt-4 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-6 overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-xl dark:bg-slate-800">
              <Building className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {getCategoryName()}
                </span>
                <span className="inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                  Pending Review
                </span>
              </div>

              <h3 className="mt-2 text-xl font-bold text-gray-950 dark:text-white">
                {formData.title || 'Your job title will appear here'}
              </h3>

              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <Building className="w-4 h-4" />
                <span>{formData.companyName || 'Company name'}</span>
              </div>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {formData.description || 'Your description will appear here...'}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {formData.city || 'City'}, {formData.state || 'State'}
                </span>

                <span className="flex items-center gap-1 font-semibold text-gray-950 dark:text-white">
                  <IndianRupee className="w-4 h-4" />
                  {getSalaryDisplay()}
                </span>

                <span className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  {getJobTypeLabel(formData.jobType)}
                </span>

                {formData.vacancies && (
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {formData.vacancies} opening{formData.vacancies > 1 ? 's' : ''}
                  </span>
                )}

                {formData.applicationDeadline && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Deadline: {formatDate(formData.applicationDeadline)}
                  </span>
                )}
              </div>

              {formData.benefits && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {formData.benefits.split(',').slice(0, 3).map((benefit, index) => (
                    <span key={index} className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-2.5 py-1 rounded-full">
                      {benefit.trim()}
                    </span>
                  ))}
                  {formData.benefits.split(',').length > 3 && (
                    <span className="text-xs text-gray-400 dark:text-gray-500 px-2.5 py-1">
                      +{formData.benefits.split(',').length - 3} more
                    </span>
                  )}
                </div>
              )}

              {formData.experienceRequired && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Experience: {formData.experienceRequired}
                </div>
              )}
            </div>
          </div>

          {formData.addressLine && (
            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">Address:</span> {formData.addressLine}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50 dark:border-slate-800 dark:bg-slate-800/50">
          <div className="flex items-start gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-gray-600 dark:text-gray-300">
              Your job listing will be reviewed and published within 24 hours. You'll receive a notification when it's live.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrev}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 transition border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition rounded-xl bg-gray-950 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Listing
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepPreview;