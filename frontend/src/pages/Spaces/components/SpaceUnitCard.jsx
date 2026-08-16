import React from 'react';
import { IndianRupee, Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

const SpaceUnitCard = ({ unit }) => {
  const {
    unitNumber,
    floor,
    areaSqft,
    pricingType,
    price,
    depositAmount,
    availableFrom,
    status
  } = unit;

  const getPricingTypeLabel = (type) => {
    const labels = {
      DAILY: 'Daily',
      WEEKLY: 'Weekly',
      MONTHLY: 'Monthly'
    };
    return labels[type] || type;
  };

  const getStatusColor = (status) => {
    const colors = {
      AVAILABLE: 'bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400',
      RESERVED: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400',
      OCCUPIED: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
    };
    return colors[status] || colors.AVAILABLE;
  };

  const getStatusIcon = (status) => {
    const icons = {
      AVAILABLE: <CheckCircle className="w-4 h-4" />,
      RESERVED: <Clock className="w-4 h-4" />,
      OCCUPIED: <XCircle className="w-4 h-4" />
    };
    return icons[status] || <CheckCircle className="w-4 h-4" />;
  };

  const getStatusLabel = (status) => {
    const labels = {
      AVAILABLE: 'Available',
      RESERVED: 'Reserved',
      OCCUPIED: 'Occupied'
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl dark:bg-slate-800 dark:border-slate-700">
      <div className="flex items-start justify-between">
        <div>
          {unitNumber && (
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Unit {unitNumber}
            </h4>
          )}
          {floor && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Floor {floor}
            </p>
          )}
        </div>
        <span className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
          {getStatusIcon(status)}
          {getStatusLabel(status)}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm">
        {areaSqft && (
          <span className="text-gray-600 dark:text-gray-300">
            {areaSqft} sqft
          </span>
        )}
        <span className="flex items-center gap-1 font-bold text-blue-600 dark:text-blue-400">
          <IndianRupee className="w-4 h-4" />
          {price}
          <span className="font-normal text-gray-500 dark:text-gray-400">
            /{getPricingTypeLabel(pricingType).toLowerCase()}
          </span>
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
        {depositAmount > 0 && (
          <span>Deposit: ₹{depositAmount}</span>
        )}
        {availableFrom && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            Available from {formatDate(availableFrom)}
          </span>
        )}
      </div>
    </div>
  );
};

export default SpaceUnitCard;