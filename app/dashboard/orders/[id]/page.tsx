"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/store/hooks";
import { updateOrder } from "@/app/redux/features/orderSlice";

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

  const order:any = orders.find((order: any) => order.id === id);

  if (!order) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold text-gray-900">Order not found</h2>
          <p className="text-gray-600 mt-2">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleStatusUpdate = (newStatus: string) => {
    dispatch(updateOrder({ id: order.id, payload: { status: newStatus as any } }));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <p className="text-gray-600">Order #{order.id}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
            <div className="space-y-2">
              <p><strong>Name:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Order Information</h3>
            <div className="space-y-2">
              <p><strong>Service Type:</strong> {order.serviceType}</p>
              <p><strong>Budget:</strong> {order.budget}</p>
              <p><strong>Timeline:</strong> {order.timeline}</p>
              <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Description</h3>
          <p className="text-gray-600">{order.description}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Status</h3>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === 'completed' ? 'bg-green-100 text-green-800' :
              order.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
              order.status === 'pending' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {order.status}
            </span>
            <select
              value={order.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
