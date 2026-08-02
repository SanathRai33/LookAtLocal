import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import PropertiesHeader from './components/PropertiesHeader';
import CategoryFilter from './components/CategoryFilter';
import PropertyGrid from './components/PropertyGrid';
import { mockProperties, categories } from './data/mockProperties';

const Properties = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter properties based on search and category
  const filteredProperties = useMemo(() => {
    let filtered = mockProperties;

    // Filter by category
    if (activeCategory !== 'all') {
      const categoryMap = {
        'shop': 'Shop',
        'office': 'Office',
        'room': 'Room',
        'pg': 'PG',
        'warehouse': 'Warehouse',
        'parking': 'Parking'
      };
      filtered = filtered.filter(
        property => property.category === categoryMap[activeCategory]
      );
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        property => 
          property.title.toLowerCase().includes(query) ||
          property.category.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.owner.name.toLowerCase().includes(query) ||
          property.description.toLowerCase().includes(query) ||
          property.amenities.some(a => a.toLowerCase().includes(query)) ||
          property.features.some(f => f.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Space Availability' }
  ];

  // Get counts for each category
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return mockProperties.length;
    const categoryMap = {
      'shop': 'Shop',
      'office': 'Office',
      'room': 'Room',
      'pg': 'PG',
      'warehouse': 'Warehouse',
      'parking': 'Parking'
    };
    return mockProperties.filter(p => p.category === categoryMap[categoryId]).length;
  };

  return (
    <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header */}
        <PropertiesHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Category Filter */}
        <CategoryFilter 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* Results Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-gray-700 dark:text-gray-300">{filteredProperties.length}</span> spaces
            {activeCategory !== 'all' && (
              <span> in <span className="font-medium text-gray-700 dark:text-gray-300">
                {categories.find(c => c.id === activeCategory)?.label}
              </span></span>
            )}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>🏠 {mockProperties.filter(p => p.category === 'Room' || p.category === 'PG').length} Residential</span>
            <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
            <span>🏢 {mockProperties.filter(p => p.category === 'Shop' || p.category === 'Office' || p.category === 'Warehouse').length} Commercial</span>
          </div>
        </div>

        {/* Property Grid */}
        <PropertyGrid properties={filteredProperties} />
      </div>
    </div>
  );
};

export default Properties;