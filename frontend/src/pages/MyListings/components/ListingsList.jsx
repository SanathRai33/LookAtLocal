import React from 'react';
import ListingItem from './ListingItem';

const ListingsList = ({
    listings,
    onView,
    onEdit,
    onDelete,
}) => {
    if (listings.length === 0) {
        return (
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 px-6 text-center dark:border-slate-700">
                <h3 className="text-lg font-semibold text-gray-950 dark:text-white">
                    No listings found
                </h3>

                <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                    You haven't added any listings in this category yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {listings.map((listing) => (
                <ListingItem
                    key={listing.id}
                    listing={listing}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ListingsList;