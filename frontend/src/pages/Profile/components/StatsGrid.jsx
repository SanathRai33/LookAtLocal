import React from 'react';
import StatCard from './StatCard';

const StatsGrid = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default StatsGrid;