import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RelatedSpaces = ({ spaces = [] }) => {
    const navigate = useNavigate();

    if (!spaces.length) {
        return null;
    }

    return (
        <div className="p-6 bg-white shadow-sm rounded-2xl dark:bg-slate-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                More from this provider
            </h3>

            <div className="mt-4 space-y-3">
                {spaces.map((space) => {
                    const image = space.images?.[0]?.imageUrl;
                    const availableUnit = space?.units?.filter((unit) => unit.status === "AVAILABLE")?.length;

                    return (
                        <button
                            key={space.id}
                            type="button"
                            onClick={() => navigate(`/spaces/${space.id}`)}
                            className="flex items-center w-full gap-3 p-3 text-left transition rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700"
                        >
                            <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 overflow-hidden bg-gray-100 rounded-xl dark:bg-slate-700">
                                {image ? (
                                    <img
                                        src={image}
                                        alt={space.title}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-400">📌</span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {space.title}
                                </p>

                                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                                    Total {availableUnit} units
                                </p>
                            </div>

                            <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedSpaces;