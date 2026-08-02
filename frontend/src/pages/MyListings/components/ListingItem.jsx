import React from 'react';
import {
    Eye,
    Pencil,
    Trash2,
} from 'lucide-react';

const ListingItem = ({
    listing,
    onView,
    onEdit,
    onDelete,
}) => {
    return (
        <article className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition duration-200 hover:border-gray-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 sm:p-5">
            <div className="flex items-center gap-4">
                <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover sm:h-[70px] sm:w-[82px]"
                />

                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-950 dark:text-white sm:text-base">
                        {listing.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                            {listing.status}
                        </span>

                        <span className="text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                            {listing.postedAt}
                        </span>
                    </div>
                </div>

                <div className="hidden shrink-0 items-center gap-2 sm:flex">
                    <button
                        type="button"
                        onClick={() => onView(listing)}
                        aria-label={`View ${listing.title}`}
                        title="View"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                    >
                        <Eye className="h-[18px] w-[18px]" />
                    </button>

                    <button
                        type="button"
                        onClick={() => onEdit(listing)}
                        aria-label={`Edit ${listing.title}`}
                        title="Edit"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
                    >
                        <Pencil className="h-[18px] w-[18px]" />
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(listing)}
                        aria-label={`Delete ${listing.title}`}
                        title="Delete"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-red-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                    >
                        <Trash2 className="h-[18px] w-[18px]" />
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 dark:border-slate-800 sm:hidden">
                <button
                    type="button"
                    onClick={() => onView(listing)}
                    className="flex h-9 items-center justify-center gap-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                    <Eye className="h-4 w-4" />
                    View
                </button>

                <button
                    type="button"
                    onClick={() => onEdit(listing)}
                    className="flex h-9 items-center justify-center gap-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-slate-800"
                >
                    <Pencil className="h-4 w-4" />
                    Edit
                </button>

                <button
                    type="button"
                    onClick={() => onDelete(listing)}
                    className="flex h-9 items-center justify-center gap-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                >
                    <Trash2 className="h-4 w-4" />
                    Delete
                </button>
            </div>
        </article>
    );
};

export default ListingItem;