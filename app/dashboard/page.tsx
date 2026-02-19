"use client";

import React from "react";
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Activity
} from "lucide-react";
import Link from "next/link";
import StatCard from "../user/components/StatCard";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  // Mock data - replace with real API calls
  const stats = {
    totalOrders: 156,
    totalRevenue: "$45,678",
    totalUsers: 89,
    completedProjects: 134,
    pendingOrders: 22,
    inProgressOrders: 12,
    monthlyGrowth: "+18.2%",
    userGrowth: "+12.5%"
  };

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", service: "Kitchen Renovation", status: "in progress", amount: "$5,000" },
    { id: "ORD-002", customer: "Jane Smith", service: "Bathroom Remodel", status: "pending", amount: "$3,500" },
    { id: "ORD-003", customer: "Bob Johnson", service: "Home Addition", status: "complete", amount: "$15,000" },
    { id: "ORD-004", customer: "Alice Brown", service: "Landscaping", status: "in progress", amount: "$2,800" },
  ];

  const topServices = [
    { name: "Kitchen Renovation", orders: 45, revenue: "$125,000" },
    { name: "Bathroom Remodel", orders: 38, revenue: "$89,500" },
    { name: "Home Addition", orders: 28, revenue: "$234,000" },
    { name: "Landscaping", orders: 22, revenue: "$45,600" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          change={{ value: "+12%", isPositive: true }}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={{ value: stats.monthlyGrowth, isPositive: true }}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          change={{ value: stats.userGrowth, isPositive: true }}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Completed"
          value={stats.completedProjects}
          change={{ value: "+8%", isPositive: true }}
          icon={CheckCircle}
          color="orange"
        />
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Revenue chart will be displayed here</p>
              <p className="text-sm text-gray-400 mt-1">Integrate with your charting library</p>
            </div>
          </div>
        </motion.div>

        {/* Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Completed</span>
              </div>
              <span className="font-semibold text-gray-900">{stats.completedProjects}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">In Progress</span>
              </div>
              <span className="font-semibold text-gray-900">{stats.inProgressOrders}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <span className="font-semibold text-gray-900">{stats.pendingOrders}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders and Top Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link
              href="/dashboard/orders"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-medium text-gray-900">{order.id}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.status === 'complete' ? 'bg-green-100 text-green-800' :
                      order.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.service}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Services */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Top Services</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {topServices.map((service, index) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    index === 0 ? 'bg-blue-100 text-blue-600' :
                    index === 1 ? 'bg-green-100 text-green-600' :
                    index === 2 ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-500">{service.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{service.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link
            href="/dashboard/orders"
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <Package className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="ml-2 font-medium text-gray-900">Manage Orders</span>
          </Link>
          <Link
            href="/dashboard/users"
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <Users className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
            <span className="ml-2 font-medium text-gray-900">Manage Users</span>
          </Link>
          <Link
            href="/dashboard/projects"
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <FileText className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
            <span className="ml-2 font-medium text-gray-900">Projects</span>
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <BarChart3 className="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
            <span className="ml-2 font-medium text-gray-900">Analytics</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}