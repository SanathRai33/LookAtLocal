import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import ServicesHeader from './components/ServicesHeader';
import CategoryFilter from './components/CategoryFilter';
import ServiceGrid from './components/ServiceGrid';
import Pagination from './components/Pagination';
import { mockServices, categories } from './data/mockServices';

const Services = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter services based on search and category
    const filteredServices = useMemo(() => {
        let filtered = mockServices;

        // Filter by category
        if (activeCategory !== 'all') {
            const categoryMap = {
                'plumbing': 'Plumbing',
                'electrical': 'Electrical',
                'cleaning': 'Cleaning',
                'carpentry': 'Carpentry',
                'painting': 'Painting',
                'ac-repair': 'AC Repair',
                'tutoring': 'Tutoring',
                'beauty': 'Beauty'
            };
            filtered = filtered.filter(
                service => service.category === categoryMap[activeCategory]
            );
        }

        // Filter by search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(
                service =>
                    service.name.toLowerCase().includes(query) ||
                    service.title.toLowerCase().includes(query) ||
                    service.category.toLowerCase().includes(query) ||
                    service.description.toLowerCase().includes(query) ||
                    service.provider.name.toLowerCase().includes(query) ||
                    service.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return filtered;
    }, [activeCategory, searchQuery]);

    // Pagination
    const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
    const paginatedServices = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredServices.slice(start, end);
    }, [filteredServices, currentPage]);

    // Reset page when filters change
    const handleFilterChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Local Services' }
    ];

    return (
        <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <Breadcrumb items={breadcrumbItems} />
                </div>

                {/* Header */}
                <ServicesHeader
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearchChange}
                    totalCount={filteredServices.length}
                />

                {/* Category Filter */}
                <CategoryFilter
                    activeCategory={activeCategory}
                    setActiveCategory={handleFilterChange}
                />

                {/* Service Grid */}
                <ServiceGrid services={paginatedServices} variant="default" />

                {/* Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default Services;