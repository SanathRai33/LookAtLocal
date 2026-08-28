import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  IndianRupee,
  Building,
  Users,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  MessageCircle,
  GraduationCap
} from 'lucide-react';

import { useJobs } from '../../hooks/useJobs';
import useJobApplication from '../../hooks/useJobApplication';

import ProviderCard from '../../components/common/ProviderCard';
import RelatedJobs from './components/RelatedJobs';
import JobApplicationModal from './components/JobApplicationModal';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const { getJobById, loading } = useJobs();

  const {
    createApplication,
    getMyApplications,
    loading: applicationLoading,
  } = useJobApplication();

  const [job, setJob] = useState(null);
  const [error, setError] = useState('');
  const [showApplicationModal, setShowApplicationModal] =
    useState(false);

  const [application, setApplication] = useState(null);
  const [applicationLoadingState, setApplicationLoadingState] =
    useState(true);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  useEffect(() => {
    if (jobId) {
      fetchMyApplication();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    const result = await getJobById(jobId);

    if (result.success) {
      setJob(result.data);
    } else {
      setError(result.error);
    }
  };

  const fetchMyApplication = async () => {
    setApplicationLoadingState(true);

    const result = await getMyApplications({
      page: 1,
      limit: 100,
    });

    if (result.success) {
      const applications =
        result.data?.applications || [];

      const currentApplication =
        applications.find(
          (item) =>
            item.jobId === jobId ||
            item.job?.id === jobId
        );

      setApplication(
        currentApplication || null
      );
    }

    setApplicationLoadingState(false);
  };

  const handleApplicationSubmit = async (data) => {
    const result = await createApplication(data);

    if (result.success) {
      setApplication(result.data);
    }

    return result;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);

    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
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
    if (!job) return '';

    if (job.salaryMin && job.salaryMax) {
      return `₹${job.salaryMin} - ₹${job.salaryMax}${getSalaryLabel(
        job.salaryType
      )}`;
    }

    if (job.salaryMin) {
      return `₹${job.salaryMin}+${getSalaryLabel(
        job.salaryType
      )}`;
    }

    return 'Salary not specified';
  };

  const applicationStatus =
    application?.status || null;

  const isAccepted =
    applicationStatus === 'ACCEPTED';

  const isPendingApplication = [
    'APPLIED',
    'REVIEWING',
    'SHORTLISTED',
  ].includes(applicationStatus);

  const isRejected =
    applicationStatus === 'REJECTED';

  const isWithdrawn =
    applicationStatus === 'WITHDRAWN';

  const canApply =
    !application &&
    job?.status === 'ACTIVE';

  const getApplicationButton = () => {
    if (applicationStatus === 'ACCEPTED') {
      return (
        <div className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-emerald-700 bg-emerald-100 rounded-xl dark:bg-emerald-900/30 dark:text-emerald-400">
          <CheckCircle className="w-5 h-5" />
          Application Accepted
        </div>
      );
    }

    if (applicationStatus === 'APPLIED') {
      return (
        <div className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-amber-700 bg-amber-100 rounded-xl dark:bg-amber-900/30 dark:text-amber-400">
          <CheckCircle className="w-5 h-5" />
          Application Submitted
        </div>
      );
    }

    if (applicationStatus === 'REVIEWING') {
      return (
        <div className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-blue-700 bg-blue-100 rounded-xl dark:bg-blue-900/30 dark:text-blue-400">
          <Loader2 className="w-5 h-5" />
          Application Under Review
        </div>
      );
    }

    if (applicationStatus === 'SHORTLISTED') {
      return (
        <div className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-purple-700 bg-purple-100 rounded-xl dark:bg-purple-900/30 dark:text-purple-400">
          <CheckCircle className="w-5 h-5" />
          Shortlisted
        </div>
      );
    }

    if (isRejected) {
      return (
        <div className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-red-700 bg-red-100 rounded-xl dark:bg-red-900/30 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          Application Rejected
        </div>
      );
    }

    if (isWithdrawn) {
      return (
        <div className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-gray-700 bg-gray-100 rounded-xl dark:bg-slate-700 dark:text-gray-300">
          <AlertCircle className="w-5 h-5" />
          Application Withdrawn
        </div>
      );
    }

    if (canApply) {
      return (
        <button
          type="button"
          onClick={() =>
            setShowApplicationModal(true)
          }
          className="flex items-center gap-2 px-6 py-3 font-semibold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
        >
          <Briefcase className="w-5 h-5" />
          Apply Now
        </button>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <Loader2 className="w-10 h-10 mx-auto text-blue-600 animate-spin" />

          <p className="mt-4 text-gray-500 dark:text-gray-400">
            Loading job details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-950">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500" />

          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Job not found
          </h2>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            {error ||
              'The job you are looking for does not exist.'}
          </p>

          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8 lg:py-8">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Jobs
        </button>

        <div className="grid grid-cols-1 gap-8 mt-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="overflow-hidden bg-white shadow-sm rounded-2xl dark:bg-slate-800">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </h1>

                    <div className="flex items-center gap-2 mt-1">
                      <Building className="w-4 h-4 text-gray-400" />

                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {job.companyName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {job.city}, {job.state}
                  </div>

                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Briefcase className="w-4 h-4" />
                    {getJobTypeLabel(
                      job.jobType
                    )}
                  </div>

                  {job.experienceRequired && (
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <GraduationCap className="w-4 h-4" />
                      {job.experienceRequired}
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    {job.vacancies}{' '}
                    opening
                    {job.vacancies >
                      1
                      ? 's'
                      : ''}
                  </div>
                </div>

                <div className="p-4 mt-4 bg-blue-50 rounded-xl dark:bg-blue-950/30">
                  <div className="flex flex-wrap items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      <IndianRupee className="inline w-5 h-5" />
                      {getSalaryDisplay()}
                    </span>

                    <span className="text-sm text-blue-600 dark:text-blue-400">
                      {job.salaryType
                        ? `${job.salaryType.toLowerCase()} salary`
                        : ''}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Job Description
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>

                {job.benefits && (
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Benefits
                    </h3>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.benefits.split(',').map((benefit, index) => (
                            <span key={index}
                              className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full"
                            >
                              {benefit.trim()}
                            </span>
                          )
                        )}
                    </div>
                  </div>
                )}

                {job.applicationDeadline && (
                  <div className="p-4 mt-6 rounded-xl bg-yellow-50 dark:bg-yellow-950/20">
                    <div className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-300">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Application deadline:{' '}
                        {formatDate(
                          job.applicationDeadline
                        )}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mt-6">
                  {getApplicationButton()}

                  {isAccepted && (
                    <>
                      {job.poster?.phone && (
                        <a href={`tel:${job.poster.phone}`}
                          className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-700 transition bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                        >
                          <Phone className="w-4 h-4" />
                          Call
                        </a>
                      )}

                      {job.poster?.phone && (
                        <a href={`https://wa.me/${String(job.poster.phone).replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-700 transition bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      )}

                      {job.poster?.email && (
                        <a
                          href={`mailto:${job.poster.email}`}
                          className="flex items-center gap-2 px-5 py-3 font-semibold text-gray-700 transition bg-gray-100 rounded-xl hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                        >
                          <Mail className="w-4 h-4" />
                          Email
                        </a>
                      )}
                    </>
                  )}
                </div>

                {isPendingApplication && (
                  <div className="p-4 mt-4 border border-blue-100 rounded-xl bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/10">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Your application is being considered by the employer. Contact details will be available after your application is accepted.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ProviderCard user={job.poster || {}} roleLabel="Job Poster" providingSince={job?.createdAt}
              isPhoneVerified={job.poster?.isPhoneVerified} isEmailVerified={job.poster?.isEmailVerified}
              isTopRated={false} profilePath={`/users/${job.poster?.id}`}
            />
            <RelatedJobs jobs={job.similarJobs}/>
          </div>
        </div>
      </div>

      <JobApplicationModal
        job={job}
        open={showApplicationModal}
        loading={applicationLoading || applicationLoadingState}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApplicationSubmit}
      />
    </div>
  );
};

export default JobDetails;