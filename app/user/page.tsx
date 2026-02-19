"use client";

import { useGetCurrentUser } from "@/app/data/hooks/useAuth";
import { useUserOrders } from "@/app/data/hooks/useOrders";
import { useRouter } from "next/navigation";
import { 
  Package, 
  User, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle,
  Calendar,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import StatCard from "./components/StatCard";
import PlaceOrderButton from "./components/PlaceOrderButton";
import { motion } from "framer-motion";

export default function UserDashboard() {
  const { user, isLoading: userLoading } = useGetCurrentUser();
  const { orders, isLoading: ordersLoading } = useUserOrders();
  const router = useRouter();

  // Calculate stats
  const totalOrders = orders?.length || 0;
  const completedOrders = orders?.filter(order => order.status === 'complete').length || 0;
  const pendingOrders = orders?.filter(order => order.status === 'pending').length || 0;
  const inProgressOrders = orders?.filter(order => order.status === 'in progress').length || 0;

  // Get recent orders
  const recentOrders = orders?.slice(0, 5) || [];

  if (userLoading || ordersLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="w-16 h-8 bg-gray-200 rounded mb-2"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Completed"
          value={completedOrders}
          change={{
            value: completedOrders > 0 ? "+12%" : "0%",
            isPositive: true
          }}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="In Progress"
          value={inProgressOrders}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Pending"
          value={pendingOrders}
          icon={Calendar}
          color="purple"
        />
      </div>

      {/* Quick Actions & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="/user/orders"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">View Orders</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </Link>

              <Link
                href="/user/edit-profile"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-900">Edit Profile</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </Link>

              <div
                onClick={() => router.push('/#quote')}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-900">Get Quote</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>

              <div className="pt-3 border-t border-gray-200">
                <PlaceOrderButton />
              </div>
            </div>
          </motion.div>

          {/* Profile Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Overview</h2>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {user?.profilePic?.url ? (
                  <img 
                    src={user.profilePic.url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user?.username}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="text-gray-900">{user?.phoneNumber || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Address:</span>
                <span className="text-gray-900 truncate">{user?.address || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Member Since:</span>
                <span className="text-gray-900">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link
                href="/user/orders"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-4">Get started by requesting a quote for your project</p>
                <div
                  onClick={() => router.push('/#quote')}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  Get Quote
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900">{order.name}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'complete' ? 'bg-green-100 text-green-800' :
                          order.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{order.service}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {order.estimatedCost && (
                        <p className="font-semibold text-green-600">
                          ${order.estimatedCost.toLocaleString()}
                        </p>
                      )}
                      <Link
                        href={`/user/orders`}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
