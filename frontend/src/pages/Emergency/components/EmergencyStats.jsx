import React from 'react';
import { emergencyTypes, getEmergencyCounts } from '../data/mockEmergency';

const EmergencyStats = () => {
    const counts = getEmergencyCounts();

    return (
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3">
            {emergencyTypes.map((type) => (
                <div key={type.id} className="p-4 bg-white border border-gray-200 dark:bg-slate-800 rounded-2xl dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-${type.color}-100 dark:bg-${type.color}-950/50`}>
                            <span className="text-2xl">{type.icon}</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{type.label}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {counts[type.id]}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">active requests</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmergencyStats;