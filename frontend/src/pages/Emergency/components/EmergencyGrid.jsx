import React from 'react';
import EmergencyCard from './EmergencyCard';

const EmergencyGrid = ({ requests }) => {
    if (requests.length === 0) {
        return (
            <div className="py-16 text-center">
                <div className="mb-4 text-6xl">✅</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    No active emergency requests
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    All clear! No emergency requests at the moment.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 md:gap-6">
            {requests.map((request) => (
                <EmergencyCard key={request.id} request={request} />
            ))}
        </div>
    );
};

export default EmergencyGrid;