// DashboardHome.tsx

import type { NextPage } from 'next';
import Card from "./components/card";
import TotalRevenueChart from "./components/TotalRevenueChart";
import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react';

const DashboardHome: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header and Search */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="py-2 px-4 pl-10 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Today's Sales Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Today's Sales</h2>
            <p className="text-sm text-gray-500">Sales Summery</p>
          </div>
        
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Sales Card */}
          <Card 
            title="Total orders" 
            value="10" 
            change="+8%" 
            icon={DollarSign} 
            colorClass="text-red-500" 
            iconBgClass="bg-red-100" 
          />

          {/* Total Order Card */}
          <Card 
            title="Total sercvices" 
            value="10" 
            change="+5%" 
            icon={ShoppingBag} 
            colorClass="text-orange-500" 
            iconBgClass="bg-orange-100" 
          />
          
          {/* Product Sold Card */}
          

          {/* New Customers Card */}
          <Card 
            title="New Customers" 
            value="8" 
            change="0.5%" 
            icon={Users} 
            colorClass="text-purple-500" 
            iconBgClass="bg-purple-100" 
          />
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6">
        <TotalRevenueChart />
      </div>
      
    </div>
  );
}

export default DashboardHome;