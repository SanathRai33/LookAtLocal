import React, { useState } from 'react';
import {
    MapPin,
    Clock,
    Briefcase,
    GraduationCap,
    Heart,
    Save,
    Check,
    Building,
    Users,
    Calendar,
    Award,
    TrendingUp
} from 'lucide-react';

const JobCard = ({ job }) => {
    const [isSaved, setIsSaved] = useState(job.isSaved || false);

    const {
        title,
        company,
        companyLogo,
        location,
        salary,
        jobType,
        experience,
        postedTime,
        requirements,
        description,
        skills,
        applicants,
        isUrgent,
        featured
    } = job;

    const getJobTypeColor = (type) => {
        const colors = {
            'Full-time': 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
            'Part-time': 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400',
            'Remote': 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
            'Fresher': 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400'
        };
        return colors[type] || colors['Full-time'];
    };

    return (
        <div className={`group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border ${featured ? 'border-blue-300 dark:border-blue-700' : 'border-gray-200 dark:border-gray-700'
            } hover:border-blue-200 dark:hover:border-blue-800`}>

            {/* Featured Badge */}
            {featured && (
                <div className="px-4 py-1 text-xs font-medium text-center text-white bg-blue-600">
                    ⭐ Featured Job
                </div>
            )}

            <div className="p-5">
                {/* Header */}
                <div className="flex items-start gap-4">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                        {companyLogo ? (
                            <img
                                src={companyLogo}
                                alt={company}
                                className="object-cover border border-gray-200 h-14 w-14 rounded-xl dark:border-gray-700"
                            />
                        ) : (
                            <div className="flex items-center justify-center text-xl font-bold text-blue-600 bg-blue-100 h-14 w-14 rounded-xl dark:bg-blue-950/50 dark:text-blue-400">
                                {company.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Job Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-1">
                                {title}
                            </h3>
                            <button
                                onClick={() => setIsSaved(!isSaved)}
                                className="flex-shrink-0 p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                            >
                                <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{company}</span>
                            {isUrgent && (
                                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                                    Urgent
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {postedTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4" />
                        {experience}
                    </span>
                </div>

                {/* Salary */}
                <div className="p-3 mt-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {salary}
                        </span>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getJobTypeColor(jobType)}`}>
                            {jobType}
                        </span>
                    </div>
                </div>

                {/* Requirements */}
                {requirements && requirements.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                        {requirements.map((req, index) => (
                            <span key={index} className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3 text-green-500" />
                                {req}
                            </span>
                        ))}
                    </div>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                        {skills.slice(0, 3).map((skill, index) => (
                            <span key={index} className="text-xs bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full">
                                {skill}
                            </span>
                        ))}
                        {skills.length > 3 && (
                            <span className="text-xs text-gray-400 dark:text-gray-500 px-2.5 py-1">
                                +{skills.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>{applicants} applicants</span>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-5 py-2 text-sm font-medium text-white transition-all duration-200 bg-blue-600 hover:bg-blue-700 rounded-xl hover:shadow-lg hover:shadow-blue-500/25">
                            Apply Now
                        </button>
                        <button className="p-2 text-gray-500 transition-colors duration-200 border border-gray-200 rounded-xl dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700">
                            <Save className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;