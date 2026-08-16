import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "../../components/common/Breadcrumb";
import ServicesHeader from "./components/ServicesHeader";
import CategoryFilter from "./components/CategoryFilter";
import ServiceGrid from "./components/ServiceGrid";
import Pagination from "./components/Pagination";
import { useServices } from "../../hooks/useServices";
import { useCategories } from "../../hooks/useCategories";

const Services = () => {
  const { services, loading, pagination, getServices } = useServices();
  const { categories, getCategories } = useCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const [filters, setFilters] = useState({
    pricingType: searchParams.get("pricingType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    isNegotiable: searchParams.get("isNegotiable") || "",
  });

  const currentPage = Number(searchParams.get("page")) || 1;
  const activeCategory = searchParams.get("categoryId") || "all";
  const sortBy = searchParams.get("sort") || "newest";

  const itemsPerPage = 10;

  useEffect(() => {
    getCategories({
      module: "SERVICE",
    });
  }, []);

  useEffect(() => {
    fetchServices();
  }, [
    currentPage,
    activeCategory,
    sortBy,
    searchParams.get("search"),
    searchParams.get("pricingType"),
    searchParams.get("minPrice"),
    searchParams.get("maxPrice"),
    searchParams.get("isNegotiable"),
  ]);

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");

    setFilters({
      pricingType: searchParams.get("pricingType") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      isNegotiable: searchParams.get("isNegotiable") || "",
    });
  }, [searchParams]);

  const fetchServices = async () => {
    const params = {
      page: currentPage,
      limit: itemsPerPage,
      sort: sortBy,
    };

    const search = searchParams.get("search");
    const pricingType = searchParams.get("pricingType");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const isNegotiable = searchParams.get("isNegotiable");

    if (search?.trim()) {
      params.search = search.trim();
    }

    if (activeCategory !== "all") {
      params.categoryId = activeCategory;
    }

    if (pricingType) {
      params.pricingType = pricingType;
    }

    if (minPrice !== null && minPrice !== "") {
      params.minPrice = Number(minPrice);
    }

    if (maxPrice !== null && maxPrice !== "") {
      params.maxPrice = Number(maxPrice);
    }

    if (isNegotiable !== null && isNegotiable !== "") {
      params.isNegotiable = isNegotiable === "true";
    }

    await getServices(params);
  };

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === "" ||
        value === "all"
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

  const handleFilterChange = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    updateParams({
      pricingType: filters.pricingType,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      isNegotiable: filters.isNegotiable,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    setSearchParams({});
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
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Local Services",
    },
  ];

  return (
    <div className="min-h-screen py-6 bg-gray-50 dark:bg-slate-900 md:py-8">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <ServicesHeader
          searchQuery={searchQuery}
          setSearchQuery={handleSearchChange}
          onSearch={handleSearchSubmit}
          totalCount={pagination?.total || 0}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          loading={loading}
          filters={filters}
          onFilterChange={handleFilterChange}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={handleCategoryChange}
          loading={loading}
        />

        <ServiceGrid
          services={services}
          loading={loading}
          variant="default"
        />

        {pagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Services;