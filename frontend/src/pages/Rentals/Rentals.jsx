import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import RentalHeader from './components/RentalHeader';
import CategoryFilter from './components/CategoryFilter';
import RentalGrid from './components/RentalGrid';
import { mockRentals, categories } from './data/mockData.js';

const Rentals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredRentals = useMemo(() => {
    let filtered = mockRentals;

    if (activeCategory !== 'all') {
      const categoryMap = {
        'camera': 'Camera',
        'vehicle': 'Vehicle',
        'power-tools': 'Power Tools',
        'electronics': 'Electronics',
        'furniture': 'Furniture',
        'events': 'Events'
      };
      filtered = filtered.filter(
        rental => rental.category === categoryMap[activeCategory]
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        rental => 
          rental.title.toLowerCase().includes(query) ||
          rental.category.toLowerCase().includes(query) ||
          rental.owner.name.toLowerCase().includes(query) ||
          rental.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  const breadcrumbItems = [
    { label: 'Rental Marketplace' }
  ];

  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return mockRentals.length;
    const categoryMap = {
      'camera': 'Camera',
      'vehicle': 'Vehicle',
      'power-tools': 'Power Tools',
      'electronics': 'Electronics',
      'furniture': 'Furniture',
      'events': 'Events'
    };
    return mockRentals.filter(r => r.category === categoryMap[categoryId]).length;
  };

  return (
    <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">

        <div className="mb-6 ">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <RentalHeader 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <CategoryFilter 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium text-gray-700 dark:text-gray-300">{filteredRentals.length}</span> items
            {activeCategory !== 'all' && (
              <span> in <span className="font-medium text-gray-700 dark:text-gray-300">
                {categories.find(c => c.id === activeCategory)?.label}
              </span></span>
            )}
          </p>
        </div>

        <RentalGrid rentals={filteredRentals} />
      </div>
    </div>
  );
};

export default Rentals;