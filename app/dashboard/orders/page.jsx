"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/store/hooks";
import { fetchOrders } from "@/app/redux/features/orderSlice";
import AddOrderModal from "../components/AddOrderModal";
import StatusFilter from "../components/StatusFilter";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { orders, loading, error } = useAppSelector((s) => s.orders);
  console.log("orders", orders);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("all");

  // Fetch orders on mount
  useEffect(() => {
    dispatch(fetchOrders(1));
  }, []);

  // Filter orders by status
  const filtered =
    status === "all" ? orders : orders.filter((o) => o.status === status);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold">Orders</h1>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white
                     hover:bg-blue-700"
        >
          + Add New Order
        </button>
      </div>

      {/* Status Filter */}
      <StatusFilter status={status} setStatus={setStatus} />

      {/* Error message */}
      {error && (
        <p className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">{error}</p>
      )}

      {/* Loading */}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-center text-gray-500 shadow">
          No orders found
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Customer</th>
                <th className="p-3">Service</th>
                <th className="p-3">Description</th>
                <th className="p-3">Customer Name </th>
                <th className="p-3">Address</th>
                <th className="p-3">Phone Number </th>
                <th className="p-3">Status</th>
                <th className="p-3">Estimated Cost</th>
                <th className="p-3">Admin Notes </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o._id}
                  onClick={() => router.push(`/dashboard/orders/${o._id}`)}
                  className="cursor-pointer border-t hover:bg-gray-50"
                >
                  <td className="p-3">{o.customerRef?.username || "N/A"}</td>
                  <td className="p-3">{o.service || "N/A"}</td>
                  <td className="p-3">{o.description || "N/A"}</td>
                  <td className="p-3">{o.name || "N/A"}</td>
                  <td className="p-3">{o.address || "N/A"}</td>
                  <td className="p-3">{o.phoneNumber || "N/A"}</td>
                  <td className="p-3 capitalize">{o.status || "N/A"}</td>
                  <td className="p-3">{o.estimatedCost ?? "N/A"}</td>
                  <td className="p-3">{o.adminNotes ?? "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Order Modal */}
      <AddOrderModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
