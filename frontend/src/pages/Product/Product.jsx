import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Breadcrumb from '../../components/common/Breadcrumb';
import ProductHeader from './components/ProductHeader';
import CategoryFilter from './components/CategoryFilter';
import ProductGrid from './components/ProductGrid';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';

const Product = () => {
  const { products, loading, pagination, getProducts } = useProducts();
  const { categories, getCategories } = useCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('search') || ''
  );

  const currentPage = Number(searchParams.get('page')) || 1;
  const activeCategory = searchParams.get('categoryId') || 'all';
  const sortBy = searchParams.get('sort') || 'newest';

  const itemsPerPage = 12;

  useEffect(() => {
    getCategories({ module: 'PRODUCT' });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [
    currentPage,
    activeCategory,
    sortBy,
    searchParams.get('search'),
  ]);

  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  const fetchProducts = async () => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      sort: sortBy,
    };

    const search = searchParams.get('search');

    if (search?.trim()) {
      params.search = search.trim();
    }

    if (activeCategory !== 'all') {
      params.categoryId = activeCategory;
    }

    await getProducts(params);
  };

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === '' ||
        value === 'all'
      ) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    setSearchParams(params);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    updateParams({
      search: searchQuery.trim(),
      page: 1,
    });
  };

  const handleCategoryChange = (categoryId) => {
    updateParams({
      categoryId,
      page: 1,
    });
  };

  const handlePageChange = (page) => {
    updateParams({
      page,
    });
  };

  const handleSortChange = (sort) => {
    updateParams({
      sort,
      page: 1,
    });
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Buy & Sell' },
  ];

  return (
    <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <ProductHeader
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          onSearch={handleSearchSubmit}
          totalCount={pagination?.total || 0}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          loading={loading}
        />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          loading={loading}
        />

        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing{' '}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {products?.length}
            </span>{' '}
            items
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>💰 Best deals</span>
            <span className="w-px h-4 bg-gray-300 dark:bg-gray-600"></span>
            <span>⭐ Top rated</span>
          </div>
        </div>

        <ProductGrid
          products={products}
          loading={loading}
        />

        {pagination && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-gray-400 dark:hover:bg-slate-800"
            >
              ←
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {pagination.totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pagination.totalPages}
              className="p-2 text-gray-600 transition border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:border-slate-700 dark:text-gray-400 dark:hover:bg-slate-800"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;