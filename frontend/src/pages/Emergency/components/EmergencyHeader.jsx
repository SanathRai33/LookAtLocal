import React from 'react';
import { AlertTriangle } from 'lucide-react';

const EmergencyHeader = () => {
    return (
        <div className="mb-8">
            <div className="flex items-start gap-3">
                <div className="p-3 bg-red-100 dark:bg-red-950/50 rounded-2xl">
                    <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                        Emergency Help Board
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 md:text-base">
                        This page connects people in genuine need with local helpers.
                        <span className="font-medium text-red-600 dark:text-red-400"> Please respond only if you can truly assist.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EmergencyHeader;