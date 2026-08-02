import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const ListingsHeader = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
        My Listings
      </h1>

      <Link
        to="/listings/create"
        className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.98] dark:bg-blue-600 dark:hover:bg-blue-700 sm:px-6 sm:text-base"
      >
        <Plus className="h-5 w-5" />
        <span className="hidden xs:inline sm:inline">Add New</span>
      </Link>
    </div>
  );
};

export default ListingsHeader;