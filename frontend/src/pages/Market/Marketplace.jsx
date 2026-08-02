import React, { useState, useMemo } from 'react';
import Breadcrumb from '../../components/common/Breadcrumb';
import MarketHeader from './components/MarketHeader';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import { mockProducts, categories } from './data/mockProducts';

const Market = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by category
    if (activeCategory !== 'all') {
      const categoryMap = {
        'electronics': 'Electronics',
        'furniture': 'Furniture',
        'footwear': 'Footwear',
        'sports': 'Sports',
        'books': 'Books',
        'appliances': 'Appliances'
      };
      filtered = filtered.filter(
        product => product.category === categoryMap[activeCategory]
      );
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        product => 
          product.title.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.seller.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Buy & Sell' }
  ];

  // Get counts for each category
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return mockProducts.length;
    const categoryMap = {
      'electronics': 'Electronics',
      'furniture': 'Furniture',
      'footwear': 'Footwear',
      'sports': 'Sports',
      'books': 'Books',
      'appliances': 'Appliances'
    };
    return mockProducts.filter(p => p.category === categoryMap[categoryId]).length;
  };

  return (
    <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Header */}
        <MarketHeader 
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
            Showing <span className="font-medium text-gray-700 dark:text-gray-300">{filteredProducts.length}</span> items
            {activeCategory !== 'all' && (
              <span> in <span className="font-medium text-gray-700 dark:text-gray-300">
                {categories.find(c => c.id === activeCategory)?.label}
              </span></span>
            )}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>💰 Best deals</span>
            <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
            <span>⭐ Top rated</span>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
};

export default Market;