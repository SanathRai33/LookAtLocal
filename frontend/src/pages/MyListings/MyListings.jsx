import React, {
    useMemo,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import ListingsHeader from './components/ListingsHeader';
import ListingTabs from './components/ListingTabs';
import ListingsList from './components/ListingsList';

import {
    listingTabs,
    listings as initialListings,
} from './data/listingsMockData';

const MyListings = () => {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('services');
    const [listings, setListings] = useState(initialListings);

    const filteredListings = useMemo(() => {
        return listings.filter(
            (listing) => listing.type === activeTab
        );
    }, [activeTab, listings]);

    const handleView = (listing) => {
        navigate(`/listings/${listing.id}`);
    };

    const handleEdit = (listing) => {
        navigate(`/listings/${listing.id}/edit`);
    };

    const handleDelete = (listing) => {
        const shouldDelete = window.confirm(
            `Are you sure you want to delete "${listing.title}"?`
        );

        if (!shouldDelete) return;

        setListings((currentListings) =>
            currentListings.filter(
                (item) => item.id !== listing.id
            )
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950">
            <div className="mx-auto w-full max-w-[1536px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
                <ListingsHeader />

                <div className="mt-7 sm:mt-9">
                    <ListingTabs
                        tabs={listingTabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </div>

                <div className="mt-7">
                    <ListingsList
                        listings={filteredListings}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default MyListings;