import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCategories } from '../../../hooks/useCategories';

const modules = [
    {
        value: 'SERVICE',
        label: 'Services',
        path: '/services',
    },
    {
        value: 'RENTAL',
        label: 'Rentals',
        path: '/rentals',
    },
    {
        value: 'PRODUCT',
        label: 'Products',
        path: '/products',
    },
    {
        value: 'SPACE',
        label: 'Spaces',
        path: '/spaces',
    },
    {
        value: 'JOB',
        label: 'Jobs',
        path: '/jobs',
    },
];

const LocalSearch = () => {
    const navigate = useNavigate();

    const {
        categories,
        loading,
        getCategories,
    } = useCategories();

    const [selectedModule, setSelectedModule] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const selectedModuleData = modules.find(
        (module) => module.value === selectedModule
    );

    useEffect(() => {
        setSelectedCategory('');

        if (!selectedModule) {
            return;
        }

        getCategories({
            module: selectedModule,
        });
    }, [selectedModule]);

    const handleSearch = () => {
        if (!selectedModuleData || !selectedCategory) {
            return;
        }

        navigate(
            `${selectedModuleData.path}?categoryId=${selectedCategory}`
        );
    };

    return (
        <div className="max-w-3xl p-2 mx-auto mt-8 bg-white shadow-2xl rounded-2xl">
            <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex items-center flex-1 gap-2 px-3 rounded-xl bg-gray-50">
                    <Search className="w-5 h-5 text-gray-400 shrink-0" />

                    <select
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                        className="w-full py-3.5 text-sm text-gray-900 bg-transparent outline-none cursor-pointer sm:text-base"
                    >
                        <option value="">Select type</option>

                        {modules.map((module) => (
                            <option
                                key={module.value}
                                value={module.value}
                            >
                                {module.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center flex-1 gap-2 px-3 rounded-xl bg-gray-50">
                    {loading ? (
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin shrink-0" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}

                    <select
                        value={selectedCategory}
                        onChange={(e) =>
                            setSelectedCategory(e.target.value)
                        }
                        disabled={!selectedModule || loading}
                        className="w-full py-3.5 text-sm text-gray-900 bg-transparent outline-none cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400 sm:text-base"
                    >
                        <option value="">
                            {!selectedModule
                                ? 'Select type first'
                                : loading
                                    ? 'Loading categories...'
                                    : categories.length === 0
                                        ? 'No categories available'
                                        : 'Select category'}
                        </option>

                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handleSearch}
                    disabled={!selectedModule || !selectedCategory}
                    className="rounded-xl bg-gray-950 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
                >
                    Search
                </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 px-2 pt-3 pb-1">
                <span className="text-xs text-gray-500">
                    {selectedCategory
                        ? `Selected: ${categories.find(
                            (category) =>
                                category.id === selectedCategory
                        )?.name || 'Category'}`
                        : 'Choose a type and category to search'}
                </span>
            </div>
        </div>
    );
};

export default LocalSearch;