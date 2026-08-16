import React from 'react';
import { BriefcaseBusiness, Eye, MessageSquare, Heart } from 'lucide-react';
import StatCard from './StatCard';

const iconMap = {
  BriefcaseBusiness,
  Eye,
  MessageSquare,
  Heart,
};

const StatsGrid = ({ stats }) => {
  const statsWithIcons = stats.map(stat => ({
    ...stat,
    icon: iconMap[stat.icon] || BriefcaseBusiness,
  }));

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {statsWithIcons.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
};

export default StatsGrid;