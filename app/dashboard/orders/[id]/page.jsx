"use client";

import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/store/hooks";
import { updateOrder } from "@/app/redux/features/orderSlice";

export default function OrderDetails() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const order = useAppSelector((s) =>
    s.orders.orders.find((o) => o._id === id)
  );

  if (!order) return <p>Order not found</p>;

  return (
    <div>
      <h2>Order Details</h2>

      <p><b>Customer:</b> {order.name}</p>
      <p><b>Service:</b> {order.service}</p>

      {/* Status */}
      <select
        defaultValue={order.status}
        onChange={(e) =>
          dispatch(
            updateOrder({
              id,
              payload: { status: e.target.value },
            })
          )
        }
      >
        <option>pending</option>
        <option>in progress</option>
        <option>complete</option>
        <option>cancelled</option>
      </select>

      {/* 🧾 Admin Notes (Live Save on Blur) */}
      <textarea
        defaultValue={order.adminNotes}
        placeholder="Admin notes"
        onBlur={(e) =>
          dispatch(
            updateOrder({
              id,
              payload: { adminNotes: e.target.value },
            })
          )
        }
      />
    </div>
  );
}
