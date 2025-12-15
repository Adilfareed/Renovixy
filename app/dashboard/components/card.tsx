// components/Card.tsx

import React from 'react';
import { LucideIcon } from 'lucide-react';

// Define the interface for Card props
interface CardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon; // Type for Lucide-React icon component
  colorClass: string;
  iconBgClass: string;
}

const Card: React.FC<CardProps> = ({ title, value, change, icon: Icon, colorClass, iconBgClass }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl">
      <div className={`p-3 rounded-full ${iconBgClass} mr-4`}>
        {/* Render the Lucide Icon component passed via props */}
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        {change && (
          <p className={`text-xs mt-1 ${change.startsWith('+') || change.includes('0.5') ? 'text-green-500' : 'text-red-500'}`}>
            {change} from yesterday
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;