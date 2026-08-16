import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BsBuilding } from 'react-icons/bs';

const RelatedJobs = ({ jobs = [] }) => {
    const navigate = useNavigate();

    if (!jobs.length) {
        return null;
    }

    return (
        <div className="p-6 bg-white shadow-sm rounded-2xl dark:bg-slate-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                More from this provider
            </h3>

            <div className="mt-4 job-y-3">
                {jobs.map((job) => {

                    return (
                        <button
                            key={job.id}
                            type="button"
                            onClick={() => navigate(`/jobs/${job.id}`)}
                            className="flex items-center w-full gap-3 p-3 text-left transition rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                            <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-xl dark:bg-slate-700">
                                <BsBuilding className='w-full h-full p-4' />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {job.title}
                                </p>

                                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                    Total {job?.vacancies} vacancies
                                </p>
                            </div>

                            <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedJobs;