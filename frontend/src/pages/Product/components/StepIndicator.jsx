import React from 'react';
import { Check } from 'lucide-react';

const StepIndicator = ({ steps, currentStep }) => {
    return (
        <div className="relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 dark:bg-slate-700">
                <div
                    className="h-full transition-all duration-500 bg-gray-950 dark:bg-blue-500"
                    style={{ width: `${(currentStep / (steps?.length - 1)) * 100}%` }}
                />
            </div>

            <div className="relative flex justify-between">
                {steps?.map((step, index) => {
                    const isCompleted = index < currentStep;
                    const isActive = index === currentStep;

                    return (
                        <div key={index} className="flex flex-col items-center">
                            <div
                                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${isCompleted
                                        ? 'border-gray-950 bg-gray-950 dark:border-blue-500 dark:bg-blue-500'
                                        : isActive
                                            ? 'border-gray-950 bg-white dark:border-blue-500 dark:bg-slate-900'
                                            : 'border-gray-300 bg-white dark:border-slate-700 dark:bg-slate-900'
                                    }`}
                            >
                                {isCompleted ? (
                                    <Check className="w-5 h-5 text-white" />
                                ) : (
                                    <span
                                        className={`text-sm font-medium ${isActive
                                                ? 'text-gray-950 dark:text-blue-500'
                                                : 'text-gray-400 dark:text-gray-500'
                                            }`}
                                    >
                                        {index + 1}
                                    </span>
                                )}
                            </div>
                            <span
                                className={`mt-2 text-xs font-medium ${isActive
                                        ? 'text-gray-950 dark:text-white'
                                        : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                {step}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;