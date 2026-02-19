"use client";

import React, { useState } from "react";
import { useUserOrders } from "@/app/data/hooks/useOrders";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Phone, 
  MapPin, 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle,
  Eye,
  Search,
  Filter
} from "lucide-react";
import { Order, RelatedPic } from "@/app/redux/features/orderSlice";

const statusColors = {
  pending: "bg-blue-100 text-blue-800 border-blue-200",
  "in progress": "bg-yellow-100 text-yellow-800 border-yellow-200",
  complete: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusIcons = {
  pending: <Clock className="w-4 h-4" />,
  "in progress": <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />,
  complete: <CheckCircle className="w-4 h-4" />,
  cancelled: <XCircle className="w-4 h-4" />,
};

export default function UserOrdersPage() {
  const { orders, isLoading, error, refetch } = useUserOrders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders based on search and status
  const filteredOrders = orders.filter((order: Order) => {
    const matchesSearch = 
      order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerRef?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
        <p className="font-medium">Error loading orders</p>
        <p className="text-sm">{error.message}</p>
        <button 
          onClick={() => refetch()}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your construction orders</p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="complete">Complete</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your filters" 
              : "You haven't placed any orders yet"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredOrders.map((order: Order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.name}</h3>
                  <p className="text-sm text-gray-500">Order #{order._id.slice(-8)}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${statusColors[order.status as keyof typeof statusColors]}`}>
                  {statusIcons[order?.status as keyof typeof statusIcons]}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-start text-sm text-gray-600">
                  <FileText className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                  <div>
                    <span className="font-medium">Service:</span>
                    <div className="ml-2 mt-1">
                      <div className="text-gray-700">
                        {order.service}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-medium">Phone:</span>
                  <span className="ml-2">{order.phoneNumber}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-medium">Address:</span>
                  <span className="ml-2 truncate">{order.address}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-medium">Created:</span>
                  <span className="ml-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Description Preview */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {order.description}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center">
                {order.estimatedCost && (
                  <div className="text-lg font-semibold text-green-600">
                    ${order.estimatedCost.toLocaleString()}
                  </div>
                )}
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">#{selectedOrder._id.slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${statusColors[selectedOrder.status as keyof typeof statusColors]}`}>
                      {statusIcons[selectedOrder.status as keyof typeof statusIcons]}
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{selectedOrder.name}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedOrder.customerRef.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <div className="font-medium">
                    <div className="text-gray-700">
                      {selectedOrder.service}
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium">{selectedOrder.phoneNumber}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{selectedOrder.address}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Project Description</p>
                  <p className="font-medium whitespace-pre-wrap">{selectedOrder.description}</p>
                </div>

                {selectedOrder.relatedPics && selectedOrder.relatedPics.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Related Images</p>
                    <div className="grid grid-cols-3 gap-2">
                      {selectedOrder.relatedPics.map((pic: RelatedPic, index: number) => (
                        <img
                          key={index}
                          src={pic.url}
                          alt={`Project image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {selectedOrder.estimatedCost && (
                  <div>
                    <p className="text-sm text-gray-500">Estimated Cost</p>
                    <p className="text-xl font-bold text-green-600">
                      ${selectedOrder.estimatedCost.toLocaleString()}
                    </p>
                  </div>
                )}

                {selectedOrder.adminNotes && (
                  <div>
                    <p className="text-sm text-gray-500">Admin Notes</p>
                    <p className="font-medium whitespace-pre-wrap bg-gray-50 p-3 rounded">
                      {selectedOrder.adminNotes}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-500">Created</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">
                      {new Date(selectedOrder.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
