import React, { useMemo } from 'react';

const emergencyTypes = [
    { id: 'BLOOD', label: 'Blood', icon: '🩸', color: 'red' },
    { id: 'MEDICAL', label: 'Medical', icon: '🏥', color: 'blue' },
    { id: 'ACCIDENT', label: 'Accident', icon: '🚑', color: 'orange' },
    { id: 'VOLUNTEER', label: 'Volunteer', icon: '🤝', color: 'green' },
    { id: 'OTHER', label: 'Other', icon: '📌', color: 'gray' },
];

const EmergencyStats = ({ emergencies }) => {
    const counts = useMemo(() => {
        if (!emergencies) return {};

        return emergencies.reduce((acc, emergency) => {
            if (emergency.status !== 'RESOLVED' && emergency.emergencyType) {
                acc[emergency.emergencyType] = (acc[emergency.emergencyType] || 0) + 1;
            }
            return acc;
        }, {});
    }, [emergencies]);

    const getColorClasses = (color) => {
        const colors = {
            red: 'bg-red-100 dark:bg-red-950/50',
            blue: 'bg-blue-100 dark:bg-blue-950/50',
            orange: 'bg-orange-100 dark:bg-orange-950/50',
            green: 'bg-green-100 dark:bg-green-950/50',
            gray: 'bg-gray-100 dark:bg-gray-800',
        };
        return colors[color] || colors.gray;
    };

    return (
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3 md:grid-cols-5">
            {emergencyTypes.map((type) => (
                <div key={type.id} className="p-4 bg-white border border-gray-200 dark:bg-slate-800 rounded-2xl dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl ${getColorClasses(type.color)}`}>
                            <span className="text-2xl">{type.icon}</span>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{type.label}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {counts[type.id] || 0}
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