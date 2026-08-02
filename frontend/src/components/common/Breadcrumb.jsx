import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link
                to="/"
                className="flex items-center text-gray-500 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
                <Home className="w-4 h-4" />
            </Link>

            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <React.Fragment key={index}>
                        <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-600" />
                        {isLast ? (
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                to={item.path}
                                className="text-gray-500 transition-colors duration-200 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {item.label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumb;