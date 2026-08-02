import React from 'react';
import ServiceCard from './ServiceCard';

const ServiceGrid = ({ services, variant = 'default' }) => {
    if (services.length === 0) {
        return (
            <div className="py-16 text-center">
                <div className="mb-4 text-6xl">🔍</div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    No services found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {services.map((service) => (
                <ServiceCard key={service.id} service={service} variant={variant} />
            ))}
        </div>
    );
};

export default ServiceGrid;