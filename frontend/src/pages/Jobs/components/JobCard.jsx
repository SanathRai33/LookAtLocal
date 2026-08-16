import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Briefcase,
  Heart,
  Building,
  Users,
  IndianRupee,
  CheckCircle,
  AlertCircle,
  Building2
} from 'lucide-react';
import { BsBuildingsFill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

const JobCard = ({ job, idx }) => {
  const {
    id,
    title,
    companyName,
    jobType,
    salaryMin,
    salaryMax,
    salaryType,
    city,
    state,
    experienceRequired,
    vacancies,
    benefits,
    status,
    poster,
    createdAt,
    isUrgent,
    featured
  } = job;

  const [isSaved, setIsSaved] = useState(false);

  const getJobTypeColor = (type) => {
    const colors = {
      FULL_TIME: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
      PART_TIME: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400',
      CONTRACT: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
      DAILY_WAGE: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400'
    };
    return colors[type] || colors.FULL_TIME;
  };

  const getJobTypeLabel = (type) => {
    const labels = {
      FULL_TIME: 'Full-time',
      PART_TIME: 'Part-time',
      CONTRACT: 'Contract',
      DAILY_WAGE: 'Daily Wage'
    };
    return labels[type] || type;
  };

  const getSalaryLabel = (type) => {
    const labels = {
      HOURLY: '/hr',
      DAILY: '/day',
      MONTHLY: '/mo',
      YEARLY: '/yr'
    };
    return labels[type] || '';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const getSalaryDisplay = () => {
    if (salaryMin && salaryMax) {
      return `₹${salaryMin} - ₹${salaryMax}${getSalaryLabel(salaryType)}`;
    }
    if (salaryMin) {
      return `₹${salaryMin}+${getSalaryLabel(salaryType)}`;
    }
    return 'Salary not specified';
  };

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
      PENDING: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
      CLOSED: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
      REJECTED: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
    };
    return colors[status] || colors.ACTIVE;
  };

  return (
    <div className={`group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${featured ? 'border-blue-300 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700'
      } hover:border-blue-200 dark:hover:border-blue-800`}>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {
              idx % 2 === 0 ?
                (<Building2 className='p-1 border border-gray-200 h-14 w-14 rounded-xl dark:border-gray-700' />) : 
                (<BsBuildingsFill className='p-1 border border-gray-200 h-14 w-14 rounded-xl dark:border-gray-700' />)
            }
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <Link to={`/jobs/${id}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400">
                  {title}
                </h3>
              </Link>
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex-shrink-0 p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="font-medium text-gray-700 dark:text-gray-300">{companyName}</span>
              {isUrgent && (
                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                  Urgent
                </span>
              )}
              {status === 'ACTIVE' && (
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                  {status}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {city}, {state}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {formatDate(createdAt)}
          </span>
          {experienceRequired && (
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              {experienceRequired}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            {vacancies} opening{vacancies > 1 ? 's' : ''}
          </span>
        </div>

        <div className="p-3 mt-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              <IndianRupee className="inline w-4 h-4" />
              {getSalaryDisplay()}
            </span>
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getJobTypeColor(jobType)}`}>
              {getJobTypeLabel(jobType)}
            </span>
          </div>
        </div>

        {benefits && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {benefits.split(',').slice(0, 3).map((benefit, index) => (
              <span key={index} className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                {benefit.trim()}
              </span>
            ))}
            {benefits.split(',').length > 3 && (
              <span className="text-xs text-gray-400 dark:text-gray-500 px-2.5 py-1">
                +{benefits.split(',').length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Building className="w-4 h-4" />
            <span>{poster?.fullName || 'Unknown'}</span>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/jobs/${id}`}
              className="px-5 py-2 text-sm font-medium text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl hover:shadow-lg hover:shadow-blue-500/25"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;