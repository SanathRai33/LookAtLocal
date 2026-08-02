import React from 'react';

const ListingTabs = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-slate-800">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex min-w-max items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`relative whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors sm:px-5 sm:text-base ${
                  active
                    ? 'text-gray-950 dark:text-white'
                    : 'text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {tab.label}

                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-950 dark:bg-blue-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListingTabs;