import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import EmergencyHeader from './components/EmergencyHeader';
import EmergencyStats from './components/EmergencyStats';
import EmergencyGrid from './components/EmergencyGrid';
import { mockEmergencyRequests } from './data/mockEmergency';
import { AlertCircle } from 'lucide-react';

const Emergency = () => {
    // Get all active requests
    const activeRequests = useMemo(() => {
        return mockEmergencyRequests.filter(req => req.status === 'active');
    }, []);

    // Get urgent requests count
    const urgentCount = useMemo(() => {
        return activeRequests.filter(req => req.isUrgent).length;
    }, [activeRequests]);

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Emergency Help' }
    ];

    return (
        <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb items={breadcrumbItems} />
                </div>

                {/* Header */}
                <EmergencyHeader />

                {/* Stats */}
                <EmergencyStats />

                {/* Urgent Alert Banner */}
                {urgentCount > 0 && (
                    <div className="flex items-center gap-3 p-4 mb-6 border border-red-200 bg-red-50 dark:bg-red-950/30 dark:border-red-800 rounded-2xl">
                        <AlertCircle className="flex-shrink-0 w-5 h-5 text-red-600 dark:text-red-400" />
                        <p className="text-sm text-red-700 dark:text-red-300">
                            <span className="font-bold">{urgentCount}</span> urgent {urgentCount === 1 ? 'request' : 'requests'}
                            {' '}need immediate attention. Please help if you can.
                        </p>
                    </div>
                )}

                {/* Emergency Grid */}
                <EmergencyGrid requests={activeRequests} />
            </div>
        </div>
    );
};

export default Emergency;